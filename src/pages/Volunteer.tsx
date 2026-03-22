import { useEffect, useState } from "react";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import EditableImage from "../components/EditableImage";
import {
  HandHeart,
  Buildings,
  MapPin,
  ArrowSquareOut,
  CalendarCheck,
  Megaphone,
  PencilLine,
  UsersThree,
  Clock,
  ShieldCheck,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import { Link } from "react-router-dom";
import {
  volunteerCharityService,
  volunteerRoleService,
} from "../services/siteCollections";
import type { VolunteerCharity, VolunteerRole } from "../types/collections";
import "./Volunteer.css";

const defaultCharities = [
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

const defaultRoles = [
  {
    title: "Event Coordination",
    description:
      "Help plan and run charity events, fundraising dinners, and awareness campaigns on campus and in the community.",
  },
  {
    title: "Outreach & Marketing",
    description:
      "Spread the word about our mission through social media content, campus booths, and community engagement.",
  },
  {
    title: "Content & Design",
    description:
      "Create graphics, write newsletters, produce videos, or help maintain our website and digital presence.",
  },
  {
    title: "Community Support",
    description:
      "Assist with on-the-ground charity activities like food drives, donation sorting, and direct community aid.",
  },
  {
    title: "Flexible Commitment",
    description:
      "Whether you have a few hours a week or can commit to a full term, there are roles that fit every schedule.",
  },
  {
    title: "Verified Hours",
    description:
      "Receive verified volunteer hours for your contributions — recognized by the university and future employers.",
  },
];

const ROLE_ICONS = [
  CalendarCheck,
  Megaphone,
  PencilLine,
  UsersThree,
  Clock,
  ShieldCheck,
];

export default function Volunteer() {
  useScrollReveal();
  const [dbCharities, setDbCharities] = useState<VolunteerCharity[]>([]);
  const [dbRoles, setDbRoles] = useState<VolunteerRole[]>([]);

  useEffect(() => {
    const unsub1 = volunteerCharityService.onItems(setDbCharities);
    const unsub2 = volunteerRoleService.onItems(setDbRoles);
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const charities =
    dbCharities.length > 0
      ? dbCharities.map((c) => ({
          name: c.name,
          focus: c.focus,
          location: c.location,
          website: c.website,
        }))
      : defaultCharities;

  const roles =
    dbRoles.length > 0
      ? dbRoles
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((r) => ({ title: r.title, description: r.description }))
      : defaultRoles;

  return (
    <div className="volunteer-page">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1400&q=80"
        contentKey="volunteer.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="volunteer.hero.title"
          fallback="Volunteer at Charities"
        />
        <EditableText
          as="p"
          contentKey="volunteer.hero.subtitle"
          fallback="Discover volunteer opportunities with our charity partners and make a direct impact in your community."
          multiline
        />
      </ParallaxHero>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className="volunteer-intro card reveal-scale">
            <span className="volunteer-intro-icon">
              <HandHeart size={56} weight="duotone" />
            </span>
            <EditableText
              as="h2"
              contentKey="volunteer.intro.title"
              fallback="Give Your Time"
            />
            <EditableText
              as="p"
              contentKey="volunteer.intro.desc"
              fallback="Beyond financial contributions, volunteering your time and skills can create lasting change. Our charity partners welcome volunteers for a variety of roles — from event coordination to community outreach to administrative support."
              multiline
            />
          </div>
          <div className="volunteer-image-banner image-hover-zoom reveal-blur">
            <EditableImage
              contentKey="volunteer.banner.image"
              fallback="https://images.pexels.com/photos/7156161/pexels-photo-7156161.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Diverse group of volunteers at a community center"
            />
          </div>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <EditableText
            as="h2"
            className="section-title section-title--center reveal"
            contentKey="volunteer.roles.title"
            fallback="Types of Volunteer Roles"
          />
          <EditableText
            as="p"
            className="section-subtitle section-subtitle--center reveal"
            contentKey="volunteer.roles.subtitle"
            fallback="There are many ways to contribute — find the role that fits your skills and interests."
          />
          <div className="roles-grid">
            {roles.map((role, i) => {
              const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
              return (
                <div
                  className={`card role-card reveal stagger-${i + 1}`}
                  key={i}
                >
                  <Icon size={32} weight="duotone" className="role-icon" />
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Charity Partners */}
      <section
        className="section"
        style={{ background: "var(--bg-alt, var(--bg-secondary, #f5f0eb))" }}
      >
        <div className="container">
          <EditableText
            as="h2"
            className="section-title reveal"
            contentKey="volunteer.partners.title"
            fallback="Charity Partners"
          />
          <EditableText
            as="p"
            className="section-subtitle reveal"
            contentKey="volunteer.partners.subtitle"
            fallback="Explore volunteer opportunities with these registered charities we work with."
          />
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
          <EditableText
            as="h2"
            className="section-title reveal"
            contentKey="volunteer.start.title"
            fallback="How to Get Started"
          />
          <EditableText
            as="p"
            className="section-subtitle reveal"
            contentKey="volunteer.start.subtitle"
            fallback="Ready to volunteer? Here's how you can begin."
          />
          <div className="steps-grid">
            <div className="card step-card reveal stagger-1">
              <span className="step-number">1</span>
              <EditableText
                as="h3"
                contentKey="volunteer.step1.title"
                fallback="Browse Opportunities"
              />
              <EditableText
                as="p"
                contentKey="volunteer.step1.desc"
                fallback="Visit the websites of our charity partners to see current volunteer openings and roles available near you."
                multiline
              />
            </div>
            <div className="card step-card reveal stagger-2">
              <span className="step-number">2</span>
              <EditableText
                as="h3"
                contentKey="volunteer.step2.title"
                fallback="Reach Out"
              />
              <EditableText
                as="p"
                contentKey="volunteer.step2.desc"
                fallback="Contact the charity directly or reach out to us and we can help connect you with the right opportunity."
                multiline
              />
            </div>
            <div className="card step-card reveal stagger-3">
              <span className="step-number">3</span>
              <EditableText
                as="h3"
                contentKey="volunteer.step3.title"
                fallback="Make an Impact"
              />
              <EditableText
                as="p"
                contentKey="volunteer.step3.desc"
                fallback="Start volunteering and see firsthand how your time and effort makes a real difference in people's lives."
                multiline
              />
            </div>
          </div>
          <div className="volunteer-cta reveal">
            <EditableText
              as="p"
              contentKey="volunteer.cta.text"
              fallback="Have questions about volunteering? We'd love to help you find the right fit."
            />
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
