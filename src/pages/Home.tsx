import { Link } from "react-router-dom";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import {
  Fire,
  HeartStraight,
  Handshake,
  Megaphone,
  ArrowRight,
  CurrencyDollar,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import { onActiveFundraiser, getSponsors } from "../services/site";
import type { Fundraiser, Sponsor } from "../types/site";
import "./Home.css";

const Globe3D = lazy(() => import("../components/Globe3D"));

function AnimatedCounter({
  target,
  prefix,
  suffix,
  label,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
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
      el.textContent = (prefix || "") + val + (suffix || "+");
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
  }, [target, prefix, suffix]);

  return (
    <div className="stat-item">
      <span className="stat-number" ref={ref}>
        0
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const DONATE_AMOUNTS = [25, 50, 100, 250];

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
      {/* Hero with 3D Globe */}
      <section className="home-hero-3d">
        <div className="home-hero-3d-inner">
          <div className="home-hero-text">
            <span className="hero-badge">University of Waterloo</span>
            <h1>
              Change A Child's
              <br />
              <span className="text-accent">Future Today</span>
            </h1>
            <p>
              Supporting orphans around the world through financial aid,
              education, healthcare, and the power of community.
            </p>
            <div className="hero-donate-widget">
              <span className="hero-donate-label">
                Choose an amount to give
              </span>
              <div className="hero-donate-amounts">
                {DONATE_AMOUNTS.map((amt) => (
                  <a
                    key={amt}
                    href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-donate-btn"
                  >
                    ${amt}
                  </a>
                ))}
              </div>
              <a
                href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary hero-donate-other"
              >
                Donate Any Amount
              </a>
            </div>
          </div>
          <div className="home-hero-globe">
            <Suspense
              fallback={
                <div className="globe-fallback">
                  <div className="globe-fallback-ring" />
                </div>
              }
            >
              <Globe3D />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <AnimatedCounter target={22} suffix="+" label="Orphans Sponsored" />
            <AnimatedCounter
              target={50}
              prefix="$"
              suffix="k+"
              label="Raised in 2024"
            />
            <AnimatedCounter target={5} suffix="" label="Countries Reached" />
            <AnimatedCounter target={18} suffix="+" label="Years of Impact" />
          </div>
        </div>
      </section>

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

      {/* Featured Campaigns */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <h2 className="section-title section-title--center reveal">
            Our Campaigns
          </h2>
          <p className="section-subtitle section-subtitle--center reveal">
            We collaborate with verified charities to support communities in
            crisis.
          </p>

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
            <div className="featured-campaigns-grid">
              <div className="featured-campaign card reveal stagger-1">
                <div className="featured-campaign-img">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                    alt="Orphan sponsorship"
                    loading="lazy"
                  />
                </div>
                <div className="featured-campaign-body">
                  <h3>Orphan Sponsorship</h3>
                  <p>
                    Provide financial support for orphans' education,
                    healthcare, and daily needs across five countries.
                  </p>
                  <Link to="/orphans" className="btn btn-primary">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="featured-campaign card reveal stagger-2">
                <div className="featured-campaign-img">
                  <img
                    src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&q=80"
                    alt="Community support"
                    loading="lazy"
                  />
                </div>
                <div className="featured-campaign-body">
                  <h3>Ramadan Fundraiser</h3>
                  <p>
                    Support Gaza families arriving in Canada with food, rent,
                    and critical needs this Ramadan.
                  </p>
                  <a
                    href="https://uow-ansaar.raiselysite.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Donate Now
                  </a>
                </div>
              </div>
              <div className="featured-campaign card reveal stagger-3">
                <div className="featured-campaign-img">
                  <img
                    src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80"
                    alt="Emergency relief"
                    loading="lazy"
                  />
                </div>
                <div className="featured-campaign-body">
                  <h3>Emergency Relief</h3>
                  <p>
                    Collaborate with charities to assist countries dealing with
                    poverty, disasters, and conflict.
                  </p>
                  <Link to="/campaigns" className="btn btn-outline">
                    View All
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tagline banner */}
      <section className="cta-banner">
        <div className="container">
          <p className="tagline-small reveal">Together, we are</p>
          <h2 className="tagline-big reveal">Students Helping Children</h2>
        </div>
      </section>

      {/* Beyond Sponsorship */}
      <section className="section">
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
              <Link
                to="/get-involved"
                className="btn btn-outline"
                style={{ marginTop: "1.5rem" }}
              >
                Get Involved <ArrowRight size={16} weight="bold" />
              </Link>
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

      {/* Quick Links */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <div className="help-grid">
            <div className="card help-card reveal stagger-1">
              <span className="icon-block">
                <HeartStraight size={28} weight="duotone" />
              </span>
              <h3>Our Orphans</h3>
              <p>Meet the children whose lives we're changing together.</p>
              <Link to="/orphans" className="btn btn-outline">
                View Orphans <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="card help-card reveal stagger-2">
              <span className="icon-block">
                <Handshake size={28} weight="duotone" />
              </span>
              <h3>Join the Team</h3>
              <p>Contribute your skills and make a real difference.</p>
              <Link to="/get-involved" className="btn btn-outline">
                Open Roles <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="card help-card reveal stagger-3">
              <span className="icon-block">
                <Megaphone size={28} weight="duotone" />
              </span>
              <h3>Events & Campaigns</h3>
              <p>See our upcoming events and past campaigns.</p>
              <Link to="/campaigns" className="btn btn-outline">
                Explore <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="reveal">Ready to Make a Difference?</h2>
          <p className="reveal">
            Every contribution supports orphans' education, healthcare, and a
            brighter future.
          </p>
          <a
            href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn reveal"
          >
            <CurrencyDollar size={20} weight="bold" /> Donate Now
          </a>
        </div>
      </section>

      {/* Partners */}
      <section className="section partners-section">
        <div className="container">
          <h2 className="section-title section-title--center reveal">
            Our Partners
          </h2>
          <p className="section-subtitle section-subtitle--center reveal">
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
