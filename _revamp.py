"""Revamp all CSS files with warm editorial design + complex animations."""
import os

BASE = os.path.dirname(os.path.abspath(__file__))

def write(rel_path, content):
    path = os.path.join(BASE, rel_path)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content.lstrip('\n'))
    print(f'  ok {rel_path}')

print('Writing all CSS files...\n')

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# index.css — Global Design System
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/index.css', """
:root {
  --bg: #faf8f5;
  --bg-alt: #f3efe8;
  --surface: #ffffff;
  --primary: #c2410c;
  --primary-hover: #ea580c;
  --primary-subtle: rgba(194, 65, 12, 0.05);
  --text: #292524;
  --text-heading: #0c0a09;
  --text-muted: #78716c;
  --text-subtle: #a8a29e;
  --border: rgba(28, 25, 23, 0.06);
  --border-hover: rgba(194, 65, 12, 0.15);

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.02);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.06), 0 8px 10px rgba(0,0,0,0.03);

  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-body: 'Outfit', system-ui, sans-serif;
  --max-width: 1200px;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  font-weight: 400;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  text-wrap: pretty;
}

h1, h2, h3 {
  font-family: var(--font-display);
  color: var(--text-heading);
  line-height: 1.1;
  font-weight: 700;
  text-wrap: balance;
}

h4, h5, h6 {
  font-family: var(--font-body);
  color: var(--text-heading);
  line-height: 1.3;
  font-weight: 600;
}

a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.15s ease-out;
}

a:hover { color: var(--primary-hover); }

img { max-width: 100%; display: block; }
ul { list-style: none; }
button, input, textarea, select { font-family: inherit; font-size: inherit; }

/* ═══ Container ═══ */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  position: relative;
  z-index: 1;
}

/* ═══ Section ═══ */
.section {
  padding: clamp(5rem, 12vw, 8rem) 0;
  position: relative;
}

.section-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  text-align: center;
  margin-bottom: 0.75rem;
}

.section-title::after {
  content: '';
  display: block;
  width: 48px;
  height: 3px;
  background: var(--primary);
  margin: 1rem auto 0;
  border-radius: 2px;
}

.section-subtitle {
  text-align: center;
  color: var(--text-muted);
  max-width: 540px;
  margin: 0 auto 4rem;
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.8;
}

/* ═══ Buttons ═══ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 2.2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
}

.btn:active {
  transform: scale(0.96) !important;
  transition-duration: 0.08s;
}

.btn-primary {
  background: var(--primary);
  color: #fefefe;
  box-shadow: 0 4px 12px rgba(194, 65, 12, 0.2);
}

.btn-primary:hover {
  background: var(--primary-hover);
  color: #fefefe;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(194, 65, 12, 0.25);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid rgba(194, 65, 12, 0.18);
  transition: transform 0.15s ease-out, background 0.15s ease-out, border-color 0.15s ease-out;
}

.btn-outline:hover {
  background: var(--primary-subtle);
  border-color: var(--primary);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--bg-alt);
  color: var(--text);
  border: 1px solid var(--border);
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out, border-color 0.15s ease-out;
}

.btn-secondary:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ═══ Cards ═══ */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out;
}

.card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-xl);
  transform: translateY(-6px) rotate(0.3deg);
}

/* ═══ Hero ═══ */
.hero {
  min-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: var(--bg);
  padding: 8rem 1.5rem 5rem;
}

.hero h1 {
  font-size: clamp(2.8rem, 7vw, 4.8rem);
  margin-bottom: 1.5rem;
  line-height: 1.05;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
}

.hero p {
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  color: var(--text-muted);
  max-width: 560px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: var(--primary-subtle);
  border: 1px solid rgba(194, 65, 12, 0.1);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

/* ═══ Scroll Reveal — Complex Choreography ═══ */
.reveal {
  opacity: 0;
  transform: translateY(50px) rotate(-1deg);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0) rotate(0);
}

