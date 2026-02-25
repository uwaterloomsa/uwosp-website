import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {
  SignOut,
  Plus,
  PencilSimple,
  Trash,
  Eye,
  Briefcase,
  Users,
  ClipboardText,
  X,
} from "@phosphor-icons/react";
import { logout } from "./AdminLogin";
import {
  getPostings,
  createPosting,
  updatePosting,
  deletePosting,
  getApplications,
} from "../services/postings";
import type { Posting, Application } from "../types/postings";
import "./AdminDashboard.css";

type Tab = "postings" | "applications";

const emptyForm = {
  title: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
  category: "volunteer" as Posting["category"],
  status: "open" as Posting["status"],
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState<Tab>("postings");
  const [postings, setPostings] = useState<Posting[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filterPostingId, setFilterPostingId] = useState<string | "all">("all");

  // Form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // Application viewer
  const [viewApp, setViewApp] = useState<Application | null>(null);

  // Auth guard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/admin/login");
      } else {
        setAuthed(true);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  // Fetch data
  useEffect(() => {
    if (!authed) return;
    loadPostings();
    loadApplications();
  }, [authed]);

  async function loadPostings() {
    try {
      setPostings(await getPostings());
    } catch (err) {
      console.error("Failed to load postings:", err);
    }
  }

  async function loadApplications(pid?: string) {
    try {
      setApplications(
        await getApplications(pid && pid !== "all" ? pid : undefined),
      );
    } catch (err) {
      console.error("Failed to load applications:", err);
    }
  }

  function openNewForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(p: Posting) {
    setForm({
      title: p.title,
      description: p.description,
      responsibilities: p.responsibilities.length ? p.responsibilities : [""],
      requirements: p.requirements.length ? p.requirements : [""],
      category: p.category,
      status: p.status,
    });
    setEditingId(p.id);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const cleaned = {
      ...form,
      responsibilities: form.responsibilities.filter((r) => r.trim()),
      requirements: form.requirements.filter((r) => r.trim()),
    };
    try {
      if (editingId) {
        await updatePosting(editingId, cleaned);
      } else {
        await createPosting(cleaned);
      }
      setShowForm(false);
      await loadPostings();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this posting? This cannot be undone.")) return;
    try {
      await deletePosting(id);
      await loadPostings();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  async function handleToggleStatus(p: Posting) {
    const next = p.status === "open" ? "closed" : "open";
    await updatePosting(p.id, { status: next });
    await loadPostings();
  }

  function addListItem(key: "responsibilities" | "requirements") {
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  }

  function updateListItem(
    key: "responsibilities" | "requirements",
    idx: number,
    value: string,
  ) {
    setForm((prev) => {
      const copy = [...prev[key]];
      copy[idx] = value;
      return { ...prev, [key]: copy };
    });
  }

  function removeListItem(
    key: "responsibilities" | "requirements",
    idx: number,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== idx),
    }));
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!authed) return null;

  const filteredApps =
    filterPostingId === "all"
      ? applications
      : applications.filter((a) => a.postingId === filterPostingId);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="container admin-header-inner">
          <h1>
            <ClipboardText size={28} weight="duotone" /> Admin Dashboard
          </h1>
          <button
            className="btn btn-secondary admin-logout"
            onClick={async () => {
              await logout();
              navigate("/admin/login");
            }}
          >
            <SignOut size={18} weight="bold" /> Sign Out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="container">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${tab === "postings" ? "active" : ""}`}
            onClick={() => setTab("postings")}
          >
            <Briefcase size={18} weight="duotone" /> Postings ({postings.length}
            )
          </button>
          <button
            className={`admin-tab ${tab === "applications" ? "active" : ""}`}
            onClick={() => {
              setTab("applications");
              loadApplications();
            }}
          >
            <Users size={18} weight="duotone" /> Applications (
            {applications.length})
          </button>
        </div>

        {/* ───── Postings Tab ───── */}
        {tab === "postings" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Position Postings</h2>
              <button className="btn btn-primary" onClick={openNewForm}>
                <Plus size={18} weight="bold" /> New Posting
              </button>
            </div>

            {postings.length === 0 ? (
              <div className="admin-empty card">
                <Briefcase size={48} weight="duotone" />
                <p>No postings yet. Create your first position!</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postings.map((p) => (
                      <tr key={p.id}>
                        <td className="admin-td-title">{p.title}</td>
                        <td>
                          <span
                            className={`admin-badge admin-badge--${p.category}`}
                          >
                            {p.category}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`admin-status-btn admin-status--${p.status}`}
                            onClick={() => handleToggleStatus(p)}
                            title="Click to toggle"
                          >
                            {p.status}
                          </button>
                        </td>
                        <td className="admin-td-date">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button
                              className="admin-action-btn"
                              title="Edit"
                              onClick={() => openEditForm(p)}
                            >
                              <PencilSimple size={16} weight="bold" />
                            </button>
                            <button
                              className="admin-action-btn admin-action-btn--danger"
                              title="Delete"
                              onClick={() => handleDelete(p.id)}
                            >
                              <Trash size={16} weight="bold" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ───── Applications Tab ───── */}
        {tab === "applications" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Applications</h2>
              <select
                className="admin-filter-select"
                value={filterPostingId}
                onChange={(e) => {
                  setFilterPostingId(e.target.value);
                  loadApplications(e.target.value);
                }}
              >
                <option value="all">All Postings</option>
                {postings.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {filteredApps.length === 0 ? (
              <div className="admin-empty card">
                <Users size={48} weight="duotone" />
                <p>No applications received yet.</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Position</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map((a) => (
                      <tr key={a.id}>
                        <td>{a.name}</td>
                        <td className="admin-td-email">{a.email}</td>
                        <td>
                          <span className="admin-badge admin-badge--volunteer">
                            {a.postingTitle}
                          </span>
                        </td>
                        <td className="admin-td-date">
                          {new Date(a.submittedAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button
                              className="admin-action-btn"
                              title="View"
                              onClick={() => setViewApp(a)}
                            >
                              <Eye size={16} weight="bold" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ───── Posting Form Modal ───── */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div
            className="admin-modal card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>{editingId ? "Edit Posting" : "New Posting"}</h2>
              <button
                className="admin-modal-close"
                onClick={() => setShowForm(false)}
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <form className="admin-form" onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="post-title">Position Title</label>
                <input
                  id="post-title"
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. VP Marketing"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="post-cat">Category</label>
                  <select
                    id="post-cat"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        category: e.target.value as Posting["category"],
                      }))
                    }
                  >
                    <option value="executive">Executive</option>
                    <option value="lead">Lead</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="post-status">Status</label>
                  <select
                    id="post-status"
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        status: e.target.value as Posting["status"],
                      }))
                    }
                  >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="post-desc">Description</label>
                <textarea
                  id="post-desc"
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Describe the position..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Responsibilities</label>
                {form.responsibilities.map((r, i) => (
                  <div className="form-list-item" key={i}>
                    <input
                      type="text"
                      value={r}
                      onChange={(e) =>
                        updateListItem("responsibilities", i, e.target.value)
                      }
                      placeholder={`Responsibility ${i + 1}`}
                    />
                    {form.responsibilities.length > 1 && (
                      <button
                        type="button"
                        className="form-list-remove"
                        onClick={() => removeListItem("responsibilities", i)}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="form-list-add"
                  onClick={() => addListItem("responsibilities")}
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              <div className="form-group">
                <label>Requirements</label>
                {form.requirements.map((r, i) => (
                  <div className="form-list-item" key={i}>
                    <input
                      type="text"
                      value={r}
                      onChange={(e) =>
                        updateListItem("requirements", i, e.target.value)
                      }
                      placeholder={`Requirement ${i + 1}`}
                    />
                    {form.requirements.length > 1 && (
                      <button
                        type="button"
                        className="form-list-remove"
                        onClick={() => removeListItem("requirements", i)}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="form-list-add"
                  onClick={() => addListItem("requirements")}
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Posting"
                    : "Create Posting"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ───── Application View Modal ───── */}
      {viewApp && (
        <div className="admin-modal-overlay" onClick={() => setViewApp(null)}>
          <div
            className="admin-modal card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>Application Details</h2>
              <button
                className="admin-modal-close"
                onClick={() => setViewApp(null)}
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <div className="app-detail">
              <div className="app-detail-row">
                <span className="app-label">Name</span>
                <span>{viewApp.name}</span>
              </div>
              <div className="app-detail-row">
                <span className="app-label">Email</span>
                <a href={`mailto:${viewApp.email}`}>{viewApp.email}</a>
              </div>
              <div className="app-detail-row">
                <span className="app-label">Position</span>
                <span>{viewApp.postingTitle}</span>
              </div>
              <div className="app-detail-row">
                <span className="app-label">Program</span>
                <span>{viewApp.program}</span>
              </div>
              <div className="app-detail-row">
                <span className="app-label">Submitted</span>
                <span>{new Date(viewApp.submittedAt).toLocaleString()}</span>
              </div>
              <div className="app-detail-block">
                <span className="app-label">Why Interested</span>
                <p>{viewApp.whyInterested}</p>
              </div>
              <div className="app-detail-block">
                <span className="app-label">Experience</span>
                <p>{viewApp.experience}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
