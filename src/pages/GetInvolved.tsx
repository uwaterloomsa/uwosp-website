import { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Tag,
  CaretDown,
  MagnifyingGlass,
  ArrowRight,
  UsersThree,
  CalendarCheck,
  Trophy,
} from "@phosphor-icons/react";
import ApplicationModal from "../components/ApplicationModal";
import { getPostings } from "../services/postings";
import type { Posting } from "../types/postings";
import useScrollReveal from "../hooks/useScrollReveal";
import "./GetInvolved.css";

export default function GetInvolved() {
  useScrollReveal();
  const [postings, setPostings] = useState<Posting[]>([]);
  const [loadingPostings, setLoadingPostings] = useState(true);
  const [activePosting, setActivePosting] = useState<Posting | null>(null);
  const [filterCat, setFilterCat] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setPostings(await getPostings(true));
      } catch (err) {
        console.error("Failed to load postings:", err);
      } finally {
        setLoadingPostings(false);
      }
    })();
  }, []);

  const filteredPostings = postings.filter((p) => {
    const matchesCat = filterCat === "all" || p.category === filterCat;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = ["all", "executive", "lead", "volunteer"];

  return (
    <div className="careers">
      <section className="hero hero--image">
        <img
          className="hero-bg-img"
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&q=80"
          alt=""
          loading="eager"
        />
        <div className="hero-content">
          <h1>Join Our Team</h1>
          <p>
            Help us support orphans worldwide. We're looking for passionate UW
            students to lead campaigns, organize events, and drive real change.
          </p>
          <a href="#open-roles" className="btn btn-primary careers-hero-cta">
            View Open Roles <ArrowRight size={18} weight="bold" />
          </a>
        </div>
      </section>

      {/* Why Join */}
      <section className="section careers-why">
        <div className="container">
          <div className="careers-why-inner reveal">
            <h2>Why UWOSP?</h2>
            <p className="careers-why-lead">
              We're a student-run club at the University of Waterloo dedicated
              to orphan sponsorship. Joining our team means hands-on experience
              in event planning, fundraising, marketing, and leadership — all
              while making a tangible difference.
            </p>
            <div className="careers-perks">
              <div className="careers-perk">
                <UsersThree size={24} weight="duotone" />
                <div>
                  <strong>Tight-knit community</strong>
                  <span>Work alongside driven, like-minded students</span>
                </div>
              </div>
              <div className="careers-perk">
                <CalendarCheck size={24} weight="duotone" />
                <div>
                  <strong>Flexible commitment</strong>
                  <span>We work around your class schedule</span>
                </div>
              </div>
              <div className="careers-perk">
                <Trophy size={24} weight="duotone" />
                <div>
                  <strong>Real experience</strong>
                  <span>Lead projects that go on your resume</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section
        className="section careers-roles"
        id="open-roles"
        style={{ background: "var(--bg-alt)" }}
      >
        <div className="container">
          <h2 className="section-title reveal">
            Open Roles{" "}
            {!loadingPostings && (
              <span className="careers-count">{postings.length}</span>
            )}
          </h2>

          {/* Search + Filters */}
          <div className="careers-toolbar reveal">
            <div className="careers-search">
              <MagnifyingGlass size={18} weight="bold" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="careers-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${filterCat === cat ? "active" : ""}`}
                  onClick={() => setFilterCat(cat)}
                >
                  {cat === "all"
                    ? "All"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Role List */}
          {loadingPostings ? (
            <div className="careers-loading">
              <p>Loading positions...</p>
            </div>
          ) : filteredPostings.length === 0 ? (
            <div className="careers-empty reveal">
              <Briefcase size={40} weight="duotone" />
              <h3>No open roles right now</h3>
              <p>Check back soon — we post new positions each term.</p>
            </div>
          ) : (
            <div className="careers-list">
              {filteredPostings.map((posting) => {
                const isOpen = expandedId === posting.id;
                return (
                  <div
                    className={`careers-row ${isOpen ? "expanded" : ""}`}
                    key={posting.id}
                  >
                    <button
                      className="careers-row-header"
                      onClick={() => setExpandedId(isOpen ? null : posting.id)}
                    >
                      <div className="careers-row-left">
                        <h3 className="careers-row-title">{posting.title}</h3>
                        <div className="careers-row-meta">
                          <span
                            className={`posting-category posting-category--${posting.category}`}
                          >
                            <Tag size={11} weight="bold" /> {posting.category}
                          </span>
                          <span className="careers-row-detail">
                            <MapPin size={13} weight="bold" /> Waterloo, ON
                          </span>
                          <span className="careers-row-detail">
                            <Clock size={13} weight="bold" />{" "}
                            {new Date(posting.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <CaretDown
                        size={20}
                        weight="bold"
                        className={`careers-row-chevron ${isOpen ? "open" : ""}`}
                      />
                    </button>

                    <div
                      className="careers-row-body"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="careers-row-body-inner">
                        <p className="careers-row-desc">
                          {posting.description}
                        </p>

                        <div className="careers-row-columns">
                          {posting.responsibilities.length > 0 && (
                            <div className="careers-detail-block">
                              <h4>Responsibilities</h4>
                              <ul>
                                {posting.responsibilities.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {posting.requirements.length > 0 && (
                            <div className="careers-detail-block">
                              <h4>Requirements</h4>
                              <ul>
                                {posting.requirements.map((r, i) => (
                                  <li key={i}>{r}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <button
                          className="btn btn-primary careers-apply-btn"
                          onClick={() => setActivePosting(posting)}
                        >
                          Apply Now <ArrowRight size={16} weight="bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">How It Works</h2>
          <div className="careers-process reveal">
            <div className="careers-step">
              <span className="careers-step-num">1</span>
              <strong>Browse</strong>
              <p>Find a role that fits your skills and interests</p>
            </div>
            <div className="careers-step-divider" />
            <div className="careers-step">
              <span className="careers-step-num">2</span>
              <strong>Apply</strong>
              <p>Submit a quick application — no cover letter needed</p>
            </div>
            <div className="careers-step-divider" />
            <div className="careers-step">
              <span className="careers-step-num">3</span>
              <strong>Join</strong>
              <p>Meet the team and start making an impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {activePosting && (
        <ApplicationModal
          posting={activePosting}
          onClose={() => setActivePosting(null)}
        />
      )}
    </div>
  );
}
