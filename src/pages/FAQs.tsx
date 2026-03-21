import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./FAQs.css";

const faqs = [
  {
    q: "What is OSP?",
    a: "The Orphan Sponsorship Program (OSP) is a student-run club at the University of Waterloo that aims to provide for the needs and well-being of orphans around the world through financial support via registered charities.",
  },
  {
    q: "How is the money to sponsor orphans collected?",
    a: "We collect funds through weekly booths on campus, public events, online fundraisers, and direct donations through our WUSA club page.",
  },
  {
    q: "What is the cost of sponsoring an orphan?",
    a: "The cost varies by region and charity partner, but typically ranges from $40–$60 per month. We work with registered charities like Islamic Relief and Human Concern International to ensure funds are used effectively.",
  },
  {
    q: "How many orphans are sponsored through the OSP?",
    a: "We currently sponsor 9 orphans across Kosovo, Mali, and Palestine, and have sponsored over a dozen orphans since our founding in 2007.",
  },
  {
    q: "How can I help the cause?",
    a: "You can donate, volunteer with our team, attend our events, or spread awareness on social media. Visit our Contact page to get in touch!",
  },
  {
    q: "Who can join the OSP?",
    a: "Any University of Waterloo student can join! We welcome volunteers from all faculties and backgrounds. Check our Contact page or reach out on social media to get involved.",
  },
  {
    q: "Are tax receipts provided?",
    a: "Tax receipts are provided by our registered charity partners (Islamic Relief, Human Concern International, IDRF) for donations made through them.",
  },
];

export default function FAQs() {
  useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faqs-page">
      <section className="hero hero--image">
        <img
          className="hero-bg-img"
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=80"
          alt=""
          loading="eager"
        />
        <div className="hero-content">
          <h1>FAQs</h1>
          <p>Frequently asked questions about UWOSP.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                className={`faq-item card reveal stagger-${(i % 6) + 1}`}
                key={i}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <h4>{faq.q}</h4>
                  <CaretDown
                    size={20}
                    weight="bold"
                    className={`faq-caret ${openIndex === i ? "open" : ""}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
