import React, { useEffect, useState } from 'react';

export const AmbientBackground: React.FC = () => {
  const [hasRefract, setHasRefract] = useState(false);

  useEffect(() => {
    // Check if Chrome/WebKit supports SVG displacement filter nicely
    if (typeof window !== 'undefined' && 'chrome' in window) {
      document.documentElement.classList.add('refract');
      setHasRefract(true);
    }
  }, []);

  return (
    <>
      {/* SVG Refraction Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <filter id="lg" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="42" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Floating Animated Gradient Blobs */}
      <div className="scene-bg" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />

        {/* Ambient Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Deep vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#060a1d]/40 to-[#040817]/90 pointer-events-none" />
      </div>
    </>
  );
};
