import React from 'react';

// Official ABBY Wordmark with linocut texture feel
export const AbbyLogo: React.FC<{
  className?: string;
  color?: string;
  showSubtitle?: boolean;
}> = ({ className = 'h-10', color = 'currentColor', showSubtitle = false }) => {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 360 120"
        fill={color}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ABBY Logo"
      >
        {/* A */}
        <path d="M42 108 L22 108 L58 12 L78 12 L114 108 L94 108 L86 86 L49 86 Z M67 36 L54 73 L81 73 Z" />
        {/* B */}
        <path d="M120 14 L170 14 C192 14 204 24 204 38 C204 49 196 56 184 59 C200 62 210 72 210 88 C210 102 195 108 172 108 L120 108 Z M144 28 L144 54 L168 54 C178 54 184 49 184 41 C184 33 178 28 168 28 Z M144 68 L144 94 L170 94 C181 94 188 88 188 81 C188 73 181 68 170 68 Z" />
        {/* B */}
        <path d="M218 14 L268 14 C290 14 302 24 302 38 C302 49 294 56 282 59 C298 62 308 72 308 88 C308 102 293 108 270 108 L218 108 Z M242 28 L242 54 L266 54 C276 54 282 49 282 41 C282 33 276 28 266 28 Z M242 68 L242 94 L268 94 C279 94 286 88 286 81 C286 73 279 68 268 68 Z" />
        {/* Y */}
        <path d="M312 14 L334 14 L348 56 L362 14 L384 14 L356 74 L356 108 L340 108 L340 74 Z" transform="translate(-25, 0)" />
      </svg>
      {showSubtitle && (
        <span className="text-[10px] tracking-[0.3em] font-display uppercase opacity-80 mt-1 text-[#D9D9D9]">
          Paris • Le Temple des Pâtes
        </span>
      )}
    </div>
  );
};

// Imposing vintage stencil/woodcut ABBY logo for the signature bottom block
export const AbbyGiantStencilLogo: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'h-24 w-auto', color = '#FFFFFF' }) => {
  return (
    <svg
      viewBox="0 0 540 160"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logo ABBY vintage imposant"
    >
      {/* Distressed / Stencil Vintage A */}
      <path d="M72 144 L16 144 L68 18 L104 18 L156 144 L100 144 L88 116 L56 116 Z M72 48 L62 94 L82 94 Z" />
      <rect x="70" y="78" width="4" height="20" fill="#2E2E2E" opacity="0.3" />
      <rect x="94" y="36" width="3" height="15" fill="#2E2E2E" opacity="0.25" />
      
      {/* Distressed / Stencil Vintage B */}
      <path d="M164 20 L238 20 C272 20 292 34 292 56 C292 70 282 80 264 85 C288 90 300 104 300 124 C300 144 278 144 242 144 L164 144 Z M198 38 L198 72 L236 72 C252 72 260 66 260 55 C260 44 252 38 236 38 Z M198 92 L198 126 L240 126 C256 126 266 118 266 109 C266 100 256 92 240 92 Z" />
      <rect x="180" y="50" width="4" height="24" fill="#2E2E2E" opacity="0.3" />
      <rect x="246" y="110" width="5" height="12" fill="#2E2E2E" opacity="0.25" />

      {/* Distressed / Stencil Vintage B */}
      <path d="M308 20 L382 20 C416 20 436 34 436 56 C436 70 426 80 408 85 C432 90 444 104 444 124 C444 144 422 144 386 144 L308 144 Z M342 38 L342 72 L380 72 C396 72 404 66 404 55 C404 44 396 38 380 38 Z M342 92 L342 126 L384 126 C400 126 410 118 410 109 C410 100 400 92 384 92 Z" />
      <rect x="324" y="60" width="4" height="20" fill="#2E2E2E" opacity="0.3" />
      <rect x="390" y="42" width="4" height="14" fill="#2E2E2E" opacity="0.25" />

      {/* Distressed / Stencil Vintage Y */}
      <path d="M448 20 L480 20 L504 78 L528 20 L560 20 L518 102 L518 144 L490 144 L490 102 Z" transform="translate(-16, 0)" />
      <rect x="472" y="80" width="4" height="18" fill="#2E2E2E" opacity="0.3" />
    </svg>
  );
};

