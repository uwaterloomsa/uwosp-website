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

const departments: {
  name: string;
  members: { name: string; role?: string }[];
}[] = [
  {
    name: "President",
    members: [{ name: "Reem Abdelazim" }],
  },
  {
    name: "Operations",
    members: [
      { name: "Yahya Rizwan", role: "Executive" },
      { name: "Saif Al-Din Ali" },
    ],
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
    members: [
      { name: "Hadi Meski", role: "Executive" },
      { name: "Jawad Hussain" },
    ],
  },
  {
    name: "Outreach",
    members: [
      { name: "Alysha Butt", role: "Executive" },
      { name: "Asiyah Malik" },
      { name: "Hanin Shamsheer" },
      { name: "Sumaiyah Shakeel" },
      { name: "Zuhair Qureshy" },
    ],
  },
  {
    name: "Fundraising",
    members: [
      { name: "Erick Rahi", role: "Executive" },
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
      { name: "Ahmed Elalem", role: "Executive" },
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
      { name: "Emaan Zafar", role: "Executive" },
      { name: "Nyle Faridi" },
      { name: "Zeba Shaikh" },
      { name: "Rowson Akter" },
      { name: "Elyaze Khan" },
      { name: "Serena Alshayeb" },
      { name: "Muzammil Sheikh" },
    ],
  },
];

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

      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Our Fall 2025 Team</h2>
          <p className="section-subtitle reveal">
            The dedicated students leading UWOSP and driving our mission
            forward.
          </p>

          {departments.map((dept, di) => (
            <div className="department-section reveal" key={di}>
              <h3 className="department-title">{dept.name}</h3>
              <div className="team-grid">
                {dept.members.map((member, mi) => (
                  <div
                    className={`team-card reveal stagger-${(mi % 6) + 1}`}
                    key={mi}
                  >
                    <div
                      className="team-card-photo"
                      style={{
                        background: getAvatarColor(member.name),
                        color: "#fff",
                      }}
                    >
                      {getInitials(member.name)}
                    </div>
                    <div className="team-card-info">
                      <h4>{member.name}</h4>
                      {member.role && (
                        <span className="team-card-role">{member.role}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
