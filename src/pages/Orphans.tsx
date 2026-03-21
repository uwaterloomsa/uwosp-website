import useScrollReveal from "../hooks/useScrollReveal";
import "./Orphans.css";

const COUNTRY_FLAGS: Record<string, string> = {
  Kosovo: "🇽🇰",
  Mali: "🇲🇱",
  Palestine: "🇵🇸",
};

const AVATAR_COLORS = [
  "oklch(0.55 0.18 264)",
  "oklch(0.55 0.15 200)",
  "oklch(0.55 0.15 150)",
  "oklch(0.55 0.18 330)",
  "oklch(0.50 0.15 30)",
  "oklch(0.50 0.12 280)",
];

function getInitial(name: string) {
  return name.trim()[0].toUpperCase();
}

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const orphans = [
  {
    name: "Stina",
    country: "Kosovo",
    description:
      "Stina lives in Kosovo. She likes to collect cuddly bears and her dream is to become a police officer! She lives with her mother and older brother.",
    years: "2017-2027",
  },
  {
    name: "Kalilou",
    country: "Mali",
    description:
      "Kalilou lives with his mother in Mali and is a student in fourth grade. Kalilou loves playing football with his friends after school and he is a creative artist.",
    years: "2017-2030",
  },
  {
    name: "Muhammed",
    country: "Palestine",
    description:
      "Muhammed lives in Palestine with his mother. He loves collecting sea shells and swimming in his free time. Muhammed's dream is to become a teacher!",
    years: "2017-2023",
  },
  {
    name: "Marah",
    country: "Palestine",
    description:
      "Marah lives with her mother and three siblings in Palestine. She is currently eight years old.",
    years: "2021-2029",
  },
  {
    name: "Ali",
    country: "Palestine",
    description: "Ali lives in Palestine and is currently 5 years old.",
    years: "2025-2026",
  },
  {
    name: "Hayat",
    country: "Palestine",
    description:
      "Hayat lives with her mother in Palestine. She is currently four years old.",
    years: "2025-2026",
  },
  {
    name: "Malek",
    country: "Palestine",
    description: "Malek lives in Palestine and is currently three years old.",
    years: "2025-2026",
  },
  {
    name: "Mariam",
    country: "Palestine",
    description:
      "Mariam lives with her mother in Palestine. She is currently zero years old.",
    years: "2025-2026",
  },
  {
    name: "Sela",
    country: "Palestine",
    description: "Sela lives in Palestine and is currently three years old.",
    years: "2025-2026",
  },
];

const pastSponsorships = [
  "Yasin Hassoun",
  "Abdul Karim Jaber",
  "AbdulRahman Brijwee",
  "Hashim Mushtaq",
  "Seemab Sadiq",
  "Marwa Mohammad",
  "Mena Rahmat Gul",
  "Abdur Rahman",
  "Toyaffa Alam Shad",
  "Sughra Akhter",
  "Tariq Shah",
  "Syeda Umama Sherazi",
  "Muhammed Abu Hendy",
];

export default function Orphans() {
  useScrollReveal();

  return (
    <div className="orphans">
      <section className="hero hero--image">
        <img
          className="hero-bg-img"
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1400&q=80"
          alt=""
          loading="eager"
        />
        <div className="hero-content">
          <h1>Meet Our Children</h1>
          <p>
            Every child has a story. Get to know the orphans whose lives we're
            changing together.
          </p>
        </div>
      </section>

      {/* Orphan Profiles */}
      <section className="section orphan-profiles-section">
        <div className="container">
          <div className="orphan-grid">
            {orphans.map((child, i) => (
              <div
                className={`card orphan-card reveal stagger-${(i % 6) + 1}`}
                key={i}
              >
                <span
                  className="orphan-avatar"
                  style={{ background: getColor(child.name) }}
                >
                  {getInitial(child.name)}
                </span>
                <h4>{child.name}</h4>
                <p className="orphan-detail">
                  {COUNTRY_FLAGS[child.country] || ""} {child.country}
                </p>
                <p className="orphan-bio">{child.description}</p>
                <span className="orphan-status sponsored">
                  Sponsored {child.years}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Sponsorships */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Past Sponsorships</h2>
          <div className="past-sponsorships reveal">
            <ul className="past-list">
              {pastSponsorships.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="reveal">Sponsor a Child Today</h2>
          <p className="reveal">
            Your support provides education, healthcare, and hope for children
            who need it most.
          </p>
          <a
            href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn reveal"
          >
            Donate Now
          </a>
        </div>
      </section>
    </div>
  );
}
