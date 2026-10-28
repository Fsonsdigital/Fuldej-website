/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Download,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Sparkles,
  FileText,
  Code,
  Building,
  Check,
  Layers,
  Globe,
  HelpCircle,
  Clock,
  Sun,
  Moon,
  Users,
  Compass,
  Briefcase,
  Zap,
  TrendingUp,
  Award,
  Calculator,
  ShieldCheck,
  FileCheck,
  Scale,
  DollarSign,
  ChevronRight,
  UserCheck,
  Send,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';
import { LEADERSHIP_TEAM, FULDEJ_CORPORATE_INFO } from './data/mockData';
import { TeamMember } from './types';
import { corporateSoundEngine } from './utils/professionalAudio';
import { ProjectMarquee } from './components/ProjectMarquee';
import { CommoditiesSection } from './components/CommoditiesSection';

const VALID_PAGES = ['home', 'about', 'services', 'commodities', 'projects', 'partnerships', 'contact', 'privacy'] as const;
type AppPage = typeof VALID_PAGES[number];

const getInitialPage = (): AppPage => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (VALID_PAGES.includes(hash as AppPage)) return hash as AppPage;
  const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
  if (VALID_PAGES.includes(path as AppPage)) return path as AppPage;
  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(getInitialPage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCacModal, setShowCacModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [teamDepartmentFilter, setTeamDepartmentFilter] = useState<'all' | 'executive' | 'engineering' | 'tech_env'>('all');

  // Synchronize browser URL hash with currentPage for cPanel static hosting and back/forward navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const targetHash = currentPage === 'home' ? '' : `#${currentPage}`;
      if (window.location.hash !== targetHash) {
        try {
          window.history.replaceState(null, '', targetHash || window.location.pathname);
        } catch (_) {}
      }
    }
  }, [currentPage]);

  // Listen to browser forward/backward buttons and direct URL hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleSelectProjectForInquiry = (title: string) => {
    setContactForm(prev => ({
      ...prev,
      subject: `Commercial Installation RFQ: ${title}`,
      message: `Hello Fuldej Engineering Directorate,\n\nI reviewed your verified field installation: "${title}" on your official portal.\nWe are interested in commissioning a similar turnkey commercial solar micro-grid / energy storage system for our facility.\n\nPlease provide technical scheduling, sizing evaluation, and commercial terms for our review.`
    }));
    setCurrentPage('contact');
  };

  const handleSelectCommodityForQuote = (commodityName: string) => {
    setContactForm(prev => ({
      ...prev,
      subject: `Agro-Commodity Export Order / RFQ: ${commodityName}`,
      message: `Hello Fuldej Agro-Commodities Directorate,\n\nWe are submitting an export quotation request regarding procurement and international shipment of: "${commodityName}".\n\nContract & Logistics Specifications:\n• Required Quantity: [e.g. 50 MT / 100 MT / FCL Container]\n• Preferred Incoterm: [FOB Apapa/Lagos or CIF Destination Port]\n• Destination Port & Country: [e.g. Rotterdam, Netherlands / Jebel Ali, UAE / Qingdao, China]\n• Packaging Preference: [Standard 50kg PP bags / Jute Sacks / Multi-wall paper bags]\n• Inspection Preference: [SGS / Bureau Veritas / NAQS]\n• Target Delivery Window: [Month / Year]\n\nPlease provide your latest certified laboratory analysis sheet, FOB/CIF quote (USD), and payment terms.`
    }));
    setCurrentPage('contact');
  };

  // Fully Automatic Hero Background Video with Pre-Calibrated Cool Sound
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Guarantee background video autoplays automatically and loops continuously with cool, comfortable ambient sound
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    };

    playVideo();

    // Automatically enable cool, subtle background sound on user's first natural interaction (without requiring adjustment)
    const enableCoolSound = () => {
      if (video) {
        corporateSoundEngine.activate(video, 0.18, 0.08); // Calm, pleasant, cool background volume
      }
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, enableCoolSound);
      });
    };

    ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
      window.addEventListener(evt, enableCoolSound, { once: true, passive: true });
    });

    // Auto-resume playback seamlessly when window or tab regains focus or visibility
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, enableCoolSound);
      });
      corporateSoundEngine.deactivate(video);
    };
  }, []);

  // Softly pause background corporate sound when inspection modal is opened
  useEffect(() => {
    if (showVideoModal) {
      corporateSoundEngine.deactivate(heroVideoRef.current);
    } else if (heroVideoRef.current && corporateSoundEngine.getIsPlaying()) {
      corporateSoundEngine.activate(heroVideoRef.current, 0.18, 0.08);
    }
  }, [showVideoModal]);

  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fuldej_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Sync theme with HTML document element and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fuldej_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Real-time West Africa Time (WAT) calculation for Kano Headquarters
  const [currentWatTime, setCurrentWatTime] = useState('');
  const [isOfficeOpen, setIsOfficeOpen] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Nigeria is UTC+1 (WAT)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        weekday: 'short'
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setCurrentWatTime(formatter.format(now));

      // Calculate if between Mon-Fri 8:30 AM - 5:00 PM
      const lagosDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
      const day = lagosDate.getDay(); // 0 is Sun, 6 is Sat
      const hours = lagosDate.getHours();
      const minutes = lagosDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      const isWeekday = day >= 1 && day <= 5;
      const isOpenTime = totalMinutes >= 8 * 60 + 30 && totalMinutes <= 17 * 60; // 8:30am to 5:00pm
      setIsOfficeOpen(isWeekday && isOpenTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Form state for contact page
  const [contactForm, setContactForm] = useState({
    name: '',
    organisation: '',
    email: '',
    subject: 'General Corporate Inquiry',
    message: '',
    consent: true
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState('');
  const [lastSubmittedInquiry, setLastSubmittedInquiry] = useState<{
    name: string;
    organisation: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  // Interactive Project Cost Estimator state
  const [estimatorDivision, setEstimatorDivision] = useState<'solar' | 'borehole' | 'tech' | 'consulting'>('solar');
  const [estimatorCurrency, setEstimatorCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [solarCapacity, setSolarCapacity] = useState<number>(30); // kVA
  const [boreholeDepth, setBoreholeDepth] = useState<number>(180); // meters
  const [techUsers, setTechUsers] = useState<number>(50); // user seats
  const [consultingScale, setConsultingScale] = useState<'sme' | 'medium' | 'enterprise'>('medium');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setFormStatus('error');
      setFormFeedback('Please fill in all required fields (Name, Corporate Email, and Message).');
      return;
    }
    setFormStatus('sending');

    const formattedSubject = `[Fuldej Corporate Inquiry] ${contactForm.subject || 'General Inquiry'} — ${contactForm.organisation ? contactForm.organisation + ' / ' : ''}${contactForm.name}`;
    const formattedBody = 
`TO: Fuldej Integrated Service Ltd (Corporate Directorate)
RECIPIENT INBOX: info@fuldej.com.ng

============================================================
NEW CORPORATE INQUIRY VIA FULDEJ.COM.NG
============================================================

• SENDER FULL NAME: ${contactForm.name}
• ORGANISATION / COMPANY: ${contactForm.organisation || 'N/A'}
• SENDER CONTACT EMAIL: ${contactForm.email}
• INQUIRY SUBJECT: ${contactForm.subject || 'General Corporate Inquiry'}
• DATE & TIME: ${new Date().toLocaleString()} (WAT UTC+1)

------------------------------------------------------------
MESSAGE DETAILS:
------------------------------------------------------------
${contactForm.message}

============================================================
Fuldej Integrated Service Ltd (CAC RC 7360949)
White Container, BUK Old Campus Area, Kano State, Nigeria
Official Corporate Email: info@fuldej.com.ng
Official Portal: https://fuldej.com.ng
`;

    const mailtoUrl = `mailto:info@fuldej.com.ng?subject=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;
    
    // Save snapshot for instant webmail dispatch links
    setLastSubmittedInquiry({ ...contactForm });

    // Open user's email client directly to dispatch to info@fuldej.com.ng immediately
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.warn('Mail client dispatch triggered', err);
    }

    // Attempt background cPanel PHP mail processing (when hosted on Apache/cPanel with contact-submit.php)
    try {
      const phpFormData = new FormData();
      phpFormData.append('name', contactForm.name);
      phpFormData.append('organisation', contactForm.organisation);
      phpFormData.append('email', contactForm.email);
      phpFormData.append('subject', contactForm.subject);
      phpFormData.append('message', contactForm.message);
      phpFormData.append('consent', '1');

      fetch('/contact-submit.php', {
        method: 'POST',
        body: phpFormData
      })
      .then(res => res.json())
      .catch(() => {
        // Fallback gracefully if running on local/dev preview without PHP engine
      });
    } catch (_) {}

    setTimeout(() => {
      setFormStatus('success');
      setFormFeedback('Inquiry compiled and addressed directly to info@fuldej.com.ng.');
    }, 400);
  };

  // Calculation for Project Scope & Budget Estimator
  const calculateEstimate = () => {
    let ngn = 0;
    let label = '';
    let specs = '';

    if (estimatorDivision === 'solar') {
      ngn = solarCapacity * 350000 + 1200000;
      label = `${solarCapacity} kVA Commercial Off-Grid Solar Micro-Grid`;
      specs = `${solarCapacity} kVA Inverter Array, Tier-1 Mono PV Modules, High-Cycle Lithium Battery Bank, ATS Busbar Sync, Earthing Protection`;
    } else if (estimatorDivision === 'borehole') {
      ngn = boreholeDepth * 55000 + 4500000;
      label = `${boreholeDepth}m Deep Aquifer Industrial Motorized Borehole`;
      specs = `${boreholeDepth}m Rotary Drilling, Stainless High-Head Submersible Pump, Elevated Steel Reservoir, Certified Physicochemical Water Testing`;
    } else if (estimatorDivision === 'tech') {
      ngn = techUsers * 60000 + 3500000;
      label = `Custom Enterprise Software & Cloud Telemetry (${techUsers} Users)`;
      specs = `Secure Cloud Database, Role-Based Access Control, Real-Time IoT Telemetry, Web Portal & Mobile Interface, SSL Hardening`;
    } else {
      const mult = consultingScale === 'sme' ? 2500000 : consultingScale === 'medium' ? 6000000 : 14000000;
      ngn = mult;
      label = `Strategic Feasibility & Investor Readiness Framework (${consultingScale.toUpperCase()})`;
      specs = `Bankable Feasibility Study, ESIA Compliance Assessment, Bilateral MoU Framing, Capital Structuring, Governance Roadmap`;
    }

    const usd = Math.round(ngn / 1550);
    return { ngn, usd, label, specs };
  };

  const currentEstimate = calculateEstimate();

  const handlePreFillInquiryFromEstimator = () => {
    setContactForm(prev => ({
      ...prev,
      subject: `RFQ Estimate: ${currentEstimate.label}`,
      message: `Hello Fuldej Corporate Team,\n\nI generated an estimated project budget on your official portal for: ${currentEstimate.label}.\nEstimated Value: ₦${currentEstimate.ngn.toLocaleString()} ($${currentEstimate.usd.toLocaleString()} USD).\nSpecifications: ${currentEstimate.specs}.\n\nPlease provide formal commercial proposals and engineering scheduling for our evaluation.`
    }));
    setCurrentPage('contact');
  };

  const isDark = theme === 'dark';

  // Filter team members based on department
  const filteredTeam = LEADERSHIP_TEAM.filter(member => {
    const id = member.id || '';
    if (teamDepartmentFilter === 'all') return true;
    if (teamDepartmentFilter === 'executive') {
      return id === 'ishaq-ibrahim-jaafar' || id === 'fahad-isyaku-umar';
    }
    if (teamDepartmentFilter === 'engineering') {
      return ['eng-musa-zulyadain', 'eng-abubaka-salihu', 'eng-usman-tanko', 'qt-surajo-yunusa', 'eng-ashiru-abdul'].includes(id);
    }
    if (teamDepartmentFilter === 'tech_env') {
      return ['dba-danjuma-idiris', 'pharmacy-adamu-lawan-wakili', 'eng-arc-nura-sambo'].includes(id);
    }
    return true;
  });

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0B1321] text-slate-100 selection:bg-teal-500/30 selection:text-white' : 'bg-[#FFFFFF] text-[#263445] selection:bg-[#168A78]/20 selection:text-[#142B4A]'
    }`}>

      {/* --- Top Corporate Live Desk & WhatsApp Reach-out Bar --- */}
      <div className={`text-xs py-2 px-4 border-b transition-colors ${
        isDark ? 'bg-[#070D18] text-slate-300 border-slate-800' : 'bg-[#0D1D33] text-white border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          
          {/* Live Date, Time & Kano HQ Desk Status */}
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <span className={`w-2 h-2 rounded-full ${isOfficeOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className={isDark ? 'text-slate-300' : 'text-slate-200'}>
              {currentWatTime || 'WAT (UTC+1)'} · {isOfficeOpen ? 'Kano HQ Open (Live Desk)' : 'After Hours (Queue Active)'}
            </span>
          </div>

          {/* Animated WhatsApp Corporate Reach-out (No visible number) */}
          <div className="flex items-center text-[11px]">
            <a
              href="https://wa.me/2349030986923?text=Hello%20Fuldej%20Integrated%20Service%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all shadow-sm group hover:scale-[1.03] active:scale-95"
              title="Reach out to Fuldej Integrated Service on WhatsApp"
            >
              {/* Animated WhatsApp Logo with Beacon */}
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <svg
                  className="relative inline-flex w-3.5 h-3.5 fill-current text-emerald-400 group-hover:scale-110 transition-transform shrink-0 animate-pulse"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </span>
              <span className="font-semibold tracking-wide text-emerald-300 group-hover:text-white transition-colors">
                Reach out on WhatsApp
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* --- Main Navigation Header --- */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isDark ? 'bg-[#0B1321]/95 border-slate-800' : 'bg-white/95 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Corporate Title */}
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-3.5 text-left group focus:outline-none"
            >
              {/* Medium Polished Official Logo */}
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#C59B27] bg-black shadow-md shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src="/assets/images/fuldej_company_logo.jpg"
                  alt="Fuldej Integrated Service Ltd Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/aistudio/fuldej_company_logo.jpg';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className={`font-heading font-extrabold text-lg sm:text-xl leading-tight tracking-tight transition-colors ${
                  isDark ? 'text-white group-hover:text-cyan-400' : 'text-[#142B4A] group-hover:text-[#168A78]'
                }`}>
                  Fuldej Integrated Service Ltd
                </span>
                <span className={`font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase ${
                  isDark ? 'text-cyan-400' : 'text-[#168A78]'
                }`}>
                  RC 7360949 · Technology & Solutions
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold">
              <button
                onClick={() => setCurrentPage('home')}
                className={`py-1 transition-colors relative ${
                  currentPage === 'home'
                    ? (isDark ? 'text-cyan-400 font-bold' : 'text-[#168A78] font-bold')
                    : (isDark ? 'text-slate-300 hover:text-white' : 'text-[#263445] hover:text-[#142B4A]')
                }`}
              >
                Home
                {currentPage === 'home' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isDark ? 'bg-cyan-400' : 'bg-[#168A78]'}`} />
                )}
              </button>

              <button
                onClick={() => setCurrentPage('about')}
                className={`py-1 transition-colors relative ${
                  currentPage === 'about'
                    ? (isDark ? 'text-cyan-400 font-bold' : 'text-[#168A78] font-bold')
                    : (isDark ? 'text-slate-300 hover:text-white' : 'text-[#263445] hover:text-[#142B4A]')
                }`}
              >
                About & Team
                {currentPage === 'about' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isDark ? 'bg-cyan-400' : 'bg-[#168A78]'}`} />
                )}
              </button>

              <button
                onClick={() => setCurrentPage('services')}
                className={`py-1 transition-colors relative ${
                  currentPage === 'services'
                    ? (isDark ? 'text-cyan-400 font-bold' : 'text-[#168A78] font-bold')
                    : (isDark ? 'text-slate-300 hover:text-white' : 'text-[#263445] hover:text-[#142B4A]')
                }`}
              >
                Services & RFQ
                {currentPage === 'services' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isDark ? 'bg-cyan-400' : 'bg-[#168A78]'}`} />
                )}
              </button>

              <button
                onClick={() => setCurrentPage('commodities')}
                className={`py-1 transition-colors relative ${
                  currentPage === 'commodities'
                    ? (isDark ? 'text-emerald-400 font-bold' : 'text-emerald-600 font-bold')
                    : (isDark ? 'text-slate-300 hover:text-white' : 'text-[#263445] hover:text-[#142B4A]')
                }`}
              >
                Agro-Commodities
                {currentPage === 'commodities' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                )}
              </button>

              <button
                onClick={() => setCurrentPage('projects')}
                className={`py-1 transition-colors relative ${
                  currentPage === 'projects'
                    ? (isDark ? 'text-cyan-400 font-bold' : 'text-[#168A78] font-bold')
                    : (isDark ? 'text-slate-300 hover:text-white' : 'text-[#263445] hover:text-[#142B4A]')
                }`}
              >
                Projects & Initiatives
                {currentPage === 'projects' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isDark ? 'bg-cyan-400' : 'bg-[#168A78]'}`} />
                )}
              </button>

              <button
                onClick={() => setCurrentPage('partnerships')}
                className={`py-1 transition-colors relative ${
                  currentPage === 'partnerships'
                    ? (isDark ? 'text-cyan-400 font-bold' : 'text-[#168A78] font-bold')
                    : (isDark ? 'text-slate-300 hover:text-white' : 'text-[#263445] hover:text-[#142B4A]')
                }`}
              >
                Partnerships
                {currentPage === 'partnerships' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isDark ? 'bg-cyan-400' : 'bg-[#168A78]'}`} />
                )}
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className={`py-1 transition-colors relative ${
                  currentPage === 'contact'
                    ? (isDark ? 'text-cyan-400 font-bold' : 'text-[#168A78] font-bold')
                    : (isDark ? 'text-slate-300 hover:text-white' : 'text-[#263445] hover:text-[#142B4A]')
                }`}
              >
                Contact
                {currentPage === 'contact' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isDark ? 'bg-cyan-400' : 'bg-[#168A78]'}`} />
                )}
              </button>

              {/* Theme Toggle Button (Light/Dark) */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                title={isDark ? "Switch to Light Mode for day reading" : "Switch to Dark Mode for night reading & high contrast"}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  isDark
                    ? 'bg-[#132238] border-slate-700 text-amber-300 hover:bg-[#1A2E4B]'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-300" />
                    <span className="text-slate-200 text-[11px]">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span className="text-slate-700 text-[11px]">Dark</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md hover:-translate-y-0.5 ml-1 ${
                  isDark
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                    : 'bg-[#142B4A] hover:bg-[#0D1D33] text-white'
                }`}
              >
                Inquire Online
              </button>
            </nav>

            {/* Mobile Actions: Theme Toggle & Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                className={`p-2 rounded-lg border ${
                  isDark
                    ? 'bg-[#132238] border-slate-700 text-amber-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg border ${
                  isDark ? 'border-slate-700 text-slate-200' : 'border-slate-200 text-[#142B4A]'
                }`}
                aria-label="Toggle Navigation Drawer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 py-4 space-y-2 ${
            isDark ? 'bg-[#0F1B2D] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'commodities', label: 'Agro-Commodities (Worldwide Export)' },
              { id: 'about', label: 'About Us & Full Team (10)' },
              { id: 'services', label: 'Services & Cost Estimator' },
              { id: 'projects', label: 'Projects & Initiatives' },
              { id: 'partnerships', label: 'Strategic Partnerships' },
              { id: 'contact', label: 'Contact & Office Channels' },
              { id: 'privacy', label: 'Privacy Policy' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === item.id
                    ? (isDark ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'bg-[#168A78]/10 text-[#168A78] font-bold')
                    : (isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-[#263445] hover:bg-slate-50')
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className={`pt-3 border-t flex items-center justify-between ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <button
                onClick={() => {
                  setShowCacModal(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify CAC Credentials</span>
              </button>

              <button
                onClick={toggleTheme}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-[#132238] border-slate-700 text-amber-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- Main Page Body Renderer --- */}
      <main className="flex-1">

        {/* ================= PAGE 1: HOME ================= */}
        {currentPage === 'home' && (
          <div>
            {/* Modern Hero Section with Verified Field Engineering Video Background */}
            <section className="relative overflow-hidden border-b border-slate-800 bg-[#060D17] min-h-[640px] md:min-h-[720px] flex items-center py-16 md:py-24 text-white">
              {/* Cinematic Ambient Background Video - High Visibility */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                  ref={heroVideoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center scale-105 transition-opacity duration-1000"
                >
                  <source src="/assets/videos/fuldej_solar_installation_pro.mp4" type="video/mp4" />
                  <source src="/assets/videos/fuldej_solar_installation.mp4" type="video/mp4" />
                  <source src="/assets/aistudio/VID-20261022-WA0020__1__978a816f.mp4" type="video/mp4" />
                </video>

                {/* Light ambient darkening vignette to make sure video details remain vividly visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-transparent to-[#060D17]/75" />
                <div className="absolute inset-0 bg-[#040812]/25 pointer-events-none" />
                
                {/* Horizontal gradient gently supporting the frosted text plate on the left while leaving center/right 100% open */}
                <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#040914]/85 via-[#040914]/40 to-transparent pointer-events-none" />

                {/* Subtle high-tech engineering grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }}
                />
              </div>

              {/* Hero Content Container */}
              <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Frosted Glassmorphism Plate with Crisp Typographic Hierarchy */}
                  <div className="lg:col-span-7">
                    <div className="backdrop-blur-xl bg-[#06101E]/85 border border-white/15 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
                      {/* Subtle corner teal glow */}
                      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#168A78]/20 rounded-full blur-3xl pointer-events-none" />

                      {/* CAC Active Trust Badge */}
                      <button
                        onClick={() => setShowCacModal(true)}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md bg-emerald-950/80 border-emerald-500/50 text-emerald-300 transition-all hover:scale-[1.02] shadow-sm group"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                        <span>RC 7360949 · Corporate Affairs Commission Verified Active</span>
                        <ChevronRight className="w-3 h-3 ml-0.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      {/* Display Headline */}
                      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight leading-[1.12] text-white">
                        Technology, Digital Solutions & Strategic Innovation
                      </h1>

                      {/* Lead Paragraph */}
                      <p className="text-base sm:text-lg leading-relaxed font-normal text-slate-200 drop-shadow-sm">
                        <strong className="text-white font-semibold">Fuldej Integrated Service Ltd</strong> is a premier Nigerian multidisciplinary business delivering robust software platforms, technology transformation, strategic business consulting, and sustainable initiatives across Africa.
                      </p>

                      {/* Primary Actions */}
                      <div className="pt-2 flex flex-wrap gap-3.5 items-center">
                        <button
                          onClick={() => setCurrentPage('services')}
                          className="px-6 py-3.5 rounded-xl text-white font-bold text-sm shadow-xl shadow-emerald-950/50 bg-[#168A78] hover:bg-[#127163] transition-all hover:-translate-y-0.5 flex items-center gap-2 active:scale-95"
                        >
                          <span>Explore Our Services</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setCurrentPage('about')}
                          className="px-6 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2 active:scale-95"
                        >
                          <Users className="w-4 h-4" />
                          <span>Meet Our Team (10)</span>
                        </button>

                        <button
                          onClick={() => setShowCacModal(true)}
                          className="px-5 py-3.5 rounded-xl font-semibold text-sm backdrop-blur-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <Shield className="w-4 h-4 text-emerald-400" />
                          <span>Verify CAC</span>
                        </button>
                      </div>

                      {/* Quiet Trust Credentials Line */}
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 font-mono">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-cyan-400 font-bold">CAMA 2020 RC 7360949</span>
                          <span className="text-slate-600">·</span>
                          <span>Kano HQ</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-emerald-400">20+ Yrs Exp</span>
                        </div>
                        <a
                          href="/assets/aistudio/CERTIFICATE_-__FULDEJ_INTEGRATED_SERVICE_LTD___1___1___2__e5318264.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          download="CERTIFICATE_OF_INCORPORATION__FULDEJ_INTEGRATED_SERVICE_LTD.pdf"
                          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
                          title="Download Official CAC Certificate"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Cert (PDF)</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Live Video Telemetry & HUD Over Field Installation */}
                  <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center space-y-4">
                    {/* Floating Live Telemetry HUD Card over the clear video background */}
                    <div className="w-full max-w-md backdrop-blur-xl bg-black/60 border border-white/20 rounded-2xl p-5 shadow-2xl text-white space-y-4">
                      {/* Live Operation Status */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                          </span>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                            Live Field Execution
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
                          Active Site
                        </span>
                      </div>

                      {/* Equipment Specification */}
                      <div>
                        <h4 className="font-heading font-bold text-sm text-white leading-snug">
                          Industrial Solar Inverter & Felicity Lithium Storage Rack
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                          Commissioned on-site by Fuldej renewable engineers. Demonstrates active industrial power electronics and rack-mounted battery bank calibration.
                        </p>
                      </div>

                      {/* Telemetry Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <span className="text-[10px] text-slate-400 block">Location:</span>
                          <span className="font-bold text-cyan-300">Kano Corridor, NG</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <span className="text-[10px] text-slate-400 block">System Type:</span>
                          <span className="font-bold text-emerald-300">Hybrid Commercial</span>
                        </div>
                      </div>

                      {/* Live Video Inspection Action (Sound Button Removed) */}
                      <div className="pt-2">
                        <button
                          onClick={() => setShowVideoModal(true)}
                          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-[#168A78] to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/60 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50 active:scale-95 group"
                          title="Inspect High-Res Facility Video & Technical Specifications"
                        >
                          <Maximize2 className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
                          <span>Inspect Live Field Video & Technical Specs</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Stat Strip */}
            <section className={`py-8 border-b transition-colors ${
              isDark ? 'bg-[#0E1A2C] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className={`font-heading font-extrabold text-2xl sm:text-3xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      RC 7360949
                    </div>
                    <div className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-[#5A6B82]'}`}>
                      CAC Statutory Registration
                    </div>
                  </div>
                  <div>
                    <div className={`font-heading font-extrabold text-2xl sm:text-3xl ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                      10 Members
                    </div>
                    <div className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-[#5A6B82]'}`}>
                      Certified Multidisciplinary Team
                    </div>
                  </div>
                  <div>
                    <div className={`font-heading font-extrabold text-2xl sm:text-3xl ${isDark ? 'text-amber-300' : 'text-[#142B4A]'}`}>
                      20+ Years
                    </div>
                    <div className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-[#5A6B82]'}`}>
                      Field & Technical Track Record
                    </div>
                  </div>
                  <div>
                    <div className={`font-heading font-extrabold text-2xl sm:text-3xl ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                      Jaiz Bank
                    </div>
                    <div className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-[#5A6B82]'}`}>
                      Corporate Banking Partner
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Live Field Engineering Marquee Gallery - Verified Commercial Solar & Battery Installations */}
            <ProjectMarquee
              isDark={isDark}
              onSelectProjectForInquiry={handleSelectProjectForInquiry}
              onOpenVideoModal={() => setShowVideoModal(true)}
            />

            {/* Agro-Commodities & Worldwide Export Distribution Showcase */}
            <CommoditiesSection
              isDark={isDark}
              onSelectCommodityForQuote={handleSelectCommodityForQuote}
            />

            {/* Core Service Offerings Preview */}
            <section className={`py-16 md:py-24 transition-colors ${
              isDark ? 'bg-[#0B1321]' : 'bg-[#F8FAFC]'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                    Our Capabilities
                  </span>
                  <h2 className={`font-heading font-extrabold text-3xl sm:text-4xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    Core Business Divisions
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                    High-impact services engineered to scale operational efficiency and accelerate sustainable enterprise growth.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      num: '01',
                      title: 'Digital Solutions & Website Development',
                      desc: 'Architecting modern corporate portals, responsive web platforms, and accessible digital products built for modern cloud infrastructure and high search visibility.'
                    },
                    {
                      num: '02',
                      title: 'Technology & Digital Transformation',
                      desc: 'Assisting enterprises and cooperatives with secure cloud migrations, automated data pipelines, inventory tracking, and telemetry.'
                    },
                    {
                      num: '03',
                      title: 'Business Development & Strategic Consulting',
                      desc: 'Delivering bankable feasibility studies, commercial business modeling, and governance structures that position African businesses for capital readiness.'
                    },
                    {
                      num: '04',
                      title: 'Digital Skills & Financial Literacy',
                      desc: 'Empowering merchants, young apprentices, and market cooperatives through digital accounting skills and mobile commerce adoption via MGDI.'
                    },
                    {
                      num: '05',
                      title: 'Innovation, Research & Project Development',
                      desc: 'Prototyping high-potential concepts including ethical credit readiness algorithms (SmartGrowth AI) and eco-friendly infrastructure models (SmartGreen).'
                    },
                    {
                      num: '06',
                      title: 'Strategic Partnerships & Advisory',
                      desc: 'Structuring institutional memoranda of understanding (MoU), bilateral stakeholder agreements, and investor-ready commercial frameworks.'
                    }
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl p-6 transition-all flex flex-col justify-between group border ${
                        isDark
                          ? 'bg-[#132238] border-slate-700/80 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/30'
                          : 'bg-white border-slate-200 hover:shadow-lg'
                      }`}
                    >
                      <div>
                        <span className={`font-mono text-xs font-bold mb-2 block ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                          {srv.num}
                        </span>
                        <h3 className={`font-heading font-bold text-lg mb-2 transition-colors ${
                          isDark ? 'text-white group-hover:text-cyan-300' : 'text-[#142B4A] group-hover:text-[#168A78]'
                        }`}>
                          {srv.title}
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                          {srv.desc}
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentPage('services')}
                        className={`mt-4 pt-3 border-t text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ${
                          isDark ? 'border-slate-700 text-cyan-400' : 'border-slate-100 text-[#168A78]'
                        }`}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => setCurrentPage('services')}
                    className={`px-6 py-3 rounded-lg font-bold text-sm shadow-md transition-colors ${
                      isDark
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                        : 'bg-[#142B4A] hover:bg-[#0D1D33] text-white'
                    }`}
                  >
                    View All Services & Try Interactive RFQ Estimator
                  </button>
                </div>
              </div>
            </section>

            {/* Featured Projects Preview (with Medium Polished Logos) */}
            <section className={`py-16 md:py-24 border-t transition-colors ${
              isDark ? 'bg-[#0E1A2C] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                    Innovation in Action
                  </span>
                  <h2 className={`font-heading font-extrabold text-3xl sm:text-4xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    Featured Projects & Initiatives
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                    Clear, verified initiatives advancing financial health, sustainable residential technology, and community digital literacy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* SmartGrowth AI */}
                  <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
                    isDark ? 'bg-[#132238] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
                  }`}>
                    <div className={`p-6 border-b flex items-center justify-between ${
                      isDark ? 'bg-[#0B1321] border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <div className="h-16 w-36 bg-black rounded-xl p-2 border border-[#C59B27]/40 flex items-center justify-center shadow-inner">
                        <img
                          src="/assets/images/SmartGrowthAI_Logo__1__b01bd855.png"
                          alt="SmartGrowth AI Logo"
                          className="max-h-10 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/aistudio/SmartGrowthAI_Logo__1__b01bd855.png';
                          }}
                        />
                      </div>
                      <span className={`font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded border ${
                        isDark ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-[#E6F4F1] text-[#168A78] border-[#168A78]/30'
                      }`}>
                        Active Pilot
                      </span>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                          SmartGrowth AI
                        </h3>
                        <p className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                          An ethical financial health and credit-readiness technology initiative applying diagnostic algorithms and non-interest finance alignment for Nigerian MSMEs.
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentPage('projects')}
                        className={`w-full py-2.5 rounded-lg border text-xs font-bold transition-colors ${
                          isDark
                            ? 'border-slate-700 hover:border-cyan-400 text-slate-200 hover:bg-slate-800'
                            : 'border-slate-300 hover:border-[#142B4A] text-[#142B4A]'
                        }`}
                      >
                        Explore SmartGrowth AI
                      </button>
                    </div>
                  </div>

                  {/* SmartGreen */}
                  <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
                    isDark ? 'bg-[#132238] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
                  }`}>
                    <div className={`p-6 border-b flex items-center justify-between ${
                      isDark ? 'bg-[#0B1321] border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <div className="h-16 w-36 bg-black rounded-xl p-2 border border-[#C59B27]/40 flex items-center justify-center shadow-inner">
                        <img
                          src="/assets/images/Smartgreen_logo_18dde11c.jpg"
                          alt="SmartGreen Logo"
                          className="max-h-12 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/aistudio/Smartgreen_logo_18dde11c.jpg';
                          }}
                        />
                      </div>
                      <span className={`font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded border ${
                        isDark ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        Proposed Concept
                      </span>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                          SmartGreen Residential Districts
                        </h3>
                        <p className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                          A proposed smart, sustainable residential infrastructure initiative integrating off-grid solar mini-grids, deep borehole water schemes, and smart metering.
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentPage('projects')}
                        className={`w-full py-2.5 rounded-lg border text-xs font-bold transition-colors ${
                          isDark
                            ? 'border-slate-700 hover:border-cyan-400 text-slate-200 hover:bg-slate-800'
                            : 'border-slate-300 hover:border-[#142B4A] text-[#142B4A]'
                        }`}
                      >
                        Explore SmartGreen Concept
                      </button>
                    </div>
                  </div>

                  {/* MGDI */}
                  <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
                    isDark ? 'bg-[#132238] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
                  }`}>
                    <div className={`p-6 border-b flex items-center justify-between ${
                      isDark ? 'bg-[#0B1321] border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <div className="h-16 w-36 bg-black rounded-xl p-2 border border-[#C59B27]/40 flex items-center justify-center shadow-inner">
                        <img
                          src="/assets/images/MGDI_Logo_updated_66e1dc7b.png"
                          alt="MGDI Logo"
                          className="max-h-12 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/aistudio/MGDI_Logo_updated_66e1dc7b.png';
                          }}
                        />
                      </div>
                      <span className={`font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded border ${
                        isDark ? 'bg-blue-950 text-blue-300 border-blue-800' : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        Flagship Program
                      </span>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                          MGDI Initiative
                        </h3>
                        <p className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                          Merchant Growth & Digital Inclusion Initiative. Providing affordable digital literacy, POS merchant adoption, and entrepreneurship bootcamps.
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentPage('projects')}
                        className={`w-full py-2.5 rounded-lg border text-xs font-bold transition-colors ${
                          isDark
                            ? 'border-slate-700 hover:border-cyan-400 text-slate-200 hover:bg-slate-800'
                            : 'border-slate-300 hover:border-[#142B4A] text-[#142B4A]'
                        }`}
                      >
                        Explore MGDI Initiative
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- REPLACED DUPLICATE BLOCK WITH TRUST & GOVERNANCE CHARTER --- */}
            <section className={`py-16 border-t transition-colors ${
              isDark ? 'bg-[#0B1321] border-slate-800' : 'bg-[#F8FAFC] border-slate-200'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                    Institutional Trust & Compliance
                  </span>
                  <h2 className={`font-heading font-bold text-2xl sm:text-3xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    Why Leading Institutions Partner With Fuldej
                  </h2>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                    Built on strict Nigerian legal compliance, verified banking infrastructure, and ethical execution.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'}`}>
                    <ShieldCheck className="w-8 h-8 text-emerald-500 mb-3" />
                    <h4 className={`font-heading font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      Statutory Legitimacy
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      Incorporated under CAC RC 7360949 with active FIRS tax identification, SCUML anti-money laundering certification, and SMEDAN accreditation.
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'}`}>
                    <Users className="w-8 h-8 text-cyan-400 mb-3" />
                    <h4 className={`font-heading font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      10-Member Expert Team
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      Led by M.D. Ishaq Ibrahim Jaafar & Fahad Isyaku Umar, backed by registered civil, electrical, mechanical, IT, and environmental specialists.
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'}`}>
                    <Building className="w-8 h-8 text-amber-400 mb-3" />
                    <h4 className={`font-heading font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      Institutional Banking
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      Verified corporate accounts with Jaiz Bank PLC (Acc: 0017691758) supporting transparent escrow, milestone auditing, and bilateral contracts.
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'}`}>
                    <Scale className="w-8 h-8 text-teal-400 mb-3" />
                    <h4 className={`font-heading font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      Ethical Business Code
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      Full alignment with non-interest finance principles, community wealth creation, fair commercial terms, and zero hidden markups.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setShowCacModal(true)}
                    className="px-5 py-2.5 rounded-lg bg-[#168A78] hover:bg-[#127163] text-white text-xs font-bold transition-colors shadow flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify CAC Credentials</span>
                  </button>

                  <a
                    href="/assets/aistudio/CERTIFICATE_-__FULDEJ_INTEGRATED_SERVICE_LTD___1___1___2__e5318264.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="CERTIFICATE_OF_INCORPORATION__FULDEJ_INTEGRATED_SERVICE_LTD.pdf"
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow flex items-center gap-2 group"
                  >
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    <span>Download CAC Certificate (PDF)</span>
                  </a>

                  <button
                    onClick={() => setCurrentPage('about')}
                    className={`px-5 py-2.5 rounded-lg border text-xs font-bold transition-colors flex items-center gap-2 ${
                      isDark ? 'border-slate-700 hover:border-cyan-400 text-slate-200' : 'border-slate-300 hover:border-[#142B4A] text-[#142B4A]'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Explore Full Team Bios & Roster</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Bottom Call to Action */}
            <section className={`py-16 text-white text-center transition-colors ${
              isDark ? 'bg-[#0E1A2C] border-t border-slate-800' : 'bg-[#142B4A]'
            }`}>
              <div className="max-w-3xl mx-auto px-4 space-y-6">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl">Ready to Discuss Your Project with Fuldej?</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our multidisciplinary engineering and consulting teams are positioned to evaluate your requirements and structure a viable technical proposal.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="px-6 py-3 rounded-lg bg-[#168A78] hover:bg-[#127163] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    Contact Our Office
                  </button>
                  <a
                    href="/assets/docs/COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
                    className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official Profile (PDF)</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= PAGE: AGRO-COMMODITIES & WORLDWIDE EXPORT ================= */}
        {currentPage === 'commodities' && (
          <div className="py-6 sm:py-10">
            <CommoditiesSection
              isDark={isDark}
              onSelectCommodityForQuote={handleSelectCommodityForQuote}
            />
          </div>
        )}

        {/* ================= PAGE 2: ABOUT US & FULL TEAM ================= */}
        {currentPage === 'about' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Header */}
            <div>
              <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                Corporate Identity & Leadership
              </span>
              <h1 className={`font-heading font-extrabold text-3xl sm:text-4xl mt-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                About Fuldej Integrated Service Ltd & Multidisciplinary Team
              </h1>
              <p className={`text-sm max-w-3xl mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                A registered multidisciplinary Nigerian enterprise combining software engineering, infrastructure construction, renewable solar energy, and sustainable commercial consulting.
              </p>
            </div>

            {/* Corporate Overview & Statutory Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className={`lg:col-span-7 space-y-5 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                <p>
                  <strong className={isDark ? 'text-white' : 'text-[#142B4A]'}>Fuldej Integrated Service Ltd</strong> was incorporated by the Corporate Affairs Commission (CAC) under Nigerian law (Registration Number: <strong className={`font-mono ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>RC 7360949</strong>).
                </p>
                <p>
                  Operating from our primary coordination base in Kano State, we serve private enterprises, public sector institutions, agricultural cooperatives, and non-profit development partners across Northern Nigeria and the wider African territory.
                </p>
                <div className={`border-l-4 p-4 rounded-r-lg ${
                  isDark ? 'bg-[#132238] border-cyan-400' : 'bg-[#F8FAFC] border-[#168A78]'
                }`}>
                  <h4 className={`font-heading font-bold text-sm ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>Registered Corporate Office:</h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                    White Container, BUK Old Campus Area, Opposite Laundry Junction, Kano State, Nigeria.
                  </p>
                </div>
                <p>
                  Our multidisciplinary engineering and consulting model combines software systems, cloud databases, business development consulting, financial inclusion literacy, and clean energy infrastructure into unified, bankable project executions.
                </p>
              </div>

              <div className={`lg:col-span-5 border rounded-2xl p-6 space-y-4 ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
              }`}>
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className={`font-heading font-bold text-base ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    Statutory Registry
                  </h3>
                  <button
                    onClick={() => setShowCacModal(true)}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    View Official Cert &rarr;
                  </button>
                </div>

                <ul className={`space-y-3 text-xs ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                  <li className="flex items-start gap-2">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                    <span><strong>CAC Status:</strong> Incorporated Private Limited Company (RC 7360949).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                    <span><strong>Primary Operational Base:</strong> Kano State Commercial Axis, Nigeria.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                    <span><strong>Banking Partnership:</strong> Jaiz Bank PLC (Acc: 0017691758).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                    <span><strong>Regulatory Registrations:</strong> FIRS Tax Compliant, SCUML Certified, SMEDAN Accredited.</span>
                  </li>
                </ul>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="/assets/aistudio/CERTIFICATE_-__FULDEJ_INTEGRATED_SERVICE_LTD___1___1___2__e5318264.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="CERTIFICATE_OF_INCORPORATION__FULDEJ_INTEGRATED_SERVICE_LTD.pdf"
                    className="w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CAC Certificate (PDF)</span>
                  </a>

                  <a
                    href="/assets/docs/COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      isDark
                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                        : 'bg-[#142B4A] hover:bg-[#0D1D33] text-white'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official Profile (PDF)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* --- COMPLETE TEAM SECTION (FROM COMPANY PROFILE) --- */}
            <div id="team-roster" className="space-y-8 pt-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
                <div>
                  <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                    Human Capital & Expertise
                  </span>
                  <h2 className={`font-heading font-extrabold text-2xl sm:text-3xl mt-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    Leadership Directorate & Multidisciplinary Engineering Team
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                    All 10 professional leaders as certified in the official Fuldej Integrated Service Ltd corporate profile.
                  </p>
                </div>

                {/* Team Department Filter Buttons */}
                <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border text-xs font-medium bg-slate-100/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setTeamDepartmentFilter('all')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      teamDepartmentFilter === 'all'
                        ? 'bg-white dark:bg-[#1E3E6B] text-[#142B4A] dark:text-white shadow-sm font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All Team (10)
                  </button>
                  <button
                    onClick={() => setTeamDepartmentFilter('executive')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      teamDepartmentFilter === 'executive'
                        ? 'bg-white dark:bg-[#1E3E6B] text-[#142B4A] dark:text-white shadow-sm font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Executive Directorate (2)
                  </button>
                  <button
                    onClick={() => setTeamDepartmentFilter('engineering')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      teamDepartmentFilter === 'engineering'
                        ? 'bg-white dark:bg-[#1E3E6B] text-[#142B4A] dark:text-white shadow-sm font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Civil, Power & Rig Mechanics (5)
                  </button>
                  <button
                    onClick={() => setTeamDepartmentFilter('tech_env')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      teamDepartmentFilter === 'tech_env'
                        ? 'bg-white dark:bg-[#1E3E6B] text-[#142B4A] dark:text-white shadow-sm font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Software & Environmental (3)
                  </button>
                </div>
              </div>

              {/* Team Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeam.map((member) => (
                  <div
                    key={member.id}
                    className={`border rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
                      isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        {/* Member Photo - Standardized 4:5 Portrait Dimensions */}
                        <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden border border-[#C59B27]/40 dark:border-slate-700 bg-slate-900 shadow-sm shrink-0">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                        </div>

                        {/* Member Header & Discipline */}
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {member.experienceYears} Years Exp
                          </span>
                          <h3 className={`font-heading font-bold text-base leading-snug ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                            {member.name}
                          </h3>
                          <div className={`text-xs font-semibold ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                            {member.role}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">
                            {member.discipline}
                          </div>
                        </div>
                      </div>

                      {/* Bio summary */}
                      <p className={`text-xs leading-relaxed pt-2 border-t ${isDark ? 'border-slate-700/60 text-slate-300' : 'border-slate-100 text-[#5A6B82]'}`}>
                        {member.bio}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 font-mono">Fuldej Directorate Roster</span>
                      <span className={`text-[11px] font-semibold flex items-center gap-1 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Certified Profile</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className={`border rounded-2xl p-6 sm:p-8 space-y-3 ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                  Our Vision
                </span>
                <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                  Long-Term Sustainable Value
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                  "To become a leading African enterprise recognized for delivering innovative, technology-driven, and sustainable solutions that create long-term value for businesses, public institutions, and communities."
                </p>
              </div>

              <div className={`border rounded-2xl p-6 sm:p-8 space-y-3 ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-amber-300' : 'text-[#142B4A]'}`}>
                  Our Mission
                </span>
                <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                  Impact-Driven Delivery
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                  "To provide professional engineering, innovative digital technologies, strategic advisory, and impactful infrastructure projects that promote economic development, financial literacy, youth entrepreneurship, and sustainable growth."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: SERVICES & INTERACTIVE RFQ ESTIMATOR ================= */}
        {currentPage === 'services' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div>
              <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                Our Service Catalog & Estimator
              </span>
              <h1 className={`font-heading font-extrabold text-3xl sm:text-4xl mt-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Corporate Services & Interactive Scope Estimator
              </h1>
              <p className={`text-sm max-w-2xl mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                Detailed breakdowns of our six core business divisions, plus an instant project scope and budget calculator to expedite corporate proposals.
              </p>
            </div>

            {/* --- INTERACTIVE TRUST FEATURE: SCOPE & BUDGET ESTIMATOR --- */}
            <div className={`border rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg ${
              isDark ? 'bg-[#132238] border-slate-700' : 'bg-gradient-to-br from-white to-[#F8FAFC] border-slate-200'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Instant Project Scope & Budget Calculator</span>
                  </div>
                  <h3 className={`font-heading font-bold text-xl sm:text-2xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    Preliminary Project Cost & Specification Estimator
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                    Calculate baseline project parameters with transparent Nigerian & international market standards.
                  </p>
                </div>

                {/* Currency Switcher */}
                <div className="flex items-center gap-2 text-xs font-bold self-start md:self-auto">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Currency:</span>
                  <div className="flex rounded-lg border p-1 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setEstimatorCurrency('NGN')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        estimatorCurrency === 'NGN' ? 'bg-[#168A78] text-white' : 'text-slate-500'
                      }`}
                    >
                      NGN (₦)
                    </button>
                    <button
                      onClick={() => setEstimatorCurrency('USD')}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        estimatorCurrency === 'USD' ? 'bg-[#168A78] text-white' : 'text-slate-500'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>
              </div>

              {/* Division selector tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {[
                  { id: 'solar', label: 'Commercial Solar PV' },
                  { id: 'borehole', label: 'Deep Water Borehole' },
                  { id: 'tech', label: 'Enterprise Software' },
                  { id: 'consulting', label: 'Business Feasibility' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setEstimatorDivision(tab.id as any)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      estimatorDivision === tab.id
                        ? 'bg-[#168A78] border-[#168A78] text-white shadow-sm'
                        : isDark
                        ? 'bg-[#0E1A2C] border-slate-700 text-slate-300 hover:border-slate-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Configurator parameters based on active division */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  {estimatorDivision === 'solar' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">Array Capacity:</span>
                        <span className="font-mono font-bold text-cyan-400">{solarCapacity} kVA Inverter Array</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="150"
                        step="5"
                        value={solarCapacity}
                        onChange={e => setSolarCapacity(Number(e.target.value))}
                        className="w-full accent-[#168A78]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>10 kVA (Small Business)</span>
                        <span>50 kVA (Industrial / Clinic)</span>
                        <span>150 kVA (Estate / Mini-Grid)</span>
                      </div>
                    </div>
                  )}

                  {estimatorDivision === 'borehole' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">Drilling Depth to Aquifer:</span>
                        <span className="font-mono font-bold text-cyan-400">{boreholeDepth} Meters Deep</span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="250"
                        step="10"
                        value={boreholeDepth}
                        onChange={e => setBoreholeDepth(Number(e.target.value))}
                        className="w-full accent-[#168A78]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>80m (Shallow Geological)</span>
                        <span>160m (Sedimentary Standard)</span>
                        <span>250m (Basement Deep Aquifer)</span>
                      </div>
                    </div>
                  )}

                  {estimatorDivision === 'tech' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">Organization User Seats:</span>
                        <span className="font-mono font-bold text-cyan-400">{techUsers} Corporate Users</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="500"
                        step="10"
                        value={techUsers}
                        onChange={e => setTechUsers(Number(e.target.value))}
                        className="w-full accent-[#168A78]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>10 Seats (Office)</span>
                        <span>100 Seats (Enterprise)</span>
                        <span>500 Seats (Cooperative / Network)</span>
                      </div>
                    </div>
                  )}

                  {estimatorDivision === 'consulting' && (
                    <div className="space-y-3">
                      <span className="text-xs font-semibold block">Enterprise Scope Scale:</span>
                      <div className="grid grid-cols-3 gap-3">
                        {(['sme', 'medium', 'enterprise'] as const).map(sc => (
                          <button
                            key={sc}
                            onClick={() => setConsultingScale(sc)}
                            className={`p-3 rounded-lg border text-xs font-bold capitalize transition-all ${
                              consultingScale === sc
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                            }`}
                          >
                            {sc} Level
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                    isDark ? 'bg-[#0E1A2C] border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-100 text-[#263445]'
                  }`}>
                    <div className="font-bold text-[#168A78] font-mono text-[11px] uppercase">
                      Deliverables Included in Scope:
                    </div>
                    <div className="text-[11px] leading-relaxed">{currentEstimate.specs}</div>
                  </div>
                </div>

                {/* Estimate Result Card */}
                <div className="lg:col-span-5">
                  <div className={`p-6 rounded-2xl border text-center space-y-4 shadow-sm ${
                    isDark ? 'bg-[#0B1321] border-slate-700' : 'bg-white border-slate-200'
                  }`}>
                    <span className="font-mono text-xs uppercase font-bold text-slate-400 block">
                      Estimated Project Investment
                    </span>

                    <div className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald-500">
                      {estimatorCurrency === 'NGN'
                        ? `₦${currentEstimate.ngn.toLocaleString()}`
                        : `$${currentEstimate.usd.toLocaleString()} USD`}
                    </div>

                    <div className="text-xs text-slate-400">
                      Based on standard COREN-grade engineering and verified wholesale procurement.
                    </div>

                    <button
                      onClick={handlePreFillInquiryFromEstimator}
                      className="w-full py-3 rounded-lg bg-[#168A78] hover:bg-[#127163] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Pre-fill Inquiry with this Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Divisions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 'digital-solutions',
                  title: '1. Digital Solutions & Web Systems',
                  desc: 'Modern corporate portals, performant web platforms, and responsive client-facing interfaces designed for speed, security, and reliable high-performance hosting.',
                  features: ['Corporate portals & enterprise-ready setups', 'Custom database architecture', 'SSL certificates & security hardening', 'Search engine optimization']
                },
                {
                  id: 'transformation',
                  title: '2. Technology Transformation',
                  desc: 'Guiding private companies and public institutions through cloud transitions, digital workflows, and centralized data governance.',
                  features: ['Cloud database architecture', 'Enterprise inventory & logistics telemetry', 'Internal process automation', 'Cybersecurity auditing']
                },
                {
                  id: 'consulting',
                  title: '3. Business Development & Consulting',
                  desc: 'Actionable advisory, market research, bankable feasibility studies, and operational frameworks to help commercial enterprises scale.',
                  features: ['Market entry assessments', 'Business model optimization', 'Operational audits', 'Corporate governance structuring']
                },
                {
                  id: 'inclusion',
                  title: '4. Digital Skills & Inclusion Programmes',
                  desc: 'Designing community-rooted empowerment curricula, youth digital bootcamps, and ethical financial education with the MGDI Initiative.',
                  features: ['Youth vocational ICT workshops', 'Merchant digital accounting', 'Financial literacy clinics', 'Grassroots tech lab activations']
                },
                {
                  id: 'innovation',
                  title: '5. Innovation & Project Research',
                  desc: 'Prototyping high-potential technology initiatives, conducting field surveys, and validating technological interventions for community adoption.',
                  features: ['Smart infrastructure research', 'AI modeling (SmartGrowth AI)', 'Techno-economic viability tests', 'Pilot program formulations']
                },
                {
                  id: 'partnerships',
                  title: '6. Strategic Partnerships & Investment',
                  desc: 'Preparing domestic enterprises and initiatives for cross-border collaboration, impact capital, venture readiness, and bilateral agreements.',
                  features: ['Investor pitch packaging', 'Bilateral MoU framing', 'Development partner liaison', 'Risk mitigation structures']
                }
              ].map((srv, idx) => (
                <div
                  key={idx}
                  className={`border rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all space-y-4 ${
                    isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    <h3 className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      {srv.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      {srv.desc}
                    </p>
                    <div className={`pt-2 border-t ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                      <span className={`font-mono text-[10px] font-bold uppercase block mb-1.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                        Key Deliverables
                      </span>
                      <ul className={`space-y-1 text-xs ${isDark ? 'text-slate-300' : 'text-[#263445]'}`}>
                        {srv.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setContactForm(prev => ({ ...prev, subject: srv.title }));
                      setCurrentPage('contact');
                    }}
                    className={`w-full py-2.5 rounded-lg border text-xs font-bold transition-colors ${
                      isDark
                        ? 'bg-[#0E1A2C] hover:bg-cyan-600 hover:text-white border-slate-700 text-slate-200'
                        : 'bg-[#F8FAFC] hover:bg-[#142B4A] hover:text-white border-slate-200 text-[#142B4A]'
                    }`}
                  >
                    Request Proposal Brief
                  </button>
                </div>
              ))}
            </div>

            {/* Note on Field Engineering */}
            <div className={`border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isDark ? 'bg-[#132238] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
            }`}>
              <div className="space-y-1 max-w-2xl">
                <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                  Field Technical Capabilities
                </span>
                <h3 className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                  Turnkey Solar Micro-Grids, Borehole Drilling & Procurement
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                  Fuldej also executes verified field works in commercial solar mini-grids, 200m+ deep aquifer motorized boreholes, and industrial machinery procurement across Northern Nigeria.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className={`px-4 py-3 rounded-lg border text-xs font-bold transition-all flex items-center gap-2 ${
                    isDark
                      ? 'bg-emerald-950/50 hover:bg-emerald-900/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-400 text-emerald-800'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Field Installation Video</span>
                </button>

                <button
                  onClick={() => setCurrentPage('contact')}
                  className={`px-5 py-3 rounded-lg text-white text-xs font-bold transition-colors ${
                    isDark ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-[#142B4A] hover:bg-[#0D1D33]'
                  }`}
                >
                  Inquire Field Engineering
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 4: PROJECTS ================= */}
        {currentPage === 'projects' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                Initiatives Portfolio
              </span>
              <h1 className={`font-heading font-extrabold text-3xl sm:text-4xl mt-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Strategic Projects & Initiatives
              </h1>
              <p className={`text-sm max-w-2xl mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                We clearly designate every initiative as an Active Pilot, Proposed Concept, or Community Flagship to maintain complete stakeholder transparency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* SmartGrowth AI */}
              <div className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <div className={`p-6 border-b flex items-center justify-between ${
                  isDark ? 'bg-[#0B1321] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
                }`}>
                  <div className="h-16 w-36 bg-black rounded-lg p-2 border border-[#C59B27]/40 flex items-center justify-center">
                    <img
                      src="/assets/images/SmartGrowthAI_Logo__1__b01bd855.png"
                      alt="SmartGrowth AI"
                      className="max-h-10 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/SmartGrowthAI_Logo__1__b01bd855.png';
                      }}
                    />
                  </div>
                  <span className={`font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded border ${
                    isDark ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-[#E6F4F1] text-[#168A78] border-[#168A78]/30'
                  }`}>
                    Active Pilot
                  </span>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      SmartGrowth AI
                    </h3>
                    <p className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      An ethical financial health and credit-readiness technology initiative. Applies diagnostic algorithms and non-interest finance models to prepare African MSMEs for capital readiness.
                    </p>
                    <div className={`mt-4 p-3 rounded-lg border text-[11px] space-y-1.5 ${
                      isDark ? 'bg-[#0E1A2C] border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-100 text-[#263445]'
                    }`}>
                      <div><strong>Target Beneficiaries:</strong> Informal market merchants, agricultural cooperatives, early entrepreneurs.</div>
                      <div><strong>Current Stage:</strong> Prototype algorithm validation and merchant feedback clinics.</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setContactForm(prev => ({ ...prev, subject: 'SmartGrowth AI Pilot Collaboration' }));
                      setCurrentPage('contact');
                    }}
                    className={`w-full py-2.5 rounded-lg text-white text-xs font-bold transition-colors ${
                      isDark ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-[#142B4A] hover:bg-[#0D1D33]'
                    }`}
                  >
                    Inquire for Pilot Collaboration
                  </button>
                </div>
              </div>

              {/* SmartGreen */}
              <div className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <div className={`p-6 border-b flex items-center justify-between ${
                  isDark ? 'bg-[#0B1321] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
                }`}>
                  <div className="h-16 w-36 bg-black rounded-lg p-2 border border-[#C59B27]/40 flex items-center justify-center">
                    <img
                      src="/assets/images/Smartgreen_logo_18dde11c.jpg"
                      alt="SmartGreen"
                      className="max-h-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/Smartgreen_logo_18dde11c.jpg';
                      }}
                    />
                  </div>
                  <span className={`font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded border ${
                    isDark ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    Proposed Concept
                  </span>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      SmartGreen Residential Districts
                    </h3>
                    <p className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      A proposed smart, sustainable residential infrastructure initiative integrating off-grid solar mini-grids, deep borehole water reticulation, and IoT telemetry into Nigerian communities.
                    </p>
                    <div className={`mt-4 p-3 rounded-lg border text-[11px] space-y-1.5 ${
                      isDark ? 'bg-[#0E1A2C] border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-100 text-[#263445]'
                    }`}>
                      <div><strong>Target Beneficiaries:</strong> Urban housing developers, municipal authorities, cooperative estates.</div>
                      <div><strong>Current Stage:</strong> Techno-economic feasibility modeling and investor readiness pack.</div>
                    </div>
                  </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowVideoModal(true)}
                        className={`w-full py-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                          isDark
                            ? 'bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-500/30 text-emerald-300'
                            : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Solar Rack Commissioning Video</span>
                      </button>

                      <button
                        onClick={() => {
                          setContactForm(prev => ({ ...prev, subject: 'SmartGreen Districts Proposal' }));
                          setCurrentPage('contact');
                        }}
                        className={`w-full py-2.5 rounded-lg text-white text-xs font-bold transition-colors ${
                          isDark ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-[#142B4A] hover:bg-[#0D1D33]'
                        }`}
                      >
                        Explore Concept Scope
                      </button>
                    </div>
                </div>
              </div>

              {/* MGDI */}
              <div className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <div className={`p-6 border-b flex items-center justify-between ${
                  isDark ? 'bg-[#0B1321] border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  <div className="h-16 w-36 bg-black rounded-lg p-2 border border-[#C59B27]/40 flex items-center justify-center">
                    <img
                      src="/assets/images/MGDI_Logo_updated_66e1dc7b.png"
                      alt="MGDI Logo"
                      className="max-h-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/MGDI_Logo_updated_66e1dc7b.png';
                      }}
                    />
                  </div>
                  <span className={`font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded border ${
                    isDark ? 'bg-blue-950 text-blue-300 border-blue-800' : 'bg-blue-50 text-blue-800 border-blue-200'
                  }`}>
                    Flagship Program
                  </span>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                      MGDI Initiative
                    </h3>
                    <p className={`text-xs leading-relaxed mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      Merchant Growth & Digital Inclusion Initiative. Providing affordable digital literacy, POS merchant onboarding, and youth entrepreneurship clinics across trade hubs.
                    </p>
                    <div className={`mt-4 p-3 rounded-lg border text-[11px] space-y-1.5 ${
                      isDark ? 'bg-[#0E1A2C] border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-100 text-[#263445]'
                    }`}>
                      <div><strong>Target Beneficiaries:</strong> Grassroots market vendors, youth apprentices, women cooperatives.</div>
                      <div><strong>Current Stage:</strong> Active weekly clinics and community hub workshops in Kano State.</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setContactForm(prev => ({ ...prev, subject: 'MGDI Initiative Partnership' }));
                      setCurrentPage('contact');
                    }}
                    className={`w-full py-2.5 rounded-lg text-white text-xs font-bold transition-colors ${
                      isDark ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-[#142B4A] hover:bg-[#0D1D33]'
                    }`}
                  >
                    Partner with MGDI
                  </button>
                </div>
              </div>
            </div>

            {/* Verified Physical Installations Marquee Showcase */}
            <div className="pt-4 border-t border-slate-700/60">
              <ProjectMarquee
                isDark={isDark}
                onSelectProjectForInquiry={handleSelectProjectForInquiry}
                onOpenVideoModal={() => setShowVideoModal(true)}
              />
            </div>
          </div>
        )}

        {/* ================= PAGE 5: PARTNERSHIPS ================= */}
        {currentPage === 'partnerships' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                Alliances & Governance
              </span>
              <h1 className={`font-heading font-extrabold text-3xl sm:text-4xl mt-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Strategic Partnerships & Collaborative Frameworks
              </h1>
              <p className={`text-sm max-w-2xl mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                How Fuldej Integrated Service Ltd collaborates with technology providers, institutions, development bodies, and community organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Technology Providers', desc: 'Deploying robust cloud infrastructures, licensed software, and IoT telemetry.' },
                { title: 'Development Agencies', desc: 'Co-implementing youth digital capacity building and clean water schemes.' },
                { title: 'Financial Institutions', desc: 'Collaborating on ethical credit readiness frameworks and non-interest finance.' },
                { title: 'Market Associations', desc: 'Engaging grassroots merchant leadership for localized digital onboarding.' }
              ].map((trk, i) => (
                <div
                  key={i}
                  className={`border rounded-xl p-6 space-y-2 ${
                    isDark ? 'bg-[#132238] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
                  }`}
                >
                  <span className={`font-mono text-xs font-bold ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                    Track 0{i + 1}
                  </span>
                  <h3 className={`font-heading font-bold text-base ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    {trk.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                    {trk.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Partnership Protocol Card */}
            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 ${
              isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <div className="max-w-2xl space-y-2">
                <span className="font-mono text-xs font-bold text-[#168A78] uppercase">Engagement Protocol</span>
                <h3 className={`font-heading font-bold text-xl ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                  Structured Bilateral Collaboration Process
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                  Fuldej adheres to verified legal frameworks for all public, private, and development engagements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${isDark ? 'bg-[#0E1A2C] border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <span className="font-mono text-[#168A78] font-bold">Phase 01</span>
                  <h4 className="font-bold text-white">Mutual Non-Disclosure & Scoping</h4>
                  <p className="text-slate-400 text-[11px]">Execution of bilateral NDA and preliminary feasibility alignment.</p>
                </div>
                <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${isDark ? 'bg-[#0E1A2C] border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <span className="font-mono text-[#168A78] font-bold">Phase 02</span>
                  <h4 className="font-bold text-white">Technical & Commercial MoU</h4>
                  <p className="text-slate-400 text-[11px]">Drafting of milestones, resource allocations, and statutory compliance.</p>
                </div>
                <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${isDark ? 'bg-[#0E1A2C] border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <span className="font-mono text-[#168A78] font-bold">Phase 03</span>
                  <h4 className="font-bold text-white">Pilot Execution & Reporting</h4>
                  <p className="text-slate-400 text-[11px]">Co-implementation with transparent milestone audits and quarterly reporting.</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setContactForm(prev => ({ ...prev, subject: 'Strategic Partnership Discussion' }));
                  setCurrentPage('contact');
                }}
                className={`px-6 py-3 rounded-lg text-white font-bold text-sm shadow-md transition-colors ${
                  isDark ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-[#142B4A] hover:bg-[#0D1D33]'
                }`}
              >
                Initiate a Partnership Conversation
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 6: CONTACT ================= */}
        {currentPage === 'contact' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                Connect Directly
              </span>
              <h1 className={`font-heading font-extrabold text-3xl sm:text-4xl mt-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Corporate Contact Channels
              </h1>
              <p className={`text-sm max-w-2xl mt-2 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                Reach our corporate development team for inquiries, consultations, and partnership proposals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Contact Info Card */}
              <div className={`lg:col-span-5 border rounded-2xl p-6 sm:p-8 space-y-6 ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-[#F8FAFC] border-slate-200'
              }`}>
                <div>
                  <h3 className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>Corporate Head Office</h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-[#5A6B82]'}`}>
                    Incorporated by CAC (RC 7360949). Coordinates all commercial and technical inquiries across Nigeria.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                    <div>
                      <strong className={`block ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>Physical Office:</strong>
                      <span className={isDark ? 'text-slate-300' : 'text-[#5A6B82]'}>White Container, BUK Old Campus Area, Opposite Laundry Junction, Kano State, Nigeria.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                    <div>
                      <strong className={`block ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>Email Address:</strong>
                      <a href="mailto:info@fuldej.com.ng" className={`underline font-medium ${isDark ? 'text-cyan-300' : 'text-[#142B4A]'}`}>
                        info@fuldej.com.ng
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                    <div>
                      <strong className={`block ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>Telephone Lines:</strong>
                      <span className={`font-mono ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                        +234 803 265 3578<br />+234 903 098 6923
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`} />
                    <div>
                      <strong className={`block ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>Hours:</strong>
                      <span className={isDark ? 'text-slate-300' : 'text-[#5A6B82]'}>Monday – Friday: 8:30 AM – 5:00 PM (WAT)</span>
                    </div>
                  </div>
                </div>

                <div className={`pt-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                  <span className={`font-mono text-[10px] font-bold uppercase block ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                    Official Website
                  </span>
                  <a href="https://fuldej.com.ng" className={`text-xs font-bold hover:underline ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    https://fuldej.com.ng
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`lg:col-span-7 border rounded-2xl p-6 sm:p-8 shadow-sm ${
                isDark ? 'bg-[#132238] border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <h3 className={`font-heading font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>Submit an Inquiry</h3>
                <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-[#5A6B82]'}`}>
                  Fill in your details and project scope. Your message is dispatched directly to our corporate executive email.
                </p>

                {/* Live Corporate Email Connection Badge */}
                <div className={`p-3.5 mb-5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                  isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-bold block">Connected to Corporate Email</span>
                      <span className="text-[11px] opacity-90 font-mono">info@fuldej.com.ng (Immediate Delivery)</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live Direct Delivery
                  </span>
                </div>

                {formStatus === 'success' && lastSubmittedInquiry && (
                  <div className="p-5 mb-6 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/40 text-xs space-y-4 animate-in fade-in">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-emerald-400">
                          Inquiry Prepared & Routed to info@fuldej.com.ng
                        </h4>
                        <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-200' : 'text-[#263445]'}`}>
                          Your message from <strong>{lastSubmittedInquiry.name}</strong> ({lastSubmittedInquiry.email}) has been addressed to our executive inbox at <strong className="font-mono text-emerald-400">info@fuldej.com.ng</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Instant Dispatch & Webmail Fallbacks */}
                    <div className={`p-3.5 rounded-lg border space-y-2.5 ${isDark ? 'bg-black/30 border-white/10' : 'bg-white border-emerald-200'}`}>
                      <span className="font-bold text-[11px] text-slate-400 block uppercase tracking-wider font-mono">
                        Direct Delivery & Instant Dispatch Options:
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <a
                          href={`mailto:info@fuldej.com.ng?subject=${encodeURIComponent(`[Fuldej Corporate Inquiry] ${lastSubmittedInquiry.subject} — ${lastSubmittedInquiry.name}`)}&body=${encodeURIComponent(`TO: info@fuldej.com.ng\nNAME: ${lastSubmittedInquiry.name}\nORGANISATION: ${lastSubmittedInquiry.organisation || 'N/A'}\nEMAIL: ${lastSubmittedInquiry.email}\nSUBJECT: ${lastSubmittedInquiry.subject}\n\n${lastSubmittedInquiry.message}`)}`}
                          className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Launch Default Email Client</span>
                        </a>

                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=info@fuldej.com.ng&su=${encodeURIComponent(`[Fuldej Corporate Inquiry] ${lastSubmittedInquiry.subject} — ${lastSubmittedInquiry.name}`)}&body=${encodeURIComponent(`TO: info@fuldej.com.ng\nNAME: ${lastSubmittedInquiry.name}\nORGANISATION: ${lastSubmittedInquiry.organisation || 'N/A'}\nEMAIL: ${lastSubmittedInquiry.email}\nSUBJECT: ${lastSubmittedInquiry.subject}\n\n${lastSubmittedInquiry.message}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3 py-1.5 rounded-md border font-semibold flex items-center gap-1.5 transition-colors ${
                            isDark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:border-slate-600' : 'bg-slate-50 border-slate-200 text-[#142B4A] hover:bg-slate-100'
                          }`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open in Gmail Web</span>
                        </a>

                        <a
                          href={`https://outlook.office.com/mail/deeplink/compose?to=info@fuldej.com.ng&subject=${encodeURIComponent(`[Fuldej Corporate Inquiry] ${lastSubmittedInquiry.subject} — ${lastSubmittedInquiry.name}`)}&body=${encodeURIComponent(`TO: info@fuldej.com.ng\nNAME: ${lastSubmittedInquiry.name}\nORGANISATION: ${lastSubmittedInquiry.organisation || 'N/A'}\nEMAIL: ${lastSubmittedInquiry.email}\nSUBJECT: ${lastSubmittedInquiry.subject}\n\n${lastSubmittedInquiry.message}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3 py-1.5 rounded-md border font-semibold flex items-center gap-1.5 transition-colors ${
                            isDark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:border-slate-600' : 'bg-slate-50 border-slate-200 text-[#142B4A] hover:bg-slate-100'
                          }`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open in Outlook Web</span>
                        </a>

                        <a
                          href={`https://wa.me/2349030986923?text=${encodeURIComponent(`Hello Fuldej Corporate Team,\n\nI just dispatched an inquiry to info@fuldej.com.ng:\n• Name: ${lastSubmittedInquiry.name}\n• Organisation: ${lastSubmittedInquiry.organisation || 'N/A'}\n• Email: ${lastSubmittedInquiry.email}\n• Subject: ${lastSubmittedInquiry.subject}\n\nMessage:\n${lastSubmittedInquiry.message}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1.5 border border-emerald-500/40 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Copy to WhatsApp Live Desk</span>
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setFormStatus('idle');
                        setContactForm({
                          name: '',
                          organisation: '',
                          email: '',
                          subject: 'General Corporate Inquiry',
                          message: '',
                          consent: true
                        });
                      }}
                      className={`text-xs font-semibold underline hover:no-underline ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}
                    >
                      + Submit Another Corporate Inquiry
                    </button>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="p-4 mb-5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {formFeedback}
                  </div>
                )}

                <form
                  onSubmit={handleContactSubmit}
                  action="mailto:info@fuldej.com.ng"
                  method="POST"
                  encType="text/plain"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-[#142B4A]'}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="Full Name"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Ibrahim Sani"
                        className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none transition-colors ${
                          isDark
                            ? 'bg-[#0E1A2C] border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400'
                            : 'bg-white border-slate-200 text-[#263445] focus:border-[#168A78]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-[#142B4A]'}`}>
                        Organisation / Company
                      </label>
                      <input
                        type="text"
                        name="Organisation"
                        value={contactForm.organisation}
                        onChange={e => setContactForm({ ...contactForm, organisation: e.target.value })}
                        placeholder="e.g. Agro-Allied Network Ltd"
                        className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none transition-colors ${
                          isDark
                            ? 'bg-[#0E1A2C] border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400'
                            : 'bg-white border-slate-200 text-[#263445] focus:border-[#168A78]'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-[#142B4A]'}`}>
                        Corporate Email Address *
                      </label>
                      <input
                        type="email"
                        name="Sender Email"
                        required
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g. sani@company.ng"
                        className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none transition-colors ${
                          isDark
                            ? 'bg-[#0E1A2C] border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400'
                            : 'bg-white border-slate-200 text-[#263445] focus:border-[#168A78]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-[#142B4A]'}`}>
                        Subject
                      </label>
                      <input
                        type="text"
                        name="Subject"
                        value={contactForm.subject}
                        onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                        className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none transition-colors ${
                          isDark
                            ? 'bg-[#0E1A2C] border-slate-700 text-white focus:border-cyan-400'
                            : 'bg-white border-slate-200 text-[#263445] focus:border-[#168A78]'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-[#142B4A]'}`}>
                      Message Details *
                    </label>
                    <textarea
                      name="Message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe your project, inquiry, or partnership scope..."
                      className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none transition-colors ${
                        isDark
                          ? 'bg-[#0E1A2C] border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400'
                          : 'bg-white border-slate-200 text-[#263445] focus:border-[#168A78]'
                      }`}
                    ></textarea>
                  </div>

                  <div className={`flex items-start gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-[#5A6B82]'}`}>
                    <input
                      type="checkbox"
                      id="consentCheck"
                      checked={contactForm.consent}
                      onChange={e => setContactForm({ ...contactForm, consent: e.target.checked })}
                      className="mt-0.5 accent-[#168A78]"
                      required
                    />
                    <label htmlFor="consentCheck">
                      I consent to Fuldej Integrated Service Ltd processing this information to respond to my inquiry under the <button type="button" onClick={() => setCurrentPage('privacy')} className={`underline ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>Privacy Policy</button>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-3.5 rounded-lg text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50 ${
                      isDark ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-950/40' : 'bg-[#142B4A] hover:bg-[#0D1D33] shadow-slate-900/20'
                    }`}
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    <span>{formStatus === 'sending' ? 'Dispatching to info@fuldej.com.ng...' : 'Send Message Immediately to info@fuldej.com.ng'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 7: PRIVACY POLICY ================= */}
        {currentPage === 'privacy' && (
          <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div>
              <span className={`font-mono text-xs font-bold uppercase ${isDark ? 'text-cyan-400' : 'text-[#168A78]'}`}>
                Legal & Compliance
              </span>
              <h1 className={`font-heading font-extrabold text-3xl mt-1 ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                Corporate Privacy Policy
              </h1>
              <p className={`text-xs font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-[#5A6B82]'}`}>
                Effective Date: October 2026 · Official Domain: https://fuldej.com.ng
              </p>
            </div>

            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 text-xs leading-relaxed ${
              isDark ? 'bg-[#132238] border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-[#5A6B82]'
            }`}>
              <section className="space-y-2">
                <h3 className={`font-heading font-bold text-sm ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                  1. Corporate Introduction
                </h3>
                <p>
                  <strong className={isDark ? 'text-white' : 'text-[#142B4A]'}>Fuldej Integrated Service Ltd</strong> (RC 7360949), headquartered in Kano State, Nigeria, respects visitor privacy. This policy explains our data practices for visitors to https://fuldej.com.ng.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`font-heading font-bold text-sm ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                  2. Information Collected
                </h3>
                <p>
                  We only collect data voluntarily submitted via our contact forms (Name, Company, Email, Message). We do not collect cookies for tracking or behavioral advertising.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`font-heading font-bold text-sm ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                  3. Data Utilization & Protection
                </h3>
                <p>
                  Submitted information is strictly utilized to respond to commercial inquiries, structure project proposals, and maintain administrative records. We never monetize or distribute contact lists to third parties.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className={`font-heading font-bold text-sm ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                  4. Contact & User Rights
                </h3>
                <p>
                  Users may request correction or deletion of their contact records at any time by contacting our corporate office: <strong>info@fuldej.com.ng</strong>.
                </p>
              </section>
            </div>
          </div>
        )}

      </main>

      {/* --- Floating Animated WhatsApp Reach-out Button (Bottom Left) --- */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/2349030986923?text=Hello%20Fuldej%20Integrated%20Service%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Reach out on WhatsApp"
          className="relative group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95 border border-emerald-400/40"
          title="Reach out to Fuldej Integrated Service on WhatsApp"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
            <svg
              className="relative inline-flex w-5 h-5 fill-current shrink-0 animate-pulse"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">Reach out on WhatsApp</span>
        </a>
      </div>

      {/* --- Floating Theme Switcher Button for Instant Light/Dark Reading (Bottom Right) --- */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className={`px-3.5 py-2.5 rounded-full shadow-2xl border flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 ${
            isDark
              ? 'bg-[#132238] border-slate-700 text-amber-300 shadow-cyan-950/60 hover:bg-[#1A2E4B]'
              : 'bg-white border-slate-200 text-[#142B4A] shadow-slate-300 hover:bg-slate-50'
          }`}
          title={isDark ? "Currently in Dark Mode. Click to switch to Light Mode." : "Currently in Light Mode. Click to switch to Dark Mode."}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-300" />
              <span className="text-slate-200 text-[11px] font-medium hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              <span className="text-[#142B4A] text-[11px] font-medium hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* --- Site Footer --- */}
      <footer className={`text-xs border-t py-14 transition-colors ${
        isDark ? 'bg-[#070D18] text-slate-400 border-slate-800' : 'bg-[#142B4A] text-slate-300 border-[#0D1D33]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#C59B27] bg-black shrink-0">
                  <img
                    src="/assets/images/fuldej_company_logo.jpg"
                    alt="Fuldej Logo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/aistudio/fuldej_company_logo.jpg';
                    }}
                  />
                </div>
                <div>
                  <span className="font-heading font-bold text-white text-base block">Fuldej Integrated Service Ltd</span>
                  <span className="font-mono text-[10px] text-cyan-400 font-semibold">RC 7360949 · CAC Incorporated</span>
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">
                A multidisciplinary Nigerian business delivering innovative digital solutions, enterprise technology, and sustainable development to build long-term societal value.
              </p>

              <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1">
                <div>Corporate Headquarters: <span className="text-white">Kano State, Nigeria</span></div>
                <div>Official Domain: <span className="text-cyan-300">https://fuldej.com.ng</span></div>
                <div>Banking Partner: <span className="text-white">Jaiz Bank PLC (Acc: 0017691758)</span></div>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-2">
              <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-3">Navigation</h4>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => setCurrentPage('commodities')} className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">Agro-Commodities & Export</button></li>
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us & Team (10)</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">Services & Cost Estimator</button></li>
                <li><button onClick={() => setCurrentPage('projects')} className="hover:text-white transition-colors">Projects & Initiatives</button></li>
                <li><button onClick={() => setCurrentPage('partnerships')} className="hover:text-white transition-colors">Strategic Partnerships</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact Our Team</button></li>
                <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              </ul>
            </div>

            {/* Col 3: Strategic Initiatives */}
            <div className="lg:col-span-2 space-y-2">
              <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-3">Initiative Marks</h4>
              <ul className="space-y-3 text-slate-400 text-xs">
                <li className="flex items-center gap-2">
                  <div className="h-7 w-12 bg-black rounded p-1 border border-white/10 flex items-center justify-center shrink-0">
                    <img
                      src="/assets/images/MGDI_Logo_updated_66e1dc7b.png"
                      alt="MGDI"
                      className="max-h-5 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/MGDI_Logo_updated_66e1dc7b.png';
                      }}
                    />
                  </div>
                  <span className="text-slate-300">MGDI Initiative</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-7 w-12 bg-black rounded p-1 border border-white/10 flex items-center justify-center shrink-0">
                    <img
                      src="/assets/images/SmartGrowthAI_Logo__1__b01bd855.png"
                      alt="SmartGrowth"
                      className="max-h-4 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/SmartGrowthAI_Logo__1__b01bd855.png';
                      }}
                    />
                  </div>
                  <span className="text-slate-300">SmartGrowth AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-7 w-12 bg-black rounded p-1 border border-white/10 flex items-center justify-center shrink-0">
                    <img
                      src="/assets/images/Smartgreen_logo_18dde11c.jpg"
                      alt="SmartGreen"
                      className="max-h-5 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/aistudio/Smartgreen_logo_18dde11c.jpg';
                      }}
                    />
                  </div>
                  <span className="text-slate-300">SmartGreen</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Corporate Contact */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-heading font-bold text-white uppercase tracking-wider text-xs mb-3">Office Coordinates</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p>White Container, BUK Old Campus Area, Opposite Laundry Junction, Kano State, Nigeria.</p>
                <p>
                  Email: <a href="mailto:info@fuldej.com.ng" className="text-cyan-300 hover:underline">info@fuldej.com.ng</a>
                </p>
                <p className="font-mono text-slate-300">+234 803 265 3578 / +234 903 098 6923</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setShowCacModal(true)}
                  className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify CAC Registry</span>
                </button>
                <a
                  href="/assets/aistudio/CERTIFICATE_-__FULDEJ_INTEGRATED_SERVICE_LTD___1___1___2__e5318264.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CERTIFICATE_OF_INCORPORATION__FULDEJ_INTEGRATED_SERVICE_LTD.pdf"
                  className="px-3 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-mono flex items-center gap-1.5 transition-colors border border-emerald-500/30"
                  title="Download Official CAC Certificate of Incorporation"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Certificate</span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
            <div>
              &copy; {new Date().getFullYear()} Fuldej Integrated Service Ltd. All rights reserved.
            </div>
            <div>
              Corporate Affairs Commission (CAC) Registered: RC 7360949
            </div>
          </div>

        </div>
      </footer>

      {/* --- OFFICIAL FIELD ENGINEERING VIDEO MODAL --- */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-[#0B1424] text-slate-200 space-y-4 max-h-[94vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    Verified Field Execution Footage
                  </h3>
                  <span className="font-mono text-xs text-emerald-400">
                    Industrial Solar Inverter & Felicity Lithium Storage Rack Facility
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="px-4 sm:px-6">
              <div className="rounded-xl overflow-hidden bg-black aspect-video border border-white/10 shadow-inner flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src="/assets/videos/fuldej_solar_installation_pro.mp4" type="video/mp4" />
                  <source src="/assets/aistudio/VID-20261022-WA0020__1__978a816f.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Technical Parameters */}
            <div className="p-4 sm:p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">INSTALLATION TYPE:</span>
                  <strong className="text-white text-xs">Solar Hybrid Micro-Grid</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">STORAGE SYSTEM:</span>
                  <strong className="text-white text-xs">Felicity Lithium Battery Rack</strong>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">OPERATIONAL LOCATION:</span>
                  <strong className="text-white text-xs">Kano State, Nigeria</strong>
                </div>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed">
                Footage recorded directly on site during official commissioning and safety calibration by the Fuldej Integrated Service Ltd renewable engineering team. Verifies active industrial-grade installation capabilities.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setCurrentPage('contact');
                }}
                className="px-4 py-2 rounded-lg bg-[#168A78] hover:bg-[#127163] text-white text-xs font-bold transition-colors"
              >
                Inquire Commercial Solar Project
              </button>

              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- OFFICIAL CAC & CORPORATE CREDENTIALS MODAL --- */}
      {showCacModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto ${
            isDark ? 'bg-[#0F1B2D] border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-[#263445]'
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isDark ? 'border-slate-700' : 'border-slate-100'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className={`font-heading font-bold text-lg leading-tight ${isDark ? 'text-white' : 'text-[#142B4A]'}`}>
                    Corporate Affairs Commission Verification
                  </h3>
                  <span className="font-mono text-xs text-emerald-400">Statutory Certificate RC 7360949</span>
                </div>
              </div>
              <button
                onClick={() => setShowCacModal(false)}
                className={`p-1 rounded ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <div className="font-bold text-sm text-emerald-400 mb-1">
                  Active & Fully Compliant Corporate Legal Status
                </div>
                <p className="text-[11px] leading-relaxed">
                  Fuldej Integrated Service Ltd is duly registered under the Companies and Allied Matters Act (CAMA) by the Corporate Affairs Commission, Federal Republic of Nigeria.
                </p>
              </div>

              {/* Official Certificate Showcase & Ready for Download Panel */}
              <div className={`p-4 sm:p-5 rounded-xl border-2 relative overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-emerald-950/40 via-[#102324] to-[#0D1C2E] border-emerald-500/40 text-slate-100 shadow-lg' 
                  : 'bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 border-emerald-500/40 text-[#142B4A] shadow-md'
              }`}>
                {/* Certificate Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                        Federal Republic of Nigeria · Corporate Affairs Commission
                      </span>
                      <h4 className="font-heading font-extrabold text-sm sm:text-base leading-tight">
                        Certificate of Incorporation (RC 7360949)
                      </h4>
                      <span className="text-[11px] opacity-80 font-mono">Issued at Abuja under CAMA 2020</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 self-start sm:self-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Ready for Download
                  </span>
                </div>

                {/* Certificate Particulars */}
                <div className="py-3.5 space-y-2 text-xs">
                  <div className="text-[12px] leading-relaxed">
                    The Registrar - General of Corporate Affairs Commission certifies that <strong className="font-bold underline decoration-emerald-500">FULDEJ INTEGRATED SERVICE LTD</strong> is incorporated under the <em>Companies and Allied Matters Act 2020</em> as a private company limited by shares.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] opacity-80 pt-1 font-mono">
                    <div>• Registration No: <strong className="text-emerald-400">7360949</strong></div>
                    <div>• Date: <strong>21st February, 2024</strong></div>
                    <div>• Location: <strong>Abuja, Nigeria</strong></div>
                    <div>• Registrar-General: <strong>Hussaini Ishaq Magaji SAN</strong></div>
                  </div>
                </div>

                {/* Direct Certificate Download Actions */}
                <div className="pt-3 border-t border-emerald-500/20 flex flex-wrap gap-2.5 items-center">
                  <a
                    href="/assets/aistudio/CERTIFICATE_-__FULDEJ_INTEGRATED_SERVICE_LTD___1___1___2__e5318264.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="CERTIFICATE_OF_INCORPORATION__FULDEJ_INTEGRATED_SERVICE_LTD.pdf"
                    className="flex-1 min-w-[200px] py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/30 transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Official Certificate (PDF)</span>
                    <span className="text-[10px] opacity-80 font-mono ml-1">(~900 KB)</span>
                  </a>

                  <a
                    href="/assets/aistudio/CERTIFICATE_-__FULDEJ_INTEGRATED_SERVICE_LTD___1___1___2__e5318264.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`py-2.5 px-3.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      isDark
                        ? 'border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-white bg-black/20'
                        : 'border-emerald-600/30 hover:border-emerald-600 text-emerald-800 hover:bg-emerald-50 bg-white'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview in New Tab</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px]">Registered Legal Entity:</span>
                  <strong className="text-sm">Fuldej Integrated Service Ltd</strong>
                </div>

                <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px]">CAC Registration Number:</span>
                  <strong className="text-sm font-mono text-emerald-400">RC 7360949</strong>
                </div>

                <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px]">Incorporation Date:</span>
                  <strong className="text-sm font-mono">21 February 2024</strong>
                </div>

                <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 block text-[10px]">Corporate Bankers:</span>
                  <strong className="text-sm">Jaiz Bank PLC</strong>
                  <span className="block font-mono text-[11px] text-slate-400">Acc: 0017691758</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-[#132238] border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-sm">Regulatory Compliance Certifications:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded bg-black/20 border border-white/5">
                    <span className="font-bold text-emerald-400 block">FIRS</span>
                    <span className="text-[10px] text-slate-400">Tax Compliant</span>
                  </div>
                  <div className="p-2 rounded bg-black/20 border border-white/5">
                    <span className="font-bold text-cyan-400 block">SCUML</span>
                    <span className="text-[10px] text-slate-400">Anti-Money Laundering</span>
                  </div>
                  <div className="p-2 rounded bg-black/20 border border-white/5">
                    <span className="font-bold text-amber-400 block">SMEDAN</span>
                    <span className="text-[10px] text-slate-400">Accredited MSME</span>
                  </div>
                  <div className="p-2 rounded bg-black/20 border border-white/5">
                    <span className="font-bold text-teal-400 block">COREN</span>
                    <span className="text-[10px] text-slate-400">Engineering Benchmarks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`pt-4 border-t flex flex-wrap justify-between items-center gap-3 ${
              isDark ? 'border-slate-700' : 'border-slate-100'
            }`}>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/assets/aistudio/CERTIFICATE_-__FULDEJ_INTEGRATED_SERVICE_LTD___1___1___2__e5318264.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CERTIFICATE_OF_INCORPORATION__FULDEJ_INTEGRATED_SERVICE_LTD.pdf"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CAC Certificate (PDF)</span>
                </a>

                <a
                  href="/assets/docs/COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="COMPANY_PROFILE__FULDEJ_INTEGRATED.pdf"
                  className="px-4 py-2 rounded-lg bg-[#168A78] text-white text-xs font-bold hover:bg-[#127163] transition-colors flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Certified Profile (PDF)</span>
                </a>
              </div>

              <button
                onClick={() => setShowCacModal(false)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  isDark ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-[#142B4A] hover:bg-slate-200'
                }`}
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
