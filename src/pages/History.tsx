import { Rocket, WifiHigh, TrendUp, Globe } from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./History.css";

const timeline = [
  {
    year: "2007",
    title: "Origins and Early Years",
    icon: Rocket,
    description:
      "The Orphan Sponsorship Program was founded at the University of Waterloo, beginning our mission to support orphans around the world through financial sponsorship via registered charities.",
  },
  {
    year: "2020",
    title: "Adapting to New Challenges",
    icon: WifiHigh,
    description:
      "When the pandemic changed how we operated, UWOSP adapted by moving events online, finding new ways to engage the community and continue raising funds for orphan sponsorship.",
  },
  {
    year: "2022",
    title: "A Period of Growth and Impact",
    icon: TrendUp,
    description:
      "UWOSP experienced significant growth, expanding our team, increasing the number of orphans sponsored, and running larger fundraising campaigns to support communities in need.",
  },
  {
    year: "Present",
    title: "Looking Forward",
    icon: Globe,
    description:
      "Today, UWOSP continues to grow and evolve, sponsoring orphans across multiple countries and collaborating with registered charities to maximize our positive impact on communities worldwide.",
  },
];

export default function History() {
  useScrollReveal();

  return (
    <div className="history">
      <section className="hero hero--image">
        <img
          className="hero-bg-img"
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80"
          alt=""
          loading="eager"
        />
        <div className="hero-content">
          <h1>Our History</h1>
          <p>
            A look back at the journey of the Orphan Sponsorship Program at the
            University of Waterloo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="timeline">
            {timeline.map((item, i) => {
              const Icon = item.icon;
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
