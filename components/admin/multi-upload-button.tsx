// components/admin/multi-upload-button.tsx
// Upload several images/videos at once into a specific folder and get
// all their URLs back — used by gallery editors.
"use client";

import { useRef, useState } from "react";
import { Loader2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/components/admin/api";
import { toast } from "sonner";

export function MultiUploadButton({
  folder,
  onUploaded,
  accept = "image/*",
  label = "Upload images",
}: {
  /** destination folder, e.g. "impact/pagi-medical" */
  folder: string;
  onUploaded: (urls: string[]) => void;
  accept?: string;
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    const urls: string[] = [];
    try {
      const list = Array.from(files);
      for (let i = 0; i < list.length; i++) {
        setStatus(`${i + 1}/${list.length}`);
        const { url } = await uploadFile(list[i], { folder });
        urls.push(url);
      }
      onUploaded(urls);
      toast.success(
        `${urls.length} file${urls.length === 1 ? "" : "s"} uploaded to ${folder}`
      );
    } catch (err) {
      if (urls.length) onUploaded(urls); // keep what succeeded
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      setStatus("");
    }
  }

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={busy}
        onClick={() => fileRef.current?.click()}
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading {status}…
          </>
        ) : (
          <>
            <ImagePlus className="h-4 w-4" />
            {label}
          </>
        )}
      </Button>
    </>
  );
}