// Complete Dancing Linocut Characters Ribambelle
export const RibambellePasta: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'h-12 w-auto', color = '#D9D9D9' }) => {
  return (
    <svg
      viewBox="0 0 1000 120"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ribambelle de personnages rituels dansants célébrant les pâtes"
    >
      {/* 1: Character with arms raised */}
      <g transform="translate(10, 10)">
        <circle cx="20" cy="18" r="9" />
        <path d="M12 28 L28 28 L32 65 L26 100 L20 75 L14 100 L8 65 Z" />
        <path d="M12 32 L-2 10 L5 6 L16 26 Z" />
        <path d="M28 32 L42 10 L35 6 L24 26 Z" />
      </g>
      {/* Pasta Shape 1: Spaghetto nest */}
      <g transform="translate(65, 35)">
        <ellipse cx="20" cy="25" rx="16" ry="20" fill="none" stroke={color} strokeWidth="5" />
        <path d="M10 20 Q20 5 30 20 Q20 35 10 20" fill="none" stroke={color} strokeWidth="4" />
        <path d="M15 10 Q32 30 22 42" fill="none" stroke={color} strokeWidth="4" />
      </g>

      {/* 2: Running/dancing character */}
      <g transform="translate(130, 12)">
        <circle cx="25" cy="18" r="9" />
        <path d="M15 30 Q28 35 22 68 L36 102 L28 104 L18 72 L8 98 L1 96 L10 65 Z" />
        <path d="M14 34 L-4 46 L-1 53 L16 38 Z" />
        <path d="M27 34 L46 20 L50 26 L29 42 Z" />
      </g>
      {/* Pasta Shape 2: Rigatoni / Penne */}
      <g transform="translate(200, 30)">
        <rect x="5" y="10" width="16" height="42" rx="4" transform="rotate(-15 13 31)" />
        <line x1="8" y1="20" x2="18" y2="20" stroke="#2E2E2E" strokeWidth="2" />
        <line x1="8" y1="30" x2="18" y2="30" stroke="#2E2E2E" strokeWidth="2" />
      </g>

      {/* 3: Wide jumping worshipper */}
      <g transform="translate(250, 14)">
        <circle cx="30" cy="16" r="10" />
        <path d="M18 32 L42 32 L48 64 L56 98 L45 100 L32 72 L20 100 L8 98 L14 64 Z" />
        <path d="M18 34 L2 18 L6 13 L22 30 Z" />
        <path d="M42 34 L58 18 L54 13 L38 30 Z" />
      </g>
      {/* Pasta Shape 3: Farfalle */}
      <g transform="translate(340, 35)">
        <path d="M10 15 C10 15 2 28 8 38 C14 48 24 36 24 36 C24 36 34 48 40 38 C46 28 38 15 38 15 C38 15 32 24 24 24 C16 24 10 15 10 15 Z" />
        <ellipse cx="24" cy="24" rx="4" ry="7" fill="#2E2E2E" />
      </g>

      {/* 4: Leaping Joyful character */}
      <g transform="translate(410, 12)">
        <circle cx="20" cy="16" r="9" />
        <path d="M12 28 L28 28 L34 62 L48 88 L40 93 L24 66 L12 94 L4 90 L12 58 Z" />
        <path d="M14 30 L0 16 L5 12 L18 26 Z" />
        <path d="M26 30 L40 16 L45 20 L28 36 Z" />
      </g>
      {/* Pasta Shape 4: Lasagna sheet wave */}
      <g transform="translate(485, 36)">
        <path d="M5 25 Q20 10 35 25 Q50 40 65 25" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
        <path d="M5 33 Q20 18 35 33 Q50 48 65 33" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <path d="M5 41 Q20 26 35 41 Q50 56 65 41" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* 5: Open arms reverent deity */}
      <g transform="translate(580, 10)">
        <circle cx="28" cy="18" r="10" />
        <ellipse cx="28" cy="4" rx="14" ry="4" fill="none" stroke={color} strokeWidth="3" />
        <path d="M16 32 L40 32 L45 70 L38 102 L30 76 L20 102 L12 70 Z" />
        <path d="M16 34 L-6 38 L-4 46 L18 42 Z" />
        <path d="M40 34 L62 38 L60 46 L38 42 Z" />
      </g>
      {/* Pasta Shape 5: Ravioli Quadrello */}
      <g transform="translate(665, 30)">
        <rect x="8" y="10" width="34" height="34" rx="3" fill="none" stroke={color} strokeWidth="4" />
        <circle cx="25" cy="27" r="8" fill={color} />
        {/* scalloped edge indicators */}
        <circle cx="8" cy="18" r="2.5" />
        <circle cx="8" cy="27" r="2.5" />
        <circle cx="8" cy="36" r="2.5" />
        <circle cx="42" cy="18" r="2.5" />
        <circle cx="42" cy="27" r="2.5" />
        <circle cx="42" cy="36" r="2.5" />
      </g>

      {/* 6: Spinning dancer */}
      <g transform="translate(730, 14)">
        <circle cx="22" cy="16" r="9" />
        <path d="M14 28 L30 28 L24 64 L36 96 L27 99 L18 70 L9 96 L1 93 L10 60 Z" />
        <path d="M14 32 L-2 20 L2 15 L18 28 Z" />
        <path d="M28 32 L46 36 L44 44 L26 38 Z" />
      </g>
      {/* Pasta Shape 6: Casarecce / Campanelle ribbon */}
      <g transform="translate(805, 30)">
        <path d="M10 40 Q25 15 35 30 Q45 45 55 18" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <circle cx="55" cy="18" r="5" />
      </g>

      {/* 7: Final worshipper jumping */}
      <g transform="translate(885, 12)">
        <circle cx="25" cy="18" r="10" />
        <path d="M15 32 L35 32 L40 68 L50 96 L41 100 L28 72 L18 99 L9 96 L15 62 Z" />
        <path d="M15 34 L-2 16 L3 12 L20 30 Z" />
        <path d="M35 34 L52 14 L56 18 L38 38 Z" />
      </g>
      {/* Pasta Shape 7: Penne Floating */}
      <g transform="translate(955, 32)">
        <path d="M8 35 L22 10 L32 15 L18 40 Z" fill={color} />
        <ellipse cx="27" cy="12" rx="4" ry="2.5" fill="#2E2E2E" />
      </g>
    </svg>
  );
};

