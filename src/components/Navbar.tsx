import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignIn, CaretDown } from "@phosphor-icons/react";
import ospLogo from "../images/uwosp.avif";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mainLinks = [
    { to: "/orphans", label: "Our Orphans" },
    { to: "/campaigns", label: "Campaigns" },
    { to: "/get-involved", label: "Join Us" },
    { to: "/contact", label: "Contact" },
  ];

  const aboutLinks = [
    { to: "/about", label: "Meet the Team" },
    { to: "/history", label: "Our History" },
    { to: "/finances", label: "Finances" },
    { to: "/faqs", label: "FAQs" },
  ];

  const isAboutActive = aboutLinks.some((l) => location.pathname === l.to);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => setMenuOpen(false)}
        >
          <img src={ospLogo} alt="UWOSP" className="brand-logo" />
          <span className="brand-text">UWOSP</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {/* About dropdown */}
          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              className={`nav-link nav-dropdown-trigger ${isAboutActive ? "active" : ""}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              About <CaretDown size={14} weight="bold" />
            </button>
            <div
              className={`nav-dropdown-menu ${dropdownOpen ? "open" : ""}`}
            >
              {aboutLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-dropdown-item ${location.pathname === link.to ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {mainLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/donate"
            className="btn btn-primary nav-donate"
          >
            Donate
          </Link>
          <Link
            to="/admin/login"
            className="nav-login"
          >
            <SignIn size={18} weight="bold" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
