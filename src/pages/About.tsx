import { EnvelopeSimple } from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import "./About.css";

const AVATAR_COLORS = [
  "oklch(0.55 0.18 264)",
  "oklch(0.55 0.15 200)",
  "oklch(0.55 0.15 150)",
  "oklch(0.55 0.18 330)",
  "oklch(0.50 0.15 30)",
  "oklch(0.50 0.12 280)",
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface Member {
  name: string;
  role?: string;
}

const leadership: Member[] = [
  { name: "Reem Abdelazim", role: "President" },
  { name: "Yahya Rizwan", role: "VP Operations" },
  { name: "Hadi Meski", role: "VP Finance" },
  { name: "Alysha Butt", role: "VP Outreach" },
  { name: "Erick Rahi", role: "VP Fundraising" },
  { name: "Ahmed Elalem", role: "VP Logistics" },
  { name: "Emaan Zafar", role: "VP Marketing" },
];

const departments: {
  name: string;
  members: Member[];
}[] = [
  {
    name: "Operations",
    members: [{ name: "Saif Al-Din Ali" }],
  },
  {
    name: "Advisors",
    members: [
      { name: "Rama Al Aghbar" },
      { name: "Niah Fiorino" },
      { name: "Yusra Aslam" },
    ],
  },
  {
    name: "Finance",
    members: [{ name: "Jawad Hussain" }],
  },
  {
    name: "Outreach",
    members: [
      { name: "Asiyah Malik" },
      { name: "Hanin Shamsheer" },
      { name: "Sumaiyah Shakeel" },
      { name: "Zuhair Qureshy" },
    ],
  },
  {
    name: "Fundraising",
    members: [
      { name: "Aya Zahabi" },
      { name: "Ayesha Amanullah" },
      { name: "Muhammad Musfir Ehtsham" },
      { name: "Mus'ab Khan" },
      { name: "Maaz Patel" },
      { name: "Zainab Waheed" },
      { name: "Maryam Zeb" },
    ],
  },
  {
    name: "Logistics",
    members: [
      { name: "Sameen Ahmed" },
      { name: "Faiq Ali" },
      { name: "Muhammad Ayan Asim" },
      { name: "Ammar Raffay" },
      { name: "Emaan Sikander" },
      { name: "Reanna Chowdhury" },
      { name: "Bushra Shakeel" },
    ],
  },
  {
    name: "Marketing & Social Media",
    members: [
      { name: "Nyle Faridi" },
      { name: "Zeba Shaikh" },
      { name: "Rowson Akter" },
      { name: "Elyaze Khan" },
      { name: "Serena Alshayeb" },
      { name: "Muzammil Sheikh" },
    ],
  },
];

function MemberCard({ member, large }: { member: Member; large?: boolean }) {
  return (
    <div className={`team-card${large ? " team-card--leader" : ""}`}>
      <div
        className={`team-card-photo${large ? " team-card-photo--lg" : ""}`}
        style={{ background: getAvatarColor(member.name), color: "#fff" }}
      >
        {getInitials(member.name)}
      </div>
      <div className="team-card-info">
        <h4>{member.name}</h4>
        {member.role && <span className="team-card-role">{member.role}</span>}
      </div>
    </div>
  );
}

export default function About() {
  useScrollReveal();

  return (
    <div className="about">
      <ParallaxHero imgSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80">
        <h1>Meet the Team</h1>
        <p>
          Thanks to the support of countless volunteers over the last decade, we
          have been able to support over a dozen orphans since our inception.
        </p>
      </ParallaxHero>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <h2 className="section-title section-title--center reveal">
            Leadership
          </h2>
          <p className="section-subtitle section-subtitle--center reveal">
            The executive team steering UWOSP's vision and impact.
          </p>

          <div className="leadership-grid">
            {leadership.map((m, i) => (
              <div className={`reveal stagger-${(i % 6) + 1}`} key={m.name}>
                <MemberCard member={m} large />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <h2 className="section-title section-title--center reveal">
            Our Fall 2025 Team
          </h2>
          <p className="section-subtitle section-subtitle--center reveal">
            The dedicated students driving our mission forward across every
            department.
          </p>

          {departments.map((dept, di) => (
            <div className="department-section reveal" key={di}>
              <h3 className="department-title">{dept.name}</h3>
              <div className="team-grid">
                {dept.members.map((member, mi) => (
                  <div className={`reveal stagger-${(mi % 6) + 1}`} key={mi}>
                    <MemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section section--accent">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title section-title--center reveal">
            Want to Join the Team?
          </h2>
          <p
            className="section-subtitle section-subtitle--center reveal"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            We're always looking for passionate students to help make a
            difference.
          </p>
          <a href="/get-involved" className="btn btn-outline reveal">
            <EnvelopeSimple size={18} weight="bold" /> Get Involved
          </a>
        </div>
      </section>
    </div>
  );
}
