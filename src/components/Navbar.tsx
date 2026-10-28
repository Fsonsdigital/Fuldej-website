import React, { useState } from 'react';
import { FuldejLogo } from './FuldejLogo';
import { Menu, X, Send } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: 'NGN' | 'USD';
  setCurrency: (c: 'NGN' | 'USD') => void;
  onOpenRfq: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  onOpenRfq
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean navigation links without client portal or corporate page
  const navItems = [
    { id: 'services', label: 'Services & Solutions' },
    { id: 'partners', label: 'Strategic Partners' },
    { id: 'projects', label: 'Projects & Case Studies' },
    { id: 'calculator', label: 'RFQ Estimator' },
    { id: 'rfq', label: 'Request Proposal' },
    { id: 'console', label: 'Operations CRM' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070A11]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Zone 1: Official Fuldej Brand Logo - Medium Size */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('services')}
              className="text-left group focus:outline-none"
            >
              <FuldejLogo size="md" showSubtitle={true} />
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 tracking-normal whitespace-nowrap shrink-0 transition-colors ${
                    isActive ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-white font-medium'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-sm shadow-cyan-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Currency Switcher & Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Currency selector toggle */}
            <div className="flex items-center p-0.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-mono">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === 'NGN' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ₦ NGN
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === 'USD' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                $ USD
              </button>
            </div>

            <button
              onClick={onOpenRfq}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/10 transition-all hover:scale-[1.02] whitespace-nowrap"
            >
              <span>Request RFQ</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')}
              className="px-2 py-1 bg-slate-900 border border-white/10 rounded text-xs font-mono text-cyan-400 sm:hidden"
            >
              {currency}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900/60 border border-white/10"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Responsive Drawer for Tablet & Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-white/10 px-4 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left p-2.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20'
                    : 'text-slate-300 hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>ACTIVE CURRENCY:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrency('NGN')}
                  className={`px-3 py-1 rounded ${currency === 'NGN' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'}`}
                >
                  ₦ NGN
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded ${currency === 'USD' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'}`}
                >
                  $ USD
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Submit Request for Quotation (RFQ)</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
