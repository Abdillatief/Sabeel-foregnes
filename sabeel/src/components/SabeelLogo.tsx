import React, { useState } from 'react';

interface SabeelLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const SabeelLogo: React.FC<SabeelLogoProps> = ({
  className = '',
  size = 36,
  showText = false
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {!hasError ? (
        <img
          src="/src/assets/images/sabeel_brand_logo_1792261027598.jpg"
          alt="Sabeel Academy Logo"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          style={{ width: size, height: size }}
          className="object-contain rounded-md shrink-0"
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Floating Hexagons */}
          <polygon points="75,65 83,60 91,65 91,75 83,80 75,75" stroke="#5DA9E9" strokeWidth="2.5" fill="none" opacity="0.8" />
          <polygon points="98,58 106,53 114,58 114,68 106,73 98,68" stroke="#5DA9E9" strokeWidth="2.5" fill="none" opacity="0.8" />
          <polygon points="120,68 127,64 134,68 134,76 127,80 120,76" stroke="#5DA9E9" strokeWidth="2" fill="none" opacity="0.7" />
          
          {/* Star at Apex */}
          <polygon points="126,45 129,54 138,54 131,59 133,68 126,63 119,68 121,59 114,54 123,54" fill="#5DA9E9" />
          
          {/* Open Book and Path */}
          <path d="M72 102 C72 110 80 114 96 114 C98 114 100 112 100 110" stroke="#5DA9E9" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M144 102 C144 110 136 114 120 114" stroke="#5DA9E9" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M94 114 C98 117 102 117 106 114" stroke="#5DA9E9" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M86 112 C88 126 98 132 106 132 C116 132 118 128 114 120 C106 104 96 98 108 82 C114 74 122 66 126 58 C124 64 118 70 112 78 C98 94 92 102 86 112 Z" fill="#5DA9E9" />
        </svg>
      )}

      {showText && (
        <div className="flex flex-col">
          <span className="font-extrabold tracking-wider text-[#4A9CE3] text-lg uppercase leading-none">
            SABEEL
          </span>
          <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest leading-tight">
            Academy
          </span>
        </div>
      )}
    </div>
  );
};
