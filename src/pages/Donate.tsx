import { Link } from "react-router-dom";
import {
  HeartStraight,
  CurrencyDollar,
  GlobeHemisphereWest,
  Users,
  Heartbeat,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Donate.css";

const DONATE_AMOUNTS = [25, 50, 100, 250, 500];

export default function Donate() {
  useScrollReveal();

  return (
    <div className="donate">
      <section className="hero hero--image">
        <img
          className="hero-bg-img"
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1400&q=80"
          alt=""
          loading="eager"
        />
        <div className="hero-content">
          <h1>Make a Difference</h1>
          <p>
            Your generosity can change a child's life. Every dollar provides
            education, healthcare, and hope.
          </p>
        </div>
      </section>

      {/* Quick donate amounts */}
      <section className="section donate-amounts-section">
        <div className="container">
          <div className="donate-amounts-card card reveal-scale">
            <h2 className="section-title section-title--center">
              Choose an Amount to Give
            </h2>
            <p className="section-subtitle section-subtitle--center">
              All donations are processed securely through WUSA.
            </p>
            <div className="donate-amounts-grid">
              {DONATE_AMOUNTS.map((amt) => (
                <a
                  key={amt}
                  href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="donate-amount-btn"
                >
                  ${amt}
                </a>
              ))}
            </div>
            <a
              href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary donate-amount-custom"
            >
              <CurrencyDollar size={20} weight="bold" /> Donate Any Amount
            </a>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="section donate-impact-section">
        <div className="container">
          <div className="donate-impact-grid">
            <div className="donate-impact-item reveal stagger-1">
              <span className="icon-block">
                <HeartStraight size={24} weight="duotone" />
              </span>
              <strong>9</strong>
              <span>Orphans Currently Sponsored</span>
            </div>
            <div className="donate-impact-item reveal stagger-2">
              <span className="icon-block">
                <GlobeHemisphereWest size={24} weight="duotone" />
              </span>
              <strong>5</strong>
              <span>Countries Reached</span>
            </div>
            <div className="donate-impact-item reveal stagger-3">
              <span className="icon-block">
                <Users size={24} weight="duotone" />
              </span>
              <strong>22+</strong>
              <span>Orphans Sponsored Since 2007</span>
            </div>
            <div className="donate-impact-item reveal stagger-4">
              <span className="icon-block">
                <Heartbeat size={24} weight="duotone" />
              </span>
              <strong>$50k+</strong>
              <span>Raised in 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* General Donate */}
      <section className="section">
        <div className="container">
          <div className="split reveal">
            <div className="split-image image-hover-zoom">
              <img
                src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&q=80"
                alt="Hands coming together in support"
                loading="lazy"
              />
            </div>
            <div className="donate-general">
              <h2>Where Your Money Goes</h2>
              <p>
                Your donations support our club events and booth, helping us
                raise funds and attract more people to our fundraisers.
              </p>
              <p>
                Through verified charities like Human Concern International and
                Islamic Relief, funds go directly to orphans' education,
                healthcare, and daily needs.
              </p>
              <a
                href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary donate-general-btn"
              >
                <CurrencyDollar size={20} weight="bold" /> Donate Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section donate-cta-section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Ready to Help?</h2>
          <p className="section-subtitle">
            Donations are processed through WUSA and our verified charity
            partners.
          </p>
          <div className="donate-cta-buttons">
            <a
              href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Donate via WUSA
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
