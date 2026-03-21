import {
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
} from "@phosphor-icons/react";
import AnimatedBackground from "../components/AnimatedBackground";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Contact.css";

const faqs = [
  {
    q: "How can I sponsor an orphan?",
    a: "Visit our Donate page and choose a sponsorship tier, or contact us for more details.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: "Donations made through our registered charity partners (Islamic Relief, HCI, IDRF, Human Appeal) are tax-deductible.",
  },
  {
    q: "How do I know my money reaches the children?",
    a: "Our charity partners provide regular reports and updates on sponsored children, which we share with donors.",
  },
  {
    q: "Can I visit the children I sponsor?",
    a: "Visits are arranged through our charity partners on a case-by-case basis. Contact us for more information.",
  },
  {
    q: "How do I join the UWOSP team?",
    a: "Fill out the volunteer form on our Get Involved page or reach out to us directly via email.",
  },
];

export default function Contact() {
  useScrollReveal();

  return (
    <div className="contact">
      <section className="hero">
        <AnimatedBackground variant="hero" />
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>Have questions? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Form */}
            <form
              className="contact-form card reveal-left"
              onSubmit={(e) => e.preventDefault()}
            >
              <h2>Send a Message</h2>
              <div className="form-group">
                <label htmlFor="c-name">Name</label>
                <input type="text" id="c-name" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="c-email">Email</label>
                <input
                  type="email"
                  id="c-email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-msg">Message</label>
                <textarea id="c-msg" rows={5} placeholder="How can we help?" />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>

            {/* Info */}
            <div className="contact-info reveal-right">
              <div className="card info-card">
                <span className="info-icon">
                  <EnvelopeSimple size={32} weight="duotone" />
                </span>
                <h4>Email</h4>
                <p>uwosp@uwaterloo.ca</p>
              </div>
              <div className="card info-card">
                <span className="info-icon">
                  <InstagramLogo size={32} weight="duotone" />
                </span>
                <h4>Instagram</h4>
                <p>@uwosp</p>
              </div>
              <div className="card info-card">
                <span className="info-icon">
                  <LinkedinLogo size={32} weight="duotone" />
                </span>
                <h4>LinkedIn</h4>
                <p>UWOSP</p>
              </div>
              <div className="card info-card">
                <span className="info-icon">
                  <MapPin size={32} weight="duotone" />
                </span>
                <h4>Location</h4>
                <p>University of Waterloo, ON, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title reveal">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item card" key={i}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
