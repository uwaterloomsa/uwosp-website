import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Home.css'
import orphansHero from '../images/orphans_landing.jpeg'

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = 0
    const duration = 2000
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      el.textContent = Math.floor(progress * target).toLocaleString() + '+'
      if (progress < 1) requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div className="stat-item">
      <span className="stat-number" ref={ref}>0</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

// ── SVG Icons ──────────────────────────────────────────────────

const IconApple = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4" />
    <path d="M8.5 6C5 6 2 9.5 2 14c0 4 2.5 8 5 8 1.5 0 2.5-.5 3.5-.5s2 .5 3.5.5c2.5 0 5-4 5-8 0-4.5-3-8-6.5-8z" />
  </svg>
)

const IconHeart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const IconCross = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20" />
  </svg>
)

const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconShare = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const IconHandshake = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
)

const IconDollar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const IconMapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const IconFlame = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c.5 0 1-.1 1.4-.4M12 22c-4.4 0-8-3.6-8-8 0-3 1.7-5.6 4.2-6.9C8.7 6.4 9 5.7 9 5c0-.8.2-1.5.6-2.1C10.8 4.5 12 6.1 12 8c0 .5.2 1 .5 1.3.3.3.8.5 1.3.5a2 2 0 0 0 2-2c0-.4-.1-.7-.2-1.1C17.3 7.9 20 10.8 20 14c0 4.4-3.6 8-8 8z" />
  </svg>
)

