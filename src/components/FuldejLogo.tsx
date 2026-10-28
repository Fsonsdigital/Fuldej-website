import React, { useState } from 'react';

interface FuldejLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const FuldejLogo: React.FC<FuldejLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  // Exact extracted logo from the official CAC company profile document
  const logoSrc = '/assets/aistudio/fuldej_company_logo.jpg';

  // Medium is the gold standard size for executive clarity & bold presence
  const imgDimensions =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12 sm:w-14 sm:h-14';
  const titleSize =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-base sm:text-lg font-extrabold';
  const subtitleSize =
    size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px] sm:text-xs';

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Official Fuldej Logo Mark from Document - Medium & Bold */}
      <div
        className={`${imgDimensions} relative rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-lg shadow-black/60 shrink-0 bg-[#0d0f17] flex items-center justify-center transition-all duration-200 hover:scale-105 group ring-1 ring-[#D4AF37]/30`}
        title="Fuldej Integrated Service Ltd (CAC RC 7360949)"
      >
        {!imageError ? (
          <img
            src={logoSrc}
            alt="Fuldej Integrated Service Ltd official logo"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-1 border border-[#D4AF37]">
            <span
              className="font-black tracking-tighter text-[#E5B869] select-none text-xs sm:text-sm uppercase leading-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              FULDEJ
            </span>
          </div>
        )}
      </div>

      {/* Corporate Title & Registration Details */}
      <div className="flex flex-col justify-center">
        <span className={`${titleSize} tracking-tight text-white leading-tight font-sans`}>
          Fuldej Integrated Service Ltd
        </span>
        {showSubtitle && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`${subtitleSize} font-mono text-cyan-400 font-semibold tracking-wide uppercase`}>
              RC 7360949
            </span>
            <span className="text-slate-600 text-xs">·</span>
            <span className={`${subtitleSize} text-slate-300 font-medium hidden sm:inline truncate`}>
              Mining · Solar · Boreholes · Engineering
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
