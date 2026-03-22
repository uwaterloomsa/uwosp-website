import { useEffect, useState, useRef } from "react";
import {
  EnvelopeSimple,
  PencilSimple,
  Plus,
  Trash,
  X,
  Warning,
  UploadSimple,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import { useCms } from "../components/CmsProvider";
import { teamService } from "../services/siteCollections";
import { fileToDataUrl } from "../services/imageUpload";
import type { TeamMember } from "../types/collections";
import "./About.css";

const AVATAR_COLORS = [
  "oklch(0.55 0.18 264)",
  "oklch(0.55 0.15 200)",
  "oklch(0.55 0.15 150)",
  "oklch(0.55 0.18 330)",
  "oklch(0.50 0.15 30)",
  "oklch(0.50 0.12 280)",
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface Member {
  name: string;
  role?: string;
  imageUrl?: string;
}

const defaultLeadership: Member[] = [
  { name: "Reem Abdelazim", role: "President" },
  { name: "Yahya Rizwan", role: "VP Operations" },
  { name: "Hadi Meski", role: "VP Finance" },
  { name: "Alysha Butt", role: "VP Outreach" },
  { name: "Erick Rahi", role: "VP Fundraising" },
  { name: "Ahmed Elalem", role: "VP Logistics" },
  { name: "Emaan Zafar", role: "VP Marketing" },
];

const defaultDepartments: {
  name: string;
  members: Member[];
}[] = [
  {
    name: "Operations",
    members: [{ name: "Saif Al-Din Ali" }],
  },
  {
    name: "Advisors",
    members: [
      { name: "Rama Al Aghbar" },
      { name: "Niah Fiorino" },
      { name: "Yusra Aslam" },
    ],
  },
  {
    name: "Finance",
    members: [{ name: "Jawad Hussain" }],
  },
  {
    name: "Outreach",
    members: [
      { name: "Asiyah Malik" },
      { name: "Hanin Shamsheer" },
      { name: "Sumaiyah Shakeel" },
      { name: "Zuhair Qureshy" },
    ],
  },
  {
    name: "Fundraising",
    members: [
      { name: "Aya Zahabi" },
      { name: "Ayesha Amanullah" },
      { name: "Muhammad Musfir Ehtsham" },
      { name: "Mus'ab Khan" },
      { name: "Maaz Patel" },
      { name: "Zainab Waheed" },
      { name: "Maryam Zeb" },
    ],
  },
  {
    name: "Logistics",
    members: [
      { name: "Sameen Ahmed" },
      { name: "Faiq Ali" },
      { name: "Muhammad Ayan Asim" },
      { name: "Ammar Raffay" },
      { name: "Emaan Sikander" },
      { name: "Reanna Chowdhury" },
      { name: "Bushra Shakeel" },
    ],
  },
  {
    name: "Marketing & Social Media",
    members: [
      { name: "Nyle Faridi" },
      { name: "Zeba Shaikh" },
      { name: "Rowson Akter" },
      { name: "Elyaze Khan" },
      { name: "Serena Alshayeb" },
      { name: "Muzammil Sheikh" },
    ],
  },
];

function MemberCard({ member, large }: { member: Member; large?: boolean }) {
  return (
    <div className={`team-card${large ? " team-card--leader" : ""}`}>
      {member.imageUrl ? (
        <img
          className={`team-card-photo-img${large ? " team-card-photo-img--lg" : ""}`}
          src={member.imageUrl}
          alt={member.name}
        />
      ) : (
        <div
          className={`team-card-photo${large ? " team-card-photo--lg" : ""}`}
          style={{ background: getAvatarColor(member.name), color: "#fff" }}
        >
          {getInitials(member.name)}
        </div>
      )}
      <div className="team-card-info">
        <h4>{member.name}</h4>
        {member.role && <span className="team-card-role">{member.role}</span>}
      </div>
    </div>
  );
}

/* ─── Team Edit Modal ─── */
interface TeamEditModalProps {
  members: TeamMember[];
  onClose: () => void;
}

function TeamEditModal({ members, onClose }: TeamEditModalProps) {
  const sorted = [...members].sort((a, b) => {
    if (a.isLeadership !== b.isLeadership) return a.isLeadership ? -1 : 1;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  const blank: Omit<TeamMember, "id"> = {
    name: "",
    role: "",
    department: "",
    isLeadership: false,
    imageUrl: "",
    order: members.length,
  };

  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setForm(blank);
    setEditing(null);
    setAdding(true);
  };

  const openEdit = (m: TeamMember) => {
    setForm({
      name: m.name,
      role: m.role,
      department: m.department,
      isLeadership: m.isLeadership,
      imageUrl: m.imageUrl ?? "",
      order: m.order,
    });
    setEditing(m);
    setAdding(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setBusy(true);
    const trimmedUrl = form.imageUrl?.trim() || "";
    const data: Record<string, unknown> = {
      ...form,
      name: form.name.trim(),
      role: form.role.trim(),
      department: form.department.trim(),
    };
    if (trimmedUrl) {
      data.imageUrl = trimmedUrl;
    } else {
      delete data.imageUrl;
    }
    if (editing) {
      await teamService.updateItem(editing.id, data);
    } else {
      await teamService.addItem(data as Omit<TeamMember, "id">);
    }
    setBusy(false);
    setAdding(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await teamService.deleteItem(id);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setForm((prev) => ({ ...prev, imageUrl: dataUrl }));
    } catch {
      alert("Failed to process image.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const set = (field: string, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="team-modal-overlay" onClick={onClose}>
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="team-modal-header">
          <h2>Manage Team Members</h2>
          <button className="team-modal-close" onClick={onClose}>
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="team-modal-warning">
          <Warning size={14} weight="bold" />
          Changes here are visible to all visitors immediately.
        </div>

        {adding ? (
          <div className="team-modal-form">
            <h3>{editing ? "Edit Member" : "Add Member"}</h3>
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label>
              Role / Title
              <input
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                placeholder="e.g. President, VP Finance"
              />
            </label>
            <label>
              Department
              <input
                value={form.department}
                onChange={(e) => set("department", e.target.value)}
                placeholder="e.g. Operations, Marketing"
              />
            </label>
            <label>Photo</label>
            <div
              className={`team-modal-dropzone${dragging ? " team-modal-dropzone--active" : ""}${form.imageUrl ? " team-modal-dropzone--has-image" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !form.imageUrl && fileRef.current?.click()}
            >
              {form.imageUrl ? (
                <div className="team-modal-preview">
                  <img src={form.imageUrl} alt="preview" />
                  <button
                    type="button"
                    className="team-modal-preview-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                    title="Remove image"
                  >
                    <X size={12} weight="bold" />
                  </button>
                </div>
              ) : (
                <div className="team-modal-dropzone-content">
                  <UploadSimple size={24} weight="bold" />
                  <span>
                    {uploading
                      ? "Processing…"
                      : "Drag & drop an image here, or click to browse"}
                  </span>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                hidden
              />
            </div>
            <label className="team-modal-checkbox">
              <input
                type="checkbox"
                checked={form.isLeadership}
                onChange={(e) => set("isLeadership", e.target.checked)}
              />
              Leadership
            </label>
            <label>
              Order
              <input
                type="number"
                value={form.order}
                onChange={(e) => set("order", Number(e.target.value))}
              />
            </label>
            <div className="team-modal-form-actions">
              <button
                className="btn"
                onClick={handleSave}
                disabled={busy || !form.name.trim()}
              >
                {busy ? "Saving…" : editing ? "Update" : "Add"}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setAdding(false);
                  setEditing(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <button className="btn team-modal-add" onClick={openAdd}>
              <Plus size={16} weight="bold" /> Add Member
            </button>
            <div className="team-modal-list">
              {sorted.map((m) => (
                <div className="team-modal-row" key={m.id}>
                  {m.imageUrl ? (
                    <img
                      className="team-modal-row-photo"
                      src={m.imageUrl}
                      alt={m.name}
                    />
                  ) : (
                    <div
                      className="team-modal-row-avatar"
                      style={{
                        background: getAvatarColor(m.name),
                        color: "#fff",
                      }}
                    >
                      {getInitials(m.name)}
                    </div>
                  )}
                  <div className="team-modal-row-info">
                    <strong>{m.name}</strong>
                    <span>
                      {m.role}
                      {m.department ? ` · ${m.department}` : ""}
                      {m.isLeadership ? " ★" : ""}
                    </span>
                  </div>
                  <div className="team-modal-row-actions">
                    <button onClick={() => openEdit(m)} title="Edit">
                      <PencilSimple size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      title="Delete"
                      className="team-modal-row-delete"
                    >
                      <Trash size={16} weight="bold" />
                    </button>
                  </div>
                </div>
              ))}
              {sorted.length === 0 && (
                <p className="team-modal-empty">
                  No members in the database yet. Using default data on the
                  page.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function About() {
  useScrollReveal();
  const { isAdmin } = useCms();
  const [dbMembers, setDbMembers] = useState<TeamMember[]>([]);
  const [showTeamModal, setShowTeamModal] = useState(false);

  useEffect(() => {
    const unsub = teamService.onItems(setDbMembers);
    return unsub;
  }, []);

  // Use DB data if available, otherwise fall back to hardcoded defaults
  const leadership: Member[] =
    dbMembers.filter((m) => m.isLeadership).length > 0
      ? dbMembers
          .filter((m) => m.isLeadership)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((m) => ({ name: m.name, role: m.role, imageUrl: m.imageUrl }))
      : defaultLeadership;

  const departments: { name: string; members: Member[] }[] =
    dbMembers.filter((m) => !m.isLeadership).length > 0
      ? Object.entries(
          dbMembers
            .filter((m) => !m.isLeadership)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .reduce(
              (acc, m) => {
                const dept = m.department || "General";
                if (!acc[dept]) acc[dept] = [];
                acc[dept].push({
                  name: m.name,
                  role: m.role || undefined,
                  imageUrl: m.imageUrl,
                });
                return acc;
              },
              {} as Record<string, Member[]>,
            ),
        ).map(([name, members]) => ({ name, members }))
      : defaultDepartments;

  return (
    <div className="about">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80"
        contentKey="about.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="about.hero.title"
          fallback="Meet the Team"
        />
        <EditableText
          as="p"
          contentKey="about.hero.subtitle"
          fallback="Thanks to the support of countless volunteers over the last decade, we have been able to support over a dozen orphans since our inception."
          multiline
        />
      </ParallaxHero>

      {isAdmin && (
        <div className="team-edit-bar reveal">
          <button className="btn" onClick={() => setShowTeamModal(true)}>
            <PencilSimple size={16} weight="bold" /> Manage Team Members
          </button>
        </div>
      )}

      {showTeamModal && (
        <TeamEditModal
          members={dbMembers}
          onClose={() => setShowTeamModal(false)}
        />
      )}

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <EditableText
            as="h2"
            className="section-title section-title--center reveal"
            contentKey="about.leadership.title"
            fallback="Leadership"
          />
          <EditableText
            as="p"
            className="section-subtitle section-subtitle--center reveal"
            contentKey="about.leadership.subtitle"
            fallback="The executive team steering UWOSP's vision and impact."
          />

          <div className="leadership-grid">
            {leadership.map((m, i) => (
              <div className={`reveal stagger-${(i % 6) + 1}`} key={m.name}>
                <MemberCard member={m} large />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <EditableText
            as="h2"
            className="section-title section-title--center reveal"
            contentKey="about.team.title"
            fallback="Our Fall 2025 Team"
          />
          <EditableText
            as="p"
            className="section-subtitle section-subtitle--center reveal"
            contentKey="about.team.subtitle"
            fallback="The dedicated students driving our mission forward across every department."
            multiline
          />

          {departments.map((dept, di) => (
            <div className="department-section reveal" key={di}>
              <h3 className="department-title">{dept.name}</h3>
              <div className="team-grid">
                {dept.members.map((member, mi) => (
                  <div className={`reveal stagger-${(mi % 6) + 1}`} key={mi}>
                    <MemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section section--accent">
        <div className="container" style={{ textAlign: "center" }}>
          <EditableText
            as="h2"
            className="section-title section-title--center reveal"
            contentKey="about.cta.title"
            fallback="Want to Join the Team?"
          />
          <EditableText
            as="p"
            className="section-subtitle section-subtitle--center reveal"
            contentKey="about.cta.subtitle"
            fallback="We're always looking for passionate students to help make a difference."
          />
          <a href="/get-involved" className="btn btn-outline reveal">
            <EnvelopeSimple size={18} weight="bold" /> Get Involved
          </a>
        </div>
      </section>
    </div>
  );
}
