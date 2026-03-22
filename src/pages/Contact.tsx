import { useState } from "react";
import {
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  CheckCircle,
  LinkSimple,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import ParallaxHero from "../components/ParallaxHero";
import EditableText from "../components/EditableText";
import { useCms } from "../components/CmsProvider";
import "./Contact.css";

const subjectOptions = [
  { value: "", label: "Select a topic..." },
  { value: "general", label: "General Inquiry" },
  { value: "sponsorship", label: "Orphan Sponsorship" },
  { value: "volunteer", label: "Volunteering / Joining the Team" },
  { value: "donation", label: "Donations" },
  { value: "event", label: "Events & Campaigns" },
  { value: "partnership", label: "Partnerships / Sponsorships" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  useScrollReveal();
  const { get, isAdmin } = useCms();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    const subjectLabel =
      subjectOptions.find((o) => o.value === formData.subject)?.label ||
      "General Inquiry";
    const mailtoBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ATopic: ${subjectLabel}%0D%0A%0D%0A${encodeURIComponent(formData.message)}`;
    const mailtoUrl = `mailto:uworphansp@gmail.com?subject=${encodeURIComponent(`[UWOSP] ${subjectLabel}`)}&body=${mailtoBody}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 500);
  }

  return (
    <div className="contact">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80"
        contentKey="contact.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="contact.hero.title"
          fallback="Contact Us"
        />
        <EditableText
          as="p"
          contentKey="contact.hero.subtitle"
          fallback="Have a question, want to volunteer, or interested in partnering? We'd love to hear from you!"
          multiline
        />
      </ParallaxHero>

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
                  <EditableText
                    as="h4"
                    contentKey="contact.info.email.label"
                    fallback="Email"
                  />
                  <a
                    href={`mailto:${get("contact.info.email.url", "uworphansp@gmail.com")}`}
                  >
                    <EditableText
                      as="span"
                      contentKey="contact.info.email.value"
                      fallback="uworphansp@gmail.com"
                    />
                  </a>
                  {isAdmin && (
                    <EditableText
                      as="span"
                      className="contact-url-edit"
                      contentKey="contact.info.email.url"
                      fallback="uworphansp@gmail.com"
                    />
                  )}
                </div>
              </div>
              <div className="contact-info-card">
                <span className="icon-block">
                  <InstagramLogo size={24} weight="duotone" />
                </span>
                <div>
                  <EditableText
                    as="h4"
                    contentKey="contact.info.instagram.label"
                    fallback="Instagram"
                  />
                  <a
                    href={get(
                      "contact.info.instagram.url",
                      "https://instagram.com/uwaterlooOSP",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EditableText
                      as="span"
                      contentKey="contact.info.instagram.value"
                      fallback="@uwaterlooOSP"
                    />
                  </a>
                  {isAdmin && (
                    <EditableText
                      as="span"
                      className="contact-url-edit"
                      contentKey="contact.info.instagram.url"
                      fallback="https://instagram.com/uwaterlooOSP"
                    />
                  )}
                </div>
              </div>
              <div className="contact-info-card">
                <span className="icon-block">
                  <LinkedinLogo size={24} weight="duotone" />
                </span>
                <div>
                  <EditableText
                    as="h4"
                    contentKey="contact.info.linkedin.label"
                    fallback="LinkedIn"
                  />
                  <a
                    href={get(
                      "contact.info.linkedin.url",
                      "https://www.linkedin.com/company/uw-orphan-sponsorship-program",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EditableText
                      as="span"
                      contentKey="contact.info.linkedin.value"
                      fallback="UW Orphan Sponsorship Program"
                    />
                  </a>
                  {isAdmin && (
                    <EditableText
                      as="span"
                      className="contact-url-edit"
                      contentKey="contact.info.linkedin.url"
                      fallback="https://www.linkedin.com/company/uw-orphan-sponsorship-program"
                    />
                  )}
                </div>
              </div>
              <div className="contact-info-card">
                <span className="icon-block">
                  <LinkSimple size={24} weight="duotone" />
                </span>
                <div>
                  <EditableText
                    as="h4"
                    contentKey="contact.info.linktree.label"
                    fallback="Linktree"
                  />
                  <a
                    href={get(
                      "contact.info.linktree.url",
                      "https://linktr.ee/uwaterlooOSP",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EditableText
                      as="span"
                      contentKey="contact.info.linktree.value"
                      fallback="linktr.ee/uwaterlooOSP"
                    />
                  </a>
                  {isAdmin && (
                    <EditableText
                      as="span"
                      className="contact-url-edit"
                      contentKey="contact.info.linktree.url"
                      fallback="https://linktr.ee/uwaterlooOSP"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Form */}
            {sent ? (
              <div className="contact-success card reveal stagger-2">
                <CheckCircle size={56} weight="duotone" />
                <EditableText
                  as="h3"
                  contentKey="contact.success.title"
                  fallback="Message Ready!"
                />
                <EditableText
                  as="p"
                  contentKey="contact.success.body"
                  fallback="Your email client should have opened with the message pre-filled. If it didn't, please email us directly at uworphansp@gmail.com."
                  multiline
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSent(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                className="contact-form card reveal stagger-2"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="c-name">Name *</label>
                  <input
                    type="text"
                    id="c-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="c-email">Email *</label>
                  <input
                    type="email"
                    id="c-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@uwaterloo.ca"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="c-subject">Subject *</label>
                  <select
                    id="c-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    {subjectOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={!opt.value}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="c-msg">Message *</label>
                  <textarea
                    id="c-msg"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                >
                  <PaperPlaneTilt size={18} weight="bold" />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
