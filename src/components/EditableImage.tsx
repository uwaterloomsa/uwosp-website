import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  PencilSimple,
  Check,
  X,
  Warning,
  UploadSimple,
  ImageSquare,
} from "@phosphor-icons/react";
import { useCms } from "./CmsProvider";
import { fileToDataUrl } from "../services/imageUpload";
import "./EditableImage.css";

interface Props {
  /** CMS content key, e.g. "home.hero.image" */
  contentKey: string;
  /** Default image URL when nothing is stored in the DB */
  fallback: string;
  /** Extra className forwarded to the wrapper */
  className?: string;
  /** Alt text */
  alt?: string;
  /** Allow file upload (converts to base64). Best for small images like avatars. */
  allowUpload?: boolean;
  /** Extra props forwarded to the <img> (data-* attrs, loading, etc.) */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export default function EditableImage({
  contentKey,
  fallback,
  className = "",
  alt = "",
  allowUpload = true,
  imgProps = {},
}: Props) {
  const { get, save, isAdmin } = useCms();
  const src = get(contentKey, fallback);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(src);
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) setDraft(src);
  }, [src, open]);

  useEffect(() => {
    if (open) {
      // small delay so the modal renders first
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSave = async () => {
    if (!draft.trim() || draft.trim() === src) {
      setOpen(false);
      return;
    }
    setSaving(true);
    try {
      await save(contentKey, draft.trim());
    } catch {
      setDraft(src);
    } finally {
      setSaving(false);
      setOpen(false);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setDraft(dataUrl);
    } catch {
      /* ignore bad file */
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // Non-admin — plain image
  if (!isAdmin) {
    return <img className={className} src={src} alt={alt} {...imgProps} />;
  }

  const modal = open
    ? createPortal(
        <div className="img-modal-overlay" onClick={() => setOpen(false)}>
          <div className="img-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="img-modal-header">
              <h2>
                <ImageSquare size={20} weight="duotone" />
                Change Image
              </h2>
              <button
                className="img-modal-close"
                onClick={() => setOpen(false)}
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Warning */}
            <div className="img-modal-warning">
              <Warning size={14} weight="bold" />
              This change will be visible to all visitors immediately.
            </div>

            {/* Preview */}
            <div className="img-modal-preview">
              {draft ? (
                <img src={draft} alt="Preview" />
              ) : (
                <div className="img-modal-preview-empty">
                  <ImageSquare size={40} weight="thin" />
                  <span>No image</span>
                </div>
              )}
            </div>

            {/* URL input */}
            <label className="img-modal-label">Image URL</label>
            <input
              ref={inputRef}
              className="img-modal-input"
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
              placeholder="https://images.unsplash.com/..."
              disabled={saving}
            />

            {/* Drag-and-drop zone */}
            {allowUpload && (
              <div
                className={`img-modal-dropzone${dragging ? " img-modal-dropzone--active" : ""}`}
                onClick={() => fileRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
              >
                <UploadSimple size={20} weight="bold" />
                <span>Drop an image here or click to browse</span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  hidden
                />
              </div>
            )}

            {/* Actions */}
            <div className="img-modal-actions">
              <button
                className="img-modal-btn img-modal-btn--cancel"
                onClick={() => setOpen(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="img-modal-btn img-modal-btn--save"
                onClick={handleSave}
                disabled={saving}
              >
                <Check size={16} weight="bold" />
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  // Admin display mode — image with hover pencil
  return (
    <>
      <div
        className={`cms-img-editable ${className}`}
        onClick={() => setOpen(true)}
        title="Click to change image"
      >
        <img src={src} alt={alt} {...imgProps} />
        <span className="cms-img-pencil">
          <PencilSimple size={16} weight="bold" />
        </span>
      </div>
      {modal}
    </>
  );
}
