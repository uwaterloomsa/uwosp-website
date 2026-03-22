import { useState, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import { faqService } from "../services/siteCollections";
import type { FAQ } from "../types/collections";
import "./FAQs.css";

const defaultFaqs = [
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
  const [dbFaqs, setDbFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const unsub = faqService.onItems(setDbFaqs);
    return unsub;
  }, []);

  const faqs =
    dbFaqs.length > 0
      ? dbFaqs
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((f) => ({ q: f.question, a: f.answer }))
      : defaultFaqs;

  return (
    <div className="faqs-page">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=80"
        contentKey="faqs.hero.image"
      >
        <EditableText as="h1" contentKey="faqs.hero.title" fallback="FAQs" />
        <EditableText
          as="p"
          contentKey="faqs.hero.subtitle"
          fallback="Frequently asked questions about UWOSP."
        />
      </ParallaxHero>

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
                <div className={`faq-answer ${openIndex === i ? "open" : ""}`}>
                  <div className="faq-answer-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
