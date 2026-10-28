import React, { useState } from 'react';
import { ServiceDivision, ServiceCategory } from '../types';
import { Code, Wrench, Sun, Briefcase, Truck, CheckCircle2, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface ServicesOverviewProps {
  divisions: ServiceDivision[];
  onSelectDivisionForRfq: (divId: Exclude<ServiceCategory, 'all'>) => void;
  onSelectDivisionForEstimator: (divId: Exclude<ServiceCategory, 'all'>) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  divisions,
  onSelectDivisionForRfq,
  onSelectDivisionForEstimator
}) => {
  const [activeDivisionId, setActiveDivisionId] = useState<Exclude<ServiceCategory, 'all'>>('technology');

  const getDivisionIcon = (id: string) => {
    switch (id) {
      case 'technology': return <Code className="w-5 h-5 text-cyan-400" />;
      case 'engineering': return <Wrench className="w-5 h-5 text-emerald-400" />;
      case 'renewable': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'consultancy': return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'procurement': return <Truck className="w-5 h-5 text-purple-400" />;
      default: return <Wrench className="w-5 h-5 text-cyan-400" />;
    }
  };

  const selectedDivision = divisions.find(d => d.id === activeDivisionId) || divisions[0];

  return (
    <section id="services" className="py-16 md:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
            Areas of Competence & Delivery
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Comprehensive Corporate Services
          </h2>
          <p className="text-sm text-slate-400">
            Fuldej Integrated Service Ltd operates across five specialized divisions, delivering end-to-end technology, physical infrastructure, clean energy, and procurement support.
          </p>
        </div>

        {/* 5-Item Segmented Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 p-1.5 bg-slate-900/90 border border-white/10 rounded-2xl">
          {divisions.map((div) => {
            const isActive = activeDivisionId === div.id;
            return (
              <button
                key={div.id}
                onClick={() => setActiveDivisionId(div.id)}
                className={`p-3 rounded-xl transition-all text-left flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {getDivisionIcon(div.id)}
                <span className="text-xs font-bold truncate block">{div.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Division Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
          
          {/* Left Column: Scope, Capabilities & Deliverables */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
                {getDivisionIcon(selectedDivision.id)}
                <span>Division Specification · {selectedDivision.shortTitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {selectedDivision.title}
              </h3>
              <p className="text-xs text-cyan-300 font-medium">
                {selectedDivision.tagline}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedDivision.description}
            </p>

            {/* Core Capabilities */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Key Technical Capabilities & Scope:
              </h4>
              <div className="space-y-2">
                {selectedDivision.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Deliverables */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
              <h5 className="text-[11px] font-bold text-slate-300 font-mono uppercase">
                Standard Client Deliverables:
              </h5>
              <div className="space-y-1 text-xs text-slate-400 font-mono">
                {selectedDivision.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400">·</span>
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectDivisionForRfq(selectedDivision.id)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>Request RFQ for {selectedDivision.shortTitle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelectDivisionForEstimator(selectedDivision.id)}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors"
              >
                Estimate Costs
              </button>
            </div>
          </div>

          {/* Right Column: Case Study Spotlight Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-cyan-400 uppercase font-semibold">Field Case Study</span>
                <span>Verified Execution</span>
              </div>

              <h4 className="text-lg font-bold text-white leading-snug">
                {selectedDivision.caseStudyTitle}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedDivision.caseStudySummary}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="font-medium font-sans">Fuldej Integrated Service Ltd Standard</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  All contracts supervised by our registered engineering leads in compliance with CAC RC 7360949 and statutory guidelines.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Head Office: Kano, Nigeria</span>
                <span className="text-cyan-400">20+ Yrs Exp</span>
              </div>
            </div>

            {/* Quick switcher list */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 space-y-2">
              <span className="text-[11px] text-slate-400 font-mono uppercase block">All 5 Service Divisions:</span>
              <div className="grid grid-cols-1 gap-1 text-xs">
                {divisions.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveDivisionId(d.id)}
                    className={`text-left px-2.5 py-1.5 rounded flex items-center justify-between transition-colors ${
                      activeDivisionId === d.id ? 'bg-cyan-500/10 text-cyan-300 font-medium' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{d.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