// Character Motif: The Sacred Pasta God with Many Arms (Charte page 6 & 13)
export const PastaDeityIllustration: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-32 h-32', color = '#966EA3' }) => {
  return (
    <svg viewBox="0 0 200 200" fill={color} className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Divinité des glucides aux multiples bras">
      {/* Central body & head */}
      <ellipse cx="100" cy="80" rx="20" ry="28" />
      <circle cx="100" cy="45" r="14" />
      {/* Legs */}
      <path d="M86 104 L80 160 L92 162 L98 114 L102 114 L108 162 L120 160 L114 104 Z" />
      
      {/* Multiple arms reaching out with pasta shapes */}
      {/* Left arm 1: Maccheroni */}
      <path d="M84 75 Q40 60 30 38" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M22 36 C18 26 34 20 40 30 C44 38 32 44 22 36" fill="none" stroke={color} strokeWidth="5" />

      {/* Left arm 2: Farfalle */}
      <path d="M82 85 Q35 88 18 80" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M12 72 C12 72 4 80 8 86 C12 92 18 86 18 86 C18 86 24 92 28 86 C32 80 24 72 24 72 Z" />

      {/* Left arm 3: Ribbon Tagliatelle */}
      <path d="M85 95 Q45 115 25 125" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M22 120 Q35 130 20 145" stroke={color} strokeWidth="5" fill="none" />

      {/* Top arms: Offering a pasta crown/nest */}
      <path d="M92 65 Q85 30 96 15" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M108 65 Q115 30 104 15" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="14" rx="16" ry="8" fill="none" stroke={color} strokeWidth="4" />
      <path d="M92 14 Q100 8 108 14" stroke={color} strokeWidth="3" fill="none" />

      {/* Right arm 1: Penne */}
      <path d="M116 75 Q160 60 170 38" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M165 42 L180 22 L188 26 L173 46 Z" />

      {/* Right arm 2: Ravioli */}
      <path d="M118 85 Q165 88 182 80" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="175" y="70" width="18" height="18" rx="2" fill="none" stroke={color} strokeWidth="4" />

      {/* Right arm 3: Curly Fusilli */}
      <path d="M115 95 Q155 115 175 125" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M175 122 Q165 132 180 145" stroke={color} strokeWidth="5" fill="none" />

      {/* Halo with three holy pasta dots */}
      <circle cx="88" cy="30" r="3" fill="#FA6755" />
      <circle cx="100" cy="26" r="3.5" fill="#FA6755" />
      <circle cx="112" cy="30" r="3" fill="#FA6755" />
    </svg>
  );
};

