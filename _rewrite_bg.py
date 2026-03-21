"""Rewrite AnimatedBackground.tsx with warm color palette."""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(BASE, 'src', 'components', 'AnimatedBackground.tsx')

content = '''import { useEffect, useRef } from "react";
import "./AnimatedBackground.css";

interface AnimatedBackgroundProps {
  variant?: "hero" | "section" | "subtle";
}

export default function AnimatedBackground({
  variant = "section",
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idPrefix = useRef(
    `bg-${Math.random().toString(36).substring(2, 8)}`,
  ).current;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount =
      variant === "hero" ? 20 : variant === "section" ? 10 : 6;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "bg-particle";
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${Math.random() * 12 + 14}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [variant]);

  return (
    <div
      className={`animated-bg animated-bg--${variant}`}
      ref={containerRef}
      aria-hidden="true"
    >
      <svg
        className="bg-svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`${idPrefix}-glow1`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(194, 65, 12, 0.05)" />
            <stop offset="100%" stopColor="rgba(194, 65, 12, 0)" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-glow2`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(217, 119, 6, 0.04)" />
            <stop offset="100%" stopColor="rgba(217, 119, 6, 0)" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-glow3`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(15, 118, 110, 0.03)" />
            <stop offset="100%" stopColor="rgba(15, 118, 110, 0)" />
          </radialGradient>
          <linearGradient
            id={`${idPrefix}-aurora1`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(194, 65, 12, 0)" />
            <stop offset="30%" stopColor="rgba(194, 65, 12, 0.03)" />
            <stop offset="50%" stopColor="rgba(234, 88, 12, 0.02)" />
            <stop offset="70%" stopColor="rgba(217, 119, 6, 0.02)" />
            <stop offset="100%" stopColor="rgba(194, 65, 12, 0)" />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-aurora2`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(15, 118, 110, 0)" />
            <stop offset="40%" stopColor="rgba(15, 118, 110, 0.02)" />
            <stop offset="60%" stopColor="rgba(194, 65, 12, 0.015)" />
            <stop offset="100%" stopColor="rgba(15, 118, 110, 0)" />
          </linearGradient>
        </defs>

        {/* Soft aurora bands */}
        <path
          className="bg-aurora bg-aurora--1"
          d="M0,200 Q360,100 720,250 T1440,180"
          stroke={`url(#${idPrefix}-aurora1)`}
          strokeWidth="140"
          fill="none"
        />
        <path
          className="bg-aurora bg-aurora--2"
          d="M0,500 Q400,350 800,520 T1440,450"
          stroke={`url(#${idPrefix}-aurora2)`}
          strokeWidth="120"
          fill="none"
        />

        {/* Ambient glow orbs */}
        <circle
          className="bg-orb bg-orb--1"
          cx="200"
          cy="150"
          r="200"
          fill={`url(#${idPrefix}-glow1)`}
        />
        <circle
          className="bg-orb bg-orb--2"
          cx="1200"
          cy="600"
          r="250"
          fill={`url(#${idPrefix}-glow2)`}
        />
        <circle
          className="bg-orb bg-orb--3"
          cx="700"
          cy="400"
          r="180"
          fill={`url(#${idPrefix}-glow1)`}
        />
        <circle
          className="bg-orb bg-orb--4"
          cx="1000"
          cy="100"
          r="140"
          fill={`url(#${idPrefix}-glow3)`}
        />

        {/* Floating shapes — circles, diamonds, organic curves */}
        <circle
          className="bg-shape bg-shape--1"
          cx="130"
          cy="60"
          r="22"
          fill="none"
          stroke="rgba(194, 65, 12, 0.06)"
          strokeWidth="1.5"
        />
        <circle
          className="bg-shape bg-shape--2"
          cx="1280"
          cy="220"
          r="16"
          fill="none"
          stroke="rgba(217, 119, 6, 0.05)"
          strokeWidth="1"
        />
        <circle
          className="bg-shape bg-shape--3"
          cx="840"
          cy="620"
          r="28"
          fill="none"
          stroke="rgba(194, 65, 12, 0.04)"
          strokeWidth="1"
        />
        <circle
          className="bg-shape bg-shape--4"
          cx="380"
          cy="120"
          r="12"
          fill="rgba(194, 65, 12, 0.03)"
        />
        <circle
          className="bg-shape bg-shape--5"
          cx="1080"
          cy="480"
          r="18"
          fill="rgba(217, 119, 6, 0.025)"
        />
        <circle
          className="bg-shape bg-shape--6"
          cx="520"
          cy="300"
          r="14"
          fill="none"
          stroke="rgba(15, 118, 110, 0.04)"
          strokeWidth="1"
        />

        {/* Organic leaf/diamond shapes */}
        <path
          className="bg-shape bg-shape--7"
          d="M60,500 Q100,460 140,500 Q100,540 60,500"
          fill="none"
          stroke="rgba(194, 65, 12, 0.06)"
          strokeWidth="1"
        />
        <path
          className="bg-shape bg-shape--8"
          d="M1300,380 Q1340,340 1380,380 Q1340,420 1300,380"
          fill="none"
          stroke="rgba(217, 119, 6, 0.05)"
          strokeWidth="1"
        />
        <path
          className="bg-shape bg-shape--9"
          d="M680,80 Q720,40 760,80 Q720,120 680,80"
          fill="rgba(194, 65, 12, 0.02)"
        />

        {/* Soft dots */}
        <circle cx="320" cy="680" r="2" fill="rgba(194, 65, 12, 0.08)" />
        <circle cx="380" cy="650" r="1.5" fill="rgba(194, 65, 12, 0.05)" />
        <circle cx="350" cy="720" r="2" fill="rgba(194, 65, 12, 0.06)" />
        <circle cx="1100" cy="150" r="2" fill="rgba(217, 119, 6, 0.07)" />
        <circle cx="1150" cy="120" r="1.5" fill="rgba(217, 119, 6, 0.04)" />
        <circle cx="1130" cy="180" r="2.5" fill="rgba(217, 119, 6, 0.05)" />
      </svg>

      {/* Bottom wave */}
      <svg
        className="bg-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          className="bg-wave-path--1"
          d="M0,80 C360,120 720,20 1080,80 C1260,110 1380,60 1440,80 L1440,120 L0,120 Z"
          fill="rgba(194, 65, 12, 0.02)"
        />
        <path
          className="bg-wave-path--2"
          d="M0,90 C320,40 640,110 960,70 C1200,40 1360,100 1440,90 L1440,120 L0,120 Z"
          fill="rgba(194, 65, 12, 0.015)"
        />
      </svg>
    </div>
  );
}
'''

