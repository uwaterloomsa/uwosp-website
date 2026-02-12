import './GetInvolved.css'

const faqs = [
  { q: 'How much does it cost to sponsor an orphan?', a: 'Sponsorship costs vary by region but typically range from $40–$60/month through our charity partners.' },
  { q: 'Where does my money go?', a: 'All funds go through registered charities (Islamic Relief, HCI, IDRF, Human Appeal) and are used for food, healthcare, education, and shelter.' },
  { q: 'Can I choose which child to sponsor?', a: 'Yes! Through our partner charities, you can select a specific child or region to support.' },
]

export default function GetInvolved() {
  return (
    <div className="get-involved">
      <section className="hero">
        <div className="hero-content">
          <h1>Get Involved</h1>
          <p>Join our mission and make a real difference in the lives of orphans worldwide.</p>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Ways to Help</h2>
          <p className="section-subtitle">Every action, big or small, creates lasting change.</p>
          <div className="ways-grid">
            <div className="card ways-card">
              <span className="ways-icon">🙋</span>
              <h3>Volunteer</h3>
              <p>Join our executive team or help organize events on campus. We welcome all UW students!</p>
            </div>
            <div className="card ways-card">
              <span className="ways-icon">💰</span>
              <h3>Donate</h3>
              <p>Make a one-time or recurring donation to help sponsor orphans through our verified charity partners.</p>
            </div>
            <div className="card ways-card">
              <span className="ways-icon">📣</span>
              <h3>Spread Awareness</h3>
              <p>Follow us on social media, share our campaigns, and help others learn about our mission.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Volunteer Signup</h2>
          <p className="section-subtitle">Interested in joining our team? Fill out the form below.</p>
          <form className="volunteer-form card" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="vol-name">Full Name</label>
              <input type="text" id="vol-name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="vol-email">Email</label>
              <input type="email" id="vol-email" placeholder="you@uwaterloo.ca" />
            </div>
            <div className="form-group">
              <label htmlFor="vol-program">Program / Year</label>
              <input type="text" id="vol-program" placeholder="e.g. Computer Science, 2A" />
            </div>
            <div className="form-group">
              <label htmlFor="vol-interest">Area of Interest</label>
              <select id="vol-interest">
                <option value="">Select an area</option>
                <option value="events">Event Planning</option>
                <option value="marketing">Marketing &amp; Social Media</option>
                <option value="finance">Finance &amp; Fundraising</option>
                <option value="outreach">Community Outreach</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="vol-msg">Why do you want to volunteer?</label>
              <textarea id="vol-msg" rows={4} placeholder="Tell us a bit about yourself..." />
            </div>
            <button type="submit" className="btn btn-primary">Submit Application</button>
          </form>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item card" key={i}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