.reveal-left {
  opacity: 0;
  transform: translateX(-60px) rotate(1.5deg);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal-left.visible {
  opacity: 1;
  transform: translateX(0) rotate(0);
}

.reveal-right {
  opacity: 0;
  transform: translateX(60px) rotate(-1.5deg);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal-right.visible {
  opacity: 1;
  transform: translateX(0) rotate(0);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.88) rotate(-0.5deg);
  transition: opacity 0.9s ease-out, transform 0.9s ease-out;
}

.reveal-scale.visible {
  opacity: 1;
  transform: scale(1) rotate(0);
}

/* Stagger delays — tight for snappy cascade */
.stagger-1 { transition-delay: 0.05s; }
.stagger-2 { transition-delay: 0.1s; }
.stagger-3 { transition-delay: 0.15s; }
.stagger-4 { transition-delay: 0.2s; }
.stagger-5 { transition-delay: 0.25s; }
.stagger-6 { transition-delay: 0.3s; }
.stagger-7 { transition-delay: 0.35s; }
.stagger-8 { transition-delay: 0.4s; }

/* ═══ Hero Entrance Choreography ═══ */
@keyframes heroReveal {
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heroSlideUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroBadge {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-14px) rotate(1.5deg); }
  66% { transform: translateY(-6px) rotate(-1deg); }
}

@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, -18px) scale(1.03); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

@keyframes pulseSubtle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.98); }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Hero choreography — staggered with different timing */
.hero-content > .hero-badge {
  animation: heroBadge 0.6s ease-out 0.1s both;
}

.hero-content h1 {
  animation: heroReveal 1s ease-out 0.25s both;
}

.hero-content p {
  animation: heroSlideUp 0.8s ease-out 0.5s both;
}

.hero-buttons,
.hero-content > .btn,
.hero-content > a:not(.hero-badge) {
  animation: heroSlideUp 0.7s ease-out 0.7s both;
}

.hero-content > svg,
.hero-content > span:not(.hero-badge) {
  animation: heroBadge 0.6s ease-out 0.05s both;
}

/* ═══ Accessibility ═══ */
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-left, .reveal-right, .reveal-scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .hero-content h1,
  .hero-content p,
  .hero-buttons,
  .hero-content > .hero-badge {
    animation: none;
  }
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ═══ Responsive ═══ */
@media (max-width: 768px) {
  .hero h1 { font-size: 2.4rem; }
  .hero p { font-size: 1rem; }
  .section-title { font-size: 1.9rem; }
  .section { padding: 3.5rem 0; }
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# App.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/App.css', """
.app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.app main {
  flex: 1;
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Navbar.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/components/Navbar.css', """
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(250, 248, 245, 0.95);
  border-bottom: 1px solid var(--border);
  transition: box-shadow 0.2s ease-out;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-heading);
  text-decoration: none;
  transition: transform 0.2s ease-out;
}

.navbar-brand:hover {
  color: var(--text-heading);
  transform: scale(1.03);
}

.brand-icon {
  font-size: 1.5rem;
  display: flex;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.15s ease-out;
  text-decoration: none;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background: var(--primary);
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease-out;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-heading);
}

.nav-donate {
  margin-left: 0.75rem;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
}

.nav-login {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-left: 0.5rem;
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
  transition: color 0.15s ease-out, border-color 0.15s ease-out, transform 0.15s ease-out;
}

.nav-login:hover {
  color: var(--text-heading);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-heading);
  border-radius: 2px;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .hamburger { display: flex; }

  .navbar-links {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    background: rgba(250, 248, 245, 0.98);
    padding: 2rem 1.5rem;
    gap: 0.5rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
  }

  .navbar-links.open {
    transform: translateX(0);
  }

  .nav-link {
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    width: 100%;
  }

  .nav-link::after { display: none; }

  .nav-donate {
    margin-left: 0;
    margin-top: 1rem;
    text-align: center;
    width: 100%;
  }

  .nav-login {
    margin-left: 0;
    margin-top: 0.5rem;
    justify-content: center;
    width: 100%;
  }
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Footer.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/components/Footer.css', """
.footer {
  background: #292524;
  color: #d6d3d1;
  padding: 5rem 0 0;
  margin-top: auto;
  position: relative;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
}

