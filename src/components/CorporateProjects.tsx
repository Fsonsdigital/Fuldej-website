import React, { useState } from 'react';
import { CorporateProject, ServiceCategory } from '../types';
import { Code, Wrench, Sun, Briefcase, Truck, MapPin, Calendar, ArrowRight, Eye, X } from 'lucide-react';

interface CorporateProjectsProps {
  projects: CorporateProject[];
  onInquireAboutProject: (project: CorporateProject) => void;
  selectedDivisionFilter?: ServiceCategory;
}

export const CorporateProjects: React.FC<CorporateProjectsProps> = ({
  projects,
  onInquireAboutProject,
  selectedDivisionFilter = 'all'
}) => {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>(selectedDivisionFilter);
  const [selectedProject, setSelectedProject] = useState<CorporateProject | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filters: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'renewable', label: 'Renewable Energy' },
    { id: 'engineering', label: 'Engineering & Boreholes' },
    { id: 'technology', label: 'Technology & Software' },
    { id: 'procurement', label: 'Industrial Procurement' },
    { id: 'consultancy', label: 'Digital Consultancy' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.division === activeFilter);

  const getDivisionIcon = (div: string) => {
    switch (div) {
      case 'technology': return <Code className="w-3.5 h-3.5 text-cyan-400" />;
      case 'engineering': return <Wrench className="w-3.5 h-3.5 text-emerald-400" />;
      case 'renewable': return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case 'consultancy': return <Briefcase className="w-3.5 h-3.5 text-blue-400" />;
      case 'procurement': return <Truck className="w-3.5 h-3.5 text-purple-400" />;
      default: return <Wrench className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const getFallbackImage = (division: string) => {
    switch (division) {
      case 'renewable':
        return 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80';
      case 'engineering':
        return 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80';
      case 'technology':
        return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80';
      case 'procurement':
        return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80';
      default:
        return 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80';
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
              Proven Project Execution
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Case Studies & Contract Highlights
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Inspect verified commercial solar installations, deep motorized boreholes, mining evaluations, enterprise software, and procurement deliveries by Fuldej Integrated Service Ltd.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl">
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const hasError = failedImages[project.id];
            const currentImg = hasError ? getFallbackImage(project.division) : project.imageSrc;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-xl"
              >
                {/* Media frame */}
                <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-950">
                  <img
                    src={currentImg}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages(prev => ({ ...prev, [project.id]: true }))}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85" />

                  {/* Top Division Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white capitalize">
                    {getDivisionIcon(project.division)}
                    <span>{project.division}</span>
                  </div>

                  <div className="absolute top-4 right-4 text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    {project.year}
                  </div>

                  {/* Hover icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <span>{project.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-1.5 text-[11px] font-mono">
                    {project.keyMetrics.map((metric, i) => (
                      <div key={i} className="p-2 rounded bg-slate-950/60 border border-white/5 text-center">
                        <span className="text-slate-400 block text-[9px] uppercase truncate">{metric.label}</span>
                        <span className="text-cyan-300 font-bold truncate block">{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-cyan-400 font-medium">
                    <span>Inspect Project Brief</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Details */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
            <div className="w-full max-w-3xl bg-[#090D16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[21/9] w-full overflow-hidden relative shrink-0 bg-slate-950">
                <img
                  src={failedImages[selectedProject.id] ? getFallbackImage(selectedProject.division) : selectedProject.imageSrc}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-mono uppercase text-cyan-400 block mb-1">
                    {selectedProject.division} Division · Executed {selectedProject.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Location</span>
                    <span className="text-xs font-bold text-white">{selectedProject.location}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Executing Lead</span>
                    <span className="text-xs font-bold text-cyan-400">Fuldej Integrated Service Ltd</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Contract Period</span>
                    <span className="text-xs font-bold text-white">{selectedProject.year}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">
                    Scope of Execution & Deliverables
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedProject.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">
                    Verified Performance Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProject.keyMetrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900 border border-white/5 text-center">
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">{metric.label}</span>
                        <span className="text-base font-bold text-cyan-400 font-mono">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Reference Project Code: <span className="text-white font-bold">{selectedProject.id.toUpperCase()}</span>
                  </div>
                  <button
                    onClick={() => {
                      const p = selectedProject;
                      setSelectedProject(null);
                      onInquireAboutProject(p);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <span>Request Proposal for Similar Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
