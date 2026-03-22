import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { PencilSimple, X, Warning } from "@phosphor-icons/react";
import { useCms } from "./CmsProvider";
import "./EditableText.css";

interface Props {
  /** Unique key in the content collection, e.g. "home.hero.title" */
  contentKey: string;
  /** Default text shown when no value exists in the DB */
  fallback: string;
  /** Render as this element. Defaults to "span". */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "strong" | "li";
  /** Allow multiline editing (textarea). Default false. */
  multiline?: boolean;
  /** Extra className forwarded to the wrapper */
  className?: string;
}

export default function EditableText({
  contentKey,
  fallback,
  as: Tag = "span",
  multiline = false,
  className = "",
}: Props) {
  const { get, save, isAdmin } = useCms();
  const display = get(contentKey, fallback);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(display);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // Sync draft when content updates from DB while not editing
  useEffect(() => {
    if (!editing) setDraft(display);
  }, [display, editing]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleSave = async () => {
    if (draft.trim() === display) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      await save(contentKey, draft.trim());
    } catch {
      // revert on failure
      setDraft(display);
    } finally {
      setSaving(false);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setDraft(display);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleCancel();
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    }
  };

  // Not an admin — just render normally
  if (!isAdmin) {
    return <Tag className={className}>{display}</Tag>;
  }

  // Admin: always render the original Tag so page styling is preserved.
  // When editing, open a portal modal for the edit UI.
  return (
    <>
      <Tag
        className={`cms-editable ${className}`}
        onClick={() => setEditing(true)}
        title="Click to edit"
      >
        {display}
        <span className="cms-edit-pencil">
          <PencilSimple size={14} weight="bold" />
        </span>
      </Tag>

      {editing &&
        createPortal(
          <div className="cms-edit-overlay" onClick={handleCancel}>
            <div
              className="cms-edit-modal card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cms-edit-modal-header">
                <h3>Edit Content</h3>
                <button
                  type="button"
                  className="cms-edit-close"
                  onClick={handleCancel}
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <div className="cms-edit-warning">
                <Warning size={14} weight="bold" />
                This change will be visible to all visitors immediately.
              </div>

              {multiline ? (
                <textarea
                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                  className="cms-edit-input cms-edit-textarea"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={saving}
                  rows={4}
                />
              ) : (
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  className="cms-edit-input"
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={saving}
                />
              )}

              <div className="cms-edit-modal-footer">
                <button
                  className="btn btn-outline"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
