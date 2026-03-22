import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fire, ArrowRight, CurrencyDollar } from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import { onFundraisers } from "../services/site";
import { campaignEventService } from "../services/siteCollections";
import type { Fundraiser } from "../types/site";
import type { CampaignEvent } from "../types/collections";
import "./Campaigns.css";

const defaultFall2025Events = [
  { name: "Auction Night", emoji: "🎪" },
  { name: "UWOSP x UWMSA Rock Climbing Event", emoji: "🧗" },
  { name: "Sheikh & S'mores", emoji: "🔥" },
  { name: "UWOSP x IDRF | Soccer for Palestine", emoji: "⚽" },
  { name: "Paint, Play & Pour for Sudan", emoji: "🎨" },
];

const defaultWinter2025Events = [
  { name: "Exam De-Stressor", emoji: "📚" },
  { name: "EOT Dinner", emoji: "🍽️" },
  { name: "Charity Trivia Night", emoji: "🧠" },
  { name: "Iftar", emoji: "🌙" },
  { name: "Palestine Fundraiser", emoji: "🇵🇸" },
  { name: "Ramadan Palestine Iftar", emoji: "🌙" },
  { name: "Ramadan Market", emoji: "🛍️" },
  { name: "Rock Climbing for Lebanon", emoji: "🧗" },
  { name: "End of Term Dinner + Auction", emoji: "🎪" },
  { name: "Charity Week", emoji: "💙" },
  { name: "Auction Night", emoji: "🎪" },
  { name: "Charity Bazaar (Solidarity Souk)", emoji: "🛍️" },
  { name: "Painting + Crafts for Palestine", emoji: "🎨" },
];

export default function Campaigns() {
  useScrollReveal();
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [dbCampaignEvents, setDbCampaignEvents] = useState<CampaignEvent[]>([]);

  useEffect(() => {
    const unsub = onFundraisers((items) => setFundraisers(items));
    const unsub2 = campaignEventService.onItems(setDbCampaignEvents);
    return () => {
      unsub();
      unsub2();
    };
  }, []);

  const activeFundraisers = fundraisers.filter((f) => f.isActive);
  const pastFundraisers = fundraisers.filter((f) => !f.isActive);

  return (
    <div className="campaigns">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
        contentKey="campaigns.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="campaigns.hero.title"
          fallback="Events &amp; Campaigns"
        />
        <EditableText
          as="p"
          contentKey="campaigns.hero.subtitle"
          fallback="In addition to our weekly booths, we organize public events that combine supporting our monthly fundraisers with fun and engaging activities!"
          multiline
        />
      </ParallaxHero>

      {/* Description */}
      <section className="section">
        <div className="container">
          <div className="mission-text reveal">
            <EditableText
              as="p"
              contentKey="campaigns.description"
              fallback="Our fundraisers go beyond orphan sponsorships — we also raise funds to aid and support countries in need that are suffering from difficulties and crises such as extreme poverty, war, etc."
              multiline
            />
          </div>
        </div>
      </section>

      {/* Active Fundraisers */}
      {activeFundraisers.length > 0 && (
        <section className="section">
          <div className="container">
            {activeFundraisers.map((f) => {
              const pct =
                f.goalAmount > 0
                  ? Math.min(
                      100,
                      Math.round((f.raisedAmount / f.goalAmount) * 100),
                    )
                  : 0;
              return (
                <div className="active-campaign card reveal-scale" key={f.id}>
                  <div className="campaign-badge">
                    <Fire size={18} weight="fill" /> Active Campaign
                  </div>
                  <h2>{f.title}</h2>
                  <p>{f.description}</p>
                  <div className="campaign-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="progress-stats">
                      <span>${f.raisedAmount.toLocaleString()} raised</span>
                      <span>Goal: ${f.goalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to="/donate" className="btn btn-primary">
                    Contribute Now <ArrowRight size={16} weight="bold" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Past Fundraisers */}
      {pastFundraisers.length > 0 && (
        <section className="section" style={{ background: "var(--bg-alt)" }}>
          <div className="container">
            <EditableText
              as="h2"
              className="section-title reveal"
              contentKey="campaigns.past.title"
              fallback="Past Campaigns"
            />
            <EditableText
              as="p"
              className="section-subtitle reveal"
              contentKey="campaigns.past.subtitle"
              fallback="A look back at our previous fundraising efforts."
            />
            <div className="past-campaigns-grid">
              {pastFundraisers.map((f, i) => {
                const pct =
                  f.goalAmount > 0
                    ? Math.min(
                        100,
                        Math.round((f.raisedAmount / f.goalAmount) * 100),
                      )
                    : 0;
                return (
                  <div
                    className={`card past-campaign-card reveal stagger-${(i % 6) + 1}`}
                    key={f.id}
                  >
                    <div className="past-campaign-header">
                      <CurrencyDollar size={20} weight="duotone" />
                      <h3>{f.title}</h3>
                    </div>
                    <p>{f.description}</p>
                    <div className="campaign-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="progress-stats">
                        <span>${f.raisedAmount.toLocaleString()} raised</span>
                        <span>Goal: ${f.goalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Campaign Events by Term */}
      {(() => {
        // Group DB events by term, or fall back to hardcoded defaults
        const terms: {
          term: string;
          events: { name: string; emoji: string }[];
        }[] = [];
        if (dbCampaignEvents.length > 0) {
          const grouped: Record<
            string,
            { name: string; emoji: string; order: number }[]
          > = {};
          for (const e of dbCampaignEvents) {
            if (!grouped[e.term]) grouped[e.term] = [];
            grouped[e.term].push({
              name: e.name,
              emoji: e.emoji,
              order: e.order ?? 0,
            });
          }
          for (const [term, evts] of Object.entries(grouped).sort()) {
            terms.push({
              term,
              events: evts.sort((a, b) => a.order - b.order),
            });
          }
        } else {
          terms.push({ term: "Fall 2025", events: defaultFall2025Events });
          terms.push({ term: "Winter 2025", events: defaultWinter2025Events });
        }
        return terms.map((t) => (
          <section className="section" key={t.term}>
            <div className="container">
              <h2 className="section-title reveal">{t.term}</h2>
              <div className="events-list">
                {t.events.map((event, i) => (
                  <div
                    className={`card event-card reveal stagger-${(i % 6) + 1}`}
                    key={i}
                  >
                    <span className="event-emoji">{event.emoji}</span>
                    <h3>{event.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ));
      })()}
    </div>
  );
}
