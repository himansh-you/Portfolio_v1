import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

type GridBackgroundProps = {
  className?: string;
  cellSize?: number; // grid cell size in px
  gridColor?: string; // color for grid lines (rgba ok)
  orbFrom?: string; // inner orb color
  orbTo?: string; // outer orb color
  orbPosition?: string; // e.g. "50% 60%"
  backgroundColor?: string; // page bg
  blurPx?: number; // background blur amount in px
  animateOrb?: boolean; // enable subtle motion
  orbSpeedCpm?: number; // orb speed in cycles per minute
  orbAmplitude?: number; // amplitude in percentage units
};

export const Component = ({
  className,
  cellSize = 64,
  gridColor = "rgba(71,85,105,0.25)",
  // Defaults aligned with portfolio's orange/yellow theme
  orbFrom = "rgba(249,113,22,0.18)",
  orbTo = "rgba(251,191,36,0.06)",
  orbPosition = "50% 60%",
  backgroundColor = "white",
  blurPx = 2,
  animateOrb = true,
  orbSpeedCpm = 1, // ~1 cycle every 5 minutes
  orbAmplitude = 30, // percent
}: GridBackgroundProps) => {
  const parsePercentPair = (s: string) => {
    const m = s.match(/([\d.]+)%\s+([\d.]+)%/);
    return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 50, y: 60 };
  };

  const initial = parsePercentPair(orbPosition);
  const [orbPos, setOrbPos] = useState<{ x: number; y: number }>(initial);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    if (!animateOrb) return;
    const omega = (2 * Math.PI * orbSpeedCpm) / 60000; // rad/ms
    const animate = (now: number) => {
      if (!startRef.current) startRef.current = now;
      // throttle ~30fps
      if (!lastRef.current || now - lastRef.current > 33) {
        const t = now - startRef.current;
        const theta = omega * t;
        const x = initial.x + orbAmplitude * Math.cos(theta);
        const y = initial.y + orbAmplitude * Math.sin(theta * 0.8);
        setOrbPos({ x, y });
        lastRef.current = now;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = 0;
      lastRef.current = 0;
    };
  }, [animateOrb, orbSpeedCpm, orbAmplitude, orbPosition, initial.x, initial.y]);

  const computedOrbPosition = `${orbPos.x}% ${orbPos.y}%`;
  const style = useMemo<React.CSSProperties>(() => ({
    background: backgroundColor,
    backgroundImage: `
      linear-gradient(to right, ${gridColor} 1px, transparent 1px),
      linear-gradient(to bottom, ${gridColor} 1px, transparent 1px),
      radial-gradient(circle at ${computedOrbPosition}, ${orbFrom} 0%, ${orbTo} 40%, transparent 70%)
    `,
    backgroundSize: `${cellSize}px ${cellSize}px, ${cellSize}px ${cellSize}px, 100% 100%`,
    filter: `blur(${blurPx}px)`,
  }), [backgroundColor, gridColor, orbFrom, orbTo, computedOrbPosition, cellSize, blurPx]);

  return (
    <div className={cn("min-h-screen w-full relative", className)}>
      <div className="absolute inset-0 z-0" style={style} />
    </div>
  );
};


