import React, { useState } from 'react';
import { 
  Maximize2, 
  ExternalLink, 
  ShieldCheck, 
  ChevronRight, 
  X, 
  Play, 
  Pause, 
  Zap, 
  Sun, 
  BatteryCharging, 
  Sliders, 
  Download, 
  ArrowRight,
  Sparkles,
  MapPin,
  Layers
} from 'lucide-react';

export interface MarqueeProject {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  specs: string[];
  capacity: string;
  status: string;
  description: string;
}

export const MARQUEE_PROJECTS: MarqueeProject[] = [
  {
    id: 'rooftop-string-array',
    title: 'High-Yield Commercial Monocrystalline Rooftop Array',
    category: 'Commercial Solar PV',
    location: 'Northern Nigeria Facility Corridor',
    image: 'assets/aistudio/IMG-20261022-WA0060_4d8aa0c3.jpg',
    capacity: 'Multi-kW Commercial String',
    status: 'Commissioned & Active',
    specs: [
      'High-Efficiency Monocrystalline PV Modules',
      'Corrosion-Resistant Industrial Strut Mounting',
      'Optimized Tilt Angle for Northern Nigerian Insolation',
      'Integrated DC Surge & Lightning Protection'
    ],
    description: 'Turnkey rooftop solar PV installation executed by Fuldej renewable engineers. Features rigid storm-resistant corrugated roof mounts, high-efficiency solar string arrays, and seamless DC conduit routing.'
  },
  {
    id: 'dual-roof-solar-farm',
    title: 'Dual-Array Commercial Facility Rooftop Solar Farm',
    category: 'Turnkey Micro-Grid Generation',
    location: 'Commercial Enterprise Hub, Nigeria',
    image: 'assets/aistudio/Solar_panel_f258c7fd.jpg',
    capacity: 'Heavy-Duty Enterprise Solar Array',
    status: '100% Operational',
    specs: [
      'Dual Pitch Rooftop PV Array Architecture',
      'Synchronized Multi-String Combiner Balance',
      'Commercial Energy Yield Maximization',
      'High-Durability Weatherproof Clamping'
    ],
    description: 'Large-scale commercial enterprise rooftop solar generation facility engineered by Fuldej Integrated Service Ltd. Powers critical manufacturing and cold-chain equipment with reliable clean solar energy.'
  },
  {
    id: 'hybrid-inverter-hub',
    title: 'Felicity Commercial Hybrid Inverter & 10-Tier Battery Hub',
    category: 'Power Electronics & Storage',
    location: 'Kano State Operational Installation',
    image: 'assets/aistudio/Solar_Controller_6fe46b4c.jpg',
    capacity: 'Commercial Hybrid Inverter + Server Rack',
    status: 'Calibrated & Certified',
    specs: [
      'Felicity Solar Commercial Hybrid Power Inverter',
      '10-Tier Vertical Server Rack Lithium Enclosure',
      'Pure Sine Wave AC Output with Seamless Grid Transfer',
      'High-Current Insulated DC Busbar Interconnects'
    ],
    description: 'Central commercial power conditioning station. Integrates a wall-mounted commercial hybrid solar inverter with an organized 10-tier vertical server rack housing high-capacity lithium iron phosphate (LiFePO4) storage batteries.'
  },
  {
    id: 'bms-lithium-rack',
    title: 'Smart BMS Lithium Battery Storage Rack Telemetry',
    category: 'Battery Energy Storage (BESS)',
    location: 'Kano Power & Battery Enclosure',
    image: 'assets/aistudio/IMG-20261022-WA0039_48c0c0cf.jpg',
    capacity: 'Multi-Tier LiFePO4 Smart Battery Rack',
    status: 'Live DC Storage Synchronized',
    specs: [
      'Digital State-of-Charge (SoC) LCD Telemetry',
      'Active Cell Voltage Balancing & Overload Protection',
      'Modular High-Density Lithium Storage Modules',
      'Heavy-Gauge Color-Coded DC Interconnect Harness'
    ],
    description: 'Detailed inspection of the rack-mounted Felicity Solar lithium storage system. Displays active digital BMS monitoring, individual module telemetry, and ruggedized power busbars calibrated on-site by Fuldej engineers.'
  }
];

