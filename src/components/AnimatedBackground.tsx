import { useEffect, useRef } from "react";
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
      variant === "hero" ? 35 : variant === "section" ? 18 : 10;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const isStar = Math.random() > 0.7;
      particle.className = isStar
        ? "bg-particle bg-particle--star"
        : "bg-particle";
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
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
          {/* Gradients */}
          <radialGradient id={`${idPrefix}-glow1`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-glow2`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.1)" />
            <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
          </radialGradient>
          <radialGradient id={`${idPrefix}-glow3`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.08)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </radialGradient>
          <linearGradient
            id={`${idPrefix}-lineGrad`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.05)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-aurora1`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="30%" stopColor="rgba(59, 130, 246, 0.06)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.04)" />
            <stop offset="70%" stopColor="rgba(96, 165, 250, 0.06)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
          <linearGradient
            id={`${idPrefix}-aurora2`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0)" />
            <stop offset="40%" stopColor="rgba(96, 165, 250, 0.05)" />
            <stop offset="60%" stopColor="rgba(59, 130, 246, 0.03)" />
            <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
          </linearGradient>

          {/* Filters */}
          <filter id={`${idPrefix}-blur`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* ===== LAYER 1: Aurora bands ===== */}
        <path
          className="bg-aurora bg-aurora--1"
          d="M0,200 Q360,100 720,250 T1440,180"
          stroke={`url(#${idPrefix}-aurora1)`}
          strokeWidth="120"
          fill="none"
          filter={`url(#${idPrefix}-blur)`}
        />
        <path
          className="bg-aurora bg-aurora--2"
          d="M0,500 Q400,350 800,520 T1440,450"
          stroke={`url(#${idPrefix}-aurora2)`}
          strokeWidth="100"
          fill="none"
          filter={`url(#${idPrefix}-blur)`}
        />

        {/* ===== LAYER 2: Mesh grid ===== */}
        <g className="bg-mesh">
          {[0, 200, 400, 600, 800, 1000, 1200, 1400].map((x) => (
            <line
              key={`vl-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="800"
              stroke="rgba(59, 130, 246, 0.03)"
              strokeWidth="0.5"
            />
          ))}
          {[0, 160, 320, 480, 640, 800].map((y) => (
            <line
              key={`hl-${y}`}
              x1="0"
              y1={y}
              x2="1440"
              y2={y}
              stroke="rgba(59, 130, 246, 0.03)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* ===== LAYER 3: Ambient glow orbs ===== */}
        <circle
          className="bg-orb bg-orb--1"
          cx="200"
          cy="150"
          r="180"
          fill={`url(#${idPrefix}-glow1)`}
        />
        <circle
          className="bg-orb bg-orb--2"
          cx="1200"
          cy="600"
          r="220"
          fill={`url(#${idPrefix}-glow2)`}
        />
        <circle
          className="bg-orb bg-orb--3"
          cx="700"
          cy="400"
          r="150"
          fill={`url(#${idPrefix}-glow1)`}
        />
        <circle
          className="bg-orb bg-orb--4"
          cx="1000"
          cy="100"
          r="120"
          fill={`url(#${idPrefix}-glow3)`}
        />

        {/* ===== LAYER 4: Pulsing rings ===== */}
        <circle
          className="bg-ring bg-ring--1"
          cx="250"
          cy="650"
          r="40"
          fill="none"
          stroke="rgba(59, 130, 246, 0.08)"
          strokeWidth="1"
        />
        <circle
          className="bg-ring bg-ring--1"
          cx="250"
          cy="650"
          r="60"
          fill="none"
          stroke="rgba(59, 130, 246, 0.05)"
          strokeWidth="0.5"
        />
        <circle
          className="bg-ring bg-ring--1"
          cx="250"
          cy="650"
          r="80"
          fill="none"
          stroke="rgba(59, 130, 246, 0.03)"
          strokeWidth="0.5"
        />
        <circle
          className="bg-ring bg-ring--2"
          cx="1300"
          cy="200"
          r="35"
          fill="none"
          stroke="rgba(96, 165, 250, 0.07)"
          strokeWidth="1"
        />
        <circle
          className="bg-ring bg-ring--2"
          cx="1300"
          cy="200"
          r="55"
          fill="none"
          stroke="rgba(96, 165, 250, 0.04)"
          strokeWidth="0.5"
        />
        <circle
          className="bg-ring bg-ring--2"
          cx="1300"
          cy="200"
          r="75"
          fill="none"
          stroke="rgba(96, 165, 250, 0.02)"
          strokeWidth="0.5"
        />

        {/* ===== LAYER 5: Morphing blobs ===== */}
        <path
          className="bg-blob bg-blob--1"
          fill="rgba(59, 130, 246, 0.04)"
          filter={`url(#${idPrefix}-blur)`}
        />
        <path
          className="bg-blob bg-blob--2"
          fill="rgba(139, 92, 246, 0.03)"
          filter={`url(#${idPrefix}-blur)`}
        />

        {/* ===== LAYER 6: Floating geometric shapes ===== */}
        {/* Hexagons */}
        <g className="bg-shape bg-shape--1">
          <polygon
            points="100,30 130,10 160,30 160,70 130,90 100,70"
            fill="none"
            stroke="rgba(59, 130, 246, 0.12)"
            strokeWidth="1.5"
          />
        </g>
        <g className="bg-shape bg-shape--2">
          <polygon
            points="1200,200 1230,180 1260,200 1260,240 1230,260 1200,240"
            fill="none"
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="1"
          />
        </g>
        <g className="bg-shape bg-shape--3">
          <polygon
            points="800,600 830,580 860,600 860,640 830,660 800,640"
            fill="none"
            stroke="rgba(96, 165, 250, 0.08)"
            strokeWidth="1"
          />
        </g>

        {/* Diamonds */}
        <g className="bg-shape bg-shape--4">
          <rect
            x="350"
            y="100"
            width="30"
            height="30"
            fill="none"
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="1"
            transform="rotate(45, 365, 115)"
          />
        </g>
        <g className="bg-shape bg-shape--5">
          <rect
            x="1050"
            y="450"
            width="25"
            height="25"
            fill="none"
            stroke="rgba(96, 165, 250, 0.08)"
            strokeWidth="1"
            transform="rotate(45, 1062, 462)"
          />
        </g>

        {/* Circles */}
        <circle
          className="bg-shape bg-shape--6"
          cx="500"
          cy="200"
          r="15"
          fill="none"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="1"
        />
        <circle
          className="bg-shape bg-shape--7"
          cx="900"
          cy="350"
          r="10"
          fill="none"
          stroke="rgba(96, 165, 250, 0.08)"
          strokeWidth="1"
        />
        <circle
          className="bg-shape bg-shape--8"
          cx="300"
          cy="500"
          r="20"
          fill="none"
          stroke="rgba(59, 130, 246, 0.06)"
          strokeWidth="1.5"
        />

        {/* Triangles */}
        <g className="bg-shape bg-shape--9">
          <polygon
            points="440,700 460,660 480,700"
            fill="none"
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="1"
          />
        </g>
        <g className="bg-shape bg-shape--10">
          <polygon
            points="1100,100 1120,60 1140,100"
            fill="none"
            stroke="rgba(96, 165, 250, 0.07)"
            strokeWidth="1"
          />
        </g>
        <g className="bg-shape bg-shape--11">
          <polygon
            points="180,350 200,310 220,350"
            fill="none"
            stroke="rgba(139, 92, 246, 0.06)"
            strokeWidth="1"
          />
        </g>

        {/* Crosses / plus signs */}
        <g className="bg-shape bg-shape--12">
          <line
            x1="670"
            y1="700"
            x2="670"
            y2="730"
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="1"
          />
          <line
            x1="655"
            y1="715"
            x2="685"
            y2="715"
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="1"
          />
        </g>
        <g className="bg-shape bg-shape--13">
          <line
            x1="1350"
            y1="500"
            x2="1350"
            y2="525"
            stroke="rgba(96, 165, 250, 0.08)"
            strokeWidth="1"
          />
          <line
            x1="1337"
            y1="512"
            x2="1363"
            y2="512"
            stroke="rgba(96, 165, 250, 0.08)"
            strokeWidth="1"
          />
        </g>

        {/* Small stars (4-pointed) */}
        <g className="bg-shape bg-shape--14">
          <polygon
            points="550,450 555,440 560,450 555,460"
            fill="rgba(59, 130, 246, 0.12)"
          />
          <polygon
            points="545,445 555,450 565,445 555,440"
            fill="rgba(59, 130, 246, 0.08)"
          />
        </g>
        <g className="bg-shape bg-shape--15">
          <polygon
            points="1250,680 1255,670 1260,680 1255,690"
            fill="rgba(96, 165, 250, 0.1)"
          />
          <polygon
            points="1245,675 1255,680 1265,675 1255,670"
            fill="rgba(96, 165, 250, 0.06)"
          />
        </g>

        {/* ===== LAYER 7: Connecting lines ===== */}
        <line
          className="bg-line bg-line--1"
          x1="100"
          y1="300"
          x2="400"
          y2="200"
          stroke={`url(#${idPrefix}-lineGrad)`}
          strokeWidth="0.5"
        />
        <line
          className="bg-line bg-line--2"
          x1="900"
          y1="100"
          x2="1300"
          y2="400"
          stroke={`url(#${idPrefix}-lineGrad)`}
          strokeWidth="0.5"
        />
        <line
          className="bg-line bg-line--3"
          x1="500"
          y1="600"
          x2="800"
          y2="300"
          stroke={`url(#${idPrefix}-lineGrad)`}
          strokeWidth="0.5"
        />
        {/* New curved paths */}
        <path
          className="bg-line bg-line--4"
          d="M50,700 Q300,500 600,650"
          fill="none"
          stroke={`url(#${idPrefix}-lineGrad)`}
          strokeWidth="0.5"
        />
        <path
          className="bg-line bg-line--5"
          d="M800,50 Q1000,200 1400,100"
          fill="none"
          stroke={`url(#${idPrefix}-lineGrad)`}
          strokeWidth="0.5"
        />

        {/* ===== LAYER 8: Constellations ===== */}
        <g className="bg-constellation">
          <circle cx="600" cy="100" r="2" fill="rgba(59, 130, 246, 0.3)" />
          <circle cx="650" cy="130" r="1.5" fill="rgba(59, 130, 246, 0.2)" />
          <circle cx="620" cy="160" r="2" fill="rgba(59, 130, 246, 0.25)" />
          <circle cx="680" cy="110" r="1" fill="rgba(96, 165, 250, 0.3)" />
          <line
            x1="600"
            y1="100"
            x2="650"
            y2="130"
            stroke="rgba(59, 130, 246, 0.08)"
            strokeWidth="0.5"
          />
          <line
            x1="650"
            y1="130"
            x2="620"
            y2="160"
            stroke="rgba(59, 130, 246, 0.08)"
            strokeWidth="0.5"
          />
          <line
            x1="650"
            y1="130"
            x2="680"
            y2="110"
            stroke="rgba(59, 130, 246, 0.08)"
            strokeWidth="0.5"
          />
        </g>
        <g className="bg-constellation bg-constellation--2">
          <circle cx="1050" cy="550" r="2" fill="rgba(59, 130, 246, 0.2)" />
          <circle cx="1100" cy="580" r="1.5" fill="rgba(59, 130, 246, 0.15)" />
          <circle cx="1080" cy="520" r="1" fill="rgba(96, 165, 250, 0.2)" />
          <circle cx="1130" cy="560" r="2" fill="rgba(59, 130, 246, 0.15)" />
          <line
            x1="1050"
            y1="550"
            x2="1100"
            y2="580"
            stroke="rgba(59, 130, 246, 0.06)"
            strokeWidth="0.5"
          />
          <line
            x1="1080"
            y1="520"
            x2="1050"
            y2="550"
            stroke="rgba(59, 130, 246, 0.06)"
            strokeWidth="0.5"
          />
          <line
            x1="1100"
            y1="580"
            x2="1130"
            y2="560"
            stroke="rgba(59, 130, 246, 0.06)"
            strokeWidth="0.5"
          />
        </g>
        {/* New constellation */}
        <g className="bg-constellation bg-constellation--3">
          <circle cx="200" cy="450" r="1.5" fill="rgba(139, 92, 246, 0.25)" />
          <circle cx="240" cy="430" r="2" fill="rgba(59, 130, 246, 0.2)" />
          <circle cx="260" cy="470" r="1" fill="rgba(96, 165, 250, 0.2)" />
          <circle cx="220" cy="490" r="1.5" fill="rgba(59, 130, 246, 0.15)" />
          <line
            x1="200"
            y1="450"
            x2="240"
            y2="430"
            stroke="rgba(59, 130, 246, 0.06)"
            strokeWidth="0.5"
          />
          <line
            x1="240"
            y1="430"
            x2="260"
            y2="470"
            stroke="rgba(59, 130, 246, 0.06)"
            strokeWidth="0.5"
          />
          <line
            x1="260"
            y1="470"
            x2="220"
            y2="490"
            stroke="rgba(59, 130, 246, 0.06)"
            strokeWidth="0.5"
          />
          <line
            x1="220"
            y1="490"
            x2="200"
            y2="450"
            stroke="rgba(59, 130, 246, 0.06)"
            strokeWidth="0.5"
          />
        </g>

        {/* ===== LAYER 9: Orbit rings ===== */}
        <g className="bg-orbit bg-orbit--1">
          <ellipse
            cx="720"
            cy="400"
            rx="300"
            ry="80"
            fill="none"
            stroke="rgba(59, 130, 246, 0.04)"
            strokeWidth="0.5"
            strokeDasharray="8 12"
          />
          <circle
            className="bg-orbit-dot"
            cx="720"
            cy="320"
            r="3"
            fill="rgba(59, 130, 246, 0.3)"
          />
        </g>
        <g className="bg-orbit bg-orbit--2">
          <ellipse
            cx="400"
            cy="300"
            rx="180"
            ry="50"
            fill="none"
            stroke="rgba(96, 165, 250, 0.03)"
            strokeWidth="0.5"
            strokeDasharray="6 10"
          />
          <circle
            className="bg-orbit-dot"
            cx="400"
            cy="250"
            r="2"
            fill="rgba(96, 165, 250, 0.25)"
          />
        </g>

        {/* ===== LAYER 10: Scanning line ===== */}
        <line
          className="bg-scanline"
          x1="0"
          y1="0"
          x2="1440"
          y2="0"
          stroke="rgba(59, 130, 246, 0.06)"
          strokeWidth="1"
        />
      </svg>

      {/* Bottom wave separator */}
      {variant === "hero" && (
        <svg
          className="bg-wave"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            className="bg-wave-path bg-wave-path--1"
            d="M0,80 C360,120 720,20 1080,80 C1260,110 1380,60 1440,80 L1440,120 L0,120 Z"
            fill="var(--bg-primary)"
            opacity="0.6"
          />
          <path
            className="bg-wave-path bg-wave-path--2"
            d="M0,90 C320,40 640,110 960,70 C1200,40 1360,100 1440,90 L1440,120 L0,120 Z"
            fill="var(--bg-primary)"
            opacity="0.3"
          />
          <path
            className="bg-wave-path bg-wave-path--3"
            d="M0,95 C200,80 500,110 750,85 C1000,60 1250,100 1440,95 L1440,120 L0,120 Z"
            fill="var(--bg-primary)"
            opacity="0.15"
          />
        </svg>
      )}
    </div>
  );
}
