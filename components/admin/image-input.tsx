// components/admin/image-input.tsx
// Text input for an image/video URL with an inline "Upload" button that
// stores the file on Cloudflare R2 (or local fallback) and fills in the URL.
"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/components/admin/api";
import { toast } from "sonner";

export function ImageInput({
  value,
  onChange,
  placeholder = "https://… or /images/…",
  accept = "image/*",
  previewType = "image",
  folder = "general",
}: {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  accept?: string;
  previewType?: "image" | "none";
  /** destination folder for uploads, e.g. "events/<slug>" */
  folder?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleFile(file: File) {
    setBusy(true);
    setProgress(0);
    try {
      const { url } = await uploadFile(file, { folder, onProgress: setProgress });
      onChange(url);
      toast.success(`Uploaded to ${folder}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {progress > 0 ? `${progress}%` : ""}
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload
            </>
          )}
        </Button>
      </div>
      {previewType === "image" && value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="preview"
          className="h-20 w-auto rounded-lg border border-border object-cover"
        />
      ) : null}
    </div>
  );
}
