import { Link } from "react-router-dom";
import { UserCircle } from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Orphans.css";

const orphans = [
  { name: "Ahmad", age: 8, country: "Syria", status: "Sponsored" },
  { name: "Fatima", age: 6, country: "Palestine", status: "Needs Sponsor" },
  { name: "Yusuf", age: 10, country: "Yemen", status: "Sponsored" },
  { name: "Amina", age: 7, country: "Somalia", status: "Needs Sponsor" },
  { name: "Omar", age: 9, country: "Syria", status: "Sponsored" },
  { name: "Mariam", age: 5, country: "Palestine", status: "Needs Sponsor" },
  { name: "Hassan", age: 11, country: "Yemen", status: "Sponsored" },
  { name: "Zahra", age: 8, country: "Somalia", status: "Needs Sponsor" },
];

export default function Orphans() {
  useScrollReveal();

  return (
    <div className="orphans">
      <section className="hero">
        <AnimatedBackground variant="hero" />
        <div className="hero-content">
          <h1>Our Impact</h1>
          <p>
            Meet the children whose lives you can help transform through
            sponsorship.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">How Sponsorship Works</h2>
          <p className="section-subtitle reveal">
            Through our charity partners, your contributions directly support
            orphans who have lost parents due to war, extreme poverty, or
            disease.
          </p>
          <div className="how-grid">
            <div className="card how-card reveal stagger-1">
              <span className="how-step">1</span>
              <h3>Choose to Sponsor</h3>
              <p>
                Select a child or contribute to our general fund to support
                orphans in need.
              </p>
            </div>
            <div className="card how-card reveal stagger-2">
              <span className="how-step">2</span>
              <h3>Funds Are Delivered</h3>
              <p>
                Your donation goes through registered charities like Islamic
                Relief and HCI.
              </p>
            </div>
            <div className="card how-card reveal stagger-3">
              <span className="how-step">3</span>
              <h3>Lives Are Changed</h3>
              <p>
                Orphans receive food, healthcare, education, and the support
                they need to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Orphan Profiles */}
      <section className="section orphan-profiles-section">
        <div className="container">
          <h2 className="section-title reveal">Children We Support</h2>
          <p className="section-subtitle reveal">
            Each child has a unique story. Your sponsorship can make all the
            difference.
          </p>
          <div className="orphan-grid">
            {orphans.map((child, i) => (
              <div className="card orphan-card" key={i}>
                <span className="orphan-avatar">
                  <UserCircle size={48} weight="duotone" />
                </span>
                <h4>{child.name}</h4>
                <p className="orphan-detail">
                  Age {child.age} · {child.country}
                </p>
                <span
                  className={`orphan-status ${child.status === "Sponsored" ? "sponsored" : "needs"}`}
                >
                  {child.status}
                </span>
              </div>
            ))}
          </div>
          <div className="orphan-cta">
            <Link to="/donate" className="btn btn-primary">
              Sponsor a Child
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
