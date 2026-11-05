// lib/admin/r2.ts
// Cloudflare R2 client (R2 is S3-compatible). Used for storing all site
// media (images/videos) and the JSON content documents.
//
// Required env vars (see .env.example):
//   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
//   R2_PUBLIC_URL  – public base URL of the bucket (r2.dev or custom domain)

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET
  );
}

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

function bucket(): string {
  return process.env.R2_BUCKET!;
}

/** Public URL for an object key (requires a public bucket / custom domain). */
export function publicUrlForKey(key: string): string {
  const base = (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");
  return `${base}/${key}`;
}

export async function r2GetJson<T>(key: string): Promise<T | null> {
  try {
    const res = await getClient().send(
      new GetObjectCommand({ Bucket: bucket(), Key: key })
    );
    const text = await res.Body?.transformToString();
    return text ? (JSON.parse(text) as T) : null;
  } catch (err: unknown) {
    const name = (err as { name?: string })?.name;
    if (name === "NoSuchKey" || name === "NotFound") return null;
    throw err;
  }
}

export async function r2PutJson(key: string, data: unknown): Promise<void> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      Body: JSON.stringify(data, null, 2),
      ContentType: "application/json",
    })
  );
}

export async function r2DeleteObject(key: string): Promise<void> {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: bucket(), Key: key })
  );
}

/** Presigned PUT URL so the browser can upload directly to R2. */
export async function r2PresignUpload(
  key: string,
  contentType: string
): Promise<string> {
  return getSignedUrl(
    getClient(),
    new PutObjectCommand({ Bucket: bucket(), Key: key, ContentType: contentType }),
    { expiresIn: 60 * 15 }
  );
}
