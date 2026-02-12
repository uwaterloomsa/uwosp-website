import './Hero.css'

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-icon">🚀</span>
          <span>Building the Future of Open Source</span>
        </div>
        
        <h1 className="hero-title">
          University of Waterloo
          <br />
          <span className="gradient-text">Open Source Project</span>
        </h1>
        
        <p className="hero-description">
          A community of passionate developers, designers, and innovators 
          collaborating on cutting-edge open source projects. Join us in 
          making technology accessible for everyone.
        </p>
        
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToProjects}>
            Explore Projects
          </button>
          <a 
            href="https://github.com/uwaterloomsa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <span>View on GitHub</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-value">50+</div>
            <div className="stat-label">Contributors</div>
          </div>
          <div className="stat">
            <div className="stat-value">20+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat-value">1000+</div>
            <div className="stat-label">Commits</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
