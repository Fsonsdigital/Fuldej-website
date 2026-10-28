import React from 'react';
import { FuldejLogo } from './FuldejLogo';
import { MapPin, Mail, Phone, Download } from 'lucide-react';
import { FULDEJ_CORPORATE_INFO, STRATEGIC_PARTNERS } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070D] text-slate-400 text-xs border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Top 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info (Cols 1-4) - Medium Logo */}
          <div className="lg:col-span-4 space-y-4">
            <FuldejLogo size="md" showSubtitle={true} />

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-white">Fuldej Integrated Service Ltd</strong> is a registered multidisciplinary engineering firm specialized in mining mineral resources, deep aquifer borehole drilling, industrial solar micro-grids, enterprise technology, and strategic procurement across Nigeria.
            </p>

            <div className="space-y-1.5 text-[11px] font-mono text-slate-400 pt-1">
              <div>CAC Statutory Registration: <span className="text-cyan-400 font-semibold">{FULDEJ_CORPORATE_INFO.cacNumber}</span></div>
              <div>Incorporation Year: <span className="text-white font-semibold">2024</span> (Active Status)</div>
              <div>Banking Partner: <span className="text-white">{FULDEJ_CORPORATE_INFO.bankers}</span></div>
            </div>
          </div>

          {/* Quick Links (Cols 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
              Corporate Links
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Services & Solutions
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-cyan-400 transition-colors">
                  Strategic Partners
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Projects & Case Studies
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-cyan-400 transition-colors">
                  RFQ Estimator
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Request Proposal
                </a>
              </li>
            </ul>
          </div>

          {/* Strategic Partners (Cols 7-9) - Medium Badges */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
              Strategic Partners
            </span>
            <ul className="space-y-3">
              {STRATEGIC_PARTNERS.map(partner => (
                <li key={partner.id} className="flex items-center gap-2.5">
                  <div className="h-8 w-14 bg-black/90 p-1 rounded-md border border-white/10 flex items-center justify-center shrink-0">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-6 max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <a href="#partners" className="text-xs text-slate-300 hover:text-cyan-400 transition-colors">
                    {partner.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={FULDEJ_CORPORATE_INFO.pdfProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-semibold text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CAC Profile (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Kano HQ (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-mono">
              Corporate Head Office
            </span>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{FULDEJ_CORPORATE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={`mailto:${FULDEJ_CORPORATE_INFO.email}`} className="text-slate-300 hover:text-white">
                  {FULDEJ_CORPORATE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono text-slate-300">
                  {FULDEJ_CORPORATE_INFO.phone1}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Statutory Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-mono text-cyan-400 font-semibold">{FULDEJ_CORPORATE_INFO.cacNumber}</span>
            <span>•</span>
            <span>Corporate Affairs Commission Registered</span>
          </div>

          <div className="text-slate-400">
            © {new Date().getFullYear()} Fuldej Integrated Service Ltd. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
