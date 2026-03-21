import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Fire,
  HeartStraight,
  Handshake,
  Megaphone,
  ArrowRight,
  Newspaper,
  ChartBar,
  CurrencyDollar,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import { onActiveFundraiser, getSponsors } from "../services/site";
import type { Fundraiser, Sponsor } from "../types/site";
import "./Home.css";

function AnimatedCounter({
  target,
  prefix,
  label,
}: {
  target: number;
  prefix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const val = Math.floor(progress * target).toLocaleString();
      el.textContent = (prefix || "") + val + "+";
      if (progress < 1) requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix]);

  return (
    <div className="stat-item">
      <span className="stat-number" ref={ref}>
        0
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Home() {
  useScrollReveal();
  const [fundraiser, setFundraiser] = useState<Fundraiser | null>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const unsub = onActiveFundraiser(setFundraiser);
    getSponsors()
      .then(setSponsors)
      .catch(() => {});
    return unsub;
  }, []);

  const pct = fundraiser
    ? Math.min(
        100,
        Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100),
      )
    : 0;

  return (
    <div className="home">
      {/* Hero */}
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80"
        className="home-hero"
      >
        <span className="hero-badge">University of Waterloo</span>
        <h1>
          Orphan Sponsorship
          <br />
          <span className="text-accent">Program</span>
        </h1>
        <p>
          At the University of Waterloo, the Orphan Sponsorship Program aims to
          provide for the needs and well-being of orphans around the world
          through financial support.
        </p>
        <div className="hero-buttons">
          <Link to="/campaigns" className="btn btn-primary">
            Learn More
          </Link>
          <Link to="/donate" className="btn btn-outline">
            Donate
          </Link>
        </div>
      </ParallaxHero>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="split reveal">
            <div className="split-image image-hover-zoom">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                alt="Community volunteers working together"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="section-title">Our Mission</h2>
              <div
                className="mission-text"
                style={{ maxWidth: "none", textAlign: "left", margin: 0 }}
              >
                <p>
                  At the University of Waterloo, the Orphan Sponsorship Program
                  aims to provide for the needs and well-being of orphans around
                  the world through financial support. We believe that our
                  support can help provide them with the security and tools to
                  thrive.
                </p>
                <p>
                  Through registered charities such as Human Concern
                  International and Islamic Relief, we aim to sponsor children
                  that have been orphaned as a result of war, extreme poverty,
                  or disease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended mission */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <div className="split split--reverse reveal">
            <div>
              <h2 className="section-title">Beyond Sponsorship</h2>
              <div
                className="mission-text"
                style={{ maxWidth: "none", textAlign: "left", margin: 0 }}
              >
                <p>
                  We not only sponsor and support orphans globally, but we also
                  collaborate with registered charities to assist countries
                  abroad dealing with extreme poverty, natural disasters,
                  conflict, and other crises.
                </p>
                <p>
                  We strive to empower orphaned youth to break out of the cycle
                  of poverty, through ensuring their access to nutrition,
                  healthcare, and quality education.
                </p>
              </div>
            </div>
            <div className="split-image image-hover-zoom">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                alt="Volunteers organizing supplies for communities in need"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title section-title--center reveal">
            Monthly Newsletter
          </h2>
          <p className="section-subtitle section-subtitle--center reveal">
            Stay up to date with our latest initiatives and impact stories.
          </p>
          <a
            href="https://cdn.shopify.com/s/files/1/0251/8210/9742/files/February_2025_OSP_Monthly_Newsletter.pdf?v=1742059567"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary reveal"
          >
            <Newspaper size={18} weight="bold" /> Read Newsletter
          </a>
        </div>
      </section>

      {/* Live Fundraiser — admin-managed with real-time amounts */}
      <section className="section">
        <div className="container">
          {fundraiser ? (
            <div className="campaign-highlight card reveal-scale">
              <div className="campaign-badge">
                <Fire size={18} weight="fill" /> Active Fundraiser
              </div>
              <h2>{fundraiser.title}</h2>
              <p>{fundraiser.description}</p>
              <div className="campaign-progress">
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
              <Link to="/donate" className="btn btn-primary">
                Contribute Now
              </Link>
            </div>
          ) : (
            <div className="campaign-highlight card reveal-scale">
              <div className="campaign-badge">
                <Fire size={18} weight="fill" /> Current Campaign
              </div>
              <h2>UWOSP x NZF | Ramadan Fundraiser</h2>
              <p>
                Gaza families arriving in Canada may have found safety, but
                their struggles are far from over. They carry the weight of loss
                — homes destroyed, loved ones gone, and families still in
                danger. On top of that, they face the overwhelming challenge of
                starting over, with food, rent, and other critical needs often
                out of reach. But together, we can ease their burden. This
                Ramadan, join National Zakat Foundation Canada and UW MSA in
                supporting our brothers and sisters from Gaza.
              </p>
              <a
                href="https://uow-ansaar.raiselysite.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Learn More
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <AnimatedCounter target={22} label="Orphans Sponsored" />
            <AnimatedCounter target={50000} prefix="$" label="Raised in 2024" />
            <AnimatedCounter target={5} label="Countries Impacted" />
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="section">
        <div className="container">
          <div className="help-grid">
            <div className="card help-card reveal stagger-1">
              <span className="icon-block">
                <HeartStraight size={28} weight="duotone" />
              </span>
              <h3>Our Orphans</h3>
              <p>Learn more about the orphans we're currently sponsoring.</p>
              <Link to="/orphans" className="btn btn-outline">
                Learn More <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="card help-card reveal stagger-2">
              <span className="icon-block">
                <Handshake size={28} weight="duotone" />
              </span>
              <h3>Other Projects</h3>
              <p>Learn about other campaigns we've run.</p>
              <Link to="/campaigns" className="btn btn-outline">
                View Projects <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="card help-card reveal stagger-3">
              <span className="icon-block">
                <ChartBar size={28} weight="duotone" />
              </span>
              <h3>Financial Reports</h3>
              <p>View all our triannual financial reports.</p>
              <Link to="/finances" className="btn btn-outline">
                View Reports <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Donate & Get Involved */}
      <section className="section">
        <div className="container">
          <div className="help-grid">
            <div className="card help-card reveal stagger-1">
              <span className="icon-block">
                <CurrencyDollar size={28} weight="duotone" />
              </span>
              <h3>Donate to Us</h3>
              <p>
                Donate to support our club events and booth, helping us raise
                funds and attract more people to our fundraisers.
              </p>
              <a
                href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Donate
              </a>
            </div>
            <div className="card help-card reveal stagger-2">
              <span className="icon-block">
                <Megaphone size={28} weight="duotone" />
              </span>
              <h3>Get Involved</h3>
              <p>Interested in helping out? Let us know!</p>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section partners-section">
        <div className="container">
          <h2 className="section-title reveal">Our Partners</h2>
          <p className="section-subtitle reveal">
            We work with registered charities to maximize our impact.
          </p>
          <div className="partners-grid">
            {sponsors.length > 0
              ? sponsors.map((s, i) => (
                  <div
                    className={`partner-card reveal stagger-${(i % 6) + 1}`}
                    key={s.id}
                  >
                    {s.website ? (
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.name}
                      </a>
                    ) : (
                      s.name
                    )}
                  </div>
                ))
              : [
                  "Islamic Relief",
                  "Human Concern International",
                  "IDRF",
                  "National Zakat Foundation",
                ].map((name, i) => (
                  <div
                    className={`partner-card reveal stagger-${i + 1}`}
                    key={name}
                  >
                    {name}
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
