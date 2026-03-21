import { Link } from "react-router-dom";
import { Fire } from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Campaigns.css";

const fall2025Events = [
  { name: "Auction Night", emoji: "🎪" },
  { name: "UWOSP x UWMSA Rock Climbing Event", emoji: "🧗" },
  { name: "Sheikh & S'mores", emoji: "🔥" },
  { name: "UWOSP x IDRF | Soccer for Palestine", emoji: "⚽" },
  { name: "Paint, Play & Pour for Sudan", emoji: "🎨" },
];

const winter2025Events = [
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

  return (
    <div className="campaigns">
      <section className="hero hero--image">
        <img
          className="hero-bg-img"
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
          alt=""
          loading="eager"
        />
        <div className="hero-content">
          <h1>Events &amp; Campaigns</h1>
          <p>
            Fun, engaging events that bring our community together to support
            orphans and those in need around the world.
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="section">
        <div className="container">
          <div className="mission-text reveal">
            <p>
              Our fundraisers go beyond orphan sponsorships — we also raise
              funds to aid and support countries in need that are suffering from
              difficulties and crises such as extreme poverty, war, etc.
            </p>
          </div>
        </div>
      </section>

      {/* Current Campaign */}
      <section className="section">
        <div className="container">
          <div className="active-campaign card reveal-scale">
            <div className="campaign-badge">
              <Fire size={18} weight="fill" /> Current Campaign
            </div>
            <h2>UWOSP x IDRF | Sudan Emergency Relief</h2>
            <p>
              We are currently raising funds in collaboration with IDRF for
              emergency relief in Sudan.
            </p>
            <Link to="/donate" className="btn btn-primary">
              Contribute Now
            </Link>
          </div>
        </div>
      </section>

      {/* Fall 2025 Events */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Fall 2025</h2>
          <div className="events-list">
            {fall2025Events.map((event, i) => (
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

      {/* Winter 2025 Events */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Winter 2025</h2>
          <div className="events-list">
            {winter2025Events.map((event, i) => (
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
    </div>
  );
}
