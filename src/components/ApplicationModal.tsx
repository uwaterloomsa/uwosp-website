import { useState, useRef } from "react";
import {
  X,
  PaperPlaneTilt,
  CheckCircle,
  FileArrowUp,
} from "@phosphor-icons/react";
import { submitApplication, uploadResume } from "../services/postings";
import { ref, update } from "firebase/database";
import { db } from "../firebase";
import type { Posting } from "../types/postings";
import "./ApplicationModal.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please upload a PDF or Word document.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File must be under 5 MB.");
      e.target.value = "";
      return;
    }
    setError("");
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const appId = await submitApplication({
        postingId: posting.id,
        postingTitle: posting.title,
        name,
        email,
        program,
        whyInterested,
        experience,
      });

      if (resumeFile) {
        const resumeUrl = await uploadResume(resumeFile, appId);
        await update(ref(db, `applications/${appId}`), { resumeUrl });
      }

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
            <div className="form-group">
              <label htmlFor="apply-resume">Resume (optional)</label>
              <div
                className={`apply-file-drop ${resumeFile ? "has-file" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <FileArrowUp size={24} weight="duotone" />
                <span>
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload PDF or Word document (max 5 MB)"}
                </span>
                <input
                  ref={fileInputRef}
                  id="apply-resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="apply-file-input"
                />
              </div>
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
