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
  CurrencyDollar,
  CalendarBlank,
  Handshake,
  Envelope,
  NotePencil,
  Database,
} from "@phosphor-icons/react";
import { logout } from "./AdminLogin";
import { onValue, ref, remove as dbRemove } from "firebase/database";
import { db } from "../firebase";
import {
  onContent,
  updateContent,
  deleteContent,
  type ContentMap,
} from "../services/content";
import {
  createPosting,
  updatePosting,
  deletePosting,
  deleteApplication,
  onPostings,
  onApplications,
} from "../services/postings";
import {
  createFundraiser,
  updateFundraiser,
  deleteFundraiser,
  createEvent,
  updateEvent,
  deleteEvent,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  onFundraisers,
  onAllEvents,
  onSponsors,
} from "../services/site";
import type { Posting, Application } from "../types/postings";
import type { Fundraiser, SiteEvent, Sponsor } from "../types/site";
import type {
  FAQ,
  OrphanProfile,
  PastSponsorship,
  TeamMember,
  TimelineItem,
  CampaignEvent,
  FinanceReport,
  VolunteerCharity,
  VolunteerRole,
  PastEvent,
} from "../types/collections";
import CollectionEditor from "../components/CollectionEditor";
import { fileToBannerDataUrl } from "../services/imageUpload";
import {
  faqService,
  orphanService,
  pastSponsorshipService,
  teamService,
  timelineService,
  campaignEventService,
  financeReportService,
  volunteerCharityService,
  volunteerRoleService,
  pastEventService,
} from "../services/siteCollections";
import "./AdminDashboard.css";

type Tab =
  | "postings"
  | "applications"
  | "fundraisers"
  | "events"
  | "sponsors"
  | "newsletter"
  | "content"
  | "collections";

const emptyPostingForm = {
  title: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
  category: "volunteer" as Posting["category"],
  status: "open" as Posting["status"],
};

const emptyFundraiserForm = {
  title: "",
  description: "",
  goalAmount: 0,
  raisedAmount: 0,
  isActive: true,
  imageUrl: "",
};

const emptyEventForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  isFeatured: false,
  imageUrl: "",
};

