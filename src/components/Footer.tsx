import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>❤️ UWOSP</h3>
            <p>
              The University of Waterloo Orphan Sponsorship Program — empowering
              orphans and building brighter futures since 2007.
            </p>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
              <a href="mailto:uwosp@uwaterloo.ca" aria-label="Email">✉️</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/about">About Us</Link>
            <Link to="/orphans">Our Orphans</Link>
            <Link to="/campaigns">Campaigns</Link>
            <Link to="/donate">Donate</Link>
          </div>

          <div className="footer-col">
            <h4>Get Involved</h4>
            <Link to="/get-involved">Volunteer</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/donate">Sponsor a Child</Link>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p>Stay updated with our latest campaigns and impact stories.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" aria-label="Email for newsletter" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} UWOSP — University of Waterloo Orphan Sponsorship Program. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
