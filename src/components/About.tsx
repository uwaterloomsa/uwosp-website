import './About.css'

const About = () => {
  const features = [
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Pushing the boundaries of technology with creative solutions and cutting-edge development practices.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Building a supportive community where students learn, share knowledge, and grow together.'
    },
    {
      icon: '🌍',
      title: 'Open Source',
      description: 'Contributing to the global open source ecosystem and making technology accessible to all.'
    },
    {
      icon: '🎓',
      title: 'Learning',
      description: 'Providing hands-on experience with real-world projects and modern development workflows.'
    }
  ]

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <span className="section-badge">About Us</span>
          <h2 className="section-title">Building Tomorrow's Technology</h2>
          <p className="section-description">
            UWOSP is a vibrant community of students at the University of Waterloo 
            dedicated to creating impactful open source projects and fostering a 
            culture of collaboration and innovation.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="about-cta">
          <div className="cta-content">
            <h3 className="cta-title">Join Our Community</h3>
            <p className="cta-description">
              Whether you're a beginner or an experienced developer, there's a place for you in UWOSP. 
              Start contributing to open source projects and make a difference!
            </p>
            <div className="cta-buttons">
              <a 
                href="https://github.com/uwaterloomsa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button primary"
              >
                Get Started
              </a>
              <button className="cta-button secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
