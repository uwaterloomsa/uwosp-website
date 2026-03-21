import { Link } from "react-router-dom";
import {
  HeartStraight,
  InstagramLogo,
  FacebookLogo,
  LinkedinLogo,
  Newspaper,
} from "@phosphor-icons/react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3>Add Impact to Your Inbox</h3>
          <p>
            Get updates on our campaigns, orphan stories, and upcoming events.
          </p>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email for newsletter"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
          <div className="footer-newsletter-extra">
            <a
              href="https://cdn.shopify.com/s/files/1/0251/8210/9742/files/February_2025_OSP_Monthly_Newsletter.pdf?v=1742059567"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-newsletter-link"
            >
              <Newspaper size={16} weight="bold" /> Read Our Latest Newsletter
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>About</h4>
            <Link to="/orphans">Our Orphans</Link>
            <Link to="/history">Our History</Link>
            <Link to="/about">Meet the Team</Link>
          </div>

          <div className="footer-col">
            <h4>Get Involved</h4>
            <Link to="/campaigns">Events &amp; Campaigns</Link>
            <Link to="/get-involved">Open Roles</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="/finances">Financial Reports</Link>
            <Link to="/faqs">FAQs</Link>
            <a
              href="https://wusa.ca/product/uw-orphan-sponsorship-program/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate via WUSA
            </a>
          </div>
        </div>

        <div className="footer-social">
          <a
            href="https://www.facebook.com/ospuw/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="UWOSP on Facebook"
          >
            <FacebookLogo size={22} weight="fill" />
          </a>
          <a
            href="https://www.instagram.com/uw_osp/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="UWOSP on Instagram"
          >
            <InstagramLogo size={22} weight="fill" />
          </a>
          <a
            href="https://www.linkedin.com/company/uwosp/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="UWOSP on LinkedIn"
          >
            <LinkedinLogo size={22} weight="fill" />
          </a>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} UWOSP — University of Waterloo
            Orphan Sponsorship Program
          </p>
          <p>
            Made with{" "}
            <HeartStraight
              size={16}
              weight="fill"
              color="#1d4ed8"
              style={{ verticalAlign: "middle" }}
            />{" "}
            by the <Link to="/about">UWOSP Team</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