.footer-brand h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #fafaf9;
}

.footer-brand p {
  color: #a8a29e;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.footer-social a {
  color: #a8a29e;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease-out, color 0.15s ease-out;
}

.footer-social a:hover {
  transform: translateY(-4px) rotate(-8deg) scale(1.15);
  color: var(--primary-hover);
}

.footer-col h4 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #fafaf9;
}

.footer-col a,
.footer-col p {
  display: block;
  color: #a8a29e;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  transition: color 0.15s ease-out, transform 0.15s ease-out;
}

.footer-col a:hover {
  color: #fafaf9;
  transform: translateX(4px);
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.06);
  color: #fafaf9;
  outline: none;
  transition: border-color 0.15s ease-out;
}

.newsletter-form input::placeholder { color: #78716c; }

.newsletter-form input:focus {
  border-color: var(--primary);
}

.newsletter-form .btn {
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  white-space: nowrap;
}

.footer-bottom {
  margin-top: 3rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255,255,255,0.06);
  text-align: center;
}

.footer-bottom p {
  color: #78716c;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .newsletter-form { flex-direction: column; }
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# AnimatedBackground.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/components/AnimatedBackground.css', """
.animated-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.animated-bg--hero { opacity: 1; }
.animated-bg--section { opacity: 0.6; }
.animated-bg--subtle { opacity: 0.35; }

.bg-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Aurora bands - transform + opacity only */
.bg-aurora { will-change: transform, opacity; }

.bg-aurora--1 {
  animation: auroraWave1 28s ease-in-out infinite;
}
.bg-aurora--2 {
  animation: auroraWave2 24s ease-in-out infinite;
  animation-delay: -8s;
}

@keyframes auroraWave1 {
  0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.5; }
  25% { transform: translateY(-25px) scaleY(1.15); opacity: 0.8; }
  50% { transform: translateY(15px) scaleY(0.85); opacity: 0.35; }
  75% { transform: translateY(-12px) scaleY(1.08); opacity: 0.65; }
}

@keyframes auroraWave2 {
  0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.4; }
  33% { transform: translateY(20px) scaleY(1.2); opacity: 0.65; }
  66% { transform: translateY(-18px) scaleY(0.88); opacity: 0.3; }
}

/* Orbs - floating with scale variation for organic feel */
.bg-orb { will-change: transform, opacity; }

.bg-orb--1 { animation: orbFloat1 22s ease-in-out infinite; }
.bg-orb--2 { animation: orbFloat2 26s ease-in-out infinite; animation-delay: -7s; }
.bg-orb--3 { animation: orbFloat3 20s ease-in-out infinite; animation-delay: -14s; }
.bg-orb--4 { animation: orbFloat1 28s ease-in-out infinite; animation-delay: -4s; }

@keyframes orbFloat1 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  25% { transform: translate(30px, -25px) scale(1.08); opacity: 0.75; }
  50% { transform: translate(-15px, 20px) scale(0.92); opacity: 0.4; }
  75% { transform: translate(20px, 10px) scale(1.04); opacity: 0.6; }
}

@keyframes orbFloat2 {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.45; }
  33% { transform: translate(-20px, 15px) scale(1.1) rotate(5deg); opacity: 0.7; }
  66% { transform: translate(25px, -20px) scale(0.9) rotate(-3deg); opacity: 0.35; }
}

@keyframes orbFloat3 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
  50% { transform: translate(-25px, -15px) scale(1.12); opacity: 0.3; }
}