const emptySponsorForm = {
  name: "",
  website: "",
  tier: "bronze" as Sponsor["tier"],
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState<Tab>("postings");
  const [postings, setPostings] = useState<Posting[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filterPostingId, setFilterPostingId] = useState<string | "all">("all");

  // Fundraisers
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [showFundForm, setShowFundForm] = useState(false);
  const [editFundId, setEditFundId] = useState<string | null>(null);
  const [fundForm, setFundForm] = useState(emptyFundraiserForm);

  // Events
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState(emptyEventForm);

  // Sponsors
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  const [editSponsorId, setEditSponsorId] = useState<string | null>(null);
  const [sponsorForm, setSponsorForm] = useState(emptySponsorForm);

  // Posting form
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPostingForm);
  const [saving, setSaving] = useState(false);

  // Application viewer
  const [viewApp, setViewApp] = useState<Application | null>(null);

  // Newsletter subscribers
  const [subscribers, setSubscribers] = useState<
    { id: string; email: string; subscribedAt: number }[]
  >([]);

  // CMS content
  const [cmsContent, setCmsContent] = useState<ContentMap>({});
  const [editingContentKey, setEditingContentKey] = useState<string | null>(
    null,
  );
  const [contentDraft, setContentDraft] = useState("");

  // Generic collections
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [orphans, setOrphans] = useState<OrphanProfile[]>([]);
  const [pastSponsorships, setPastSponsorships] = useState<PastSponsorship[]>(
    [],
  );
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [campaignEvents, setCampaignEvents] = useState<CampaignEvent[]>([]);
  const [financeReports, setFinanceReports] = useState<FinanceReport[]>([]);
  const [volunteerCharities, setVolunteerCharities] = useState<
    VolunteerCharity[]
  >([]);
  const [volunteerRoles, setVolunteerRoles] = useState<VolunteerRole[]>([]);
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [activeCollection, setActiveCollection] = useState("faqs");

  // Error toast
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function showError(msg: string) {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 4000);
  }

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

  // Real-time listeners — auto-sync with Firebase
  useEffect(() => {
    if (!authed) return;
    const unsubs: (() => void)[] = [];

    unsubs.push(
      onPostings(
        (items) => setPostings(items),
        (err) => {
          console.error("Postings sync error:", err);
          showError("Failed to sync postings");
        },
      ),
    );
    unsubs.push(
      onFundraisers(
        (items) => setFundraisers(items),
        (err) => {
          console.error("Fundraisers sync error:", err);
          showError("Failed to sync fundraisers");
        },
      ),
    );
    unsubs.push(
      onAllEvents(
        (items) => setEvents(items),
        (err) => {
          console.error("Events sync error:", err);
          showError("Failed to sync events");
        },
      ),
    );
    unsubs.push(
      onSponsors(
        (items) => setSponsors(items),
        (err) => {
          console.error("Sponsors sync error:", err);
          showError("Failed to sync sponsors");
        },
      ),
    );

    // Newsletter listener
    unsubs.push(
      onValue(
        ref(db, "newsletter"),
        (snap) => {
          const items: { id: string; email: string; subscribedAt: number }[] =
            [];
          if (snap.exists()) {
            snap.forEach((child) => {
              items.push({ id: child.key!, ...child.val() });
            });
          }
          items.sort((a, b) => b.subscribedAt - a.subscribedAt);
          setSubscribers(items);
        },
        (err) => {
          console.error("Newsletter sync error:", err);
          showError("Failed to sync newsletter");
        },
      ),
    );

    // CMS content listener
    unsubs.push(
      onContent(
        (data) => setCmsContent(data),
        (err) => {
          console.error("Content sync error:", err);
          showError("Failed to sync content");
        },
      ),
    );

    // Collection listeners
    unsubs.push(faqService.onItems(setFaqs));
    unsubs.push(orphanService.onItems(setOrphans));
    unsubs.push(pastSponsorshipService.onItems(setPastSponsorships));
    unsubs.push(teamService.onItems(setTeamMembers));
    unsubs.push(timelineService.onItems(setTimelineItems));
    unsubs.push(campaignEventService.onItems(setCampaignEvents));
    unsubs.push(financeReportService.onItems(setFinanceReports));
    unsubs.push(volunteerCharityService.onItems(setVolunteerCharities));
    unsubs.push(volunteerRoleService.onItems(setVolunteerRoles));
    unsubs.push(pastEventService.onItems(setPastEvents));

    return () => unsubs.forEach((fn) => fn());
  }, [authed]);

  // Applications listener — re-subscribes when filter changes
  useEffect(() => {
    if (!authed) return;
    const unsub = onApplications(
      (items) => setApplications(items),
      filterPostingId !== "all" ? filterPostingId : undefined,
      (err) => {
        console.error("Applications sync error:", err);
        showError("Failed to sync applications");
      },
    );
    return () => unsub();
  }, [authed, filterPostingId]);

  /* ───── Posting helpers ───── */
  function openNewForm() {
    setForm(emptyPostingForm);
    setEditingId(null);
    setShowForm(true);
  }
  function openEditForm(p: Posting) {
    setForm({
      title: p.title,
      description: p.description,
      responsibilities: p.responsibilities?.length ? p.responsibilities : [""],
      requirements: p.requirements?.length ? p.requirements : [""],
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
    } catch (err) {
      console.error("Save failed:", err);
      showError("Failed to save posting");
    } finally {
      setSaving(false);
    }
  }
  async function handleDelete(id: string) {
    if (!confirm("Delete this posting? This cannot be undone.")) return;
    try {
      await deletePosting(id);
    } catch (err) {
      console.error(err);
      showError("Failed to delete posting");
    }
  }
  async function handleToggleStatus(p: Posting) {
    const next = p.status === "open" ? "closed" : "open";
    try {
      await updatePosting(p.id, { status: next });
    } catch (err) {
      console.error(err);
      showError("Failed to update status");
    }
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

  /* ───── Fundraiser helpers ───── */
  async function handleFundSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editFundId) {
        await updateFundraiser(editFundId, fundForm);
      } else {
        await createFundraiser(fundForm);
      }
      setShowFundForm(false);
    } catch (err) {
      console.error(err);
      showError("Failed to save fundraiser");
    } finally {
      setSaving(false);
    }
  }
  async function handleFundDelete(id: string) {
    if (!confirm("Delete this fundraiser?")) return;
    try {
      await deleteFundraiser(id);
    } catch (err) {
      console.error(err);
      showError("Failed to delete fundraiser");
    }
  }

  /* ───── Event helpers ───── */
  async function handleEventSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editEventId) {
        await updateEvent(editEventId, eventForm);
      } else {
        await createEvent(eventForm);
      }
      setShowEventForm(false);
    } catch (err) {
      console.error(err);
      showError("Failed to save event");
    } finally {
      setSaving(false);
    }
  }
  async function handleEventDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    try {
      await deleteEvent(id);
    } catch (err) {
      console.error(err);
      showError("Failed to delete event");
    }
  }

  /* ───── Sponsor helpers ───── */
  async function handleSponsorSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editSponsorId) {
        await updateSponsor(editSponsorId, sponsorForm);
      } else {
        await createSponsor(sponsorForm);
      }
      setShowSponsorForm(false);
    } catch (err) {
      console.error(err);
      showError("Failed to save sponsor");
    } finally {
      setSaving(false);
    }
  }
  async function handleSponsorDelete(id: string) {
    if (!confirm("Delete this sponsor?")) return;
    try {
      await deleteSponsor(id);
    } catch (err) {
      console.error(err);
      showError("Failed to delete sponsor");
    }
  }

  /* ───── Application helpers ───── */
  async function handleDeleteApp(id: string) {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    try {
      await deleteApplication(id);
    } catch (err) {
      console.error(err);
      showError("Failed to delete application");
    }
  }

  if (loading)
    return (
      <div className="admin-loading">
        <p>Loading...</p>
      </div>
    );
  if (!authed) return null;

  return (
    <div className="admin-dashboard">
      {/* Error toast */}
      {errorMsg && (
        <div className="admin-error-toast" onClick={() => setErrorMsg(null)}>
          {errorMsg}
        </div>
      )}
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
            }}
          >
            <Users size={18} weight="duotone" /> Applications (
            {applications.length})
          </button>
          <button
            className={`admin-tab ${tab === "fundraisers" ? "active" : ""}`}
            onClick={() => setTab("fundraisers")}
          >
            <CurrencyDollar size={18} weight="duotone" /> Fundraisers (
            {fundraisers.length})
          </button>
          <button
            className={`admin-tab ${tab === "events" ? "active" : ""}`}
            onClick={() => setTab("events")}
          >
            <CalendarBlank size={18} weight="duotone" /> Events ({events.length}
            )
          </button>
          <button
            className={`admin-tab ${tab === "sponsors" ? "active" : ""}`}
            onClick={() => setTab("sponsors")}
          >
            <Handshake size={18} weight="duotone" /> Sponsors ({sponsors.length}
            )
          </button>
          <button
            className={`admin-tab ${tab === "newsletter" ? "active" : ""}`}
            onClick={() => setTab("newsletter")}
          >
            <Envelope size={18} weight="duotone" /> Newsletter (
            {subscribers.length})
          </button>
          <button
            className={`admin-tab ${tab === "content" ? "active" : ""}`}
            onClick={() => setTab("content")}
          >
            <NotePencil size={18} weight="duotone" /> Content (
            {Object.keys(cmsContent).length})
          </button>
          <button
            className={`admin-tab ${tab === "collections" ? "active" : ""}`}
            onClick={() => setTab("collections")}
          >
            <Database size={18} weight="duotone" /> Collections
          </button>
        </div>

        {/* ═══════ Postings Tab ═══════ */}
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

        {/* ═══════ Applications Tab ═══════ */}
        {tab === "applications" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Applications</h2>
              <select
                className="admin-filter-select"
                value={filterPostingId}
                onChange={(e) => {
                  setFilterPostingId(e.target.value);
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
            {applications.length === 0 ? (
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
                      <th>Resume</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((a) => (
                      <tr key={a.id}>
                        <td>{a.name}</td>
                        <td className="admin-td-email">{a.email}</td>
                        <td>
                          <span className="admin-badge admin-badge--volunteer">
                            {a.postingTitle}
                          </span>
                        </td>
                        <td>
                          {a.resumeUrl ? (
                            <a
                              href={a.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-badge admin-badge--active"
                              style={{ textDecoration: "none" }}
                            >
                              View
                            </a>
                          ) : (
                            <span className="admin-badge">—</span>
                          )}
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
                            <button
                              className="admin-action-btn admin-action-btn--danger"
                              title="Delete"
                              onClick={() => handleDeleteApp(a.id)}
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

        {/* ═══════ Fundraisers Tab ═══════ */}
        {tab === "fundraisers" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Fundraisers</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFundForm(emptyFundraiserForm);
                  setEditFundId(null);
                  setShowFundForm(true);
                }}
              >
                <Plus size={18} weight="bold" /> New Fundraiser
              </button>
            </div>
            {fundraisers.length === 0 ? (
              <div className="admin-empty card">
                <CurrencyDollar size={48} weight="duotone" />
                <p>No fundraisers yet. Create your first!</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Goal</th>
                      <th>Raised</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundraisers.map((f) => (
                      <tr key={f.id}>
                        <td className="admin-td-title">{f.title}</td>
                        <td className="admin-td-date">
                          ${f.goalAmount.toLocaleString()}
                        </td>
                        <td className="admin-td-date">
                          ${f.raisedAmount.toLocaleString()}
                        </td>
                        <td>
                          <span
                            className={`admin-badge ${f.isActive ? "admin-badge--executive" : "admin-badge--volunteer"}`}
                          >
                            {f.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button
                              className="admin-action-btn"
                              title="Edit"
                              onClick={() => {
                                setFundForm({
                                  title: f.title,
                                  description: f.description,
                                  goalAmount: f.goalAmount,
                                  raisedAmount: f.raisedAmount,
                                  isActive: f.isActive,
                                  imageUrl: f.imageUrl ?? "",
                                });
                                setEditFundId(f.id);
                                setShowFundForm(true);
                              }}
                            >
                              <PencilSimple size={16} weight="bold" />
                            </button>
                            <button
                              className="admin-action-btn admin-action-btn--danger"
                              title="Delete"
                              onClick={() => handleFundDelete(f.id)}
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

        {/* ═══════ Events Tab ═══════ */}
        {tab === "events" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Events</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEventForm(emptyEventForm);
                  setEditEventId(null);
                  setShowEventForm(true);
                }}
              >
                <Plus size={18} weight="bold" /> New Event
              </button>
            </div>
            {events.length === 0 ? (
              <div className="admin-empty card">
                <CalendarBlank size={48} weight="duotone" />
                <p>No events yet. Create your first!</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Featured</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr key={ev.id}>
                        <td className="admin-td-title">{ev.title}</td>
                        <td className="admin-td-date">{ev.date}</td>
                        <td>{ev.location}</td>
                        <td>
                          <span
                            className={`admin-badge ${ev.isFeatured ? "admin-badge--executive" : "admin-badge--volunteer"}`}
                          >
                            {ev.isFeatured ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions">
                            <button
                              className="admin-action-btn"
                              title="Edit"
                              onClick={() => {
                                setEventForm({
                                  title: ev.title,
                                  description: ev.description,
                                  date: ev.date,
                                  time: ev.time,
                                  location: ev.location,
                                  isFeatured: ev.isFeatured,
                                  imageUrl: ev.imageUrl ?? "",
                                });
                                setEditEventId(ev.id);
                                setShowEventForm(true);
                              }}
                            >
                              <PencilSimple size={16} weight="bold" />
                            </button>
                            <button
                              className="admin-action-btn admin-action-btn--danger"
                              title="Delete"
                              onClick={() => handleEventDelete(ev.id)}
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

        {/* ═══════ Sponsors Tab ═══════ */}
        {tab === "sponsors" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Sponsors / Partners</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSponsorForm(emptySponsorForm);
                  setEditSponsorId(null);
                  setShowSponsorForm(true);
                }}
              >
                <Plus size={18} weight="bold" /> New Sponsor
              </button>
            </div>
            {sponsors.length === 0 ? (
              <div className="admin-empty card">
                <Handshake size={48} weight="duotone" />
                <p>No sponsors yet. Add your first partner!</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Tier</th>
                      <th>Website</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsors.map((s) => (
                      <tr key={s.id}>
                        <td className="admin-td-title">{s.name}</td>
                        <td>
                          <span
                            className={`admin-badge admin-badge--${s.tier === "gold" ? "executive" : s.tier === "silver" ? "lead" : "volunteer"}`}
                          >
                            {s.tier}
                          </span>
                        </td>
                        <td className="admin-td-email">{s.website || "—"}</td>
                        <td>
                          <div className="admin-actions">
                            <button
                              className="admin-action-btn"
                              title="Edit"
                              onClick={() => {
                                setSponsorForm({
                                  name: s.name,
                                  website: s.website,
                                  tier: s.tier,
                                });
                                setEditSponsorId(s.id);
                                setShowSponsorForm(true);
                              }}
                            >
                              <PencilSimple size={16} weight="bold" />
                            </button>
                            <button
                              className="admin-action-btn admin-action-btn--danger"
                              title="Delete"
                              onClick={() => handleSponsorDelete(s.id)}
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

        {/* ═══════ Newsletter Tab ═══════ */}
        {tab === "newsletter" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Newsletter Subscribers</h2>
              {subscribers.length > 0 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    const csv = subscribers.map((s) => s.email).join("\n");
                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "newsletter-subscribers.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Export Emails
                </button>
              )}
            </div>
            {subscribers.length === 0 ? (
              <div className="admin-empty card">
                <Envelope size={48} weight="duotone" />
                <p>No subscribers yet.</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Subscribed</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s) => (
                      <tr key={s.id}>
                        <td className="admin-td-email">{s.email}</td>
                        <td className="admin-td-date">
                          {new Date(s.subscribedAt).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            className="admin-action-btn admin-action-btn--danger"
                            title="Remove"
                            onClick={async () => {
                              if (!confirm("Remove this subscriber?")) return;
                              try {
                                await dbRemove(ref(db, `newsletter/${s.id}`));
                              } catch {
                                showError("Failed to remove subscriber");
                              }
                            }}
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
        )}

        {/* ═══════ Content (CMS) Tab ═══════ */}
        {tab === "content" && (
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h2>Site Content (CMS)</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                  margin: 0,
                }}
              >
                Edit text directly on any page while logged in, or manage all
                content keys here.
              </p>
            </div>
            {Object.keys(cmsContent).length === 0 ? (
              <div className="admin-empty card">
                <NotePencil size={48} weight="duotone" />
                <p>
                  No content overrides yet. Visit any page while logged in and
                  click the <strong>pencil icon</strong> on any text to edit it.
                </p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(cmsContent)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([key, value]) => (
                        <tr key={key}>
                          <td
                            className="admin-td-title"
                            style={{
                              fontFamily: "monospace",
                              fontSize: "0.8rem",
                            }}
                          >
                            {key}
                          </td>
                          <td>
                            {editingContentKey === key ? (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "0.5rem",
                                  alignItems: "flex-start",
                                }}
                              >
                                <textarea
                                  className="cms-admin-textarea"
                                  value={contentDraft}
                                  onChange={(e) =>
                                    setContentDraft(e.target.value)
                                  }
                                  rows={3}
                                  style={{
                                    flex: 1,
                                    padding: "0.5rem",
                                    borderRadius: "6px",
                                    border: "2px solid var(--primary)",
                                    background: "var(--bg)",
                                    color: "var(--text)",
                                    font: "inherit",
                                    fontSize: "0.85rem",
                                    resize: "vertical",
                                  }}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.25rem",
                                  }}
                                >
                                  <button
                                    className="admin-action-btn"
                                    title="Save"
                                    onClick={async () => {
                                      try {
                                        await updateContent(key, contentDraft);
                                        setEditingContentKey(null);
                                      } catch {
                                        showError("Failed to save content");
                                      }
                                    }}
                                  >
                                    <PencilSimple size={16} weight="bold" />
                                  </button>
                                  <button
                                    className="admin-action-btn"
                                    title="Cancel"
                                    onClick={() => setEditingContentKey(null)}
                                  >
                                    <X size={16} weight="bold" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <span
                                style={{
                                  fontSize: "0.85rem",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {value}
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="admin-actions">
                              <button
                                className="admin-action-btn"
                                title="Edit"
                                onClick={() => {
                                  setEditingContentKey(key);
                                  setContentDraft(value);
                                }}
                              >
                                <PencilSimple size={16} weight="bold" />
                              </button>
                              <button
                                className="admin-action-btn admin-action-btn--danger"
                                title="Delete (revert to default)"
                                onClick={async () => {
                                  if (
                                    !confirm(
                                      `Revert "${key}" to its default value?`,
                                    )
                                  )
                                    return;
                                  try {
                                    await deleteContent(key);
                                  } catch {
                                    showError("Failed to delete content key");
                                  }
                                }}
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

        {/* ═══════ Collections Tab ═══════ */}
        {tab === "collections" && (
          <div>
            <div className="admin-collection-subtabs">
              {[
                { key: "faqs", label: "FAQs", count: faqs.length },
                { key: "orphans", label: "Orphans", count: orphans.length },
                {
                  key: "pastSponsorships",
                  label: "Past Sponsorships",
                  count: pastSponsorships.length,
                },
                {
                  key: "teamMembers",
                  label: "Team Members",
                  count: teamMembers.length,
                },
                {
                  key: "timelineItems",
                  label: "Timeline",
                  count: timelineItems.length,
                },
                {
                  key: "campaignEvents",
                  label: "Campaign Events",
                  count: campaignEvents.length,
                },
                {
                  key: "financeReports",
                  label: "Finance Reports",
                  count: financeReports.length,
                },
                {
                  key: "volunteerCharities",
                  label: "Volunteer Charities",
                  count: volunteerCharities.length,
                },
                {
                  key: "volunteerRoles",
                  label: "Volunteer Roles",
                  count: volunteerRoles.length,
                },
                {
                  key: "pastEvents",
                  label: "Past Events",
                  count: pastEvents.length,
                },
              ].map((c) => (
                <button
                  key={c.key}
                  className={`filter-chip ${activeCollection === c.key ? "active" : ""}`}
                  onClick={() => setActiveCollection(c.key)}
                >
                  {c.label} ({c.count})
                </button>
              ))}
            </div>

            {activeCollection === "faqs" && (
              <CollectionEditor<FAQ>
                title="FAQs"
                fields={[
                  {
                    key: "question",
                    label: "Question",
                    type: "text",
                    required: true,
                  },
                  {
                    key: "answer",
                    label: "Answer",
                    type: "textarea",
                    required: true,
                  },
                  { key: "order", label: "Order", type: "number" },
                ]}
                items={faqs.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))}
                tableColumns={["question", "answer", "order"]}
                onAdd={(d) =>
                  faqService.addItem(d as Omit<FAQ, "id">).then(() => {})
                }
                onUpdate={(id, d) =>
                  faqService.updateItem(id, d as Partial<FAQ>)
                }
                onDelete={(id) => faqService.deleteItem(id)}
              />
            )}

            {activeCollection === "orphans" && (
              <>
                {orphans.length === 0 && (
                  <button
                    className="btn btn-primary"
                    style={{ marginBottom: "1rem" }}
                    onClick={async () => {
                      const defaults = [
                        {
                          name: "Stina",
                          country: "Kosovo",
                          description:
                            "Stina lives in Kosovo. She likes to collect cuddly bears and her dream is to become a police officer! She lives with her mother and older brother.",
                          years: "2017-2027",
                        },
                        {
                          name: "Kalilou",
                          country: "Mali",
                          description:
                            "Kalilou lives with his mother in Mali and is a student in fourth grade. Kalilou loves playing football with his friends after school and he is a creative artist.",
                          years: "2017-2030",
                        },
                        {
                          name: "Muhammed",
                          country: "Palestine",
                          description:
                            "Muhammed lives in Palestine with his mother. He loves collecting sea shells and swimming in his free time. Muhammed's dream is to become a teacher!",
                          years: "2017-2023",
                        },
                        {
                          name: "Marah",
                          country: "Palestine",
                          description:
                            "Marah lives with her mother and three siblings in Palestine. She is currently eight years old.",
                          years: "2021-2029",
                        },
                        {
                          name: "Ali",
                          country: "Palestine",
                          description:
                            "Ali lives in Palestine and is currently 5 years old.",
                          years: "2025-2026",
                        },
                        {
                          name: "Hayat",
                          country: "Palestine",
                          description:
                            "Hayat lives with her mother in Palestine. She is currently four years old.",
                          years: "2025-2026",
                        },
                        {
                          name: "Malek",
                          country: "Palestine",
                          description:
                            "Malek lives in Palestine and is currently three years old.",
                          years: "2025-2026",
                        },
                        {
                          name: "Mariam",
                          country: "Palestine",
                          description:
                            "Mariam lives with her mother in Palestine. She is currently zero years old.",
                          years: "2025-2026",
                        },
                        {
                          name: "Sela",
                          country: "Palestine",
                          description:
                            "Sela lives in Palestine and is currently three years old.",
                          years: "2025-2026",
                        },
                      ];
                      for (let i = 0; i < defaults.length; i++) {
                        await orphanService.addItem({
                          ...defaults[i],
                          order: i,
                        } as Omit<OrphanProfile, "id">);
                      }
                      const pastNames = [
                        "Yasin Hassoun",
                        "Abdul Karim Jaber",
                        "AbdulRahman Brijwee",
                        "Hashim Mushtaq",
                        "Seemab Sadiq",
                        "Marwa Mohammad",
                        "Mena Rahmat Gul",
                        "Abdur Rahman",
                        "Toyaffa Alam Shad",
                        "Sughra Akhter",
                        "Tariq Shah",
                        "Syeda Umama Sherazi",
                        "Muhammed Abu Hendy",
                      ];
                      for (let i = 0; i < pastNames.length; i++) {
                        await pastSponsorshipService.addItem({
                          name: pastNames[i],
                          order: i,
                        } as Omit<PastSponsorship, "id">);
                      }
                    }}
                  >
                    Seed Default Orphans &amp; Past Sponsorships
                  </button>
                )}
                <CollectionEditor<OrphanProfile>
                  title="Orphans"
                  fields={[
                    {
                      key: "name",
                      label: "Name",
                      type: "text",
                      required: true,
                    },
                    {
                      key: "country",
                      label: "Country",
                      type: "text",
                      required: true,
                    },
                    {
                      key: "description",
                      label: "Description",
                      type: "textarea",
                      required: true,
                    },
                    {
                      key: "years",
                      label: "Years (e.g. 2017-2027)",
                      type: "text",
                      required: true,
                    },
                  ]}
                  items={orphans}
                  tableColumns={["name", "country", "years"]}
                  onAdd={(d) =>
                    orphanService
                      .addItem(d as Omit<OrphanProfile, "id">)
                      .then(() => {})
                  }
                  onUpdate={(id, d) =>
                    orphanService.updateItem(id, d as Partial<OrphanProfile>)
                  }
                  onDelete={(id) => orphanService.deleteItem(id)}
                />
              </>
            )}

            {activeCollection === "pastSponsorships" && (
              <CollectionEditor<PastSponsorship>
                title="Past Sponsorships"
                fields={[
                  { key: "name", label: "Name", type: "text", required: true },
                ]}
                items={pastSponsorships}
                tableColumns={["name"]}
                onAdd={(d) =>
                  pastSponsorshipService
                    .addItem(d as Omit<PastSponsorship, "id">)
                    .then(() => {})
                }
                onUpdate={(id, d) =>
                  pastSponsorshipService.updateItem(
                    id,
                    d as Partial<PastSponsorship>,
                  )
                }
                onDelete={(id) => pastSponsorshipService.deleteItem(id)}
              />
            )}

            {activeCollection === "teamMembers" && (
              <CollectionEditor<TeamMember>
                title="Team Members"
                fields={[
                  { key: "name", label: "Name", type: "text", required: true },
                  { key: "role", label: "Role", type: "text" },
                  {
                    key: "department",
                    label: "Department",
                    type: "text",
                    required: true,
                  },
                  {
                    key: "isLeadership",
                    label: "Leadership",
                    type: "checkbox",
                  },
                  { key: "order", label: "Order", type: "number" },
                ]}
                items={teamMembers.sort(
                  (a, b) => (a.order ?? 0) - (b.order ?? 0),
                )}
                tableColumns={["name", "role", "department", "isLeadership"]}
                onAdd={(d) =>
                  teamService
                    .addItem(d as Omit<TeamMember, "id">)
                    .then(() => {})
                }
                onUpdate={(id, d) =>
                  teamService.updateItem(id, d as Partial<TeamMember>)
                }
                onDelete={(id) => teamService.deleteItem(id)}
              />
            )}

            {activeCollection === "timelineItems" && (
              <CollectionEditor<TimelineItem>
                title="Timeline"
                fields={[
                  { key: "year", label: "Year", type: "text", required: true },
                  {
                    key: "title",
                    label: "Title",
                    type: "text",
                    required: true,
                  },
                  {
                    key: "description",
                    label: "Description",
                    type: "textarea",
                    required: true,
                  },
                  { key: "order", label: "Order", type: "number" },
                ]}
                items={timelineItems.sort(
                  (a, b) => (a.order ?? 0) - (b.order ?? 0),
                )}
                tableColumns={["year", "title", "order"]}
                onAdd={(d) =>
                  timelineService
                    .addItem(d as Omit<TimelineItem, "id">)
                    .then(() => {})
                }
                onUpdate={(id, d) =>
                  timelineService.updateItem(id, d as Partial<TimelineItem>)
                }
                onDelete={(id) => timelineService.deleteItem(id)}
              />
            )}

            {activeCollection === "campaignEvents" && (
              <CollectionEditor<CampaignEvent>
                title="Campaign Events"
                fields={[
                  { key: "name", label: "Name", type: "text", required: true },
                  {
                    key: "emoji",
                    label: "Emoji",
                    type: "text",
                    required: true,
                    placeholder: "🎪",
                  },
                  {
                    key: "term",
                    label: "Term (e.g. Fall 2025)",
                    type: "text",
                    required: true,
                  },
                  { key: "order", label: "Order", type: "number" },
                ]}
                items={campaignEvents.sort(
                  (a, b) => (a.order ?? 0) - (b.order ?? 0),
                )}
                tableColumns={["name", "emoji", "term", "order"]}
                onAdd={(d) =>
                  campaignEventService
                    .addItem(d as Omit<CampaignEvent, "id">)
                    .then(() => {})
                }
                onUpdate={(id, d) =>
                  campaignEventService.updateItem(
                    id,
                    d as Partial<CampaignEvent>,
                  )
                }
                onDelete={(id) => campaignEventService.deleteItem(id)}
              />
            )}

            {activeCollection === "financeReports" && (
              <CollectionEditor<FinanceReport>
                title="Finance Reports"
                fields={[
                  {
                    key: "name",
                    label: "Name (e.g. Spring 2024)",
                    type: "text",
                    required: true,
                  },
                  {
                    key: "year",
                    label: "Year",
                    type: "number",
                    required: true,
                  },
                  {
                    key: "url",
                    label: "PDF",
                    type: "file",
                    required: true,
                    accept: ".pdf,application/pdf",
                  },
                ]}
                items={financeReports}
                tableColumns={["name", "year"]}
                onAdd={(d) =>
                  financeReportService
                    .addItem(d as Omit<FinanceReport, "id">)
                    .then(() => {})
                }
                onUpdate={(id, d) =>
                  financeReportService.updateItem(
                    id,
                    d as Partial<FinanceReport>,
                  )
                }
                onDelete={(id) => financeReportService.deleteItem(id)}
              />
            )}

            {activeCollection === "volunteerCharities" && (
              <CollectionEditor<VolunteerCharity>
                title="Volunteer Charities"
                fields={[
                  { key: "name", label: "Name", type: "text", required: true },
                  {
                    key: "focus",
                    label: "Focus",
                    type: "textarea",
                    required: true,
                  },
                  {
                    key: "location",
                    label: "Location",
                    type: "text",
                    required: true,
                  },
                  {
                    key: "website",
                    label: "Website URL",
                    type: "text",
                    required: true,
                  },
                ]}
                items={volunteerCharities}
                tableColumns={["name", "focus", "location"]}
                onAdd={(d) =>
                  volunteerCharityService
                    .addItem(d as Omit<VolunteerCharity, "id">)
                    .then(() => {})
                }
                onUpdate={(id, d) =>
                  volunteerCharityService.updateItem(
                    id,
                    d as Partial<VolunteerCharity>,
                  )
                }
                onDelete={(id) => volunteerCharityService.deleteItem(id)}
              />
            )}

            {activeCollection === "volunteerRoles" && (
              <CollectionEditor<VolunteerRole>
                title="Volunteer Roles"
                fields={[
                  {
                    key: "title",
                    label: "Title",
                    type: "text",
                    required: true,
                  },
                  {
                    key: "description",
                    label: "Description",
                    type: "textarea",
                    required: true,
                  },
                  { key: "order", label: "Order", type: "number" },
                ]}
                items={volunteerRoles.sort(
                  (a, b) => (a.order ?? 0) - (b.order ?? 0),
                )}
                tableColumns={["title", "description", "order"]}
                onAdd={(d) =>
                  volunteerRoleService
                    .addItem(d as Omit<VolunteerRole, "id">)
                    .then(() => {})
                }
                onUpdate={(id, d) =>
                  volunteerRoleService.updateItem(
                    id,
                    d as Partial<VolunteerRole>,
                  )
                }
                onDelete={(id) => volunteerRoleService.deleteItem(id)}
              />
            )}

            {activeCollection === "pastEvents" && (
              <CollectionEditor<PastEvent>
                title="Past Events"
                fields={[
                  {
                    key: "title",
                    label: "Title",
                    type: "text",
                    required: true,
                  },
                  {
                    key: "description",
                    label: "Description",
                    type: "textarea",
                    required: true,
                  },
                  { key: "order", label: "Order", type: "number" },
                ]}
                items={pastEvents.sort(
                  (a, b) => (a.order ?? 0) - (b.order ?? 0),
                )}
                tableColumns={["title", "description", "order"]}
                onAdd={(d) =>
                  pastEventService
                    .addItem(d as Omit<PastEvent, "id">)
                    .then(() => {})
                }
                onUpdate={(id, d) =>
                  pastEventService.updateItem(id, d as Partial<PastEvent>)
                }
                onDelete={(id) => pastEventService.deleteItem(id)}
              />
            )}
          </div>
        )}
      </div>

      {/* ═══════ Posting Form Modal ═══════ */}
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

      {/* ═══════ Fundraiser Form Modal ═══════ */}
      {showFundForm && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowFundForm(false)}
        >
          <div
            className="admin-modal card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>{editFundId ? "Edit Fundraiser" : "New Fundraiser"}</h2>
              <button
                className="admin-modal-close"
                onClick={() => setShowFundForm(false)}
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <form className="admin-form" onSubmit={handleFundSave}>
              <div className="form-group">
                <label htmlFor="fund-title">Title</label>
                <input
                  id="fund-title"
                  type="text"
                  value={fundForm.title}
                  onChange={(e) =>
                    setFundForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Winter Warmth Drive 2025"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fund-desc">Description</label>
                <textarea
                  id="fund-desc"
                  rows={3}
                  value={fundForm.description}
                  onChange={(e) =>
                    setFundForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Describe the fundraiser..."
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fund-goal">Goal Amount ($)</label>
                  <input
                    id="fund-goal"
                    type="number"
                    step="any"
                    min={0}
                    value={fundForm.goalAmount}
                    onChange={(e) =>
                      setFundForm((f) => ({
                        ...f,
                        goalAmount: Number(e.target.value),
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fund-raised">Raised Amount ($)</label>
                  <input
                    id="fund-raised"
                    type="number"
                    step="any"
                    min={0}
                    value={fundForm.raisedAmount}
                    onChange={(e) =>
                      setFundForm((f) => ({
                        ...f,
                        raisedAmount: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    checked={fundForm.isActive}
                    onChange={(e) =>
                      setFundForm((f) => ({ ...f, isActive: e.target.checked }))
                    }
                  />
                  Active (shown on landing page)
                </label>
              </div>
              <div className="form-group">
                <label>Image (optional)</label>
                {fundForm.imageUrl && (
                  <img
                    src={fundForm.imageUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 200,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const dataUrl = await fileToBannerDataUrl(file);
                    setFundForm((f) => ({ ...f, imageUrl: dataUrl }));
                  }}
                />
                <input
                  type="text"
                  placeholder="Or paste an image URL"
                  value={
                    fundForm.imageUrl.startsWith("data:")
                      ? ""
                      : fundForm.imageUrl
                  }
                  onChange={(e) =>
                    setFundForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  style={{ marginTop: 6 }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editFundId
                    ? "Update Fundraiser"
                    : "Create Fundraiser"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══════ Event Form Modal ═══════ */}
      {showEventForm && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowEventForm(false)}
        >
          <div
            className="admin-modal card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>{editEventId ? "Edit Event" : "New Event"}</h2>
              <button
                className="admin-modal-close"
                onClick={() => setShowEventForm(false)}
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <form className="admin-form" onSubmit={handleEventSave}>
              <div className="form-group">
                <label htmlFor="evt-title">Title</label>
                <input
                  id="evt-title"
                  type="text"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Annual Charity Gala"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="evt-desc">Description</label>
                <textarea
                  id="evt-desc"
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Describe the event..."
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="evt-date">Date</label>
                  <input
                    id="evt-date"
                    type="date"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm((f) => ({ ...f, date: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="evt-time">Time</label>
                  <input
                    id="evt-time"
                    type="time"
                    value={eventForm.time}
                    onChange={(e) =>
                      setEventForm((f) => ({ ...f, time: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="evt-loc">Location</label>
                <input
                  id="evt-loc"
                  type="text"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm((f) => ({ ...f, location: e.target.value }))
                  }
                  placeholder="e.g. Federation Hall, UWaterloo"
                />
              </div>
              <div className="form-group">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    checked={eventForm.isFeatured}
                    onChange={(e) =>
                      setEventForm((f) => ({
                        ...f,
                        isFeatured: e.target.checked,
                      }))
                    }
                  />
                  Featured (shown on landing page)
                </label>
              </div>
              <div className="form-group">
                <label>Image (optional)</label>
                {eventForm.imageUrl && (
                  <img
                    src={eventForm.imageUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 200,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const dataUrl = await fileToBannerDataUrl(file);
                    setEventForm((f) => ({ ...f, imageUrl: dataUrl }));
                  }}
                />
                <input
                  type="text"
                  placeholder="Or paste an image URL"
                  value={
                    eventForm.imageUrl.startsWith("data:")
                      ? ""
                      : eventForm.imageUrl
                  }
                  onChange={(e) =>
                    setEventForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  style={{ marginTop: 6 }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editEventId
                    ? "Update Event"
                    : "Create Event"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══════ Sponsor Form Modal ═══════ */}
      {showSponsorForm && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowSponsorForm(false)}
        >
          <div
            className="admin-modal card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>{editSponsorId ? "Edit Sponsor" : "New Sponsor"}</h2>
              <button
                className="admin-modal-close"
                onClick={() => setShowSponsorForm(false)}
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <form className="admin-form" onSubmit={handleSponsorSave}>
              <div className="form-group">
                <label htmlFor="sp-name">Name</label>
                <input
                  id="sp-name"
                  type="text"
                  value={sponsorForm.name}
                  onChange={(e) =>
                    setSponsorForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. Islamic Relief"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sp-web">Website URL</label>
                <input
                  id="sp-web"
                  type="url"
                  value={sponsorForm.website}
                  onChange={(e) =>
                    setSponsorForm((f) => ({ ...f, website: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="sp-tier">Tier</label>
                <select
                  id="sp-tier"
                  value={sponsorForm.tier}
                  onChange={(e) =>
                    setSponsorForm((f) => ({
                      ...f,
                      tier: e.target.value as Sponsor["tier"],
                    }))
                  }
                >
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editSponsorId
                    ? "Update Sponsor"
                    : "Create Sponsor"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══════ Application View Modal ═══════ */}
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
              {viewApp.resumeUrl && (
                <div className="app-detail-row">
                  <span className="app-label">Resume</span>
                  <a
                    href={viewApp.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: "0.85rem", padding: "0.4rem 0.75rem" }}
                  >
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
