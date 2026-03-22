import { useEffect, useState, useRef, useMemo } from "react";
import {
  PencilSimple,
  Plus,
  Trash,
  X,
  Warning,
  UploadSimple,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import { useCms } from "../components/CmsProvider";
import { fileToDataUrl } from "../services/imageUpload";
import {
  orphanService,
  pastSponsorshipService,
} from "../services/siteCollections";
import type { OrphanProfile, PastSponsorship } from "../types/collections";
import "./Orphans.css";

const COUNTRY_FLAGS: Record<string, string> = {
  Kosovo: "🇽🇰",
  Mali: "🇲🇱",
  Palestine: "🇵🇸",
};

const AVATAR_COLORS = [
  "oklch(0.55 0.18 264)",
  "oklch(0.55 0.15 200)",
  "oklch(0.55 0.15 150)",
  "oklch(0.55 0.18 330)",
  "oklch(0.50 0.15 30)",
  "oklch(0.50 0.12 280)",
];

function getInitial(name: string) {
  return name.trim()[0].toUpperCase();
}

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const defaultOrphans: {
  name: string;
  country: string;
  description: string;
  years: string;
  imageUrl?: string;
}[] = [
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
    description: "Ali lives in Palestine and is currently 5 years old.",
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
    description: "Malek lives in Palestine and is currently three years old.",
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
    description: "Sela lives in Palestine and is currently three years old.",
    years: "2025-2026",
  },
];

