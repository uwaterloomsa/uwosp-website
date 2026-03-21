import {
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Contact.css";

export default function Contact() {
  useScrollReveal();

  return (
    <div className="contact">
      <section className="hero hero--image">
        <img
          className="hero-bg-img"
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80"
          alt=""
          loading="eager"
        />
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>
            Have a question, want to volunteer, or make a donation? Reach out to
            us!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Info sidebar */}
            <div className="contact-info reveal">
              <div className="contact-info-card">
                <span className="icon-block">
                  <EnvelopeSimple size={24} weight="duotone" />
                </span>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:uworphansp@gmail.com">uworphansp@gmail.com</a>
                </div>
              </div>
              <div className="contact-info-card">
                <span className="icon-block">
                  <InstagramLogo size={24} weight="duotone" />
                </span>
                <div>
                  <h4>Instagram</h4>
                  <a
                    href="https://instagram.com/uwaterlooOSP"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @uwaterlooOSP
                  </a>
                </div>
              </div>
              <div className="contact-info-card">
                <span className="icon-block">
                  <LinkedinLogo size={24} weight="duotone" />
                </span>
                <div>
                  <h4>LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/company/uw-orphan-sponsorship-program"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    UW Orphan Sponsorship Program
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              className="contact-form card reveal stagger-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-group">
                <label htmlFor="c-name">Name *</label>
                <input
                  type="text"
                  id="c-name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-email">Email *</label>
                <input
                  type="email"
                  id="c-email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-phone">Phone Number</label>
                <input
                  type="tel"
                  id="c-phone"
                  placeholder="Your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-msg">Message *</label>
                <textarea
                  id="c-msg"
                  rows={5}
                  placeholder="How can we help?"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