// Character Motif: The Farfalle-Winged Angel (Charte page 6)
export const FarfalleSeraph: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-24 h-24', color = 'currentColor' }) => {
  return (
    <svg viewBox="0 0 160 160" fill={color} className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ange aux ailes de Farfalle">
      {/* Floating penne halo */}
      <ellipse cx="80" cy="22" rx="28" ry="8" fill="none" stroke={color} strokeWidth="5" strokeDasharray="3 2" />
      {/* Farfalle wings & eyes */}
      <path d="M80 62 C50 30 20 40 22 68 C24 88 56 90 74 76 Z" />
      <path d="M80 62 C110 30 140 40 138 68 C136 88 104 90 86 76 Z" />
      {/* Eyes in the farfalle */}
      <ellipse cx="58" cy="62" rx="6" ry="4" fill="#2E2E2E" />
      <ellipse cx="102" cy="62" rx="6" ry="4" fill="#2E2E2E" />
      {/* Body */}
      <ellipse cx="80" cy="115" rx="34" ry="32" />
    </svg>
  );
};

// Character Motif: Dancing Noodle Duo (Charte page 15)
export const DancingDuo: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-28 h-28', color = 'currentColor' }) => {
  return (
    <svg viewBox="0 0 200 160" fill={color} className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Danse rituelle des pâtes">
      {/* Sacred Eye in the middle */}
      <ellipse cx="100" cy="35" rx="14" ry="7" fill="none" stroke="#FA6755" strokeWidth="3" />
      <circle cx="100" cy="35" r="3.5" fill="#FA6755" />
      <line x1="92" y1="22" x2="94" y2="17" stroke="#FA6755" strokeWidth="2.5" />
      <line x1="100" y1="20" x2="100" y2="15" stroke="#FA6755" strokeWidth="2.5" />
      <line x1="108" y1="22" x2="106" y2="17" stroke="#FA6755" strokeWidth="2.5" />

      {/* Left dancer */}
      <g transform="translate(10, 10)">
        {/* head is a swirl of spaghetti */}
        <circle cx="45" cy="45" r="22" fill="none" stroke={color} strokeWidth="5" />
        <path d="M35 45 Q45 32 55 45 Q45 58 35 45" fill="none" stroke={color} strokeWidth="4" />
        {/* body dancing */}
        <path d="M45 68 Q55 90 35 110 L15 135 L8 128 L28 105 L15 90 L22 84 Z" />
        <path d="M45 75 Q68 85 85 75 L88 83 L65 96 Z" />
      </g>

      {/* Right dancer */}
      <g transform="translate(100, 10)">
        {/* head is a swirl of spaghetti */}
        <circle cx="45" cy="45" r="22" fill="none" stroke={color} strokeWidth="5" />
        <path d="M35 45 Q45 58 55 45 Q45 32 35 45" fill="none" stroke={color} strokeWidth="4" />
        {/* body dancing */}
        <path d="M45 68 Q35 90 55 110 L75 135 L82 128 L62 105 L75 90 L68 84 Z" />
        <path d="M45 75 Q22 85 5 75 L2 83 L25 96 Z" />
      </g>
    </svg>
  );
};