/* Geometric shapes - varied animations for complex feel */
.bg-shape { will-change: transform, opacity; }

.bg-shape--1  { animation: shapeFloat1 20s ease-in-out infinite; }
.bg-shape--2  { animation: shapeFloat2 24s ease-in-out infinite; animation-delay: -5s; }
.bg-shape--3  { animation: shapeFloat3 18s ease-in-out infinite; animation-delay: -10s; }
.bg-shape--4  { animation: shapeFloat1 22s ease-in-out infinite; animation-delay: -3s; }
.bg-shape--5  { animation: shapeFloat2 20s ease-in-out infinite; animation-delay: -8s; }
.bg-shape--6  { animation: shapeFloat3 16s ease-in-out infinite; animation-delay: -2s; }
.bg-shape--7  { animation: shapeFloat1 24s ease-in-out infinite; animation-delay: -12s; }
.bg-shape--8  { animation: shapeFloat2 18s ease-in-out infinite; animation-delay: -6s; }
.bg-shape--9  { animation: shapeFloat3 22s ease-in-out infinite; animation-delay: -4s; }

@keyframes shapeFloat1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.5; }
  25% { transform: translate(25px, -30px) rotate(90deg) scale(1.1); opacity: 0.8; }
  50% { transform: translate(-15px, 20px) rotate(180deg) scale(0.9); opacity: 0.35; }
  75% { transform: translate(20px, -10px) rotate(270deg) scale(1.05); opacity: 0.65; }
}

@keyframes shapeFloat2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.45; }
  33% { transform: translate(-30px, 15px) rotate(120deg) scale(1.15); opacity: 0.7; }
  66% { transform: translate(20px, -25px) rotate(240deg) scale(0.85); opacity: 0.3; }
}

@keyframes shapeFloat3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.6; }
  50% { transform: translate(-12px, -22px) rotate(180deg) scale(1.08); opacity: 0.35; }
}

/* Particles - rising float */
.bg-particle {
  position: absolute;
  background: rgba(194, 65, 12, 0.2);
  border-radius: 50%;
  will-change: transform, opacity;
  animation: particleRise linear infinite;
}

@keyframes particleRise {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
  10% { opacity: 0.5; }
  50% { transform: translateY(-40vh) translateX(15px) scale(0.75); opacity: 0.25; }
  90% { opacity: 0.4; }
  100% { transform: translateY(-80vh) translateX(-10px) scale(0.35); opacity: 0; }
}

/* Wave at bottom */
.bg-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .bg-orb, .bg-shape, .bg-particle, .bg-aurora, .bg-wave-path {
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .bg-particle { animation-duration: 20s !important; }
  .bg-aurora { opacity: 0.35; }
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ApplicationModal.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/components/ApplicationModal.css', """
.apply-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.apply-modal {
  width: 100%;
  max-width: 540px;
  max-height: 85vh;
  overflow-y: auto;
  animation: modalIn 0.25s ease-out;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.apply-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.apply-modal-header h2 {
  font-size: 1.1rem;
}

.apply-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-muted);
  cursor: pointer;
  transition: transform 0.15s ease-out, color 0.15s ease-out, border-color 0.15s ease-out;
}

.apply-close:hover {
  color: #ef4444;
  border-color: #ef4444;
  transform: rotate(90deg);
}

.apply-form .form-group {
  margin-bottom: 1.25rem;
}

.apply-form .form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-heading);
}

.apply-form .form-group input,
.apply-form .form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
}

.apply-form .form-group input:focus,
.apply-form .form-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.08);
}

.apply-form .btn {
  width: 100%;
  margin-top: 0.5rem;
}

.apply-error {
  background: rgba(239, 68, 68, 0.08);
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.15);
}

.apply-success {
  text-align: center;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #16a34a;
}

.apply-success h3 { color: var(--text-heading); }
.apply-success p { color: var(--text-muted); max-width: 360px; }
.apply-success .btn { margin-top: 0.5rem; width: auto; }
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Home.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/Home.css', """
.home-hero {
  min-height: 92vh;
  padding-top: 6rem;
}

