import React, { useState, useEffect, useRef } from 'react';
import { STRATEGIC_PARTNERS, FULDEJ_CORPORATE_INFO } from '../data/mockData';
import { ArrowUpRight, CheckCircle2, Handshake, Sparkles, Users, ShieldCheck, Download, Camera, Upload, RefreshCw, Mail, Phone } from 'lucide-react';
import { StrategicPartner } from '../types';

interface StrategicPartnersProps {
  onPartnerInquiry?: (partner: StrategicPartner) => void;
}

export const StrategicPartners: React.FC<StrategicPartnersProps> = ({
  onPartnerInquiry
}) => {
  // Custom image state for Fahad Isyaku Umar (saved to localStorage so user's uploaded photo persists)
  const [fahadCustomImage, setFahadCustomImage] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('fuldej_fahad_custom_photo');
    if (saved) {
      setFahadCustomImage(saved);
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFahadCustomImage(base64);
        localStorage.setItem('fuldej_fahad_custom_photo', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetFahadPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFahadCustomImage(null);
    localStorage.removeItem('fuldej_fahad_custom_photo');
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // High quality professional portrait fallback for Fahad Isyaku Umar
  const defaultFahadPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
  const currentFahadPhoto = fahadCustomImage || defaultFahadPhoto;

  return (
    <section id="partners" className="py-16 md:py-24 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Hidden file input for Fahad photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
              <Handshake className="w-4 h-4 text-cyan-400" />
              <span>Official Institutional Alliances & Impact Ventures</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Strategic Partners & Initiatives
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              In strategic alliance with <strong className="text-white font-semibold">Fuldej Integrated Service Ltd</strong>, these official partner ventures spearhead clean solar energy infrastructure, community digital transformation, and ethical artificial intelligence across Nigeria and Africa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-200 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              <span className="font-semibold">3 Verified Strategic Alliances</span>
            </div>

            <a
              href={FULDEJ_CORPORATE_INFO.pdfProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
              className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-400 text-xs font-semibold text-cyan-300 transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CAC Profile (PDF)</span>
            </a>
          </div>
        </div>

        {/* Medium-Sized Partner Logo Strip with Bold, Polished Badges */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-white/15 shadow-2xl">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
            <span className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Official Strategic Partner Marks (Medium Size)</span>
            </span>
            <span className="text-cyan-400 font-semibold">
              Co-Led by Co-Founder Fahad Isyaku Umar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {STRATEGIC_PARTNERS.map((partner) => {
              const isSmartGreen = partner.id === 'smartgreen';
              const isSmartGrowth = partner.id === 'smartgrowth';

              return (
                <div
                  key={partner.id}
                  className={`p-5 rounded-2xl bg-[#090C15] border transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between gap-4 shadow-xl ${
                    isSmartGreen
                      ? 'border-emerald-500/30 hover:border-emerald-400 hover:shadow-emerald-500/10'
                      : isSmartGrowth
                      ? 'border-cyan-500/30 hover:border-cyan-400 hover:shadow-cyan-500/10'
                      : 'border-blue-500/30 hover:border-blue-400 hover:shadow-blue-500/10'
                  }`}
                >
                  {/* Medium-Sized Logo Box */}
                  <div className="h-28 w-full bg-black rounded-xl p-4 border border-white/15 flex items-center justify-center overflow-hidden shadow-inner relative">
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} logo`}
                      onError={() => handleImageError(partner.id)}
                      className={`max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300 ${
                        isSmartGrowth
                          ? 'h-12 sm:h-14 w-auto max-w-[200px]'
                          : isSmartGreen
                          ? 'h-16 sm:h-20 w-auto'
                          : 'h-16 sm:h-20 w-auto'
                      }`}
                    />
                  </div>

                  {/* Partner Text Details */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {partner.name}
                      </span>
                      <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                        {partner.shortName}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium line-clamp-1">
                      {partner.category}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Lead: <span className="text-white font-semibold">{partner.leaderName}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Strategic Partner Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {STRATEGIC_PARTNERS.map((partner) => {
            const isSmartGreen = partner.id === 'smartgreen';
            const isSmartGrowth = partner.id === 'smartgrowth';

            const cardBorder = isSmartGreen
              ? 'border-emerald-500/40 hover:border-emerald-400 shadow-[0_4px_30px_rgba(16,185,129,0.08)]'
              : isSmartGrowth
              ? 'border-cyan-500/40 hover:border-cyan-400 shadow-[0_4px_30px_rgba(6,182,212,0.08)]'
              : 'border-blue-500/40 hover:border-blue-400 shadow-[0_4px_30px_rgba(59,130,246,0.08)]';

            const badgeColor = isSmartGreen
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : isSmartGrowth
              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
              : 'bg-blue-500/15 text-blue-300 border-blue-500/30';

            return (
              <div
                key={partner.id}
                className={`rounded-2xl p-6 sm:p-8 bg-slate-900/90 border ${cardBorder} flex flex-col justify-between space-y-6 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 group`}
              >
                {/* Header & Medium Logo Box */}
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-md border ${badgeColor}`}>
                      {partner.highlightBadge}
                    </span>
                    <Sparkles className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  {/* Bold Medium Logo Display Canvas */}
                  <div className="h-32 w-full bg-black rounded-xl p-4 border border-white/15 flex items-center justify-center shadow-inner overflow-hidden relative group-hover:border-white/30 transition-colors">
                    {/* Subtle ambient accent glow */}
                    <div
                      className={`absolute inset-0 opacity-20 pointer-events-none blur-xl ${
                        isSmartGreen
                          ? 'bg-emerald-500'
                          : isSmartGrowth
                          ? 'bg-cyan-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    
                    <img
                      src={partner.logoUrl}
                      alt={`${partner.name} Official Logo`}
                      onError={() => handleImageError(`card-${partner.id}`)}
                      className={`relative z-10 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300 ${
                        isSmartGrowth
                          ? 'h-14 sm:h-16 w-auto max-w-[210px]'
                          : isSmartGreen
                          ? 'h-20 sm:h-22 w-auto'
                          : 'h-20 sm:h-22 w-auto'
                      }`}
                    />
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-200 transition-colors">
                      {partner.name}
                    </h3>
                    <div className="text-xs font-mono font-medium text-cyan-400 mt-1">
                      {partner.tagline}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {partner.description}
                  </p>

                  {/* Focus Areas */}
                  <div className="space-y-2.5 pt-3 border-t border-white/10">
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                      Core Strategic Focus
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {partner.focusAreas.map((area, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Leadership & Impact Metrics */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  {/* Leadership Attribution */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs shrink-0 border border-cyan-500/30">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-xs min-w-0">
                      <div className="text-white font-bold truncate">{partner.leaderName}</div>
                      <div className="text-[10px] text-cyan-400 font-mono truncate">{partner.leaderTitle}</div>
                    </div>
                  </div>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {partner.impactMetrics.map((metric, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-950/70 border border-white/5">
                        <div className="text-xs sm:text-sm font-bold text-white font-mono">{metric.value}</div>
                        <div className="text-[9px] text-slate-400 leading-tight mt-0.5 font-medium">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  {onPartnerInquiry && (
                    <button
                      onClick={() => onPartnerInquiry(partner)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-cyan-950 hover:to-slate-800 border border-white/10 hover:border-cyan-400/60 text-xs font-bold text-cyan-300 flex items-center justify-center gap-2 transition-all shadow-md group-hover:text-white"
                    >
                      <span>Inquire for Collaboration</span>
                      <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Executive Leadership Spotlight: Co-Founder Fahad Isyaku Umar with Photo & Photo Uploader */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0A0E1A] border-2 border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Medium/Large Portrait Photo of Fahad Isyaku Umar */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20 bg-slate-950 relative">
                  <img
                    src={currentFahadPhoto}
                    alt="Fahad Isyaku Umar — Co-Founder & Strategic Partner"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultFahadPhoto;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Photo update button overlay */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload or change portrait image"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-xs text-cyan-300 font-semibold gap-1.5"
                  >
                    <Camera className="w-6 h-6" />
                    <span>Upload Your Photo</span>
                  </button>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 px-3 py-1 bg-cyan-500 text-slate-950 text-[10px] font-mono uppercase font-extrabold rounded-full shadow-lg whitespace-nowrap">
                  Co-Founder & Strategic Lead
                </div>
              </div>

              {/* Upload action link */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{fahadCustomImage ? 'Change Image' : 'Upload My Image'}</span>
                </button>

                {fahadCustomImage && (
                  <button
                    onClick={handleResetFahadPhoto}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 border border-white/10 text-slate-400 hover:text-rose-300 text-xs transition-colors"
                    title="Reset photo to default"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Executive Credentials & Bio */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Strategic Leadership Profile
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Fahad Isyaku Umar
                </h3>
                <div className="text-sm font-semibold text-cyan-300">
                  Co-Founder & Strategic Partner · Fuldej Integrated Service Ltd
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Strategic Initiative Lead: MGDI Initiative · SmartGrowth AI · SmartGreen
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Co-Founder and Strategic Partner at <strong className="text-white">Fuldej Integrated Service Ltd</strong>, leading the cross-sector convergence of commercial engineering, sustainable renewable energy, and digital transformation. Spearheads pioneering pan-African initiatives including the <span className="text-cyan-300 font-medium">MGDI Initiative</span> (community digital tech hubs & youth empowerment), <span className="text-cyan-300 font-medium">SmartGrowth AI</span> (AI-driven financial inclusion & ethical enterprise acceleration), and clean solar infrastructure with <span className="text-emerald-300 font-medium">SmartGreen</span>.
              </p>

              {/* Badges of Key Focus */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs">
                  <span className="text-[10px] font-mono text-cyan-400 block uppercase">Strategic Focus</span>
                  <span className="text-white font-medium">AI & Ethical Finance</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs">
                  <span className="text-[10px] font-mono text-emerald-400 block uppercase">Alliances</span>
                  <span className="text-white font-medium">Clean Energy & Solar</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono text-blue-400 block uppercase">Community</span>
                  <span className="text-white font-medium">Digital Tech Hubs</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${FULDEJ_CORPORATE_INFO.email}?subject=Partnership%20Inquiry%20-%20Fahad%20Isyaku%20Umar`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/10 transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Strategic Office</span>
                </a>

                <a
                  href={FULDEJ_CORPORATE_INFO.pdfProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download CAC Company Profile (PDF)</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
