import { useEffect, useState } from "react";
import { Rocket, WifiHigh, TrendUp, Globe } from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import { timelineService } from "../services/siteCollections";
import type { TimelineItem } from "../types/collections";
import "./History.css";

const ICON_MAP: Record<string, typeof Rocket> = {
  Rocket,
  WifiHigh,
  TrendUp,
  Globe,
};

const defaultTimeline = [
  {
    year: "2007",
    title: "Origins and Early Years",
    icon: "Rocket",
    description:
      "The Orphan Sponsorship Program was founded at the University of Waterloo, beginning our mission to support orphans around the world through financial sponsorship via registered charities.",
  },
  {
    year: "2020",
    title: "Adapting to New Challenges",
    icon: "WifiHigh",
    description:
      "When the pandemic changed how we operated, UWOSP adapted by moving events online, finding new ways to engage the community and continue raising funds for orphan sponsorship.",
  },
  {
    year: "2022",
    title: "A Period of Growth and Impact",
    icon: "TrendUp",
    description:
      "UWOSP experienced significant growth, expanding our team, increasing the number of orphans sponsored, and running larger fundraising campaigns to support communities in need.",
  },
  {
    year: "Present",
    title: "Looking Forward",
    icon: "Globe",
    description:
      "Today, UWOSP continues to grow and evolve, sponsoring orphans across multiple countries and collaborating with registered charities to maximize our positive impact on communities worldwide.",
  },
];

export default function History() {
  useScrollReveal();
  const [dbItems, setDbItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    const unsub = timelineService.onItems(setDbItems);
    return unsub;
  }, []);

  return (
    <div className="history">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80"
        contentKey="history.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="history.hero.title"
          fallback="Our History"
        />
        <EditableText
          as="p"
          contentKey="history.hero.subtitle"
          fallback="A look back at the journey of the Orphan Sponsorship Program at the University of Waterloo."
          multiline
        />
      </ParallaxHero>

      <section className="section">
        <div className="container">
          <div className="timeline">
            {dbItems.length > 0
              ? dbItems
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((item, i) => {
                    const Icon = Globe;
                    return (
                      <div
                        className={`timeline-item reveal ${i % 2 === 0 ? "stagger-1" : "stagger-2"}`}
                        key={item.id}
                      >
                        <div className="timeline-marker">
                          <span className="timeline-icon-circle">
                            <Icon size={18} weight="duotone" />
                          </span>
                          <span className="timeline-year">{item.year}</span>
                        </div>
                        <div className="card timeline-card">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    );
                  })
              : defaultTimeline.map((item, i) => {
                  const Icon = ICON_MAP[item.icon] || Globe;
                  return (
                    <div
                      className={`timeline-item reveal ${i % 2 === 0 ? "stagger-1" : "stagger-2"}`}
                      key={i}
                    >
                      <div className="timeline-marker">
                        <span className="timeline-icon-circle">
                          <Icon size={18} weight="duotone" />
                        </span>
                        <span className="timeline-year">{item.year}</span>
                      </div>
                      <div className="card timeline-card">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
}
