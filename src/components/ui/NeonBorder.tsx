'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface NeonBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color of the bright neon beam core (hex or rgba). Defaults to brand electric blue. */
  color?: string;
  /** Secondary or trail color for a gradient tail effect. Defaults to primary color. */
  secondaryColor?: string;
  /** Color of the static resting/underlying border track. Set to 'transparent' for none. */
  trackColor?: string;
  /** Width of the border line in pixels. Defaults to 2. */
  borderWidth?: number;
  /** Corner radius in pixels (e.g. 12) or string (e.g. '12px'). Defaults to 12. */
  borderRadius?: number | string;
  /** Duration of one full loop around the perimeter in seconds. Defaults to 4. */
  duration?: number;
  /** Length of the glowing neon beam as a percentage of total perimeter (0 to 100). Defaults to 25. */
  trailLength?: number;
  /** Multiplier for the outer bloom glow intensity (0 to 3). Defaults to 1. */
  glowIntensity?: number;
  /** Reverse animation direction. Defaults to false (clockwise). */
  reverse?: boolean;
  /** Whether the neon beam pauses or accelerates on hover. 'pause' | 'accelerate' | 'none'. Defaults to 'accelerate'. */
  hoverEffect?: 'pause' | 'accelerate' | 'none';
  /** Additional container classes. */
  className?: string;
  /** Inner content to wrap with the neon border. */
  children?: React.ReactNode;
}

/**
 * NeonBorder — A glowing neon beam that chases a frame's edge with real
 * multi-layered bloom, hugging rounded corners precisely.
 */
export default function NeonBorder({
  color = '#007acc',
  secondaryColor,
  trackColor = 'rgba(0, 47, 94, 0.15)',
  borderWidth = 2,
  borderRadius = 12,
  duration = 4,
  trailLength = 28,
  glowIntensity = 1,
  reverse = false,
  hoverEffect = 'accelerate',
  className = '',
  style,
  children,
  ...props
}: NeonBorderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parse borderRadius to numeric pixel value for SVG rect rx/ry
  const numRadius = typeof borderRadius === 'number' 
    ? borderRadius 
    : parseInt(String(borderRadius), 10) || 12;

  // Measure container dimensions with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(1, Math.round(width)),
          height: Math.max(1, Math.round(height)),
        });
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { width, height } = dimensions;
   // Beam and dash calculations with normalized 0..100 pathLength
  const clampedTrail = Math.max(1, Math.min(100, trailLength));
  const dashArray = `${clampedTrail} ${100 - clampedTrail}`;
  const coreDashArray = `${clampedTrail * 0.4} ${100 - clampedTrail * 0.4}`;

  // Speed adjustments on hover
  let activeDuration = duration;
  if (isHovered && hoverEffect === 'accelerate') {
    activeDuration = Math.max(0.8, duration * 0.4);
  }

  const animDirection = reverse ? 'reverse' : 'normal';
  const animPlayState = isHovered && hoverEffect === 'pause' ? 'paused' : 'running';

  const beamId = React.useId().replace(/:/g, '');
  const gradId = `neon-grad-${beamId}`;
  const glowId = `neon-glow-${beamId}`;

  const resolvedSecondary = secondaryColor || color;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-visible ${className}`}
      style={{
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* SVG Neon Layer */}
      {width > 0 && height > 0 && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-visible"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            {/* Linear Gradient for comet beam */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={resolvedSecondary} stopOpacity="0.05" />
              <stop offset="50%" stopColor={resolvedSecondary} stopOpacity="0.7" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>

            {/* Gaussian Blur Glow Filters */}
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation={borderWidth * 1.5 * glowIntensity} result="blur1" />
              <feGaussianBlur stdDeviation={borderWidth * 4.5 * glowIntensity} result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Underlying static track */}
          {trackColor && trackColor !== 'transparent' && (
            <rect
              x={borderWidth / 2}
              y={borderWidth / 2}
              width={Math.max(0, width - borderWidth)}
              height={Math.max(0, height - borderWidth)}
              rx={numRadius}
              ry={numRadius}
              fill="none"
              stroke={trackColor}
              strokeWidth={borderWidth}
            />
          )}

          {/* 2. Outer Soft Bloom Layer */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={Math.max(0, width - borderWidth)}
            height={Math.max(0, height - borderWidth)}
            rx={numRadius}
            ry={numRadius}
            pathLength={100}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={borderWidth * 2.2}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            filter={`url(#${glowId})`}
            opacity={0.85 * glowIntensity}
            style={{
              // Longhands only. The `animation` shorthand resets every
              // animation-* property to its initial value, so pairing it with
              // animationDirection / animationPlayState in one object means a
              // re-render can silently drop the reverse and pause states.
              animationName: 'neonBeamLoop',
              animationDuration: `${activeDuration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: animDirection,
              animationPlayState: animPlayState,
            }}
          />

          {/* 3. Intense Crisp Core Layer */}
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={Math.max(0, width - borderWidth)}
            height={Math.max(0, height - borderWidth)}
            rx={numRadius}
            ry={numRadius}
            pathLength={100}
            fill="none"
            stroke="#ffffff"
            strokeWidth={borderWidth * 0.8}
            strokeDasharray={coreDashArray}
            strokeLinecap="round"
            opacity={0.95}
            style={{
              // Longhands only. The `animation` shorthand resets every
              // animation-* property to its initial value, so pairing it with
              // animationDirection / animationPlayState in one object means a
              // re-render can silently drop the reverse and pause states.
              animationName: 'neonBeamLoop',
              animationDuration: `${activeDuration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: animDirection,
              animationPlayState: animPlayState,
            }}
          />
        </svg>
      )}

      {/* Children content */}
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </div>
  );
}

export { NeonBorder };
