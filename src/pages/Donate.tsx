import { Link } from 'react-router-dom'
import './Donate.css'

const tiers = [
  { name: 'Monthly Sponsor', amount: '$40/mo', emoji: '❤️', desc: 'Provide ongoing support covering food, education, and healthcare for one orphan.', highlight: false },
  { name: 'Annual Sponsor', amount: '$480/yr', emoji: '⭐', desc: 'Commit to a full year of sponsorship and receive regular updates on your sponsored child.', highlight: true },
  { name: 'One-Time Gift', amount: 'Any amount', emoji: '🎁', desc: 'Make a one-time contribution to our general fund supporting orphans across all regions.', highlight: false },
]

const impacts = [
  { amount: '$10', impact: 'Provides school supplies for one child for a month', emoji: '📖' },
  { amount: '$40', impact: 'Covers food, healthcare, and education for one orphan for a month', emoji: '🍎' },
  { amount: '$100', impact: 'Provides winter clothing and supplies for a family', emoji: '🧥' },
  { amount: '$480', impact: 'Sponsors one orphan for an entire year', emoji: '🌟' },
]

export default function Donate() {
  return (
    <div className="donate">
      <section className="hero">
        <div className="hero-content">
          <h1>Make a Donation</h1>
          <p>Your generosity can change a child's life. Every dollar makes a difference.</p>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Sponsorship Options</h2>
          <p className="section-subtitle">Choose how you'd like to support orphans in need.</p>
          <div className="tiers-grid">
            {tiers.map((tier, i) => (
              <div className={`card tier-card ${tier.highlight ? 'tier-highlight' : ''}`} key={i}>
                <span className="tier-emoji">{tier.emoji}</span>
                <h3>{tier.name}</h3>
                <div className="tier-amount">{tier.amount}</div>
                <p>{tier.desc}</p>
                <a
                  href="https://www.launchgood.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Donate
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Your Impact</h2>
          <p className="section-subtitle">See how your donation translates into real change.</p>
          <div className="impact-grid">
            {impacts.map((item, i) => (
              <div className="card impact-card" key={i}>
                <span className="impact-emoji">{item.emoji}</span>
                <div className="impact-amount">{item.amount}</div>
                <p>{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section donate-cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Help?</h2>
          <p className="section-subtitle">
            Donations are processed through our verified charity partners and are tax-deductible.
          </p>
          <div className="donate-cta-buttons">
            <a
              href="https://www.launchgood.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Donate on LaunchGood
            </a>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
