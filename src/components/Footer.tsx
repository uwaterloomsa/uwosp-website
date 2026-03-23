import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartStraight,
  InstagramLogo,
  FacebookLogo,
  LinkedinLogo,
  CheckCircle,
} from "@phosphor-icons/react";
import {
  ref,
  push,
  set,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { db } from "../firebase";
import "./Footer.css";

export default function Footer() {
  const [nlEmail, setNlEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<
    "idle" | "sending" | "done" | "duplicate" | "error"
  >("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlStatus("sending");
    try {
      // Check for duplicate
      const q = query(
        ref(db, "newsletter"),
        orderByChild("email"),
        equalTo(nlEmail.toLowerCase()),
      );
      const snap = await get(q);
      if (snap.exists()) {
        setNlStatus("duplicate");
        return;
      }
      const newRef = push(ref(db, "newsletter"));
      await set(newRef, {
        email: nlEmail.toLowerCase(),
        subscribedAt: Date.now(),
      });
      setNlStatus("done");
      setNlEmail("");
    } catch {
      setNlStatus("error");
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3>Stay Updated</h3>
          <p>
            Subscribe to our newsletter to receive updates on upcoming events
            and fundraisers!
          </p>
          {nlStatus === "done" ? (
            <p className="newsletter-success">
              <CheckCircle size={20} weight="bold" /> You're subscribed!
            </p>
          ) : (
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Sign up to our mailing list"
                aria-label="Email for newsletter"
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={nlStatus === "sending"}
              >
                {nlStatus === "sending" ? "..." : "Subscribe"}
              </button>
            </form>
          )}
          {nlStatus === "duplicate" && (
            <p className="newsletter-msg">You're already subscribed!</p>
          )}
          {nlStatus === "error" && (
            <p className="newsletter-msg newsletter-msg--error">
              Something went wrong. Please try again.
            </p>
          )}
          <div className="footer-social">
            <span>Follow us on:</span>
            <a
              href="https://www.facebook.com/ospuw/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UWOSP on Facebook"
            >
              <FacebookLogo size={22} weight="duotone" />
            </a>
            <a
              href="https://www.instagram.com/uw_osp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UWOSP on Instagram"
            >
              <InstagramLogo size={22} weight="duotone" />
            </a>
            <a
              href="https://www.linkedin.com/company/uwosp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UWOSP on LinkedIn"
            >
              <LinkedinLogo size={22} weight="duotone" />
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>About</h4>
            <Link to="/orphans">Our Orphans</Link>
            <Link to="/history">Our History</Link>
            <Link to="/campaigns">Events &amp; Campaigns</Link>
          </div>

          <div className="footer-col">
            <h4>Finances</h4>
            <a
              href="https://cdn.shopify.com/s/files/1/0251/8210/9742/files/Finance_Report_Spring_2024.pdf?v=1739831498"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spring 2024
            </a>
            <Link to="/finances">All Reports</Link>
          </div>

          <div className="footer-col">
            <h4>Learn More</h4>
            <Link to="/about">Meet the Team</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faqs">FAQs</Link>
            <a
              href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} UWOSP</p>
          <p>
            Made with{" "}
            <HeartStraight
              size={16}
              weight="fill"
              color="#1d4ed8"
              style={{ verticalAlign: "middle" }}
            />{" "}
            by the <Link to="/about">OSP Team</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
