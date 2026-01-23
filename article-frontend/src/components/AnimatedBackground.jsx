import { useEffect, useState } from "react";

export default function AnimatedBackground({ variant = "default" }) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Different color schemes based on variant
  const getColors = () => {
    switch (variant) {
      case "home":
        return {
          orb1: "rgba(79, 172, 254, 0.8)", // Light Blue
          orb2: "rgba(127, 83, 172, 0.7)", // Purple
          orb3: "rgba(59, 130, 246, 0.6)", // Blue
          orb4: "rgba(167, 139, 250, 0.5)", // Light Purple
          orb5: "rgba(34, 211, 238, 0.4)", // Cyan
        };
      case "auth":
        return {
          orb1: "rgba(138, 43, 226, 0.8)", // Purple
          orb2: "rgba(236, 72, 153, 0.7)", // Pink
          orb3: "rgba(59, 130, 246, 0.6)", // Blue
          orb4: "rgba(167, 139, 250, 0.5)", // Light Purple
          orb5: "rgba(34, 211, 238, 0.4)", // Cyan
        };
      default:
        return {
          orb1: "rgba(102, 126, 234, 0.8)", // Purple
          orb2: "rgba(118, 75, 162, 0.7)", // Deep Purple
          orb3: "rgba(59, 130, 246, 0.6)", // Blue
          orb4: "rgba(167, 139, 250, 0.5)", // Light Purple
          orb5: "rgba(34, 211, 238, 0.4)", // Cyan
        };
    }
  };

  const colors = getColors();

  return (
    <div className="animated-gradient-bg">
      {/* Gradient Orbs */}
      <div
        className="gradient-orb gradient-orb-1"
        style={{
          background: `radial-gradient(circle, ${colors.orb1} 0%, transparent 70%)`,
        }}
      />
      <div
        className="gradient-orb gradient-orb-2"
        style={{
          background: `radial-gradient(circle, ${colors.orb2} 0%, transparent 70%)`,
        }}
      />
      <div
        className="gradient-orb gradient-orb-3"
        style={{
          background: `radial-gradient(circle, ${colors.orb3} 0%, transparent 70%)`,
        }}
      />
      <div
        className="gradient-orb gradient-orb-4"
        style={{
          background: `radial-gradient(circle, ${colors.orb4} 0%, transparent 70%)`,
        }}
      />
      <div
        className="gradient-orb gradient-orb-5"
        style={{
          background: `radial-gradient(circle, ${colors.orb5} 0%, transparent 70%)`,
        }}
      />

      {/* Noise Texture for depth */}
      <div className="gradient-noise" />

      {/* Optional: Subtle grid overlay */}
      <div className="gradient-mesh-overlay" />

      {/* Radial fade at edges */}
      <div className="gradient-fade" />

      {/* Interactive cursor glow */}
      <div
        className="gradient-cursor-glow"
        style={{
          left: `${cursorPos.x - 150}px`,
          top: `${cursorPos.y - 150}px`,
          opacity: cursorPos.x > 0 ? 1 : 0,
        }}
      />
    </div>
  );
}