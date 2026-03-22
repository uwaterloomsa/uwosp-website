import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  PencilSimple,
  Trash,
  X,
  Check,
  UploadSimple,
  File as FileIcon,
} from "@phosphor-icons/react";
import "./CollectionEditor.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function readFileAsDataUrl(file: globalThis.File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error("File must be under 5 MB"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

export interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox" | "file";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  /** For type "file" — the accept attribute (e.g. ".pdf") */
  accept?: string;
}

interface Props<T extends { id: string }> {
  title: string;
  fields: FieldDef[];
  items: T[];
  tableColumns?: string[];
  onAdd: (data: Record<string, unknown>) => Promise<void>;
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

/* ─── File / PDF upload sub-component ─── */
function FileField({
  value,
  accept,
  required,
  onChange,
}: {
  value: string;
  accept?: string;
  required?: boolean;
  onChange: (val: string) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const localRef = useRef<HTMLInputElement | null>(null);

  const hasFile = value.startsWith("data:");
  const hasUrl = value.length > 0 && !hasFile;

  async function handleFile(file: globalThis.File) {
    setError("");
    try {
      const dataUrl = await readFileAsDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="ce-file-field">
      {/* Drop zone */}
      <div
        className={`ce-dropzone ${dragging ? "ce-dropzone--active" : ""} ${hasFile ? "ce-dropzone--has-file" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => localRef.current?.click()}
      >
        <input
          ref={localRef}
          type="file"
          accept={accept}
          onChange={onInputChange}
          style={{ display: "none" }}
        />
        {hasFile ? (
          <>
            <FileIcon size={28} weight="duotone" />
            <span className="ce-dropzone-text">File uploaded</span>
            <button
              type="button"
              className="ce-dropzone-remove"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
            >
              Remove
            </button>
          </>
        ) : (
          <>
            <UploadSimple size={28} weight="duotone" />
            <span className="ce-dropzone-text">
              Drop a file here or click to browse
            </span>
            {accept && (
              <span className="ce-dropzone-hint">Accepted: {accept}</span>
            )}
          </>
        )}
      </div>

      {error && <p className="ce-file-error">{error}</p>}

      {/* Or paste a URL */}
      {!hasFile && (
        <div className="ce-file-or">
          <span className="ce-file-or-line" />
          <span className="ce-file-or-text">or paste a URL</span>
          <span className="ce-file-or-line" />
        </div>
      )}
      {!hasFile && (
        <input
          className="ce-input"
          type="url"
          value={hasUrl ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/file.pdf"
          required={required}
        />
      )}
    </div>
  );
}

export default function CollectionEditor<T extends { id: string }>({
  title,
  fields,
  items,
  tableColumns,
  onAdd,
  onUpdate,
  onDelete,
}: Props<T>) {
  const cols = tableColumns ?? fields.slice(0, 3).map((f) => f.key);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  function buildEmpty(): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.type === "number") out[f.key] = 0;
      else if (f.type === "checkbox") out[f.key] = false;
      else out[f.key] = "";
    }
    return out;
  }

  function openNew() {
    setForm(buildEmpty());
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(item: T) {
    const data: Record<string, unknown> = {};
    for (const f of fields) {
      data[f.key] =
        (item as Record<string, unknown>)[f.key] ??
        (f.type === "number" ? 0 : f.type === "checkbox" ? false : "");
    }
    setForm(data);
    setEditId(item.id);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await onUpdate(editId, form);
      } else {
        await onAdd(form);
      }
      setShowForm(false);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (
      !confirm(`Delete this ${title.replace(/s$/, "")}? This cannot be undone.`)
    )
      return;
    try {
      await onDelete(id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  function setField(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const modal = showForm
    ? createPortal(
        <div className="ce-overlay" onClick={() => setShowForm(false)}>
          <form
            className="ce-modal card"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave}
          >
            <div className="ce-modal-header">
              <h3>
                {editId ? "Edit" : "New"} {title.replace(/s$/, "")}
              </h3>
              <button
                type="button"
                className="ce-close"
                onClick={() => setShowForm(false)}
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            <div className="ce-modal-body">
              {fields.map((f) => (
                <div className="ce-field" key={f.key}>
                  <label className="ce-label">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      className="ce-input"
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => setField(f.key, e.target.value)}
                      required={f.required}
                      rows={3}
                      placeholder={f.placeholder}
                    />
                  ) : f.type === "select" ? (
                    <select
                      className="ce-input"
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => setField(f.key, e.target.value)}
                      required={f.required}
                    >
                      <option value="">Select…</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <label className="ce-checkbox">
                      <input
                        type="checkbox"
                        checked={!!form[f.key]}
                        onChange={(e) => setField(f.key, e.target.checked)}
                      />
                      <span>{f.label}</span>
                    </label>
                  ) : f.type === "number" ? (
                    <input
                      className="ce-input"
                      type="number"
                      step="any"
                      value={Number(form[f.key] ?? 0)}
                      onChange={(e) => setField(f.key, Number(e.target.value))}
                      required={f.required}
                      placeholder={f.placeholder}
                    />
                  ) : f.type === "file" ? (
                    <FileField
                      value={String(form[f.key] ?? "")}
                      accept={f.accept}
                      required={f.required && !form[f.key]}
                      onChange={(val) => setField(f.key, val)}
                    />
                  ) : (
                    <input
                      className="ce-input"
                      type="text"
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => setField(f.key, e.target.value)}
                      required={f.required}
                      placeholder={f.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="ce-modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Saving…" : editId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>,
        document.body,
      )
    : null;

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2>{title}</h2>
        <button className="btn btn-primary btn-sm" onClick={openNew}>
          <Plus size={16} weight="bold" /> Add
        </button>
      </div>

      {items.length === 0 ? (
        <p className="admin-empty">
          No {title.toLowerCase()} yet. Click "Add" to create one.
        </p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {cols.map((c) => (
                  <th key={c}>{fields.find((f) => f.key === c)?.label ?? c}</th>
                ))}
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {cols.map((c) => {
                    const val = (item as Record<string, unknown>)[c];
                    return (
                      <td key={c}>
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check size={14} />
                          ) : (
                            "—"
                          )
                        ) : (
                          String(val ?? "")
                        )}
                      </td>
                    );
                  })}
                  <td className="ce-actions">
                    <button
                      className="ce-action-btn"
                      title="Edit"
                      onClick={() => openEdit(item)}
                    >
                      <PencilSimple size={16} weight="bold" />
                    </button>
                    <button
                      className="ce-action-btn ce-action-btn--danger"
                      title="Delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash size={16} weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal}
    </div>
  );
}
