import { useState } from "react";
import { FileText } from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import "./Finances.css";

const reports: { name: string; year: number; url: string }[] = [
  {
    name: "Spring 2024",
    year: 2024,
    url: "https://cdn.shopify.com/s/files/1/0251/8210/9742/files/Finance_Report_Spring_2024.pdf?v=1739831498",
  },
  {
    name: "Winter 2024",
    year: 2024,
    url: "https://cdn.shopify.com/s/files/1/0251/8210/9742/files/Finance_Report_Winter_2024.pdf?v=1737929398",
  },
  {
    name: "Fall 2023",
    year: 2023,
    url: "https://cdn.shopify.com/s/files/1/0251/8210/9742/files/Finance_Report_Fall_2023_2.pdf?v=1739831531",
  },
  {
    name: "Spring 2023",
    year: 2023,
    url: "https://cdn.shopify.com/s/files/1/0251/8210/9742/files/Finance_Report_Spring_2023.pdf?v=1712681840",
  },
  {
    name: "Winter 2023",
    year: 2023,
    url: "https://cdn.shopify.com/s/files/1/0251/8210/9742/files/Finance_Report_Winter_2023.pdf?v=1704913801",
  },
];

const years = ["ALL", "2024", "2023"];

export default function Finances() {
  useScrollReveal();
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL"
      ? reports
      : reports.filter((r) => r.year === Number(filter));

  return (
    <div className="finances">
      <ParallaxHero imgSrc="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=80">
        <h1>Financial Reports</h1>
        <p>View our financial statements for previous terms.</p>
      </ParallaxHero>

      <section className="section">
        <div className="container">
          <div className="finance-filters reveal">
            {years.map((y) => (
              <button
                key={y}
                className={`filter-chip ${filter === y ? "active" : ""}`}
                onClick={() => setFilter(y)}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="reports-grid">
            {filtered.map((report, i) => (
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card report-card reveal stagger-${(i % 6) + 1}`}
                key={i}
              >
                <FileText size={32} weight="duotone" />
                <h4>{report.name}</h4>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
