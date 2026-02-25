import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  BowlFood,
  FirstAidKit,
  Books,
  Fire,
  HeartStraight,
  Handshake,
  Megaphone,
} from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import "./Home.css";

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.floor(progress * target).toLocaleString() + "+";
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
  }, [target]);

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
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero home-hero">
        <AnimatedBackground variant="hero" />
        <div className="hero-content">
          <h1>
            Empowering Orphans,
            <br />
            Building Futures
          </h1>
          <p>
            At the University of Waterloo, the Orphan Sponsorship Program aims
            to provide for the needs and well-being of orphans around the world
            through financial support.
          </p>
          <div className="hero-buttons">
            <Link to="/donate" className="btn btn-primary">
              Donate Now
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-subtitle">
            We believe our support can help provide orphans with the security
            and tools to thrive.
          </p>
          <div className="mission-grid">
            <div className="card mission-card">
              <span className="mission-icon">
                <BowlFood size={48} weight="duotone" />
              </span>
              <h3>Nutrition</h3>
              <p>
                Ensuring orphans have access to healthy meals and clean water
                for proper growth and development.
              </p>
            </div>
            <div className="card mission-card">
              <span className="mission-icon">
                <FirstAidKit size={48} weight="duotone" />
              </span>
              <h3>Healthcare</h3>
              <p>
                Providing medical care, vaccinations, and mental health support
                to children in need.
              </p>
            </div>
            <div className="card mission-card">
              <span className="mission-icon">
                <Books size={48} weight="duotone" />
              </span>
              <h3>Education</h3>
              <p>
                Giving orphans the opportunity to attend school and build a
                foundation for their futures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section stats-section">
        <AnimatedBackground variant="subtle" />
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-subtitle">
            Together we are making a difference around the world.
          </p>
          <div className="stats-grid">
            <AnimatedCounter target={150} label="Orphans Sponsored" />
            <AnimatedCounter target={10} label="Countries Reached" />
            <AnimatedCounter target={17} label="Years of Service" />
            <AnimatedCounter target={200000} label="Funds Raised ($)" />
          </div>
        </div>
      </section>

      {/* Current Campaign */}
      <section className="section">
        <div className="container">
          <div className="campaign-highlight card">
            <div className="campaign-badge">
              <Fire size={18} weight="fill" /> Active Campaign
            </div>
            <h2>Winter Warmth Drive 2025</h2>
            <p>
              Help us provide warm clothing, blankets, and heating supplies to
              orphans facing harsh winter conditions. Every contribution brings
              warmth and hope.
            </p>
            <Link to="/campaigns" className="btn btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How You Can Help</h2>
          <p className="section-subtitle">
            There are many ways to support our mission and make a lasting
            impact.
          </p>
          <div className="help-grid">
            <div className="card help-card">
              <span className="help-icon">
                <HeartStraight size={40} weight="duotone" />
              </span>
              <h3>Sponsor a Child</h3>
              <p>
                Directly sponsor an orphan and follow their journey as they
                grow.
              </p>
              <Link to="/donate" className="btn btn-outline">
                Sponsor Now
              </Link>
            </div>
            <div className="card help-card">
              <span className="help-icon">
                <Handshake size={40} weight="duotone" />
              </span>
              <h3>Volunteer</h3>
              <p>
                Join our team and help organize events, campaigns, and outreach.
              </p>
              <Link to="/get-involved" className="btn btn-outline">
                Get Involved
              </Link>
            </div>
            <div className="card help-card">
              <span className="help-icon">
                <Megaphone size={40} weight="duotone" />
              </span>
              <h3>Spread the Word</h3>
              <p>Share our mission on social media and help raise awareness.</p>
              <Link to="/contact" className="btn btn-outline">
                Connect
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section partners-section">
        <AnimatedBackground variant="subtle" />
        <div className="container">
          <h2 className="section-title">Our Partners</h2>
          <p className="section-subtitle">
            We work with registered charities to maximize our impact.
          </p>
          <div className="partners-grid">
            <div className="partner-card">Islamic Relief</div>
            <div className="partner-card">Human Concern International</div>
            <div className="partner-card">IDRF</div>
            <div className="partner-card">Human Appeal</div>
          </div>
        </div>
      </section>
    </div>
  );
}
