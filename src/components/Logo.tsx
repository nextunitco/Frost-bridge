import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'horizontal' | 'full';
  className?: string;
}

export default function Logo({ variant = 'horizontal', className = '' }: LogoProps) {
  // SVG Symbol only (Monogram FB, Bridge, Snowflake, Ship, Globe)
  const renderSymbol = () => (
    <g id="logo-symbol">
      {/* 1. Monogram FB Background */}
      {/* F Letter (Navy Blue) */}
      <path
        d="M 155,45 L 240,45 L 225,80 L 195,80 L 195,105 L 220,105 L 210,130 L 195,130 L 195,170 L 160,170 Z"
        fill="#0C2340"
      />
      {/* B Letter (Bright Blue) */}
      <path
        d="M 252,45 L 295,45 C 315,45 328,54 328,70 C 328,81 320,89 310,92 C 324,95 332,105 332,122 C 332,142 315,155 295,155 L 243,155 Z"
        fill="#0082FB"
      />
      {/* Inner counter cuts for B */}
      <path d="M 275,65 L 290,65 C 295,65 298,68 298,72 C 298,76 295,79 290,79 L 275,79 Z" fill="#ffffff" />
      <path d="M 275,105 L 292,105 C 298,105 302,109 302,114 C 302,119 298,123 292,123 L 275,123 Z" fill="#ffffff" />

      {/* Diagonal slice separation effect on monogram */}
      <line x1="244" y1="40" x2="218" y2="160" stroke="#ffffff" strokeWidth="6" />

      {/* 2. Globe at the bottom (Centered at x=250, y=190, r=55) */}
      <circle cx="250" cy="190" r="55" fill="none" stroke="#0082FB" strokeWidth="1.5" opacity="0.6" />
      {/* Grid Lines */}
      <ellipse cx="250" cy="190" rx="35" ry="55" fill="none" stroke="#0082FB" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
      <ellipse cx="250" cy="190" rx="18" ry="55" fill="none" stroke="#0082FB" strokeWidth="1" opacity="0.4" />
      <line x1="195" y1="190" x2="305" y2="190" stroke="#0082FB" strokeWidth="1" opacity="0.5" />
      <line x1="202" y1="170" x2="298" y2="170" stroke="#0082FB" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
      <line x1="202" y1="210" x2="298" y2="210" stroke="#0082FB" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.4" />
      
      {/* Simplified Stylized Continents (Africa centered!) */}
      <path
        d="M 235,160 C 240,150 250,145 255,148 C 262,152 260,160 265,165 C 270,170 278,168 280,175 C 282,182 272,190 270,195 C 268,200 262,208 258,212 C 255,215 251,218 248,220 C 246,221 245,215 246,210 C 247,205 243,200 240,195 C 238,190 232,185 233,180 C 234,175 232,168 235,160 Z"
        fill="#0C2340"
        opacity="0.25"
      />
      {/* South America outline (Left side) */}
      <path
        d="M 198,175 C 205,178 208,182 208,188 C 208,194 204,200 202,205 C 200,210 197,215 196,218 C 195,219 194,215 194,210 C 194,204 195,198 196,190 C 196,184 195,180 198,175 Z"
        fill="#0C2340"
        opacity="0.2"
      />

      {/* 3. Snowflake (Left Side, centered at x=125, y=110) */}
      <g stroke="#0082FB" strokeWidth="2.5" strokeLinecap="round">
        {/* Core Spokes */}
        <line x1="125" y1="85" x2="125" y2="135" />
        <line x1="103" y1="97" x2="147" y2="123" />
        <line x1="103" y1="123" x2="147" y2="97" />
        {/* V-Ticks for top spoke */}
        <line x1="125" y1="95" x2="120" y2="90" />
        <line x1="125" y1="95" x2="130" y2="90" />
        <line x1="125" y1="105" x2="118" y2="100" />
        <line x1="125" y1="105" x2="132" y2="100" />
        {/* V-Ticks for bottom spoke */}
        <line x1="125" y1="125" x2="120" y2="130" />
        <line x1="125" y1="125" x2="130" y2="130" />
        {/* V-Ticks for top-left spoke */}
        <line x1="114" y1="103" x2="108" y2="101" />
        <line x1="114" y1="103" x2="114" y2="97" />
        {/* V-Ticks for bottom-right spoke */}
        <line x1="136" y1="117" x2="142" y2="119" />
        <line x1="136" y1="117" x2="136" y2="123" />
        {/* V-Ticks for top-right spoke */}
        <line x1="136" y1="103" x2="142" y2="101" />
        <line x1="136" y1="103" x2="136" y2="97" />
        {/* V-Ticks for bottom-left spoke */}
        <line x1="114" y1="117" x2="108" y2="119" />
        <line x1="114" y1="117" x2="114" y2="123" />
      </g>

      {/* 4. Container Cargo Ship (Right Side, centered at x=370, y=115) */}
      <g>
        {/* Ship Hull (Navy Blue) */}
        <path
          d="M 335,115 L 342,103 L 345,103 L 345,95 L 350,95 L 350,110 L 395,110 L 415,123 L 335,123 Z"
          fill="#0C2340"
        />
        {/* Ship Cargo Containers (Layered Bright Blue and Teal blocks) */}
        <rect x="353" y="100" width="10" height="10" fill="#0082FB" />
        <rect x="364" y="100" width="10" height="10" fill="#3197FF" />
        <rect x="375" y="100" width="10" height="10" fill="#0C2340" />
        <rect x="386" y="103" width="8" height="7" fill="#0082FB" />
        
        <rect x="358" y="90" width="10" height="10" fill="#0082FB" opacity="0.9" />
        <rect x="369" y="90" width="10" height="10" fill="#3197FF" opacity="0.9" />
        
        {/* Ship Cabin Window lines */}
        <rect x="340" y="105" width="3" height="2" fill="#ffffff" />
      </g>

      {/* 5. Cable-stayed Suspension Bridge (Stretches across all elements) */}
      {/* Central Tall Pylon */}
      <path d="M 246,55 L 254,55 L 257,175 L 243,175 Z" fill="#0C2340" />
      <ellipse cx="250" cy="55" rx="4" ry="4" fill="#0C2340" />
      
      {/* Main Bridge Curved Deck (Double-line for realistic deck thickness) */}
      <path
        d="M 80,185 Q 250,120 420,185"
        fill="none"
        stroke="#0C2340"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 80,188 Q 250,123 420,188"
        fill="none"
        stroke="#0082FB"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Cable Lines radiating from top-center pylon (y=70) down to the bridge deck */}
      <g stroke="#0C2340" strokeWidth="1" opacity="0.8">
        {/* Left-side cables */}
        <line x1="250" y1="70" x2="115" y2="171" />
        <line x1="250" y1="70" x2="140" y2="162" />
        <line x1="250" y1="70" x2="168" y2="153" />
        <line x1="250" y1="70" x2="195" y2="145" />
        <line x1="250" y1="70" x2="220" y2="139" />
        
        {/* Right-side cables */}
        <line x1="250" y1="70" x2="385" y2="171" />
        <line x1="250" y1="70" x2="360" y2="162" />
        <line x1="250" y1="70" x2="332" y2="153" />
        <line x1="250" y1="70" x2="305" y2="145" />
        <line x1="250" y1="70" x2="280" y2="139" />
      </g>
    </g>
  );

  if (variant === 'icon') {
    return (
      <svg
        viewBox="80 35 340 190"
        className={`inline-block ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderSymbol()}
      </svg>
    );
  }

  // Full and Horizontal layouts with beautiful typography
  return (
    <svg
      viewBox="0 0 500 340"
      className={`w-full h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Icon portion */}
      {renderSymbol()}

      {/* Typography Section */}
      <g id="logo-text" className="select-none">
        {/* FROST BRIDGE */}
        <text
          x="250"
          y="255"
          textAnchor="middle"
          fill="#0C2340"
          fontSize="36"
          fontWeight="900"
          fontFamily="'Inter', sans-serif"
          letterSpacing="4"
        >
          FROST BRIDGE
        </text>

        {/* Horizontal Divider Lines for Subtitle */}
        <line x1="50" y1="282" x2="145" y2="282" stroke="#0C2340" strokeWidth="2.5" />
        <line x1="355" y1="282" x2="450" y2="282" stroke="#0C2340" strokeWidth="2.5" />

        {/* GLOBAL LOGISTICS LIMITED */}
        <text
          x="250"
          y="288"
          textAnchor="middle"
          fill="#5A6E7F"
          fontSize="15"
          fontWeight="700"
          fontFamily="'Inter', sans-serif"
          letterSpacing="5"
        >
          GLOBAL LOGISTICS LIMITED
        </text>

        {/* Tagline: CONNECTING MARKETS. DELIVERING VALUE. */}
        <text
          x="250"
          y="316"
          textAnchor="middle"
          fill="#0082FB"
          fontSize="11"
          fontWeight="700"
          fontFamily="'Inter', sans-serif"
          letterSpacing="2.5"
        >
          CONNECTING MARKETS. DELIVERING VALUE.
        </text>
      </g>
    </svg>
  );
}
