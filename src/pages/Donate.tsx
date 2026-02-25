import { Link } from "react-router-dom";
import {
  HeartStraight,
  BookOpen,
  BowlFood,
  CoatHanger,
  SunHorizon,
  CurrencyDollar,
} from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import "./Donate.css";
import type { ReactNode } from "react";

const impacts: { amount: string; impact: string; icon: ReactNode }[] = [
  {
    amount: "$10",
    impact: "Provides school supplies for one child for a month",
    icon: <BookOpen size={36} weight="duotone" />,
  },
  {
    amount: "$40",
    impact: "Covers food, healthcare, and education for one orphan for a month",
    icon: <BowlFood size={36} weight="duotone" />,
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

      {/* General Donate */}
      <section className="section">
        <div className="container">
          <div className="donate-general card">
            <span className="donate-general-icon">
              <HeartStraight size={56} weight="duotone" />
            </span>
            <h2>Support Orphans in Need</h2>
            <p>
              Your donation goes directly towards providing food, healthcare,
              education, and essential resources for orphans around the world.
              Any amount makes a real difference.
            </p>
            <a
              href="https://www.launchgood.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary donate-general-btn"
            >
              <CurrencyDollar size={20} weight="bold" /> Donate Now
            </a>
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
