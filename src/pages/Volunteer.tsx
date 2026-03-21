import ParallaxHero from "../components/ParallaxHero";
import {
  HandHeart,
  Buildings,
  MapPin,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import { Link } from "react-router-dom";
import "./Volunteer.css";

const charities = [
  {
    name: "Islamic Relief Canada",
    focus: "Humanitarian aid, orphan sponsorship, emergency response",
    location: "Burlington, ON",
    website: "https://islamicreliefcanada.org",
  },
  {
    name: "Human Concern International",
    focus: "Food security, education, healthcare for vulnerable communities",
    location: "Ottawa, ON",
    website: "https://humanconcern.org",
  },
  {
    name: "IDRF",
    focus: "Sustainable development, disaster relief, education",
    location: "Pickering, ON",
    website: "https://idrf.ca",
  },
  {
    name: "Human Appeal",
    focus: "Orphan care, emergency aid, community development",
    location: "Mississauga, ON",
    website: "https://humanappeal.ca",
  },
];

export default function Volunteer() {
  useScrollReveal();

  return (
    <div className="volunteer-page">
      <ParallaxHero imgSrc="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&q=80">
        <h1>Volunteer at Charities</h1>
        <p>
          Discover volunteer opportunities with our charity partners and make a
          direct impact in your community.
        </p>
      </ParallaxHero>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className="volunteer-intro card reveal-scale">
            <span className="volunteer-intro-icon">
              <HandHeart size={56} weight="duotone" />
            </span>
            <h2>Give Your Time</h2>
            <p>
              Beyond financial contributions, volunteering your time and skills
              can create lasting change. Our charity partners welcome volunteers
              for a variety of roles — from event coordination to community
              outreach to administrative support.
            </p>
          </div>
          <div className="volunteer-image-banner image-hover-zoom reveal-blur">
            <img
              src="https://images.pexels.com/photos/7156161/pexels-photo-7156161.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Diverse group of volunteers at a community center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Charity Partners */}
      <section
        className="section"
        style={{ background: "var(--bg-alt, var(--bg-secondary, #f5f0eb))" }}
      >
        <div className="container">
          <h2 className="section-title reveal">Charity Partners</h2>
          <p className="section-subtitle reveal">
            Explore volunteer opportunities with these registered charities we
            work with.
          </p>
          <div className="charity-grid">
            {charities.map((c, i) => (
              <div
                className={`card charity-card reveal stagger-${i + 1}`}
                key={c.name}
              >
                <span className="charity-icon">
                  <Buildings size={40} weight="duotone" />
                </span>
                <h3>{c.name}</h3>
                <p className="charity-focus">{c.focus}</p>
                <div className="charity-meta">
                  <span>
                    <MapPin size={14} weight="bold" /> {c.location}
                  </span>
                </div>
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline charity-link"
                >
                  Visit Website <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">How to Get Started</h2>
          <p className="section-subtitle reveal">
            Ready to volunteer? Here's how you can begin.
          </p>
          <div className="steps-grid">
            <div className="card step-card reveal stagger-1">
              <span className="step-number">1</span>
              <h3>Browse Opportunities</h3>
              <p>
                Visit the websites of our charity partners to see current
                volunteer openings and roles available near you.
              </p>
            </div>
            <div className="card step-card reveal stagger-2">
              <span className="step-number">2</span>
              <h3>Reach Out</h3>
              <p>
                Contact the charity directly or reach out to us and we can help
                connect you with the right opportunity.
              </p>
            </div>
            <div className="card step-card reveal stagger-3">
              <span className="step-number">3</span>
              <h3>Make an Impact</h3>
              <p>
                Start volunteering and see firsthand how your time and effort
                makes a real difference in people's lives.
              </p>
            </div>
          </div>
          <div className="volunteer-cta reveal">
            <p>
              Have questions about volunteering? We'd love to help you find the
              right fit.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