interface ProjectMarqueeProps {
  isDark: boolean;
  onSelectProjectForInquiry?: (projectTitle: string) => void;
  onOpenVideoModal?: () => void;
}

export const ProjectMarquee: React.FC<ProjectMarqueeProps> = ({
  isDark,
  onSelectProjectForInquiry,
  onOpenVideoModal
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [selectedProject, setSelectedProject] = useState<MarqueeProject | null>(null);

  // Speed duration mapping
  const speedDuration = {
    slow: '48s',
    normal: '30s',
    fast: '18s'
  }[scrollSpeed];

  // Quadruple the list to guarantee seamless infinite looping across any screen resolution
  const loopingProjects = [
    ...MARQUEE_PROJECTS,
    ...MARQUEE_PROJECTS,
    ...MARQUEE_PROJECTS,
    ...MARQUEE_PROJECTS
  ];

  return (
    <section className={`py-12 sm:py-16 relative overflow-hidden border-y transition-colors duration-200 ${
      isDark ? 'bg-[#070D18] border-slate-800' : 'bg-slate-50 border-slate-200'
    }`}>
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className={`font-mono text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-emerald-400' : 'text-[#168A78]'
              }`}>
                Verified Engineering Installations · Field Gallery
              </span>
            </div>

            <h2 className={`font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-[#142B4A]'
            }`}>
              Turnkey Solar Micro-Grids & Lithium Storage in Action
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-[#5A6B82]'
            }`}>
              Explore authentic field installations commissioned across Nigeria by <strong className={isDark ? 'text-white' : 'text-[#142B4A]'}>Fuldej Integrated Service Ltd</strong>. Click any installation to inspect high-resolution parameters.
            </p>
          </div>

          {/* Interactive Marquee Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {/* Pause/Play Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
              }`}
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            {/* Direction Toggle */}
            <button
              onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
              }`}
              title="Reverse scroll direction"
            >
              <span>{direction === 'left' ? 'Move Left ←' : 'Move Right →'}</span>
            </button>

            {/* Speed Selector */}
            <div className={`flex items-center rounded-lg border p-0.5 text-xs font-mono ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              {(['slow', 'normal', 'fast'] as const).map(spd => (
                <button
                  key={spd}
                  onClick={() => setScrollSpeed(spd)}
                  className={`px-2 py-1 rounded text-[10px] font-semibold uppercase transition-colors ${
                    scrollSpeed === spd
                      ? 'bg-emerald-600 text-white'
                      : 'hover:text-emerald-400'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>

            {onOpenVideoModal && (
              <button
                onClick={onOpenVideoModal}
                className="px-3 py-1.5 rounded-lg bg-[#168A78] hover:bg-[#127163] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                title="Watch Live Commissioning Video"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Live Video</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Marquee Infinite Motion Viewport */}
      <div 
        className="relative w-full overflow-hidden group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft Vignette Edge Fades for Seamless Infinite Effect */}
        <div className={`absolute top-0 bottom-0 left-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r ${
          isDark ? 'from-[#070D18] to-transparent' : 'from-slate-50 to-transparent'
        }`} />
        <div className={`absolute top-0 bottom-0 right-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l ${
          isDark ? 'from-[#070D18] to-transparent' : 'from-slate-50 to-transparent'
        }`} />

        {/* The Continuous Infinite Marquee Track */}
        <div
          className={`flex gap-6 w-max ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
          style={{
            animationDuration: speedDuration,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {loopingProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              onClick={() => setSelectedProject(project)}
              className={`w-[290px] sm:w-[340px] md:w-[380px] shrink-0 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl group/card relative ${
                isDark 
                  ? 'bg-[#0E1A2C] border-slate-700/80 hover:border-emerald-500/60' 
                  : 'bg-white border-slate-200 hover:border-emerald-500/60 shadow-md'
              }`}
            >
              {/* Photo Container with 4:5 Aspect Ratio */}
              <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-108"
                  loading="lazy"
                />

                {/* Ambient Depth Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-[#060D17]/30 to-transparent opacity-85 group-hover/card:opacity-75 transition-opacity" />

                {/* Floating Category Badge Top Left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md bg-black/60 border border-white/20 text-emerald-300 shadow">
                    <Sun className="w-3 h-3 text-amber-400" />
                    <span>{project.category}</span>
                  </span>
                </div>

                {/* Quick Inspection Icon Top Right */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Bottom Card Content Inside the Photo */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 font-semibold">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-snug drop-shadow-sm line-clamp-2">
                    {project.title}
                  </h3>

                  <div className="pt-2 flex items-center justify-between border-t border-white/15 text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-current" />
                      <span>{project.status}</span>
                    </span>
                    <span className="text-slate-300 group-hover/card:text-white flex items-center gap-0.5 group-hover/card:translate-x-1 transition-all">
                      <span>Click to Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Specs Micro-Strip at Base */}
              <div className={`p-3.5 text-xs font-mono border-t transition-colors ${
                isDark ? 'bg-[#091322] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-700'
              }`}>
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[#168A78]" />
                  <span>Key Specification:</span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                  {project.specs[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Bottom Status Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>All installations engineered according to COREN standards · RC 7360949</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Tip: Hover over any photo to pause marquee and inspect field details.
        </div>
      </div>

      {/* --- High-Resolution Photo Lightbox Modal --- */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className={`w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border max-h-[92vh] flex flex-col ${
              isDark ? 'bg-[#0B1424] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-[#263445]'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 ${
              isDark ? 'border-slate-800 bg-[#070D18]' : 'border-slate-100 bg-slate-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                    {selectedProject.category} · Field Verification
                  </span>
                  <h3 className={`font-heading font-bold text-base sm:text-lg leading-tight ${
                    isDark ? 'text-white' : 'text-[#142B4A]'
                  }`}>
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isDark ? 'border-slate-700 text-slate-400 hover:text-white bg-slate-800' : 'border-slate-200 text-slate-500 hover:text-slate-900 bg-white'
                }`}
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Split Image + Specs */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Full-view Image */}
                <div className="md:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/5] sm:aspect-[4/4] flex items-center justify-center shadow-inner relative group">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 right-2">
                    <a
                      href={selectedProject.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-[10px] font-mono flex items-center gap-1.5 backdrop-blur-sm border border-white/20 transition-colors"
                      title="Open full size in new tab"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Full Resolution</span>
                    </a>
                  </div>
                </div>

                {/* Details & Specifications */}
                <div className="md:col-span-5 space-y-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Project Location:
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 font-mono">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedProject.location}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Field Status:
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {selectedProject.status}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Engineering Overview:
                    </span>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#5A6B82]'}`}>
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Technical Benchmarks:
                    </span>
                    <ul className="space-y-1.5 text-xs">
                      {selectedProject.specs.map((spc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Zap className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span className={isDark ? 'text-slate-200' : 'text-[#263445]'}>{spc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 ${
              isDark ? 'border-slate-800 bg-[#070D18]' : 'border-slate-100 bg-slate-50'
            }`}>
              <div className="flex items-center gap-2">
                <a
                  href={selectedProject.image}
                  download={`fuldej_${selectedProject.id}.jpg`}
                  className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Photo</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                {onSelectProjectForInquiry && (
                  <button
                    onClick={() => {
                      onSelectProjectForInquiry(selectedProject.title);
                      setSelectedProject(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#168A78] hover:bg-[#127163] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
                  >
                    <span>Request Proposal for this Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
