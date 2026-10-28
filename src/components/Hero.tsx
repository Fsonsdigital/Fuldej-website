import React, { useState } from 'react';
import { ArrowRight, Code, Wrench, Sun, Briefcase, Truck, ShieldCheck, Send, Calculator, Handshake, Download } from 'lucide-react';
import { FULDEJ_CORPORATE_INFO, STRATEGIC_PARTNERS } from '../data/mockData';
import { FuldejLogo } from './FuldejLogo';

interface HeroProps {
  onExploreServices: () => void;
  onOpenRfq: () => void;
  onOpenEstimator: () => void;
  onOpenPartners?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onOpenRfq,
  onOpenEstimator,
  onOpenPartners
}) => {
  const [heroImageError, setHeroImageError] = useState(false);
  const heroImageSrc = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80';
  const fallbackHeroImage = 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80';

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Kicker with quiet separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 font-mono">
              <span className="text-cyan-400 font-semibold tracking-wide uppercase">Integrated Engineering & Enterprise Solutions</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-white font-bold">{FULDEJ_CORPORATE_INFO.cacNumber}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold">20+ Years Field Experience</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Kano, Nigeria</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Engineering, Mining Resources, Solar Energy & Smart Infrastructure
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              <strong className="text-white font-semibold">Fuldej Integrated Service Ltd</strong> is a registered multidisciplinary engineering firm specialized in <span className="text-cyan-300 font-medium">mining mineral resources, industrial solar installations, deep aquifer borehole consultancy, enterprise software, and procurement</span> with over <span className="text-white font-bold">20+ years of collective field experience</span>.
            </p>

            {/* 5 Core Pillars Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-200 font-medium truncate">Technology & Software</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-200 font-medium truncate">Engineering & Technical</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-200 font-medium truncate">Renewable & Smart Infra</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs text-slate-200 font-medium truncate">Digital Consultancy</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-white/10 flex items-center gap-2 sm:col-span-2">
                <Truck className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs text-slate-200 font-medium truncate">Industrial Supply & Procurement</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenRfq}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-lg shadow-lg shadow-cyan-500/10 transition-all hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Request Project Proposal / RFQ</span>
                <Send className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenEstimator}
                className="px-5 py-3.5 text-sm font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Interactive Cost Estimator</span>
              </button>

              <button
                onClick={onExploreServices}
                className="px-4 py-3.5 text-sm font-medium text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline whitespace-nowrap shrink-0"
              >
                Explore Capabilities
              </button>
            </div>

            {/* Strategic Partners Quick Banner with Medium Logos */}
            <div className="pt-5 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono uppercase tracking-wider text-[11px] text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Handshake className="w-3.5 h-3.5" />
                  <span>Strategic Partner Alliances (Medium Logos):</span>
                </span>
                {onOpenPartners && (
                  <button
                    onClick={onOpenPartners}
                    className="text-[11px] text-slate-400 hover:text-cyan-300 transition-colors underline"
                  >
                    View All 3 Partner Initiatives →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STRATEGIC_PARTNERS.map((partner) => {
                  const isSmartGrowth = partner.id === 'smartgrowth';
                  return (
                    <div
                      key={partner.id}
                      onClick={onOpenPartners}
                      className="p-3.5 rounded-xl bg-black/90 border border-white/10 hover:border-cyan-400/60 transition-all flex items-center gap-3 cursor-pointer group shadow-lg"
                    >
                      {/* Medium-sized partner logo box */}
                      <div className="h-14 w-24 sm:w-28 bg-black rounded-lg p-1.5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={partner.logoUrl}
                          alt={partner.name}
                          className={`max-w-full object-contain filter group-hover:scale-105 transition-transform ${
                            isSmartGrowth ? 'h-8 sm:h-9 max-w-[100px]' : 'h-11 sm:h-12'
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                          {partner.shortName}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {partner.category.split('&')[0]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Container & Corporate Seal */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group">
              <div className="aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] w-full overflow-hidden relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src="/assets/videos/fuldej_solar_installation_pro.mp4" type="video/mp4" />
                  <source src="/assets/videos/fuldej_solar_installation.mp4" type="video/mp4" />
                  <source src="/assets/aistudio/VID-20261022-WA0020__1__978a816f.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
              </div>

              {/* Media Card Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                  <span className="font-semibold uppercase">MINING · SOLAR · WATER</span>
                  <span className="text-emerald-400 text-[11px] font-bold">20+ YRS EXPERIENCE</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  Turnkey Engineering, Solar Micro-Grids & Deep Boreholes
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2">
                  Specialized in solid mineral geological exploration (Lithium, Tantalite, Gold), certified assays, 250m+ deep aquifer borehole drilling, and industrial solar PV arrays across Nigeria.
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] text-slate-400">
                  <span className="text-cyan-400 font-mono">Kano State, Nigeria</span>
                  <button
                    onClick={onExploreServices}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <span>Inspect Solutions</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Floating Corporate Stamp with Medium-Sized Official Logo */}
              <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md border-2 border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-right shadow-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#D4AF37]/50 bg-black shrink-0 shadow-md">
                  <img
                    src={FULDEJ_CORPORATE_INFO.fuldejLogoUrl}
                    alt="Fuldej Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#E5B869] font-mono block font-extrabold tracking-wider">CAC ACCREDITED</span>
                  <span className="text-xs font-mono text-white font-extrabold">{FULDEJ_CORPORATE_INFO.cacNumber}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width Metric & Trust Strip */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              20+ Years
            </div>
            <div className="text-xs text-slate-400">
              Multidisciplinary Field Experience
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-cyan-400 tabular-nums">
              {FULDEJ_CORPORATE_INFO.cacNumber}
            </div>
            <div className="text-xs text-slate-400">
              Incorporated 21 February 2024
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              5 Core Divisions
            </div>
            <div className="text-xs text-slate-400">
              Mining, Solar, Boreholes, Software & Advisory
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
              Kano State HQ
            </div>
            <div className="text-xs text-slate-400">
              White Container, BUK Old Campus Area
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