/* Decorative floating shapes via pseudo-elements */
.home-hero::before {
  content: '';
  position: absolute;
  top: 12%;
  left: -8%;
  width: 450px;
  height: 450px;
  background: rgba(194, 65, 12, 0.04);
  border-radius: 50%;
  animation: floatSlow 16s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

.home-hero::after {
  content: '';
  position: absolute;
  bottom: 8%;
  right: -5%;
  width: 350px;
  height: 350px;
  background: rgba(15, 118, 110, 0.03);
  border-radius: 50%;
  animation: floatSlow 14s ease-in-out infinite 3s;
  pointer-events: none;
  z-index: 0;
}

.hero-content {
  max-width: 800px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: heroSlideUp 0.7s ease-out 0.7s both;
}

/* Mission */
.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.mission-card {
  text-align: center;
  padding: 2.5rem 2rem;
}

.mission-icon {
  color: var(--primary);
  margin-bottom: 1rem;
  transition: transform 0.2s ease-out;
}

.mission-card:hover .mission-icon {
  transform: translateY(-6px) rotate(-8deg) scale(1.12);
}

.mission-card h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.mission-card p {
  color: var(--text-muted);
  line-height: 1.7;
}

/* Stats */
.stats-section {
  padding: 4rem 0;
  background: var(--bg-alt);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: 2rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.stat-item:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-lg);
}

.stat-number {
  font-family: var(--font-display);
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1.2;
  margin-bottom: 0.25rem;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* Campaign Highlight */
.campaign-highlight {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 3rem;
}

.campaign-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--primary);
  color: #fff;
  padding: 0.35rem 1.1rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  animation: pulseSubtle 3s ease-in-out infinite;
}

.campaign-highlight h2 {
  margin-bottom: 1rem;
}

.campaign-highlight p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

/* How to Help */
.help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.help-card {
  text-align: center;
  padding: 2.5rem 2rem;
}

.help-icon {
  color: var(--primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-out;
}

.help-card:hover .help-icon {
  transform: translateY(-5px) scale(1.1) rotate(5deg);
}

.help-card h3 {
  margin-bottom: 0.75rem;
  font-size: 1.15rem;
}

.help-card p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

/* Partners */
.partners-section {
  background: var(--bg-alt);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.partner-card {
  text-align: center;
  padding: 2rem;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--text-heading);
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.partner-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: var(--shadow-md);
}

/* Responsive */
@media (max-width: 768px) {
  .home-hero { min-height: 80vh; padding-top: 5rem; }
  .stat-number { font-size: 2rem; }
  .campaign-highlight { padding: 2rem; }
  .home-hero::before,
  .home-hero::after { display: none; }
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# About.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/About.css', """
.mission-statement {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.9;
  padding: 3rem;
  background: var(--bg-alt);
  border: 1px solid var(--border);
}

/* Team */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.team-card {
  text-align: center;
  padding: 2rem 1.5rem;
}

.team-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary);
  transition: transform 0.2s ease-out;
}

.team-card:hover .team-avatar {
  transform: translateY(-4px) scale(1.1) rotate(-5deg);
}

.team-card h4 {
  margin-bottom: 0.25rem;
}

.team-card p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Collaborators */
.collab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.collab-card {
  text-align: center;
  padding: 2rem;
}

.collab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary);
  transition: transform 0.2s ease-out;
}

.collab-card:hover .collab-icon {
  transform: scale(1.15) rotate(5deg);
}

.collab-card h4 {
  margin-bottom: 0.5rem;
}

.collab-card p {
  color: var(--text-muted);
  font-size: 0.9rem;
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Campaigns.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/Campaigns.css', """
.active-campaign {
  text-align: center;
  padding: 3rem;
  background: var(--bg-alt);
  border: 1px solid var(--border);
}

.campaign-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--primary);
  color: #fff;
  padding: 0.35rem 1.1rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  animation: pulseSubtle 3s ease-in-out infinite;
}

