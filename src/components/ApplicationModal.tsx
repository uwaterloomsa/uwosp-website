import { useState } from "react";
import { X, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import { submitApplication } from "../services/postings";
import type { Posting } from "../types/postings";
import "./ApplicationModal.css";

interface Props {
  posting: Posting;
  onClose: () => void;
}

export default function ApplicationModal({ posting, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [whyInterested, setWhyInterested] = useState("");
  const [experience, setExperience] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await submitApplication({
        postingId: posting.id,
        postingTitle: posting.title,
        name,
        email,
        program,
        whyInterested,
        experience,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="apply-overlay" onClick={onClose}>
      <div className="apply-modal card" onClick={(e) => e.stopPropagation()}>
        <div className="apply-modal-header">
          <h2>Apply: {posting.title}</h2>
          <button className="apply-close" onClick={onClose}>
            <X size={20} weight="bold" />
          </button>
        </div>

        {submitted ? (
          <div className="apply-success">
            <CheckCircle size={56} weight="duotone" />
            <h3>Application Submitted!</h3>
            <p>
              Thank you for applying. We'll review your application and get back
              to you soon.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="apply-form" onSubmit={handleSubmit}>
            {error && <div className="apply-error">{error}</div>}
            <div className="form-group">
              <label htmlFor="apply-name">Full Name</label>
              <input
                id="apply-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apply-email">Email</label>
              <input
                id="apply-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@uwaterloo.ca"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apply-program">Program / Year</label>
              <input
                id="apply-program"
                type="text"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                placeholder="e.g. Computer Science, 2A"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apply-why">Why are you interested?</label>
              <textarea
                id="apply-why"
                rows={3}
                value={whyInterested}
                onChange={(e) => setWhyInterested(e.target.value)}
                placeholder="Tell us why this position excites you..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apply-exp">Relevant Experience</label>
              <textarea
                id="apply-exp"
                rows={3}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Describe any relevant skills or experience..."
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              <PaperPlaneTilt size={18} weight="bold" />
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
