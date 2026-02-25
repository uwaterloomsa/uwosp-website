import { Link } from "react-router-dom";
import {
  Moon,
  Backpack,
  Cow,
  Snowflake,
  Fire,
  Confetti,
  Lightbulb,
  ForkKnife,
} from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import "./Campaigns.css";
import type { ReactNode } from "react";

const pastCampaigns: {
  title: string;
  raised: string;
  icon: ReactNode;
  desc: string;
}[] = [
  {
    title: "Ramadan Giving 2024",
    raised: "$12,000",
    icon: <Moon size={36} weight="duotone" />,
    desc: "Raised funds during Ramadan to sponsor 15 orphans for a full year.",
  },
  {
    title: "Back to School 2023",
    raised: "$8,500",
    icon: <Backpack size={36} weight="duotone" />,
    desc: "Provided school supplies and tuition for orphans in Syria and Palestine.",
  },
  {
    title: "Eid al-Adha Drive 2023",
    raised: "$6,200",
    icon: <Cow size={36} weight="duotone" />,
    desc: "Delivered Eid gifts and meals to sponsored children and their communities.",
  },
  {
    title: "Winter Relief 2022",
    raised: "$10,000",
    icon: <Snowflake size={36} weight="duotone" />,
    desc: "Supplied warm clothing and heating for families facing harsh winters.",
  },
];

const events: { title: string; date: string; icon: ReactNode; desc: string }[] =
  [
    {
      title: "Annual Charity Gala",
      date: "March 2025",
      icon: <Confetti size={36} weight="duotone" />,
      desc: "Our biggest fundraising event of the year featuring guest speakers and dinner.",
    },
    {
      title: "Orphan Awareness Week",
      date: "April 2025",
      icon: <Lightbulb size={36} weight="duotone" />,
      desc: "A week of workshops, talks, and social media campaigns to raise awareness.",
    },
    {
      title: "Community Iftar",
      date: "Ramadan 2025",
      icon: <ForkKnife size={36} weight="duotone" />,
      desc: "Breaking fast together while raising funds for orphan sponsorship.",
    },
  ];

export default function Campaigns() {
  return (
    <div className="campaigns">
      <section className="hero">
        <AnimatedBackground variant="hero" />
        <div className="hero-content">
          <h1>Events &amp; Campaigns</h1>
          <p>See our active campaigns, past successes, and upcoming events.</p>
        </div>
      </section>

      {/* Active Campaign */}
      <section className="section">
        <div className="container">
          <div className="active-campaign card">
            <div className="campaign-badge">
              <Fire size={18} weight="fill" /> Active Now
            </div>
            <h2>Winter Warmth Drive 2025</h2>
            <div className="campaign-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "65%" }} />
              </div>
              <div className="progress-stats">
                <span>$13,000 raised</span>
                <span>Goal: $20,000</span>
              </div>
            </div>
            <p>
              Help us provide warm clothing, blankets, and heating supplies to
              orphans facing harsh winter conditions across Syria, Yemen, and
              Palestine.
            </p>
            <Link to="/donate" className="btn btn-primary">
              Contribute Now
            </Link>
          </div>
        </div>
      </section>

      {/* Past Campaigns */}
      <section
        className="section"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container">
          <h2 className="section-title">Past Campaigns</h2>
          <p className="section-subtitle">
            A look back at what we've accomplished together.
          </p>
          <div className="past-grid">
            {pastCampaigns.map((c, i) => (
              <div className="card past-card" key={i}>
                <span className="past-emoji">{c.icon}</span>
                <h3>{c.title}</h3>
                <p className="past-raised">{c.raised} raised</p>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Join us at our next event and be part of the change.
          </p>
          <div className="events-grid">
            {events.map((e, i) => (
              <div className="card event-card" key={i}>
                <span className="event-emoji">{e.icon}</span>
                <div className="event-date">{e.date}</div>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
