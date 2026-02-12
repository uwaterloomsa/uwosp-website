import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">UWOSP</span>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <a onClick={() => scrollToSection('hero')} className="navbar-link">Home</a>
          <a onClick={() => scrollToSection('about')} className="navbar-link">About</a>
          <a onClick={() => scrollToSection('projects')} className="navbar-link">Projects</a>
          <a href="https://github.com/uwaterloomsa" target="_blank" rel="noopener noreferrer" className="navbar-link">
            GitHub
          </a>
        </div>

        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
