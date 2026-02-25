import { useState, useEffect } from "react";
import {
  HandWaving,
  CurrencyDollar,
  SpeakerHigh,
  Briefcase,
  MapPin,
  Clock,
  Tag,
} from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import ApplicationModal from "../components/ApplicationModal";
import { getPostings } from "../services/postings";
import type { Posting } from "../types/postings";
import "./GetInvolved.css";

const faqs = [
  {
    q: "How much does it cost to sponsor an orphan?",
    a: "Sponsorship costs vary by region but typically range from $40–$60/month through our charity partners.",
  },
  {
    q: "Where does my money go?",
    a: "All funds go through registered charities (Islamic Relief, HCI, IDRF, Human Appeal) and are used for food, healthcare, education, and shelter.",
  },
  {
    q: "Can I choose which child to sponsor?",
    a: "Yes! Through our partner charities, you can select a specific child or region to support.",
  },
];

export default function GetInvolved() {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [loadingPostings, setLoadingPostings] = useState(true);
  const [activePosting, setActivePosting] = useState<Posting | null>(null);
  const [filterCat, setFilterCat] = useState<string>("all");

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

  const filteredPostings =
    filterCat === "all"
      ? postings
      : postings.filter((p) => p.category === filterCat);

  return (
    <div className="get-involved">
      <section className="hero">
        <AnimatedBackground variant="hero" />
        <div className="hero-content">
          <h1>Get Involved</h1>
          <p>
            Join our mission and make a real difference in the lives of orphans
            worldwide.
          </p>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Ways to Help</h2>
          <p className="section-subtitle">
            Every action, big or small, creates lasting change.
          </p>
          <div className="ways-grid">
            <div className="card ways-card">
              <span className="ways-icon">
                <HandWaving size={40} weight="duotone" />
              </span>
              <h3>Volunteer</h3>
              <p>
                Join our executive team or help organize events on campus. We
                welcome all UW students!
              </p>
            </div>
            <div className="card ways-card">
              <span className="ways-icon">
                <CurrencyDollar size={40} weight="duotone" />
              </span>
              <h3>Donate</h3>
              <p>
                Make a one-time or recurring donation to help sponsor orphans
                through our verified charity partners.
              </p>
            </div>
            <div className="card ways-card">
              <span className="ways-icon">
                <SpeakerHigh size={40} weight="duotone" />
              </span>
              <h3>Spread Awareness</h3>
              <p>
                Follow us on social media, share our campaigns, and help others
                learn about our mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions - Job Board */}
      <section
        className="section"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container">
          <h2 className="section-title">Open Positions</h2>
          <p className="section-subtitle">
            Browse available roles and apply to join the UWOSP team.
          </p>

          {/* Category filter */}
          <div className="postings-filters">
            {["all", "executive", "lead", "volunteer"].map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${filterCat === cat ? "active" : ""}`}
                onClick={() => setFilterCat(cat)}
              >
                {cat === "all"
                  ? "All Roles"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {loadingPostings ? (
            <div className="postings-loading">
              <p>Loading positions...</p>
            </div>
          ) : filteredPostings.length === 0 ? (
            <div className="postings-empty card">
              <Briefcase size={48} weight="duotone" />
              <h3>No open positions right now</h3>
              <p>Check back soon — new roles are posted regularly!</p>
            </div>
          ) : (
            <div className="postings-grid">
              {filteredPostings.map((posting) => (
                <div className="posting-card card" key={posting.id}>
                  <div className="posting-card-header">
                    <span
                      className={`posting-category posting-category--${posting.category}`}
                    >
                      <Tag size={12} weight="bold" /> {posting.category}
                    </span>
                    <span className="posting-date">
                      <Clock size={12} weight="bold" />{" "}
                      {new Date(posting.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="posting-title">{posting.title}</h3>
                  <p className="posting-desc">{posting.description}</p>

                  {posting.responsibilities.length > 0 && (
                    <div className="posting-list-section">
                      <h4>Responsibilities</h4>
                      <ul>
                        {posting.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {posting.requirements.length > 0 && (
                    <div className="posting-list-section">
                      <h4>Requirements</h4>
                      <ul>
                        {posting.requirements.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="posting-footer">
                    <span className="posting-location">
                      <MapPin size={14} weight="duotone" /> University of
                      Waterloo
                    </span>
                    <button
                      className="btn btn-primary posting-apply-btn"
                      onClick={() => setActivePosting(posting)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item card" key={i}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
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
