import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Home.css'
import orphansHero from '../images/orphans_landing.jpeg'

import idrfLogo from '../images/idrf.webp'
import islamicReliefLogo from '../images/islamic_relief.png'
import nzfLogo from '../images/national_zakat_foundation.png'
import nisaLogo from '../images/nisa_homes.png'

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

// ── SVG Icons — filled, bold ───────────────────────────────────

const IconApple = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.5 2.5c.8-.9 1.4-2.1 1.3-3.3-1.2.1-2.7.8-3.5 1.8-.8.8-1.5 2.1-1.3 3.3 1.3.1 2.7-.6 3.5-1.8z" opacity="0.85"/>
    <path d="M18.9 8.3c-.7-.9-1.8-1.5-3-1.5-1.4 0-2 .7-3 .7s-1.7-.7-3-.7c-1.1 0-2.3.6-3 1.6C5.5 10 5 11.8 5 13.6c0 2.6.9 5.3 2.3 7.1.7.9 1.5 1.8 2.6 1.8 1 0 1.4-.6 2.7-.6 1.3 0 1.6.6 2.7.6 1.1 0 1.9-.9 2.6-1.8.5-.7.9-1.4 1.2-2.2-1.5-.6-2.6-2.1-2.6-3.8 0-1.6.9-3 2.4-3.7-.9-1.1-2.2-1.7-3.5-1.7l-.5.1z"/>
  </svg>
)

const IconHeart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

const IconCross = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-4V1h-6v2H5C3.9 3 3 3.9 3 5v2c0 1.1.9 2 2 2h1v9c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3V9h1c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14h-2v-7h2v7zm4 0h-2v-7h2v7z"/>
    <rect x="3" y="3" width="18" height="4" rx="1" ry="1"/>
  </svg>
)

const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" opacity="0.9"/>
    <path d="M6 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h1a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"/>
    <path d="M6 17v3l3-3H6z"/>
  </svg>
)

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="7" r="4"/>
    <path d="M17 11c1.7 0 3-1.3 3-3s-1.3-3-3-3"/>
    <path d="M1 21v-1a8 8 0 0 1 16 0v1H1z"/>
    <path d="M17 11c2.2 0 4 1.8 4 4v2h-4" opacity="0.75"/>
  </svg>
)

const IconShare = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
)

const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
)

const IconHandshake = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 5.88L9.11 4H4v12h2.5l2 2h8l1-1V9.76L14.12 8H11V5.88zM6 14H5V5h3.38L10 6.62V9h4.38L16 10.62V16h-6.5L8 14H6z"/>
    <path d="M10 14l2 2 5-5-1.5-1.5L11.5 14 10 12.5l-1.5 1.5z" opacity="0.9"/>
  </svg>
)

const IconDollar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
  </svg>
)

const IconMapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
)

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
)

const IconFlame = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
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
            <strong>150+ orphans sponsored</strong>
          </span>
          <span className="divider" aria-hidden="true" />
          <span className="banner-item">
            <span className="banner-icon"><IconClock /></span>
            <strong>17 years of service</strong>
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

      {/* ── Collaborators ── */}
      <section className="section partners-section">
        <div className="container">
          <h2 className="section-title">Our Collaborators</h2>
          <p className="section-subtitle">
            We work with registered charities to maximize our impact.
          </p>
          <div className="partners-grid">
            <a href="https://www.islamicreliefcanada.org" target="_blank" rel="noopener noreferrer" className="partner-card">
              <div className="partner-logo-wrap">
              <img src={islamicReliefLogo} alt="Islamic Relief" className="partner-logo partner-logo-xl" />
              </div>
            </a>
            <a href="https://www.nisafoundation.ca/programs/nisa-homes" target="_blank" rel="noopener noreferrer" className="partner-card">
              <div className="partner-logo-wrap">
              <img src={nisaLogo} alt="Nisa Homes" className="partner-logo partner-logo-xl" />
              </div>
            </a>
            <a href="https://idrf.ca" target="_blank" rel="noopener noreferrer" className="partner-card">
              <div className="partner-logo-wrap">
              <img src={idrfLogo} alt="International Development and Relief Foundation" className="partner-logo partner-logo-xl" />
              </div>
            </a>
            <a href="https://www.nzfcanada.com" target="_blank" rel="noopener noreferrer" className="partner-card">
              <div className="partner-logo-wrap">
              <img src={nzfLogo} alt="National Zakat Foundation" className="partner-logo partner-logo-xl" />
              </div>
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