import './About.css'

const timeline = [
  { year: '2007', title: 'Founded', desc: 'UWOSP was established, inspired by similar orphan sponsorship initiatives across Canadian universities.' },
  { year: '2010', title: 'Growing Impact', desc: 'Expanded partnerships with Human Concern International and Islamic Relief to reach more children.' },
  { year: '2020', title: 'COVID Challenges', desc: 'Adapted to virtual operations and fundraising during the global pandemic, maintaining support for sponsored children.' },
  { year: '2021', title: 'Strong Rebound', desc: 'Returned to in-person events with renewed energy and a growing volunteer base.' },
  { year: '2022+', title: 'Significant Growth', desc: 'Experienced unprecedented growth in sponsorships, partnerships, and community engagement.' },
]

const team = [
  { name: 'President', emoji: '👤' },
  { name: 'VP Finance', emoji: '👤' },
  { name: 'VP Marketing', emoji: '👤' },
  { name: 'VP Events', emoji: '👤' },
  { name: 'VP Outreach', emoji: '👤' },
  { name: 'VP Operations', emoji: '👤' },
]

export default function About() {
  return (
    <div className="about">
      <section className="hero">
        <div className="hero-content">
          <h1>About UWOSP</h1>
          <p>Learn about our mission, history, and the people behind the program.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <div className="mission-statement card">
            <p>
              At the University of Waterloo, the Orphan Sponsorship Program aims to
              provide for the needs and well-being of orphans around the world through
              financial support. We believe that our support can help provide them with
              the security and tools to thrive. Through registered charities such as
              Human Concern International and Islamic Relief, we aim to sponsor children
              that have been orphaned as a result of war, extreme poverty, or disease.
              We hope to assist them in reaching their goals and building a brighter future.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <h2 className="section-title">Our History</h2>
          <p className="section-subtitle">A journey of growth, resilience, and impact.</p>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-marker">{item.year}</div>
                <div className="timeline-content card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Meet the dedicated students leading UWOSP.</p>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="card team-card" key={i}>
                <span className="team-avatar">{member.emoji}</span>
                <h4>{member.name}</h4>
                <p>UWOSP Executive</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Our Collaborators</h2>
          <p className="section-subtitle">We partner with established charities to deliver aid.</p>
          <div className="collab-grid">
            {['Islamic Relief', 'Human Concern International', 'IDRF'].map((name) => (
              <div className="card collab-card" key={name}>
                <span className="collab-icon">🤝</span>
                <h4>{name}</h4>
                <p>Registered charity partner helping us deliver impact to orphans worldwide.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
