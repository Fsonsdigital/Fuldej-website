import React, { useState } from 'react';
import { ServiceCategory } from '../types';
import { Calculator, Download, Check, ShieldCheck, Code, Wrench, Sun, Briefcase, Truck, ArrowRight } from 'lucide-react';
import { FULDEJ_CORPORATE_INFO } from '../data/mockData';

interface ServiceQuoteEstimatorProps {
  currency: 'NGN' | 'USD';
  setCurrency: (c: 'NGN' | 'USD') => void;
  onProceedToRfq: (division: Exclude<ServiceCategory, 'all'>, details: { title: string; costNgn: number; costUsd: number }) => void;
  initialDivision?: Exclude<ServiceCategory, 'all'>;
}

export const ServiceQuoteEstimator: React.FC<ServiceQuoteEstimatorProps> = ({
  currency,
  setCurrency,
  onProceedToRfq,
  initialDivision = 'renewable'
}) => {
  const [selectedDivision, setSelectedDivision] = useState<Exclude<ServiceCategory, 'all'>>(initialDivision);

  // Renewable params
  const [solarKva, setSolarKva] = useState<number>(30);
  const [includeLithium, setIncludeLithium] = useState<boolean>(true);
  const [includeGeneratorSync, setIncludeGeneratorSync] = useState<boolean>(true);

  // Engineering & Borehole params
  const [boreholeMeters, setBoreholeMeters] = useState<number>(160);
  const [tankLiters, setTankLiters] = useState<number>(20000);
  const [includeGeophysicalSurvey, setIncludeGeophysicalSurvey] = useState<boolean>(true);

  // Technology params
  const [userSeats, setUserSeats] = useState<number>(50);
  const [includeCloudServer, setIncludeCloudServer] = useState<boolean>(true);
  const [includeMobileApp, setIncludeMobileApp] = useState<boolean>(true);

  // Consultancy params
  const [concessionHectares, setConcessionHectares] = useState<number>(1200);
  const [includeEsia, setIncludeEsia] = useState<boolean>(true);

  // Procurement params
  const [equipmentUnits, setEquipmentUnits] = useState<number>(10);
  const [includeFreightDelivery, setIncludeFreightDelivery] = useState<boolean>(true);

  const [downloaded, setDownloaded] = useState<boolean>(false);

  // Calculation Math
  let subtotalNgn = 0;
  let breakdown: { item: string; costNgn: number }[] = [];

  if (selectedDivision === 'renewable') {
    const baseSolar = solarKva * 210000;
    breakdown.push({ item: `${solarKva}kVA Commercial Tier-1 Monocrystalline Solar PV Array & Inverter`, costNgn: baseSolar });
    if (includeLithium) {
      breakdown.push({ item: `High-Cycle Lithium LiFePO4 Storage Rack (${Math.round(solarKva * 1.8)} kWh Capacity)`, costNgn: solarKva * 170000 });
    }
    if (includeGeneratorSync) {
      breakdown.push({ item: 'Automatic Generator Busbar Synchronization (ATS) & Surge Suppression', costNgn: 450000 });
    }
    breakdown.push({ item: 'Electrical Isolators, Earthing Protection Array & Cloud Telemetry IoT', costNgn: 350000 });
  } else if (selectedDivision === 'engineering') {
    const drilling = boreholeMeters * 16500;
    breakdown.push({ item: `Deep Rotary/DTH Aquifer Drilling (${boreholeMeters} Meters) + Casing & Gravel Pack`, costNgn: drilling });
    breakdown.push({ item: 'High-Head Solar Submersible Pump with MPPT Controller & Dedicated Panels', costNgn: 1300000 });
    const tankCost = (tankLiters / 10000) * 850000;
    breakdown.push({ item: `${tankLiters.toLocaleString()}L Elevated Galvanized Steel Water Tower & Heavy Tanks`, costNgn: tankCost });
    if (includeGeophysicalSurvey) {
      breakdown.push({ item: 'Geophysical Electronic Resistivity (VES) Groundwater Exploration Survey', costNgn: 300000 });
    }
  } else if (selectedDivision === 'technology') {
    const softwareCore = 2500000 + (userSeats * 25000);
    breakdown.push({ item: `Custom Enterprise Application & Database Architecture (${userSeats} Active Users)`, costNgn: softwareCore });
    if (includeCloudServer) {
      breakdown.push({ item: 'Dedicated Secure Cloud Server Setup, SSL, Database Backups & SLA Maintenance', costNgn: 950000 });
    }
    if (includeMobileApp) {
      breakdown.push({ item: 'Integrated Mobile Field Worker / Telemetry Application (Android & iOS)', costNgn: 1500000 });
    }
  } else if (selectedDivision === 'consultancy') {
    const feasibility = 2000000 + (concessionHectares * 650);
    breakdown.push({ item: `Bankable Feasibility Study & Concession Delineation (${concessionHectares.toLocaleString()} Hectares)`, costNgn: feasibility });
    if (includeEsia) {
      breakdown.push({ item: 'Environmental & Social Impact Assessment (ESIA) & Statutory Ministry Filing', costNgn: 1800000 });
    }
    breakdown.push({ item: 'Corporate Compliance Review, SCUML / Regulatory Documentation & Project Audit', costNgn: 750000 });
  } else {
    // Procurement
    const equipmentBase = equipmentUnits * 650000;
    breakdown.push({ item: `Consolidated High-Specification Machinery / Equipment Package (${equipmentUnits} Units)`, costNgn: equipmentBase });
    if (includeFreightDelivery) {
      breakdown.push({ item: 'Direct Transport Logistics, On-Site Offloading & QA Inspection Guarantee', costNgn: 450000 });
    }
    breakdown.push({ item: 'OEM Manufacturer Warranty Validation & Spare Parts Maintenance Kit', costNgn: 350000 });
  }

  subtotalNgn = breakdown.reduce((sum, b) => sum + b.costNgn, 0);
  const vatNgn = Math.round(subtotalNgn * 0.075);
  const totalNgn = subtotalNgn + vatNgn;

  const exchangeRate = 1450;
  const totalUsd = Math.round(totalNgn / exchangeRate);

  const formatCurrency = (valNgn: number) => {
    if (currency === 'NGN') {
      return `₦${valNgn.toLocaleString('en-NG')}`;
    }
    const valUsd = Math.round(valNgn / exchangeRate);
    return `$${valUsd.toLocaleString('en-US')}`;
  };

  const handleDownloadProposal = () => {
    const quoteRef = `TENDER-FDJ-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const proposalText = `========================================================================
FULDEJ INTEGRATED SERVICE LTD
Corporate Affairs Commission (CAC) Registration: ${FULDEJ_CORPORATE_INFO.cacNumber}
Head Office: ${FULDEJ_CORPORATE_INFO.address}
Email: ${FULDEJ_CORPORATE_INFO.email} | Phone: ${FULDEJ_CORPORATE_INFO.phone1}
========================================================================

PRELIMINARY CORPORATE TENDER & ESTIMATE
Tender Reference: ${quoteRef}
Division: ${selectedDivision.toUpperCase()}
Date Generated: ${dateStr}
Currency Mode: ${currency}

ITEMIZED BILL OF QUANTITIES (BOQ):
------------------------------------------------------------------------
${breakdown.map((item, idx) => `${idx + 1}. ${item.item}
   Estimated Amount: ${formatCurrency(item.costNgn)}`).join('\n\n')}

------------------------------------------------------------------------
Subtotal:                                ${formatCurrency(subtotalNgn)}
FIRS Statutory VAT (7.5%):               ${formatCurrency(vatNgn)}
ESTIMATED TOTAL INVESTMENT:              ${formatCurrency(totalNgn)}
------------------------------------------------------------------------

TERMS & LEGAL COMPLIANCE:
- Formulated under CAC RC 7360949 and relevant statutory standards.
- 20+ Years combined multidisciplinary industry experience.
- Official Banker: ${FULDEJ_CORPORATE_INFO.bankers}
- Legal Advisor: ${FULDEJ_CORPORATE_INFO.legalAdvisor}

Fuldej Integrated Service Ltd — Building Sustainable Solutions.
========================================================================`;

    const blob = new Blob([proposalText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${quoteRef}-fuldej-tender.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
              Transparent Commercial Budgeting
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Interactive RFQ & Cost Estimator
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Model budgets for Technology Software, Engineering & Boreholes, Solar Micro-Grids, Business Consultancy, and Industrial Procurement.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Currency:</span>
            <div className="flex items-center p-1 bg-slate-900 border border-white/10 rounded-xl text-xs font-mono">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currency === 'NGN' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                NGN (₦)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currency === 'USD' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>

        {/* 5-Division Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {[
            { id: 'renewable' as const, label: 'Solar & Renewable', icon: Sun },
            { id: 'engineering' as const, label: 'Engineering & Boreholes', icon: Wrench },
            { id: 'technology' as const, label: 'Technology & Software', icon: Code },
            { id: 'consultancy' as const, label: 'Digital Consultancy', icon: Briefcase },
            { id: 'procurement' as const, label: 'Industrial Supply', icon: Truck }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedDivision === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedDivision(item.id)}
                className={`p-3.5 rounded-xl border transition-all text-left flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="text-xs font-bold truncate block">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sliders & Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* RENEWABLE CONTROLS */}
            {selectedDivision === 'renewable' && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Solar Micro-Grid Specifications</h4>
                  <p className="text-xs text-slate-400">Configure PV capacity, lithium storage racks, and generator integration.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">PV System Capacity:</span>
                    <span className="text-cyan-400 font-bold text-sm">{solarKva} kVA Array</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="10"
                    value={solarKva}
                    onChange={(e) => setSolarKva(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>10 kVA (Commercial Office)</span>
                    <span>50 kVA (Agro-Processing)</span>
                    <span>150 kVA (Industrial Factory)</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label
                    onClick={() => setIncludeLithium(!includeLithium)}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={includeLithium}
                      onChange={() => {}}
                      className="mt-1 accent-cyan-400"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white">High-Cycle LiFePO4 Lithium Battery Storage</span>
                      <p className="text-[11px] text-slate-400">Long-life 6,000 cycle lithium storage with smart telemetry BMS.</p>
                    </div>
                  </label>

                  <label
                    onClick={() => setIncludeGeneratorSync(!includeGeneratorSync)}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={includeGeneratorSync}
                      onChange={() => {}}
                      className="mt-1 accent-cyan-400"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white">Automatic Generator Busbar Synchronization & ATS</span>
                      <p className="text-[11px] text-slate-400">Coordinates diesel generators with solar inverters for continuous power.</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* ENGINEERING & BOREHOLE CONTROLS */}
            {selectedDivision === 'engineering' && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Deep Borehole & Civil Infrastructure Parameters</h4>
                  <p className="text-xs text-slate-400">Aquifer target depth, elevated galvanized steel reservoir, and geophysics.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">Drilling Target Depth:</span>
                    <span className="text-cyan-400 font-bold text-sm">{boreholeMeters} Meters (Deep Aquifer)</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="250"
                    step="10"
                    value={boreholeMeters}
                    onChange={(e) => setBoreholeMeters(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">Overhead Steel Tank Capacity:</span>
                    <span className="text-cyan-400 font-bold text-sm">{tankLiters.toLocaleString()} Liters</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="5000"
                    value={tankLiters}
                    onChange={(e) => setTankLiters(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <label
                  onClick={() => setIncludeGeophysicalSurvey(!includeGeophysicalSurvey)}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={includeGeophysicalSurvey}
                    onChange={() => {}}
                    className="mt-1 accent-cyan-400"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white">Include Geophysical Resistivity Survey (VES)</span>
                    <p className="text-[11px] text-slate-400">Electronic subterranean water mapping ensuring high discharge yield.</p>
                  </div>
                </label>
              </div>
            )}

            {/* TECHNOLOGY CONTROLS */}
            {selectedDivision === 'technology' && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Enterprise Software & ICT Architecture</h4>
                  <p className="text-xs text-slate-400">Software scale, database architecture, and mobile worker apps.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">Active User Scale:</span>
                    <span className="text-cyan-400 font-bold text-sm">{userSeats} Users</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="10"
                    value={userSeats}
                    onChange={(e) => setUserSeats(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setIncludeCloudServer(!includeCloudServer)}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={includeCloudServer}
                      onChange={() => {}}
                      className="mt-1 accent-cyan-400"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white">Enterprise Cloud Server & Database Telemetry</span>
                      <p className="text-[11px] text-slate-400">High-availability hosting, automated disaster recovery, and DBA monitoring.</p>
                    </div>
                  </label>

                  <label
                    onClick={() => setIncludeMobileApp(!includeMobileApp)}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={includeMobileApp}
                      onChange={() => {}}
                      className="mt-1 accent-cyan-400"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white">Field Mobile Telemetry Application</span>
                      <p className="text-[11px] text-slate-400">Companion mobile tool for on-site operations and dispatch sync.</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* CONSULTANCY CONTROLS */}
            {selectedDivision === 'consultancy' && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Digital Business & Concession Advisory</h4>
                  <p className="text-xs text-slate-400">Commercial feasibility studies, ESIA reports, and regulatory compliance.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">Concession / Project Land Scale:</span>
                    <span className="text-cyan-400 font-bold text-sm">{concessionHectares.toLocaleString()} Hectares</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="200"
                    value={concessionHectares}
                    onChange={(e) => setConcessionHectares(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <label
                  onClick={() => setIncludeEsia(!includeEsia)}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={includeEsia}
                    onChange={() => {}}
                    className="mt-1 accent-cyan-400"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white">Statutory Environmental & Social Impact Assessment (ESIA)</span>
                    <p className="text-[11px] text-slate-400">Required statutory approvals from Federal Ministries and Cadastre Office.</p>
                  </div>
                </label>
              </div>
            )}

            {/* PROCUREMENT CONTROLS */}
            {selectedDivision === 'procurement' && (
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Industrial Supply & Equipment Scope</h4>
                  <p className="text-xs text-slate-400">Procure genuine machinery, pumps, switchgear, and enterprise equipment.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300">Procurement Volume / Key Units:</span>
                    <span className="text-cyan-400 font-bold text-sm">{equipmentUnits} Units / Sub-Assemblies</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    step="2"
                    value={equipmentUnits}
                    onChange={(e) => setEquipmentUnits(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <label
                  onClick={() => setIncludeFreightDelivery(!includeFreightDelivery)}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={includeFreightDelivery}
                    onChange={() => {}}
                    className="mt-1 accent-cyan-400"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white">Full On-Site Freight Delivery & Rigging</span>
                    <p className="text-[11px] text-slate-400">Direct delivery to facility with quality inspection handover.</p>
                  </div>
                </label>
              </div>
            )}

          </div>

          {/* Right Column: Formal Tender Preview */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-2xl bg-gradient-to-b from-[#090D16] to-[#0D1424] border border-white/10 shadow-2xl p-6 sm:p-7 space-y-6">
              
              <div className="border-b border-white/10 pb-4 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-cyan-400 font-bold uppercase">{selectedDivision} ESTIMATE</span>
                  <span>{FULDEJ_CORPORATE_INFO.cacNumber}</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Fuldej Commercial Tender
                </h3>
                <p className="text-xs text-slate-400">
                  Bill of Quantities based on Nigerian statutory benchmarks.
                </p>
              </div>

              {/* Itemized Lines */}
              <div className="space-y-3 text-xs font-mono">
                {breakdown.map((item, i) => (
                  <div key={i} className="flex justify-between items-start gap-3 text-slate-300">
                    <span className="text-[11px] leading-tight flex-1">{item.item}</span>
                    <span className="text-white font-medium shrink-0">{formatCurrency(item.costNgn)}</span>
                  </div>
                ))}

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-slate-300">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium">{formatCurrency(subtotalNgn)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-400 text-[11px]">
                  <span>FIRS Statutory VAT (7.5%):</span>
                  <span>{formatCurrency(vatNgn)}</span>
                </div>

                <div className="pt-3 border-t-2 border-white/15 flex justify-between items-center text-base sm:text-lg font-bold">
                  <span className="text-white">Estimated Investment:</span>
                  <span className="text-cyan-400 font-mono">{formatCurrency(totalNgn)}</span>
                </div>
              </div>

              {/* Corporate Compliance Note */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 text-[11px] text-slate-300 space-y-1 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CAC RC 7360949 · SCUML Certified</span>
                </div>
                <div className="text-slate-400 text-[10px]">
                  Bankers: {FULDEJ_CORPORATE_INFO.bankers}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={() => onProceedToRfq(selectedDivision, {
                    title: `${selectedDivision.toUpperCase()} Proposal`,
                    costNgn: totalNgn,
                    costUsd: totalUsd
                  })}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition-colors"
                >
                  <span>Submit as Formal Project RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDownloadProposal}
                  className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs flex items-center justify-center gap-2 transition-colors font-sans"
                >
                  {downloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-slate-400" />}
                  <span>{downloaded ? 'Tender Document Downloaded' : 'Download Formal Tender Document (.txt)'}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
