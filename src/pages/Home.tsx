import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Fire,
  HeartStraight,
  Handshake,
  ArrowRight,
  Newspaper,
  ChartBar,
  CurrencyDollar,
  Megaphone,
  CalendarBlank,
  Clock,
  MapPin,
  Confetti,
  Lightbulb,
  ForkKnife,
  PencilSimple,
  Plus,
  Trash,
  X,
  Warning,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import EditableImage from "../components/EditableImage";
import { useCms } from "../components/CmsProvider";
import {
  onActiveFundraiser,
  onSponsors,
  onAllEvents,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from "../services/site";
import type { Fundraiser, Sponsor, SiteEvent } from "../types/site";
import type { ReactNode } from "react";
import "./Home.css";

function AnimatedCounter({
  target,
  prefix,
  label,
}: {
  target: number;
  prefix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const val = Math.floor(progress * target).toLocaleString();
      el.textContent = (prefix || "") + val + "+";
      if (progress < 1) requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix]);

  return (
    <div className="stat-item">
      <span className="stat-number" ref={ref}>
        0
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ─── Sponsor / Partner Edit Modal ─── */
interface SponsorEditModalProps {
  items: Sponsor[];
  onClose: () => void;
}

function SponsorEditModal({ items, onClose }: SponsorEditModalProps) {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));

  const blank = { name: "", website: "", tier: "bronze" as Sponsor["tier"] };

  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);

  const openAdd = () => {
    setForm(blank);
    setEditing(null);
    setAdding(true);
  };

  const openEdit = (s: Sponsor) => {
    setForm({ name: s.name, website: s.website, tier: s.tier });
    setEditing(s);
    setAdding(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setBusy(true);
    if (editing) {
      await updateSponsor(editing.id, {
        name: form.name.trim(),
        website: form.website.trim(),
        tier: form.tier,
      });
    } else {
      await createSponsor({
        name: form.name.trim(),
        website: form.website.trim(),
        tier: form.tier,
      });
    }
    setBusy(false);
    setAdding(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await deleteSponsor(id);
  };

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="team-modal-overlay" onClick={onClose}>
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="team-modal-header">
          <h2>Manage Partners</h2>
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
            <h3>{editing ? "Edit Partner" : "Add Partner"}</h3>
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label>
              Website URL
              <input
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://example.org"
              />
            </label>
            <label>
              Tier
              <select
                value={form.tier}
                onChange={(e) => set("tier", e.target.value)}
              >
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="bronze">Bronze</option>
              </select>
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
              <Plus size={16} weight="bold" /> Add Partner
            </button>
            <div className="team-modal-list">
              {sorted.map((s) => (
                <div className="team-modal-row" key={s.id}>
                  <div className="team-modal-row-info">
                    <strong>{s.name}</strong>
                    <span>
                      {s.tier} · {s.website || "no website"}
                    </span>
                  </div>
                  <div className="team-modal-row-actions">
                    <button onClick={() => openEdit(s)} title="Edit">
                      <PencilSimple size={16} weight="bold" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
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
                  No partners in the database yet. Using default data on the
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

export default function Home() {
  useScrollReveal();
  const { isAdmin } = useCms();
  const [fundraiser, setFundraiser] = useState<Fundraiser | null>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [showSponsorModal, setShowSponsorModal] = useState(false);

  useEffect(() => {
    const unsubFund = onActiveFundraiser(setFundraiser);
    const unsubSponsors = onSponsors((all) => setSponsors(all));
    const unsubEvents = onAllEvents((all) => setEvents(all.slice(0, 3)));
    return () => {
      unsubFund();
      unsubSponsors();
      unsubEvents();
    };
  }, []);

  const pct = fundraiser
    ? Math.min(
        100,
        Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100),
      )
    : 0;

  const fallbackEvents: {
    title: string;
    date: string;
    time: string;
    location: string;
    icon: ReactNode;
  }[] = [
    {
      title: "Annual Charity Gala",
      date: "March 2025",
      time: "6:00 PM",
      location: "Federation Hall",
      icon: <Confetti size={20} weight="duotone" />,
    },
    {
      title: "Orphan Awareness Week",
      date: "April 2025",
      time: "All Week",
      location: "SLC, UWaterloo",
      icon: <Lightbulb size={20} weight="duotone" />,
    },
    {
      title: "Community Iftar",
      date: "Ramadan 2025",
      time: "Sunset",
      location: "PAC, UWaterloo",
      icon: <ForkKnife size={20} weight="duotone" />,
    },
  ];

  const displayEvents =
    events.length > 0
      ? events.map((e) => ({
          title: e.title,
          date: e.date,
          time: e.time,
          location: e.location,
          icon: <CalendarBlank size={20} weight="duotone" />,
        }))
      : fallbackEvents;

  return (
    <div className="home">
      {/* Hero */}
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80"
        className="home-hero"
        contentKey="home.hero.image"
      >
        <EditableText
          as="span"
          className="hero-badge"
          contentKey="home.hero.badge"
          fallback="University of Waterloo"
        />
        <h1>
          <EditableText
            as="span"
            contentKey="home.hero.title1"
            fallback="Orphan Sponsorship"
          />
          <br />
          <EditableText
            as="span"
            className="text-accent"
            contentKey="home.hero.title2"
            fallback="Program"
          />
        </h1>
        <EditableText
          as="p"
          contentKey="home.hero.description"
          fallback="At the University of Waterloo, the Orphan Sponsorship Program aims to provide for the needs and well-being of orphans around the world through financial support."
          multiline
        />
        <div className="hero-buttons">
          <Link to="/campaigns" className="btn btn-primary">
            Learn More
          </Link>
          <Link to="/donate" className="btn btn-outline">
            Donate
          </Link>
        </div>
      </ParallaxHero>

      {/* Live Fundraiser — featured immediately after hero */}
      <section className="section fundraiser-section">
        <div className="container">
          {fundraiser ? (
            <div className="fundraiser-featured reveal-scale">
              <div className="fundraiser-featured-content">
                <div className="campaign-badge">
                  <Fire size={18} weight="fill" /> Active Fundraiser
                </div>
                <h2>{fundraiser.title}</h2>
                <p>{fundraiser.description}</p>
                <div className="campaign-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="progress-stats">
                    <span>
                      ${fundraiser.raisedAmount.toLocaleString()} raised
                    </span>
                    <span>Goal: ${fundraiser.goalAmount.toLocaleString()}</span>
                  </div>
                </div>
                <Link to="/donate" className="btn btn-primary">
                  Contribute Now <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
              <div className="fundraiser-featured-visual">
                {fundraiser.imageUrl ? (
                  <img
                    src={fundraiser.imageUrl}
                    alt={fundraiser.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                ) : (
                  <div className="fundraiser-amount-display">
                    <span className="fundraiser-amount">
                      ${fundraiser.raisedAmount.toLocaleString()}
                    </span>
                    <span className="fundraiser-amount-label">
                      raised so far
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="fundraiser-featured reveal-scale">
              <div className="fundraiser-featured-content">
                <div className="campaign-badge">
                  <Fire size={18} weight="fill" /> Current Campaign
                </div>
                <EditableText
                  as="h2"
                  contentKey="home.fallback.title"
                  fallback="UWOSP x NZF | Ramadan Fundraiser"
                />
                <EditableText
                  as="p"
                  contentKey="home.fallback.description"
                  fallback="Gaza families arriving in Canada may have found safety, but their struggles are far from over. They carry the weight of loss — homes destroyed, loved ones gone, and families still in danger. Together, we can ease their burden."
                  multiline
                />
                <a
                  href="https://uow-ansaar.raiselysite.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Learn More <ArrowRight size={16} weight="bold" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <AnimatedCounter target={22} label="Orphans Sponsored" />
            <AnimatedCounter target={50000} prefix="$" label="Raised in 2024" />
            <AnimatedCounter target={5} label="Countries Impacted" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="split reveal">
            <div className="split-image image-hover-zoom">
              <EditableImage
                contentKey="home.mission.image"
                fallback="https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=800&q=80"
                alt="Children smiling and playing together"
              />
            </div>
            <div>
              <EditableText
                as="h2"
                className="section-title"
                contentKey="home.mission.title"
                fallback="Our Mission"
              />
              <div
                className="mission-text"
                style={{ maxWidth: "none", textAlign: "left", margin: 0 }}
              >
                <EditableText
                  as="p"
                  contentKey="home.mission.p1"
                  fallback="At the University of Waterloo, the Orphan Sponsorship Program aims to provide for the needs and well-being of orphans around the world through financial support. We believe that our support can help provide them with the security and tools to thrive."
                  multiline
                />
                <EditableText
                  as="p"
                  contentKey="home.mission.p2"
                  fallback="Through registered charities such as Human Concern International and Islamic Relief, we aim to sponsor children that have been orphaned as a result of war, extreme poverty, or disease."
                  multiline
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended mission */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <div className="split split--reverse reveal">
            <div>
              <EditableText
                as="h2"
                className="section-title"
                contentKey="home.beyond.title"
                fallback="Beyond Sponsorship"
              />
              <div
                className="mission-text"
                style={{ maxWidth: "none", textAlign: "left", margin: 0 }}
              >
                <EditableText
                  as="p"
                  contentKey="home.beyond.p1"
                  fallback="We not only sponsor and support orphans globally, but we also collaborate with registered charities to assist countries abroad dealing with extreme poverty, natural disasters, conflict, and other crises."
                  multiline
                />
                <EditableText
                  as="p"
                  contentKey="home.beyond.p2"
                  fallback="We strive to empower orphaned youth to break out of the cycle of poverty, through ensuring their access to nutrition, healthcare, and quality education."
                  multiline
                />
              </div>
            </div>
            <div className="split-image image-hover-zoom">
              <EditableImage
                contentKey="home.beyond.image"
                fallback="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80"
                alt="Child writing at a school desk"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header-row reveal">
            <div>
              <EditableText
                as="h2"
                className="section-title"
                contentKey="home.events.title"
                fallback="Upcoming Events"
              />
              <EditableText
                as="p"
                className="section-subtitle"
                contentKey="home.events.subtitle"
                fallback="Join us at our next event and be part of the change."
              />
            </div>
            <Link to="/events" className="btn btn-outline">
              View All Events <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
          <div className="events-preview-grid">
            {displayEvents.map((e, i) => (
              <div
                className={`card event-preview-card reveal stagger-${i + 1}`}
                key={i}
              >
                <div className="event-preview-icon">{e.icon}</div>
                <div className="event-preview-body">
                  <h3>{e.title}</h3>
                  <div className="event-preview-meta">
                    <span>
                      <Clock size={13} weight="bold" /> {e.time}
                    </span>
                    <span>
                      <MapPin size={13} weight="bold" /> {e.location}
                    </span>
                  </div>
                </div>
                <span className="event-preview-date">{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <EditableText
            as="h2"
            className="section-title section-title--center reveal"
            contentKey="home.newsletter.title"
            fallback="Monthly Newsletter"
          />
          <EditableText
            as="p"
            className="section-subtitle section-subtitle--center reveal"
            contentKey="home.newsletter.subtitle"
            fallback="Stay up to date with our latest initiatives and impact stories."
          />
          <a
            href="https://cdn.shopify.com/s/files/1/0251/8210/9742/files/February_2025_OSP_Monthly_Newsletter.pdf?v=1742059567"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary reveal"
          >
            <Newspaper size={18} weight="bold" /> Read Newsletter
          </a>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="section">
        <div className="container">
          <div className="help-grid">
            <div className="card help-card reveal stagger-1">
              <span className="icon-block">
                <HeartStraight size={28} weight="duotone" />
              </span>
              <EditableText
                as="h3"
                contentKey="home.links.orphans.title"
                fallback="Our Orphans"
              />
              <EditableText
                as="p"
                contentKey="home.links.orphans.desc"
                fallback="Learn more about the orphans we're currently sponsoring."
              />
              <Link to="/orphans" className="btn btn-outline">
                Learn More <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="card help-card reveal stagger-2">
              <span className="icon-block">
                <Handshake size={28} weight="duotone" />
              </span>
              <EditableText
                as="h3"
                contentKey="home.links.campaigns.title"
                fallback="Other Projects"
              />
              <EditableText
                as="p"
                contentKey="home.links.campaigns.desc"
                fallback="Learn about other campaigns we've run."
              />
              <Link to="/campaigns" className="btn btn-outline">
                View Projects <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="card help-card reveal stagger-3">
              <span className="icon-block">
                <ChartBar size={28} weight="duotone" />
              </span>
              <EditableText
                as="h3"
                contentKey="home.links.finances.title"
                fallback="Financial Reports"
              />
              <EditableText
                as="p"
                contentKey="home.links.finances.desc"
                fallback="View all our triannual financial reports."
              />
              <Link to="/finances" className="btn btn-outline">
                View Reports <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Donate & Get Involved */}
      <section className="section">
        <div className="container">
          <div className="help-grid">
            <div className="card help-card reveal stagger-1">
              <span className="icon-block">
                <CurrencyDollar size={28} weight="duotone" />
              </span>
              <EditableText
                as="h3"
                contentKey="home.links.donate.title"
                fallback="Donate to Us"
              />
              <EditableText
                as="p"
                contentKey="home.links.donate.desc"
                fallback="Donate to support our club events and booth, helping us raise funds and attract more people to our fundraisers."
                multiline
              />
              <a
                href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Donate
              </a>
            </div>
            <div className="card help-card reveal stagger-2">
              <span className="icon-block">
                <Megaphone size={28} weight="duotone" />
              </span>
              <EditableText
                as="h3"
                contentKey="home.links.involved.title"
                fallback="Get Involved"
              />
              <EditableText
                as="p"
                contentKey="home.links.involved.desc"
                fallback="Interested in helping out? Let us know!"
              />
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section partners-section">
        <div className="container">
          <EditableText
            as="h2"
            className="section-title reveal"
            contentKey="home.partners.title"
            fallback="Our Partners"
          />
          <EditableText
            as="p"
            className="section-subtitle reveal"
            contentKey="home.partners.subtitle"
            fallback="We work with registered charities to maximize our impact."
          />
          {isAdmin && (
            <button
              className="btn orphan-manage-btn"
              onClick={() => setShowSponsorModal(true)}
            >
              <PencilSimple size={16} weight="bold" /> Manage Partners
            </button>
          )}
          <div className="partners-grid">
            {sponsors.length > 0
              ? sponsors.map((s, i) => (
                  <div
                    className={`partner-card reveal stagger-${(i % 6) + 1}`}
                    key={s.id}
                  >
                    {s.website ? (
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.name}
                      </a>
                    ) : (
                      s.name
                    )}
                  </div>
                ))
              : [
                  "Islamic Relief",
                  "Human Concern International",
                  "IDRF",
                  "National Zakat Foundation",
                ].map((name, i) => (
                  <div
                    className={`partner-card reveal stagger-${i + 1}`}
                    key={name}
                  >
                    {name}
                  </div>
                ))}
          </div>
        </div>
      </section>

      {showSponsorModal && (
        <SponsorEditModal
          items={sponsors}
          onClose={() => setShowSponsorModal(false)}
        />
      )}
    </div>
  );
}
