import { useEffect, useState } from "react";
import { Plus, PencilSimple, Trash, X, Check } from "@phosphor-icons/react";

/**
 * Schema definition for a single field in the collection editor.
 * Drives the form rendering and table columns.
 */
export interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox";
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

interface Props<T extends { id: string }> {
  /** Display name for the collection (e.g., "FAQs") */
  title: string;
  /** The field definitions used for form + table columns */
  fields: FieldDef[];
  /** Live items from Firebase */
  items: T[];
  /** Which fields to show in the summary table (keys) */
  tableColumns?: string[];
  /** CRUD callbacks */
  onAdd: (data: Record<string, unknown>) => Promise<void>;
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
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

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2>{title}</h2>
        <button className="btn btn-primary btn-sm" onClick={openNew}>
          <Plus size={16} weight="bold" /> Add
        </button>
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <form
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave}
          >
            <div className="admin-modal-header">
              <h3>
                {editId ? "Edit" : "New"} {title.replace(/s$/, "")}
              </h3>
              <button
                type="button"
                className="btn-icon"
                onClick={() => setShowForm(false)}
              >
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="admin-modal-body">
              {fields.map((f) => (
                <div className="form-group" key={f.key}>
                  <label>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => setField(f.key, e.target.value)}
                      required={f.required}
                      rows={3}
                      placeholder={f.placeholder}
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => setField(f.key, e.target.value)}
                      required={f.required}
                    >
                      <option value="">Select...</option>
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <label className="admin-checkbox-label">
                      <input
                        type="checkbox"
                        checked={!!form[f.key]}
                        onChange={(e) => setField(f.key, e.target.checked)}
                      />
                      {f.label}
                    </label>
                  ) : f.type === "number" ? (
                    <input
                      type="number"
                      value={Number(form[f.key] ?? 0)}
                      onChange={(e) => setField(f.key, Number(e.target.value))}
                      required={f.required}
                      placeholder={f.placeholder}
                    />
                  ) : (
                    <input
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
            <div className="admin-modal-footer">
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
                {saving ? "Saving..." : editId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
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
                  <td>
                    <button
                      className="btn-icon"
                      title="Edit"
                      onClick={() => openEdit(item)}
                    >
                      <PencilSimple size={16} weight="bold" />
                    </button>
                    <button
                      className="btn-icon danger"
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
    </div>
  );
}