export default function Home() {
  return (
    <div className="home">

      {/* ── Hero ── */}
      <section
        className="hero home-hero"
        style={{ backgroundImage: `url(${orphansHero})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-eyebrow">University of Waterloo</span>
          <h1>Empowering Orphans,<br />Building Futures</h1>
          <p>
            At the University of Waterloo, the Orphan Sponsorship Program aims to
            provide for the needs and well-being of orphans around the world
            through financial support.
          </p>
          <div className="hero-buttons">
            <Link to="/donate" className="btn btn-primary">Donate Now</Link>
            <Link to="/about" className="btn btn-outline">Learn More</Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>↓</span>
        </div>
      </section>

      {/* ── Impact Banner ── */}
      <div className="impact-banner">
        <div className="impact-banner-inner">
          <span className="banner-item">
            <span className="banner-icon"><IconMapPin /></span>
            <strong>Active in 10+ countries</strong>
          </span>
          <span className="divider" aria-hidden="true" />
          <span className="banner-item">
            <span className="banner-icon"><IconHeart /></span>
            <strong>150+ orphans sponsored </strong> 
          </span>
          <span className="divider" aria-hidden="true" />
          <span className="banner-item">
            <span className="banner-icon"><IconClock /></span>
            <strong>17 years of service </strong> 
          </span>
          <span className="divider" aria-hidden="true" />
          <span className="banner-item">
            <span className="banner-icon"><IconDollar /></span>
            <strong>$200,000+ raised</strong>
          </span>
        </div>
      </div>

      {/* ── Mission Cards ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-subtitle">
            We believe our support can help provide orphans with the security and
            tools to thrive.
          </p>
          <div className="mission-grid">

            <div className="card mission-card">
              <div className="mission-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80"
                  alt="Children receiving nutritious food"
                  className="mission-img"
                  loading="lazy"
                />
              </div>
              <div className="mission-body">
                <span className="mission-icon"><IconApple /></span>
                <h3>Nutrition</h3>
                <p>Ensuring orphans have access to healthy meals and clean water for proper growth and development.</p>
              </div>
            </div>

            <div className="card mission-card">
              <div className="mission-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"
                  alt="Child receiving medical care"
                  className="mission-img"
                  loading="lazy"
                />
              </div>
              <div className="mission-body">
                <span className="mission-icon"><IconCross /></span>
                <h3>Healthcare</h3>
                <p>Providing medical care, vaccinations, and mental health support to children in need.</p>
              </div>
            </div>

            <div className="card mission-card">
              <div className="mission-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80"
                  alt="Children studying in school"
                  className="mission-img"
                  loading="lazy"
                />
              </div>
              <div className="mission-body">
                <span className="mission-icon"><IconBook /></span>
                <h3>Education</h3>
                <p>Giving orphans the opportunity to attend school and build a foundation for their futures.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Photo Break – Full Width ── */}
      <div className="photo-strip">
        <img
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1400&q=80"
          alt="Children together smiling"
          loading="lazy"
        />
        <div className="photo-strip-overlay">
          <blockquote>
            "Every child deserves a future full of hope, love, and opportunity."
          </blockquote>
        </div>
      </div>

      {/* ── Impact Stats ── */}
      <section className="section stats-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-subtitle">Together we are making a difference around the world.</p>
          <div className="stats-grid">
            <AnimatedCounter target={150} label="Orphans Sponsored" />
            <AnimatedCounter target={10} label="Countries Reached" />
            <AnimatedCounter target={17} label="Years of Service" />
            <AnimatedCounter target={200000} label="Funds Raised ($)" />
          </div>
        </div>
      </section>

      {/* ── Current Campaign ── */}
      <section className="section campaign-section">
        <div className="container">
          <div className="campaign-highlight card">
            <div className="campaign-img-side">
              <img
                src="https://images.unsplash.com/photo-1542401886-65d6c61db217?w=700&q=80"
                alt="Children in winter needing warmth"
                loading="lazy"
              />
            </div>
            <div className="campaign-text-side">
              <div className="campaign-badge">
                <span className="badge-icon"><IconFlame /></span>
                Active Campaign
              </div>
              <h2>Winter Warmth Drive 2025</h2>
              <p>
                Help us provide warm clothing, blankets, and heating supplies to
                orphans facing harsh winter conditions. Every contribution brings
                warmth and hope.
              </p>
              <Link to="/campaigns" className="btn btn-primary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How You Can Help ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How You Can Help</h2>
          <p className="section-subtitle">
            There are many ways to support our mission and make a lasting impact.
          </p>
          <div className="help-grid">

            <div className="card help-card">
              <div className="help-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80"
                  alt="Sponsor a child"
                  loading="lazy"
                />
              </div>
              <span className="help-icon"><IconHeart /></span>
              <h3>Sponsor a Child</h3>
              <p>Directly sponsor an orphan and follow their journey as they grow.</p>
              <Link to="/donate" className="btn btn-outline">Sponsor Now</Link>
            </div>

            <div className="card help-card">
              <div className="help-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                  alt="Volunteers working together"
                  loading="lazy"
                />
              </div>
              <span className="help-icon"><IconUsers /></span>
              <h3>Volunteer</h3>
              <p>Join our team and help organize events, campaigns, and outreach.</p>
              <Link to="/get-involved" className="btn btn-outline">Get Involved</Link>
            </div>

            <div className="card help-card">
              <div className="help-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
                  alt="Spread the word on social media"
                  loading="lazy"
                />
              </div>
              <span className="help-icon"><IconShare /></span>
              <h3>Spread the Word</h3>
              <p>Share our mission on social media and help raise awareness.</p>
              <Link to="/contact" className="btn btn-outline">Connect</Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="section partners-section">
        <div className="container">
          <h2 className="section-title">Our Partners</h2>
          <p className="section-subtitle">
            We work with registered charities to maximize our impact.
          </p>
          <div className="partners-grid">
            <a
              href="https://www.islamic-relief.org"
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card"
            >
              <span className="partner-icon"><IconHandshake /></span>
              <span>Islamic Relief</span>
            </a>
            <a
              href="https://hci.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card"
            >
              <span className="partner-icon"><IconHandshake /></span>
              <span>Human Concern International</span>
            </a>
            <a
              href="https://idrf.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="partner-card"
            >
              <span className="partner-icon"><IconGlobe /></span>
              <span>IDRF</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="final-cta">
        <div
          className="final-cta-bg"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?w=1400&q=80)',
          }}
        />
        <div className="final-cta-overlay" />
        <div className="final-cta-content container">
          <h2>Every Dollar Counts</h2>
          <p>
            Your generosity directly funds a child's meal, medical visit, or school
            year. Join hundreds of UWaterloo students making a real difference.
          </p>
          <Link to="/donate" className="btn btn-primary btn-lg">Donate Today</Link>
        </div>
      </section>

    </div>
  )
}