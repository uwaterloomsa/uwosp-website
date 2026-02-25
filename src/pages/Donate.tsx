import { Link } from "react-router-dom";
import {
  HeartStraight,
  Star,
  Gift,
  BookOpen,
  AppleLogo,
  CoatHanger,
  SunHorizon,
} from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import "./Donate.css";
import type { ReactNode } from "react";

const tiers: {
  name: string;
  amount: string;
  icon: ReactNode;
  desc: string;
  highlight: boolean;
}[] = [
  {
    name: "Monthly Sponsor",
    amount: "$40/mo",
    icon: <HeartStraight size={40} weight="duotone" />,
    desc: "Provide ongoing support covering food, education, and healthcare for one orphan.",
    highlight: false,
  },
  {
    name: "Annual Sponsor",
    amount: "$480/yr",
    icon: <Star size={40} weight="duotone" />,
    desc: "Commit to a full year of sponsorship and receive regular updates on your sponsored child.",
    highlight: true,
  },
  {
    name: "One-Time Gift",
    amount: "Any amount",
    icon: <Gift size={40} weight="duotone" />,
    desc: "Make a one-time contribution to our general fund supporting orphans across all regions.",
    highlight: false,
  },
];

const impacts: { amount: string; impact: string; icon: ReactNode }[] = [
  {
    amount: "$10",
    impact: "Provides school supplies for one child for a month",
    icon: <BookOpen size={36} weight="duotone" />,
  },
  {
    amount: "$40",
    impact: "Covers food, healthcare, and education for one orphan for a month",
    icon: <AppleLogo size={36} weight="duotone" />,
  },
  {
    amount: "$100",
    impact: "Provides winter clothing and supplies for a family",
    icon: <CoatHanger size={36} weight="duotone" />,
  },
  {
    amount: "$480",
    impact: "Sponsors one orphan for an entire year",
    icon: <SunHorizon size={36} weight="duotone" />,
  },
];

export default function Donate() {
  return (
    <div className="donate">
      <section className="hero">
        <AnimatedBackground variant="hero" />
        <div className="hero-content">
          <h1>Make a Donation</h1>
          <p>
            Your generosity can change a child's life. Every dollar makes a
            difference.
          </p>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Sponsorship Options</h2>
          <p className="section-subtitle">
            Choose how you'd like to support orphans in need.
          </p>
          <div className="tiers-grid">
            {tiers.map((tier, i) => (
              <div
                className={`card tier-card ${tier.highlight ? "tier-highlight" : ""}`}
                key={i}
              >
                <span className="tier-emoji">{tier.icon}</span>
                <h3>{tier.name}</h3>
                <div className="tier-amount">{tier.amount}</div>
                <p>{tier.desc}</p>
                <a
                  href="https://www.launchgood.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Donate
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section
        className="section"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container">
          <h2 className="section-title">Your Impact</h2>
          <p className="section-subtitle">
            See how your donation translates into real change.
          </p>
          <div className="impact-grid">
            {impacts.map((item, i) => (
              <div className="card impact-card" key={i}>
                <span className="impact-emoji">{item.icon}</span>
                <div className="impact-amount">{item.amount}</div>
                <p>{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section donate-cta-section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Ready to Help?</h2>
          <p className="section-subtitle">
            Donations are processed through our verified charity partners and
            are tax-deductible.
          </p>
          <div className="donate-cta-buttons">
            <a
              href="https://www.launchgood.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Donate on LaunchGood
            </a>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