.active-campaign h2 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.active-campaign p {
  max-width: 600px;
  margin: 0 auto 2rem;
  color: var(--text-muted);
}

.campaign-progress {
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(194, 65, 12, 0.08);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
  transition: width 1.2s ease-out;
}

/* Shimmer sweep on progress bar */
.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.25);
  animation: shimmer 2.5s ease-in-out infinite;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Past campaigns */
.past-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.past-card { text-align: center; }

.past-emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary);
  transition: transform 0.2s ease-out;
}

.past-card:hover .past-emoji {
  transform: scale(1.2) rotate(-5deg);
}

.past-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.15rem;
}

.past-raised {
  color: var(--primary);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  margin-bottom: 0.75rem;
}

.past-card p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Events */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.event-card { text-align: center; }

.event-emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: var(--primary);
  transition: transform 0.2s ease-out;
}

.event-card:hover .event-emoji {
  transform: translateY(-4px) rotate(8deg);
}

.event-date {
  color: var(--primary);
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.event-card h3 { margin-bottom: 0.75rem; }
.event-card p { color: var(--text-muted); font-size: 0.95rem; }
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Contact.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/Contact.css', """
.contact-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.contact-form h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-heading);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.08);
}

.contact-form .btn { width: 100%; }

/* Info cards */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--primary);
  transition: transform 0.2s ease-out;
}

.info-card:hover .info-icon {
  transform: translateY(-2px) scale(1.1);
}

.info-card h4 {
  margin-bottom: 0.15rem;
  font-size: 0.95rem;
}

.info-card p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* FAQ */
.faq-list {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.faq-item:hover {
  transform: translateX(6px);
  box-shadow: var(--shadow-md);
}

.faq-item h4 {
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.faq-item p {
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .contact-layout { grid-template-columns: 1fr; }
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Donate.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/Donate.css', """
.donate-general {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.donate-general-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-bottom: 0.5rem;
  animation: float 5s ease-in-out infinite;
}

.donate-general h2 {
  font-size: 1.6rem;
  color: var(--text-heading);
}

.donate-general p {
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 500px;
}

.donate-general-btn {
  margin-top: 0.5rem;
  padding: 0.85rem 2.2rem;
  font-size: 1rem;
}

/* Impact */
.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.impact-card { text-align: center; }

.impact-emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: var(--primary);
  transition: transform 0.2s ease-out;
}

.impact-card:hover .impact-emoji {
  transform: translateY(-4px) scale(1.15);
}

.impact-amount {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.5rem;
  font-variant-numeric: tabular-nums;
  transition: transform 0.2s ease-out;
}

.impact-card:hover .impact-amount {
  transform: scale(1.08);
}

.impact-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* CTA */
.donate-cta-section {
  background: var(--bg-alt);
}

.donate-cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# GetInvolved.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/GetInvolved.css', """
.ways-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.ways-card { text-align: center; }

.ways-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--primary);
  transition: transform 0.2s ease-out;
}

.ways-card:hover .ways-icon {
  transform: translateY(-5px) rotate(-6deg) scale(1.12);
}

.ways-card h3 { margin-bottom: 0.75rem; }
.ways-card p { color: var(--text-muted); }

/* Job Board */
.postings-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filter-chip {
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  transition: transform 0.15s ease-out, background 0.15s ease-out, color 0.15s ease-out, border-color 0.15s ease-out;
}

.filter-chip:hover {
  border-color: var(--border-hover);
  color: var(--primary);
  transform: translateY(-1px);
}

.filter-chip.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
  transform: scale(1.05);
}

.postings-loading {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-muted);
}

.postings-empty {
  text-align: center;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
}

.postings-empty h3 { color: var(--text-heading); }

