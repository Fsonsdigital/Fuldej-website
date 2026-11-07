import React, { useState, useRef } from 'react';
import { 
  Wrench, 
  Settings, 
  GraduationCap, 
  Factory, 
  CheckCircle2, 
  Play, 
  Pause, 
  Maximize2, 
  X, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  ArrowRight,
  HardHat,
  Gauge,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

interface MachineryInstallationSectionProps {
  isDark: boolean;
  onSelectServiceForInquiry?: (serviceTitle: string, initialScope?: string) => void;
}

export const MachineryInstallationSection: React.FC<MachineryInstallationSectionProps> = ({
  isDark,
  onSelectServiceForInquiry
}) => {
  // Video player state
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    title: string;
    category: string;
    description: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    {
      id: 'automated-spinning-line',
      title: 'Automated Textile & Spinning Machinery Operational Line',
      category: 'Turnkey Machine Installation',
      src: 'assets/aistudio/VID-20261029-WA0009_37cc9162.mp4',
      badge: 'Active Factory Floor',
      runtime: 'Live Operational Feed',
      description: 'Fuldej engineering team executes complete mechanical alignment, motorized drive integration, and automated bobbin doffing conveyor synchronization for high-volume manufacturing lines.'
    },
    {
      id: 'factory-ducting-machinery',
      title: 'Plant Floor Overhead Ventilation, Ducting & Machine Integration',
      category: 'Factory Plant Utilities',
      src: 'assets/aistudio/VID-20261029-WA0012_a9c42f5a.mp4',
      badge: 'Plant Infrastructure',
      runtime: 'Factory Floor Setup',
      description: 'Industrial manufacturing facility setup showing overhead climate ducting, heavy-duty air exhaust systems, industrial machine positioning, and trained operators on the active production floor.'
    }
  ];

  const photos = [
    {
      id: 'gear-maintenance',
      url: 'assets/aistudio/IMG-20261029-WA0005_1__6632858f.jpg',
      title: 'Industrial Transmission & Mechanical Drive Maintenance',
      category: 'Machinery Maintenance & Overhaul',
      badge: 'Mechanical Overhaul',
      description: 'Fuldej maintenance technician servicing internal drive sprockets, chain drives, motor couplings, and precision gear calibration on industrial plant equipment.'
    },
    {
      id: 'steel-warehouse',
      url: 'assets/aistudio/IMG-20261029-WA0004_9fc1e58f.jpg',
      title: 'Heavy Structural Steel Factory Warehouse Fabrication',
      category: 'Industrial Plant Framework',
      badge: 'Structural Civil',
      description: 'Engineered structural steel portal frame erection for a manufacturing facility. High-tensile steel rafters, reinforced concrete column footings, and machine plinths.'
    },
    {
      id: 'solar-rooftop-mounting',
      url: 'assets/aistudio/IMG-20261022-WA0053_bb9dd2e0.jpg',
      title: 'Industrial Rooftop Solar PV Power Integration',
      category: 'Clean Energy for Factories',
      badge: 'Solar Micro-Grid',
      description: 'High-density commercial solar array installed directly on industrial factory roofs, supplying continuous clean power for heavy processing machinery.'
    },
    {
      id: 'crew-training-mounting',
      url: 'assets/aistudio/IMG-20261022-WA0055_8b32e5dd.jpg',
      title: 'Hands-On Staff Training & Supervised Technical Installation',
      category: 'Workforce Capacity Building',
      badge: 'Staff Training',
      description: 'Fuldej engineers conducting on-site practical training for factory operators and apprentices on proper mounting, torque specifications, and electrical connection safety.'
    }
  ];

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleSwitchVideo = (index: number) => {
    setActiveVideoIndex(index);
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = videos[index].src;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  const handleOpenInquiry = (scope: string) => {
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry('Industrial Machinery Installation & Maintenance', scope);
    }
  };

  return (
    <section 
      id="machinery-installation"
      className={`py-16 md:py-24 border-t transition-colors relative overflow-hidden ${
        isDark ? 'bg-[#091222] border-slate-800' : 'bg-[#F4F7FA] border-slate-200'
      }`}
    >
      {/* Background Subtle Technical Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#168A78]/15 border border-[#168A78]/30 text-[#168A78] dark:text-cyan-400">
            <Factory className="w-3.5 h-3.5" />
            <span>Industrial Engineering & Technical Execution</span>
          </div>
          
          <h2 className={`font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-[#142B4A]'
          }`}>
            Industrial Machinery Installation, Plant Maintenance & Staff Training
          </h2>
          
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-[#5A6B82]'
          }`}>
            Fuldej Integrated Service Ltd delivers turnkey installation of manufacturing machinery, heavy factory equipment, mechanical transmission drives, and factory ventilation utilities. We provide routine and emergency maintenance alongside comprehensive, hands-on operator staff training to guarantee non-stop industrial productivity.
          </p>
        </div>

        {/* 4 Core Machinery Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Factory,
              title: 'Turnkey Machine Installation',
              subtitle: 'For Manufacturers & Industrial Plants',
              desc: 'Complete factory equipment positioning, vibration-damped foundation anchor bolts, 415V three-phase wiring, pneumatics, and precision laser alignment.',
              deliverables: ['Machinery Foundation & Plinths', 'Laser Drive & Shaft Alignment', '415V Three-Phase Power Cabling', 'Full Dry & Wet Test Commissioning']
            },
            {
              icon: Wrench,
              title: 'Preventive & Corrective Maintenance',
              subtitle: 'Zero Unscheduled Production Downtime',
              desc: 'Scheduled diagnostic overhauls, gearbox servicing, bearing replacements, drive chain/belt tensioning, and 24/7 rapid breakdown response teams.',
              deliverables: ['Scheduled Lubrication Audits', 'Vibration & Thermal Diagnostics', 'Mechanical Drive & Motor Servicing', 'Original OEM Replacement Spares']
            },
            {
              icon: GraduationCap,
              title: 'Hands-On Staff & Operator Training',
              subtitle: 'Workforce Operational Empowerment',
              desc: 'Practical, on-site capacity training for factory floor workers, equipment operators, and client maintenance teams to operate and safeguard machines.',
              deliverables: ['Daily Pre-Start Checklist SOPs', 'Safe Emergency Stop Procedures', 'Routine Maintenance Protocols', 'Basic Electrical/Mechanical Triage']
            },
            {
              icon: Settings,
              title: 'Plant Utilities & Steel Structures',
              subtitle: 'Factory Facilities & Climate Systems',
              desc: 'Fabrication of heavy structural steel portal warehouses, overhead air ducting, dust collection hoods, industrial water reticulation, and backup solar micro-grids.',
              deliverables: ['Heavy Steel Portal Frame Erection', 'Overhead Ventilation & Ductwork', 'Industrial Water Borehole Supply', 'Factory Solar Hybrid Integration']
            }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`border rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl group ${
                  isDark 
                    ? 'bg-[#121E33] border-slate-700/80 hover:border-cyan-500/50 hover:shadow-cyan-950/30' 
                    : 'bg-white border-slate-200 hover:border-[#168A78]/50 hover:shadow-slate-300/40'
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20' 
                      : 'bg-[#168A78]/10 text-[#168A78] group-hover:bg-[#168A78]/20'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {pillar.subtitle}
                    </span>
                    <h3 className={`font-heading font-bold text-lg leading-snug mt-1 ${
                      isDark ? 'text-white' : 'text-[#142B4A]'
                    }`}>
                      {pillar.title}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-[#5A6B82]'
                  }`}>
                    {pillar.desc}
                  </p>

                  <div className={`pt-3 border-t space-y-1.5 ${isDark ? 'border-slate-700/70' : 'border-slate-100'}`}>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                      isDark ? 'text-cyan-400' : 'text-[#168A78]'
                    }`}>
                      Scope of Execution
                    </span>
                    {pillar.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenInquiry(pillar.title)}
                  className={`mt-5 pt-3 border-t w-full text-xs font-bold flex items-center justify-between group-hover:translate-x-0.5 transition-all ${
                    isDark ? 'border-slate-700 text-cyan-400 hover:text-cyan-300' : 'border-slate-100 text-[#168A78] hover:text-[#127163]'
                  }`}
                >
                  <span>Request Factory Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Video & Machinery Footage Showcase */}
        <div className={`border rounded-2xl overflow-hidden shadow-xl ${
          isDark ? 'bg-[#0E1A2C] border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-emerald-500 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Factory Machinery Footage</span>
              </div>
              <h3 className={`font-heading font-bold text-xl sm:text-2xl ${
                isDark ? 'text-white' : 'text-[#142B4A]'
              }`}>
                Live Equipment Assembly & Factory Operations
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                Authentic field footage showing manufacturing machinery in continuous production, automated spooling lines, and overhead plant ductwork.
              </p>
            </div>

            {/* Video Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {videos.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => handleSwitchVideo(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeVideoIndex === idx
                      ? 'bg-[#168A78] text-white shadow-md'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Play className={`w-3 h-3 ${activeVideoIndex === idx ? 'fill-current' : ''}`} />
                  <span>Feed {idx + 1}: {vid.category}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Video Player Display (Strictly Muted, Professional Loop) */}
            <div className="lg:col-span-8 bg-black relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-hidden group">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full max-h-[560px] object-contain"
                src={videos[activeVideoIndex].src}
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold">
                  {videos[activeVideoIndex].badge}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/80 backdrop-blur-md text-white font-mono text-[10px] font-semibold">
                  Muted Studio Mode
                </span>
              </div>

              {/* Minimal Clean Video Controls (Play/Pause only - No audio gimmick) */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {isVideoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Video Context & Technical Scope */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {videos[activeVideoIndex].runtime}
                </span>

                <h4 className={`font-heading font-bold text-lg leading-snug ${
                  isDark ? 'text-white' : 'text-[#142B4A]'
                }`}>
                  {videos[activeVideoIndex].title}
                </h4>

                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-[#5A6B82]'
                }`}>
                  {videos[activeVideoIndex].description}
                </p>

                <div className={`pt-4 border-t space-y-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${
                    isDark ? 'text-cyan-400' : 'text-[#168A78]'
                  }`}>
                    Engineering Highlights
                  </span>
                  <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5" />
                      <span>Precision mechanical gear assembly & motorized drives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5" />
                      <span>Overhead air extraction ducting & ventilation safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5" />
                      <span>On-site operator SOP and breakdown prevention training</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80">
                <button
                  onClick={() => handleOpenInquiry(videos[activeVideoIndex].title)}
                  className="w-full py-3 rounded-xl bg-[#168A78] hover:bg-[#127163] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Inquire Machine Installation for Your Plant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Image Inspection Gallery */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className={`font-mono text-xs font-bold uppercase ${
                isDark ? 'text-cyan-400' : 'text-[#168A78]'
              }`}>
                Photographic Field Evidence
              </span>
              <h3 className={`font-heading font-bold text-2xl ${
                isDark ? 'text-white' : 'text-[#142B4A]'
              }`}>
                Machinery Maintenance, Steel Warehouses & Workforce Training
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Click any photo frame to inspect high-resolution engineering specifications
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className={`border rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isDark ? 'bg-[#121E33] border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                {/* Photo Frame Container */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold">
                      {item.badge}
                    </span>
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Photo Description Card */}
                <div className="p-4 space-y-2">
                  <span className={`text-[10px] font-mono font-bold uppercase block ${
                    isDark ? 'text-cyan-400' : 'text-[#168A78]'
                  }`}>
                    {item.category}
                  </span>
                  <h4 className={`font-heading font-bold text-sm leading-snug line-clamp-2 ${
                    isDark ? 'text-white' : 'text-[#142B4A]'
                  }`}>
                    {item.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${
                    isDark ? 'text-slate-300' : 'text-[#5A6B82]'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action for Factory Owners */}
        <div className={`border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark ? 'bg-[#132238] border-slate-700' : 'bg-[#142B4A] text-white border-transparent'
        }`}>
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
              Contractor of Choice for Industrial Plants & Manufacturers
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Planning to Install New Factory Machines or Train Operating Staff?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Contact our engineering directorate for turnkey mechanical rigging, electrical cabling, alignment, preventative service agreements, and certified operator training courses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenInquiry('Full Factory Machine Installation & Staff Training')}
              className="px-6 py-3.5 rounded-xl bg-[#168A78] hover:bg-[#127163] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 active:scale-95"
            >
              Book Technical Site Inspection
            </button>
          </div>
        </div>

      </div>

      {/* High-Resolution Photo Inspection Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-[#0B1424] text-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase font-bold">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="px-4 sm:px-6">
              <div className="rounded-xl overflow-hidden bg-black aspect-video sm:aspect-[16/10] border border-white/10 flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Modal Details */}
            <div className="p-4 sm:p-6 space-y-3 text-xs">
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {selectedPhoto.description}
              </p>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
                Executed under strict COREN civil and mechanical safety standards by the Fuldej Integrated Service Ltd engineering team.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  handleOpenInquiry(selectedPhoto.title);
                }}
                className="px-4 py-2.5 rounded-lg bg-[#168A78] hover:bg-[#127163] text-white text-xs font-bold transition-colors"
              >
                Inquire Similar Plant Execution
              </button>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
