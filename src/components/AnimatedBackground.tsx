import "./AnimatedBackground.css";

interface AnimatedBackgroundProps {
  variant?: "hero" | "section" | "subtle";
}

export default function AnimatedBackground({
  variant = "section",
}: AnimatedBackgroundProps) {
  const id = "bg-main";

  return (
    <div className={`animated-bg animated-bg--${variant}`} aria-hidden="true">
      <svg
        className="bg-svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`${id}-g1`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.49 0.12 264 / 0.06)" />
            <stop offset="100%" stopColor="oklch(0.49 0.12 264 / 0)" />
          </radialGradient>
          <radialGradient id={`${id}-g2`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.55 0.10 264 / 0.04)" />
            <stop offset="100%" stopColor="oklch(0.55 0.10 264 / 0)" />
          </radialGradient>
        </defs>

        {/* Two subtle glow orbs */}
        <circle
          className="bg-orb bg-orb--1"
          cx="300"
          cy="200"
          r="280"
          fill={`url(#${id}-g1)`}
        />
        <circle
          className="bg-orb bg-orb--2"
          cx="1100"
          cy="550"
          r="240"
          fill={`url(#${id}-g2)`}
        />
      </svg>
    </div>
  );
}