const defaultPastSponsorships = [
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

/* ─── Orphan Edit Modal ─── */
interface OrphanEditModalProps {
  items: OrphanProfile[];
  onClose: () => void;
}

function OrphanEditModal({ items, onClose }: OrphanEditModalProps) {
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const blank: Omit<OrphanProfile, "id"> = {
    name: "",
    country: "",
    description: "",
    years: "",
    imageUrl: "",
    order: items.length,
  };

  const [editing, setEditing] = useState<OrphanProfile | null>(null);
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

  const openEdit = (o: OrphanProfile) => {
    setForm({
      name: o.name,
      country: o.country,
      description: o.description,
      years: o.years,
      imageUrl: o.imageUrl ?? "",
      order: o.order ?? 0,
    });
    setEditing(o);
    setAdding(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setBusy(true);
    const trimmedUrl = form.imageUrl?.trim() || "";
    const data: Record<string, unknown> = {
      ...form,
      name: form.name.trim(),
      country: form.country.trim(),
      description: form.description.trim(),
      years: form.years.trim(),
    };
    if (trimmedUrl) {
      data.imageUrl = trimmedUrl;
    } else {
      delete data.imageUrl;
    }
    if (editing) {
      await orphanService.updateItem(
        editing.id,
        data as Partial<OrphanProfile>,
      );
    } else {
      await orphanService.addItem(data as Omit<OrphanProfile, "id">);
    }
    setBusy(false);
    setAdding(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await orphanService.deleteItem(id);
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

  const set = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="team-modal-overlay" onClick={onClose}>
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="team-modal-header">
          <h2>Manage Orphans</h2>
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
            <h3>{editing ? "Edit Orphan" : "Add Orphan"}</h3>
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label>
              Country
              <input
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                placeholder="e.g. Palestine, Kosovo, Mali"
              />
            </label>
            <label>
              Description
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
              />
            </label>
            <label>
              Years (e.g. 2017-2027)
              <input
                value={form.years}
                onChange={(e) => set("years", e.target.value)}
                placeholder="2025-2026"
              />
            </label>
            <label>Photo</label>
            <div
              className={`team-modal-dropzone${dragging ? " team-modal-dropzone--active" : ""}${form.imageUrl ? " team-modal-dropzone--has-image" : ""}`}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f) processFile(f);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
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
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) processFile(f);
                }}
                hidden
              />
            </div>
            <label>
              Order
              <input
                type="number"
                value={form.order ?? 0}
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
              <Plus size={16} weight="bold" /> Add Orphan
            </button>
            <div className="team-modal-list">
              {sorted.map((o) => (
                <div className="team-modal-row" key={o.id}>
                  {o.imageUrl ? (
                    <img
                      className="team-modal-row-photo"
                      src={o.imageUrl}
                      alt={o.name}
                    />
                  ) : (
                    <div
                      className="team-modal-row-avatar"
                      style={{ background: getColor(o.name), color: "#fff" }}
                    >
                      {getInitial(o.name)}
                    </div>
                  )}
                  <div className="team-modal-row-info">
                    <strong>{o.name}</strong>
                    <span>
                      {COUNTRY_FLAGS[o.country] || ""} {o.country} · {o.years}
                    </span>
                  </div>
                  <div className="team-modal-row-actions">
                    <button onClick={() => openEdit(o)} title="Edit">
                      <PencilSimple size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleDelete(o.id)}
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
                  No orphans in the database yet. Using default data on the
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

/* ─── Past Sponsorship Edit Modal ─── */
interface PastEditModalProps {
  items: PastSponsorship[];
  onClose: () => void;
}

function PastSponsorshipEditModal({ items, onClose }: PastEditModalProps) {
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const [editing, setEditing] = useState<PastSponsorship | null>(null);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [order, setOrder] = useState(items.length);
  const [busy, setBusy] = useState(false);

  const openAdd = () => {
    setName("");
    setOrder(items.length);
    setEditing(null);
    setAdding(true);
  };

  const openEdit = (p: PastSponsorship) => {
    setName(p.name);
    setOrder(p.order ?? 0);
    setEditing(p);
    setAdding(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setBusy(true);
    const data = { name: name.trim(), order };
    if (editing) {
      await pastSponsorshipService.updateItem(editing.id, data);
    } else {
      await pastSponsorshipService.addItem(data);
    }
    setBusy(false);
    setAdding(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await pastSponsorshipService.deleteItem(id);
  };

  return (
    <div className="team-modal-overlay" onClick={onClose}>
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="team-modal-header">
          <h2>Manage Past Sponsorships</h2>
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
            <h3>{editing ? "Edit Name" : "Add Name"}</h3>
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Order
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </label>
            <div className="team-modal-form-actions">
              <button
                className="btn"
                onClick={handleSave}
                disabled={busy || !name.trim()}
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
              <Plus size={16} weight="bold" /> Add Name
            </button>
            <div className="team-modal-list">
              {sorted.map((p) => (
                <div className="team-modal-row" key={p.id}>
                  <div className="team-modal-row-info">
                    <strong>{p.name}</strong>
                  </div>
                  <div className="team-modal-row-actions">
                    <button onClick={() => openEdit(p)} title="Edit">
                      <PencilSimple size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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
                  No entries in the database yet. Using default data on the
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

export default function Orphans() {
  useScrollReveal();
  const { isAdmin } = useCms();
  const [dbOrphans, setDbOrphans] = useState<OrphanProfile[]>([]);
  const [dbPast, setDbPast] = useState<PastSponsorship[]>([]);
  const [showOrphanModal, setShowOrphanModal] = useState(false);
  const [showPastModal, setShowPastModal] = useState(false);

  useEffect(() => {
    const unsub1 = orphanService.onItems(setDbOrphans);
    const unsub2 = pastSponsorshipService.onItems(setDbPast);
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const ORPHANS_PER_PAGE = 6;
  const [orphanPage, setOrphanPage] = useState(1);

  const orphans =
    dbOrphans.length > 0
      ? dbOrphans
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((o) => ({
            name: o.name,
            country: o.country,
            description: o.description,
            years: o.years,
            imageUrl: o.imageUrl,
          }))
      : defaultOrphans;

  const orphanTotalPages = Math.ceil(orphans.length / ORPHANS_PER_PAGE);
  const pagedOrphans = useMemo(
    () =>
      orphans.slice(
        (orphanPage - 1) * ORPHANS_PER_PAGE,
        orphanPage * ORPHANS_PER_PAGE,
      ),
    [orphans, orphanPage],
  );

  const pastSponsorships =
    dbPast.length > 0 ? dbPast.map((p) => p.name) : defaultPastSponsorships;

  return (
    <div className="orphans">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1400&q=80"
        contentKey="orphans.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="orphans.hero.title"
          fallback="Our Orphans"
        />
        <EditableText
          as="p"
          contentKey="orphans.hero.subtitle"
          fallback="Get to know more about the orphans we're currently sponsoring. 🧸"
        />
      </ParallaxHero>

      {/* Orphan Profiles */}
      <section className="section orphan-profiles-section">
        <div className="container">
          {isAdmin && (
            <button
              className="btn orphan-manage-btn"
              onClick={() => setShowOrphanModal(true)}
            >
              <PencilSimple size={16} weight="bold" /> Manage Orphans
            </button>
          )}
          <div className="orphan-grid">
            {pagedOrphans.map((child, i) => (
              <div
                className={`card orphan-card reveal stagger-${(i % 6) + 1}`}
                key={`${orphanPage}-${i}`}
              >
                {child.imageUrl ? (
                  <img
                    className="orphan-avatar-img"
                    src={child.imageUrl}
                    alt={child.name}
                  />
                ) : (
                  <span
                    className="orphan-avatar"
                    style={{ background: getColor(child.name) }}
                  >
                    {getInitial(child.name)}
                  </span>
                )}
                <h4>{child.name}</h4>
                <p className="orphan-detail">
                  {COUNTRY_FLAGS[child.country] || ""} {child.country}
                </p>
                <p className="orphan-bio">{child.description}</p>
                <span className="orphan-status sponsored">
                  Sponsored {child.years}
                </span>
              </div>
            ))}
          </div>

          {orphanTotalPages > 1 && (
            <div className="orphan-pagination">
              <button
                className="orphan-page-btn"
                disabled={orphanPage <= 1}
                onClick={() => setOrphanPage((p) => p - 1)}
                aria-label="Previous page"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              {Array.from({ length: orphanTotalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    className={`orphan-page-btn${num === orphanPage ? " active" : ""}`}
                    onClick={() => setOrphanPage(num)}
                  >
                    {num}
                  </button>
                ),
              )}
              <button
                className="orphan-page-btn"
                disabled={orphanPage >= orphanTotalPages}
                onClick={() => setOrphanPage((p) => p + 1)}
                aria-label="Next page"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Past Sponsorships */}
      <section className="section">
        <div className="container">
          <EditableText
            as="h2"
            className="section-title reveal"
            contentKey="orphans.past.title"
            fallback="Past Sponsorships"
          />
          {isAdmin && (
            <button
              className="btn orphan-manage-btn"
              onClick={() => setShowPastModal(true)}
            >
              <PencilSimple size={16} weight="bold" /> Manage Past Sponsorships
            </button>
          )}
          <div className="past-sponsorships reveal">
            <ul className="past-list">
              {pastSponsorships.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {showOrphanModal && (
        <OrphanEditModal
          items={dbOrphans}
          onClose={() => setShowOrphanModal(false)}
        />
      )}
      {showPastModal && (
        <PastSponsorshipEditModal
          items={dbPast}
          onClose={() => setShowPastModal(false)}
        />
      )}
    </div>
  );
}