.postings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.5rem;
}

.posting-card {
  display: flex;
  flex-direction: column;
}

.posting-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.posting-category {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.posting-category--executive {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

.posting-category--volunteer {
  background: rgba(194, 65, 12, 0.08);
  color: var(--primary);
}

.posting-category--lead {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.posting-date {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
}

.posting-title {
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.posting-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.posting-list-section {
  margin-bottom: 1rem;
}

.posting-list-section h4 {
  font-size: 0.85rem;
  color: var(--text-heading);
  margin-bottom: 0.4rem;
  text-transform: uppercase;
}

.posting-list-section ul { padding: 0; }

.posting-list-section li {
  position: relative;
  padding-left: 1rem;
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.8;
}

.posting-list-section li::before {
  content: '\\203A';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: 700;
}

.posting-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.posting-location {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--text-muted);
  font-size: 0.82rem;
}

.posting-apply-btn {
  font-size: 0.85rem;
  padding: 0.5rem 1.25rem;
}

/* FAQ in GetInvolved */
.get-involved .faq-list {
  max-width: 700px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .postings-grid { grid-template-columns: 1fr; }
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Orphans.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/Orphans.css', """
.how-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.how-card {
  text-align: center;
  position: relative;
}

.how-step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-weight: 800;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  font-variant-numeric: tabular-nums;
  transition: transform 0.2s ease-out;
}

.how-card:hover .how-step {
  transform: scale(1.12) rotate(-5deg);
}

.how-card h3 { margin-bottom: 0.75rem; }
.how-card p { color: var(--text-muted); }

/* Orphan Grid */
.orphan-profiles-section {
  background: var(--bg-alt);
}

.orphan-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.orphan-card {
  text-align: center;
  padding: 1.5rem;
}

.orphan-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: var(--primary);
  transition: transform 0.2s ease-out;
}

.orphan-card:hover .orphan-avatar {
  transform: translateY(-4px) scale(1.1);
}

.orphan-card h4 { margin-bottom: 0.25rem; }

.orphan-detail {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.orphan-status {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.orphan-status.sponsored {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.orphan-status.needs {
  background: rgba(194, 65, 12, 0.08);
  color: var(--primary);
}

.orphan-cta {
  text-align: center;
  margin-top: 3rem;
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# AdminLogin.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/AdminLogin.css', """
.login-form {
  max-width: 440px;
  margin: 0 auto;
  text-align: center;
}

.login-form h2 { margin-bottom: 1.5rem; }

.login-form .form-group label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-heading);
}

.login-form .form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
}

.login-form .form-group input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.08);
}

.login-form .btn {
  width: 100%;
  margin-top: 0.75rem;
}

.login-error {
  background: rgba(239, 68, 68, 0.08);
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.15);
}
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# AdminDashboard.css
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
write('src/pages/AdminDashboard.css', """
.admin-dashboard {
  padding-top: 72px;
  min-height: 100dvh;
  background: var(--bg);
}

.admin-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: var(--text-muted);
  font-size: 1.1rem;
  padding-top: 72px;
}

.admin-header {
  background: var(--bg-alt);
  border-bottom: 1px solid var(--border);
  padding: 1.75rem 0;
  position: sticky;
  top: 72px;
  z-index: 10;
}

.admin-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-header h1 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.5rem;
  color: var(--text-heading);
}

.admin-logout {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

/* Tabs */
.admin-tabs {
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0 1.5rem;
  border-bottom: 1px solid var(--border);
}

.admin-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.15s ease-out, border-color 0.15s ease-out;
}

.admin-tab:hover { color: var(--text-heading); }

.admin-tab.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

/* Panel */
.admin-panel { margin-bottom: 3rem; }

.admin-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.admin-panel-header h2 { font-size: 1.15rem; }

.admin-panel-header .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.admin-empty {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Table */
.admin-table-wrap {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.admin-table thead { background: var(--bg-alt); }

.admin-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  white-space: nowrap;
}

.admin-table td {
  padding: 0.85rem 1rem;
  border-top: 1px solid var(--border);
  vertical-align: middle;
}

.admin-table tbody tr {
  transition: background 0.15s ease-out;
}

.admin-table tbody tr:hover {
  background: rgba(194, 65, 12, 0.02);
}

.admin-td-title { font-weight: 600; color: var(--text-heading); }
.admin-td-email { color: var(--primary); font-size: 0.85rem; }
.admin-td-date { color: var(--text-muted); font-size: 0.85rem; white-space: nowrap; }

/* Badges */
.admin-badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.admin-badge--executive { background: rgba(139, 92, 246, 0.1); color: #7c3aed; }
.admin-badge--volunteer { background: rgba(194, 65, 12, 0.08); color: var(--primary); }
.admin-badge--lead { background: rgba(22, 163, 74, 0.1); color: #16a34a; }

/* Status toggle */
.admin-status-btn {
  padding: 0.2rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-transform: capitalize;
  transition: transform 0.15s ease-out;
}

.admin-status-btn:hover { transform: scale(1.05); }

.admin-status--open {
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
}

.admin-status--closed {
  background: rgba(239, 68, 68, 0.08);
  color: #dc2626;
}

/* Actions */
.admin-actions {
  display: flex;
  gap: 0.4rem;
}

.admin-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  transition: transform 0.15s ease-out, color 0.15s ease-out, border-color 0.15s ease-out;
}

.admin-action-btn:hover {
  color: var(--primary);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.admin-action-btn--danger:hover {
  color: #dc2626;
  border-color: #dc2626;
}

/* Form modal */
.admin-form-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.admin-form-modal {
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  animation: modalIn 0.25s ease-out;
}

.admin-form-modal h2 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.admin-form-modal .form-group { margin-bottom: 1.25rem; }

.admin-form-modal .form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-heading);
}

.admin-form-modal .form-group input,
.admin-form-modal .form-group textarea,
.admin-form-modal .form-group select {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s ease-out, box-shadow 0.15s ease-out;
}

.admin-form-modal .form-group input:focus,
.admin-form-modal .form-group textarea:focus,
.admin-form-modal .form-group select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.08);
}

.admin-form-modal .list-group { margin-bottom: 1.25rem; }

.admin-form-modal .list-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.admin-form-modal .list-group-header h4 {
  font-size: 0.9rem;
}

.admin-form-modal .list-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.admin-form-modal .list-item input { flex: 1; }

.admin-form-modal .list-item-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s ease-out, border-color 0.15s ease-out;
}

.admin-form-modal .list-item-remove:hover {
  color: #dc2626;
  border-color: #dc2626;
}

.admin-form-btns {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.admin-form-btns .btn { flex: 1; }

.admin-form-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-muted);
  cursor: pointer;
  transition: transform 0.15s ease-out, color 0.15s ease-out;
}

.admin-form-close:hover {
  color: #dc2626;
  transform: rotate(90deg);
}

/* Application viewer */
.app-viewer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.app-viewer-modal {
  width: 100%;
  max-width: 560px;
  max-height: 80vh;
  overflow-y: auto;
  animation: modalIn 0.25s ease-out;
}

.app-viewer-modal h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.app-viewer-field {
  margin-bottom: 1rem;
}

.app-viewer-field label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.app-viewer-field p {
  color: var(--text);
  line-height: 1.6;
}

/* Applications filter */
.admin-apps-filter {
  margin-bottom: 1rem;
}

.admin-apps-filter label {
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  color: var(--text-heading);
}

.admin-apps-filter select {
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  outline: none;
  transition: border-color 0.15s ease-out;
}

.admin-apps-filter select:focus {
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .admin-header h1 { font-size: 1.2rem; }
  .admin-table { font-size: 0.8rem; }
}
""")

print('\\nAll CSS files written!')
