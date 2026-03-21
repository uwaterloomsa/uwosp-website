import { User, Handshake } from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import useScrollReveal from "../hooks/useScrollReveal";
import "./About.css";

const team = [
  { name: "President" },
  { name: "VP Finance" },
  { name: "VP Marketing" },
  { name: "VP Events" },
  { name: "VP Outreach" },
  { name: "VP Operations" },
];

export default function About() {
  useScrollReveal();

  return (
    <div className="about">
      <section className="hero">
        <AnimatedBackground variant="hero" />
        <div className="hero-content">
          <h1>About UWOSP</h1>
          <p>
            Learn about our mission, history, and the people behind the program.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Our Mission</h2>
          <div className="mission-statement card reveal-scale">
            <p>
              At the University of Waterloo, the Orphan Sponsorship Program aims
              to provide for the needs and well-being of orphans around the
              world through financial support. We believe that our support can
              help provide them with the security and tools to thrive. Through
              registered charities such as Human Concern International and
              Islamic Relief, we aim to sponsor children that have been orphaned
              as a result of war, extreme poverty, or disease. We hope to assist
              them in reaching their goals and building a brighter future.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Our Team</h2>
          <p className="section-subtitle reveal">
            Meet the dedicated students leading UWOSP.
          </p>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className={`card team-card reveal stagger-${i + 1}`} key={i}>
                <span className="team-avatar">
                  <User size={48} weight="duotone" />
                </span>
                <h4>{member.name}</h4>
                <p>UWOSP Executive</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="section collaborators-section">
        <div className="container">
          <h2 className="section-title reveal">Our Collaborators</h2>
          <p className="section-subtitle reveal">
            We partner with established charities to deliver aid.
          </p>
          <div className="collab-grid">
            {[
              "Islamic Relief",
              "Human Concern International",
              "IDRF",
              "Human Appeal",
            ].map((name, i) => (
              <div
                className={`card collab-card reveal stagger-${i + 1}`}
                key={name}
              >
                <span className="collab-icon">
                  <Handshake size={40} weight="duotone" />
                </span>
                <h4>{name}</h4>
                <p>
                  Registered charity partner helping us deliver impact to
                  orphans worldwide.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