with open(path, 'w') as f:
    f.write(content)
print(f'Wrote AnimatedBackground.tsx ({len(content)} chars)')
"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(BASE, 'src', 'components', 'AnimatedBackground.tsx')

content = '''import { useEffect, useRef } from "react";
import "./AnimatedBackground.css";

interface AnimatedBackgroundProps {
  variant?: "hero" | "section" | "subtle";
}

export default function AnimatedBackground({
  variant = "section",
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const idPrefix = useRef(
    `bg-${Math.random().toString(36).substring(2, 8)}`,
  ).current;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount =
      variant === "hero" ? 20 : variant === "section" ? 10 : 6;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "bg-particle";
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${Math.random() * 12 + 14}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [variant]);

  return (
    <div
      className={`animated-bg animated-bg--${variant}`}
      ref={containerRef}
      aria-hidden="true"
    >
      <svg
        className="bg-svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`${idPrefix}-glow1`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(194, 65, 12, 0.05)" />
            <stop offset="100%" stopColor="rgba(194, 65, 12, 0)" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-glow2`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(217, 119, 6, 0.04)" />
            <stop offset="100%" stopColor="rgba(217, 119, 6, 0)" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-glow3`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(15, 118, 110, 0.03)" />
            <stop offset="100%" stopColor="rgba(15, 118, 110, 0)" />
          </radialGradient>
          <linearGradient
            id={`${idPrefix}-aurora1`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(194, 65, 12, 0)" />
            <stop offset="30%" stopColor="rgba(194, 65, 12, 0.03)" />
            <stop offset="50%" stopColor="rgba(234, 88, 12, 0.02)" />
            <stop offset="70%" stopColor="rgba(217, 119, 6, 0.02)" />
            <stop offset="100%" stopColor="rgba(194, 65, 12, 0)" />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-aurora2`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(15, 118, 110, 0)" />
            <stop offset="40%" stopColor="rgba(15, 118, 110, 0.02)" />
            <stop offset="60%" stopColor="rgba(194, 65, 12, 0.015)" />
            <stop offset="100%" stopColor="rgba(15, 118, 110, 0)" />
          </linearGradient>
        </defs>

        {/* Soft aurora bands */}
        <path
          className="bg-aurora bg-aurora--1"
          d="M0,200 Q360,100 720,250 T1440,180"
          stroke={`url(#${idPrefix}-aurora1)`}
          strokeWidth="140"
          fill="none"
        />
        <path
          className="bg-aurora bg-aurora--2"
          d="M0,500 Q400,350 800,520 T1440,450"
          stroke={`url(#${idPrefix}-aurora2)`}
          strokeWidth="120"
          fill="none"
        />

        {/* Ambient glow orbs */}
        <circle
          className="bg-orb bg-orb--1"
          cx="200"
          cy="150"
          r="200"
          fill={`url(#${idPrefix}-glow1)`}
        />
        <circle
          className="bg-orb bg-orb--2"
          cx="1200"
          cy="600"
          r="250"
          fill={`url(#${idPrefix}-glow2)`}
        />
        <circle
          className="bg-orb bg-orb--3"
          cx="700"
          cy="400"
          r="180"
          fill={`url(#${idPrefix}-glow1)`}
        />
        <circle
          className="bg-orb bg-orb--4"
          cx="1000"
          cy="100"
          r="140"
          fill={`url(#${idPrefix}-glow3)`}
        />

        {/* Floating shapes */}
        <circle
          className="bg-shape bg-shape--1"
          cx="130"
          cy="60"
          r="22"
          fill="none"
          stroke="rgba(194, 65, 12, 0.06)"
          strokeWidth="1.5"
        />
        <circle
          className="bg-shape bg-shape--2"
          cx="1280"
          cy="220"
          r="16"
          fill="none"
          stroke="rgba(217, 119, 6, 0.05)"
          strokeWidth="1"
        />
        <circle
          className="bg-shape bg-shape--3"
          cx="840"
          cy="620"
          r="28"
          fill="none"
          stroke="rgba(194, 65, 12, 0.04)"
          strokeWidth="1"
        />
        <circle
          className="bg-shape bg-shape--4"
          cx="380"
          cy="120"
          r="12"
          fill="rgba(194, 65, 12, 0.03)"
        />
        <circle
          className="bg-shape bg-shape--5"
          cx="1080"
          cy="480"
          r="18"
          fill="rgba(217, 119, 6, 0.025)"
        />
        <circle
          className="bg-shape bg-shape--6"
          cx="520"
          cy="300"
          r="14"
          fill="none"
          stroke="rgba(15, 118, 110, 0.04)"
          strokeWidth="1"
        />

        {/* Organic curves */}
        <path
          className="bg-shape bg-shape--7"
          d="M60,500 Q100,460 140,500 Q100,540 60,500"
          fill="none"
          stroke="rgba(194, 65, 12, 0.06)"
          strokeWidth="1"
        />
        <path
          className="bg-shape bg-shape--8"
          d="M1300,380 Q1340,340 1380,380 Q1340,420 1300,380"
          fill="none"
          stroke="rgba(217, 119, 6, 0.05)"
          strokeWidth="1"
        />
        <path
          className="bg-shape bg-shape--9"
          d="M680,80 Q720,40 760,80 Q720,120 680,80"
          fill="rgba(194, 65, 12, 0.02)"
        />

        {/* Dots */}
        <circle cx="320" cy="680" r="2" fill="rgba(194, 65, 12, 0.08)" />
        <circle cx="380" cy="650" r="1.5" fill="rgba(194, 65, 12, 0.05)" />
        <circle cx="350" cy="720" r="2" fill="rgba(194, 65, 12, 0.06)" />
        <circle cx="1100" cy="150" r="2" fill="rgba(217, 119, 6, 0.07)" />
        <circle cx="1150" cy="120" r="1.5" fill="rgba(217, 119, 6, 0.04)" />
        <circle cx="1130" cy="180" r="2.5" fill="rgba(217, 119, 6, 0.05)" />
      </svg>

      {/* Bottom wave */}
      <svg
        className="bg-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          className="bg-wave-path--1"
          d="M0,80 C360,120 720,20 1080,80 C1260,110 1380,60 1440,80 L1440,120 L0,120 Z"
          fill="rgba(194, 65, 12, 0.02)"
        />
        <path
          className="bg-wave-path--2"
          d="M0,90 C320,40 640,110 960,70 C1200,40 1360,100 1440,90 L1440,120 L0,120 Z"
          fill="rgba(194, 65, 12, 0.015)"
        />
      </svg>
    </div>
  );
}
'''

with open(path, 'w') as f:
    f.write(content)
print(f'Wrote AnimatedBackground.tsx ({len(content)} chars)')
