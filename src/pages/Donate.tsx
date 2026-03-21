import { Link } from "react-router-dom";
import {
  HeartStraight,
  CurrencyDollar,
  GlobeHemisphereWest,
  Users,
  Heartbeat,
} from "@phosphor-icons/react";
import "./Donate.css";

export default function Donate() {
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
          <h1>Donate</h1>
          <p>
            Your generosity can change a child's life. Every dollar makes a
            difference.
          </p>
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
              <h2>Donate to Us</h2>
              <p>
                Donate to support our club events and booth, helping us raise
                funds and attract more people to our fundraisers.
              </p>
              <p>
                If you also want to donate to our current fundraiser, you can
                contribute directly through the link below!
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
