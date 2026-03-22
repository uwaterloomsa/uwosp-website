import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HeartStraight,
  CurrencyDollar,
  GlobeHemisphereWest,
  Users,
  Heartbeat,
  Fire,
} from "@phosphor-icons/react";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import EditableImage from "../components/EditableImage";
import { onActiveFundraiser } from "../services/site";
import type { Fundraiser } from "../types/site";
import "./Donate.css";

export default function Donate() {
  const [fundraiser, setFundraiser] = useState<Fundraiser | null>(null);

  useEffect(() => {
    const unsub = onActiveFundraiser(setFundraiser);
    return () => unsub();
  }, []);

  const pct = fundraiser
    ? Math.min(
        100,
        Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100),
      )
    : 0;

  return (
    <div className="donate">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1400&q=80"
        contentKey="donate.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="donate.hero.title"
          fallback="Donate"
        />
        <EditableText
          as="p"
          contentKey="donate.hero.subtitle"
          fallback="Your generosity can change a child's life. Every dollar makes a difference."
          multiline
        />
      </ParallaxHero>

      {/* Impact stats */}
      <section className="section donate-impact-section">
        <div className="container">
          <div className="donate-impact-grid">
            <div className="donate-impact-item reveal stagger-1">
              <span className="icon-block">
                <HeartStraight size={24} weight="duotone" />
              </span>
              <EditableText
                as="strong"
                contentKey="donate.impact.orphans.value"
                fallback="9"
              />
              <EditableText
                as="span"
                contentKey="donate.impact.orphans.label"
                fallback="Orphans Currently Sponsored"
              />
            </div>
            <div className="donate-impact-item reveal stagger-2">
              <span className="icon-block">
                <GlobeHemisphereWest size={24} weight="duotone" />
              </span>
              <EditableText
                as="strong"
                contentKey="donate.impact.countries.value"
                fallback="5"
              />
              <EditableText
                as="span"
                contentKey="donate.impact.countries.label"
                fallback="Countries Reached"
              />
            </div>
            <div className="donate-impact-item reveal stagger-3">
              <span className="icon-block">
                <Users size={24} weight="duotone" />
              </span>
              <EditableText
                as="strong"
                contentKey="donate.impact.total.value"
                fallback="22+"
              />
              <EditableText
                as="span"
                contentKey="donate.impact.total.label"
                fallback="Orphans Sponsored Since 2007"
              />
            </div>
            <div className="donate-impact-item reveal stagger-4">
              <span className="icon-block">
                <Heartbeat size={24} weight="duotone" />
              </span>
              <EditableText
                as="strong"
                contentKey="donate.impact.raised.value"
                fallback="$50k+"
              />
              <EditableText
                as="span"
                contentKey="donate.impact.raised.label"
                fallback="Raised in 2024"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Active Fundraiser */}
      {fundraiser && (
        <section className="section" style={{ background: "var(--bg-alt)" }}>
          <div className="container">
            <div className="donate-fundraiser card">
              <div className="donate-fundraiser-badge">
                <Fire size={18} weight="fill" /> Active Fundraiser
              </div>
              <h2>{fundraiser.title}</h2>
              <p>{fundraiser.description}</p>
              <div className="donate-fundraiser-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="progress-stats">
                  <span>
                    ${fundraiser.raisedAmount.toLocaleString()} raised
                  </span>
                  <span>Goal: ${fundraiser.goalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* General Donate */}
      <section className="section">
        <div className="container">
          <div className="split reveal">
            <div className="split-image image-hover-zoom">
              <EditableImage
                contentKey="donate.general.image"
                fallback="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&q=80"
                alt="Hands coming together in support"
              />
            </div>
            <div className="donate-general">
              <EditableText
                as="h2"
                contentKey="donate.general.title"
                fallback="Donate to Us"
              />
              <EditableText
                as="p"
                contentKey="donate.general.p1"
                fallback="Donate to support our club events and booth, helping us raise funds and attract more people to our fundraisers."
                multiline
              />
              <EditableText
                as="p"
                contentKey="donate.general.p2"
                fallback="If you also want to donate to our current fundraiser, you can contribute directly through the link below!"
                multiline
              />
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
      <section className="section section--accent donate-cta-section">
        <div className="container" style={{ textAlign: "center" }}>
          <EditableText
            as="h2"
            className="section-title section-title--center"
            contentKey="donate.cta.title"
            fallback="Ready to Help?"
          />
          <EditableText
            as="p"
            className="section-subtitle section-subtitle--center"
            contentKey="donate.cta.subtitle"
            fallback="Donations are processed through WUSA and our verified charity partners."
          />
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
