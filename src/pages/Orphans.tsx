import { useEffect, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import {
  orphanService,
  pastSponsorshipService,
} from "../services/siteCollections";
import type { OrphanProfile, PastSponsorship } from "../types/collections";
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

const defaultOrphans = [
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

const defaultPastSponsorships = [
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
  const [dbOrphans, setDbOrphans] = useState<OrphanProfile[]>([]);
  const [dbPast, setDbPast] = useState<PastSponsorship[]>([]);

  useEffect(() => {
    const unsub1 = orphanService.onItems(setDbOrphans);
    const unsub2 = pastSponsorshipService.onItems(setDbPast);
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const orphans =
    dbOrphans.length > 0
      ? dbOrphans.map((o) => ({
          name: o.name,
          country: o.country,
          description: o.description,
          years: o.years,
        }))
      : defaultOrphans;

  const pastSponsorships =
    dbPast.length > 0 ? dbPast.map((p) => p.name) : defaultPastSponsorships;

  return (
    <div className="orphans">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1400&q=80"
        contentKey="orphans.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="orphans.hero.title"
          fallback="Our Orphans"
        />
        <EditableText
          as="p"
          contentKey="orphans.hero.subtitle"
          fallback="Get to know more about the orphans we're currently sponsoring. 🧸"
        />
      </ParallaxHero>

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
          <EditableText
            as="h2"
            className="section-title reveal"
            contentKey="orphans.past.title"
            fallback="Past Sponsorships"
          />
          <div className="past-sponsorships reveal">
            <ul className="past-list">
              {pastSponsorships.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
