import React, { useState } from 'react';
import { ServiceCategory, RfqInquiry } from '../types';
import { Send, CheckCircle, ArrowRight, ArrowLeft, Shield, Building, Mail, Phone, Calendar, Download } from 'lucide-react';
import { FULDEJ_CORPORATE_INFO } from '../data/mockData';

interface RfqSchedulerProps {
  currency: 'NGN' | 'USD';
  onRfqSubmitted: (rfq: RfqInquiry) => void;
  onOpenConsole: () => void;
  prefilledDivision?: Exclude<ServiceCategory, 'all'>;
  prefilledEstimate?: { title: string; costNgn: number; costUsd: number };
}

export const RfqScheduler: React.FC<RfqSchedulerProps> = ({
  currency,
  onRfqSubmitted,
  onOpenConsole,
  prefilledDivision = 'technology',
  prefilledEstimate
}) => {
  const [step, setStep] = useState<number>(1);
  const [division, setDivision] = useState<Exclude<ServiceCategory, 'all'>>(prefilledDivision);
  
  // Details
  const [timeline, setTimeline] = useState<string>('Standard 2 - 4 Weeks Turnaround');
  const [location, setLocation] = useState<string>('Kano State (Headquarters Corridor)');
  const [specificAddress, setSpecificAddress] = useState<string>('BUK Old Campus / Challawa / Client Facility');
  
  // Contact
  const [companyName, setCompanyName] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [projectScope, setProjectScope] = useState<string>('');

  const [submittedRfq, setSubmittedRfq] = useState<RfqInquiry | null>(null);

  const budgetNgn = prefilledEstimate?.costNgn || (division === 'renewable' ? 8500000 : division === 'engineering' ? 6200000 : 4500000);
  const budgetUsd = prefilledEstimate?.costUsd || Math.round(budgetNgn / 1450);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPerson || !email || !phone) return;

    const ref = `RFQ-FDJ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRfq: RfqInquiry = {
      id: `rfq-${Date.now()}`,
      referenceNumber: ref,
      companyName: companyName || 'Direct Corporate Client',
      contactPerson,
      email,
      phone,
      serviceDivision: division,
      projectScope: projectScope || `${division.toUpperCase()} turnkey corporate proposal request.`,
      deliveryTimeline: timeline,
      operatingLocation: `${location} — ${specificAddress}`,
      estimatedBudgetNgn: budgetNgn,
      estimatedBudgetUsd: budgetUsd,
      status: 'inquiry_received',
      createdAt: new Date().toISOString()
    };

    setSubmittedRfq(newRfq);
    onRfqSubmitted(newRfq);
  };

  const handleDownloadCalendar = () => {
    if (!submittedRfq) return;
    const dateStr = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/-/g, '');
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Fuldej Integrated Service Ltd//Corporate RFQ Consultation//EN
BEGIN:VEVENT
SUMMARY:Fuldej Technical Consultation - ${submittedRfq.referenceNumber}
DESCRIPTION:Company: ${submittedRfq.companyName}\\nContact: ${submittedRfq.contactPerson}\\nDivision: ${submittedRfq.serviceDivision}\\nLocation: ${submittedRfq.operatingLocation}
LOCATION:${submittedRfq.operatingLocation}
DTSTART:${dateStr}T100000Z
DTEND:${dateStr}T110000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${submittedRfq.referenceNumber}-consultation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="rfq" className="py-16 md:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
            Direct Commercial Engagement
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Request for Quotation (RFQ) & Technical Consultation
          </h2>
          <p className="text-sm text-slate-400">
            Submit your project parameters to receive a formal technical and financial proposal from Fuldej Integrated Service Ltd.
          </p>
        </div>

        {/* Success View */}
        {submittedRfq ? (
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                RFQ Submitted Successfully
              </span>
              <h3 className="text-2xl font-bold text-white">
                Official Ticket #{submittedRfq.referenceNumber}
              </h3>
              <p className="text-sm text-slate-300">
                Thank you, <strong className="text-white">{submittedRfq.contactPerson}</strong>. Your RFQ for <strong className="text-cyan-400 uppercase">{submittedRfq.serviceDivision}</strong> has been assigned to our senior management council.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">CLIENT / ENTERPRISE:</span>
                <span className="text-white font-sans">{submittedRfq.companyName} ({submittedRfq.contactPerson})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">DIVISION:</span>
                <span className="text-cyan-400 uppercase">{submittedRfq.serviceDivision}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">LOCATION:</span>
                <span className="text-white font-sans truncate max-w-[280px]">{submittedRfq.operatingLocation}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-slate-400">BUDGET ESTIMATE:</span>
                <span className="text-emerald-400 font-bold">
                  {currency === 'NGN' ? `₦${submittedRfq.estimatedBudgetNgn.toLocaleString()}` : `$${submittedRfq.estimatedBudgetUsd.toLocaleString()}`}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:info@fuldej.com.ng?subject=${encodeURIComponent(`[Official RFQ #${submittedRfq.referenceNumber}] ${submittedRfq.companyName} — ${submittedRfq.serviceDivision.toUpperCase()}`)}&body=${encodeURIComponent(`TO: Fuldej Integrated Service Ltd\nRECIPIENT INBOX: info@fuldej.com.ng\n\nRFQ TICKET NUMBER: #${submittedRfq.referenceNumber}\nCLIENT / COMPANY: ${submittedRfq.companyName}\nCONTACT PERSON: ${submittedRfq.contactPerson}\nEMAIL: ${submittedRfq.email}\nPHONE: ${submittedRfq.phone}\nDIVISION: ${submittedRfq.serviceDivision.toUpperCase()}\nLOCATION: ${submittedRfq.operatingLocation}\nESTIMATED BUDGET: NGN ${submittedRfq.estimatedBudgetNgn.toLocaleString()} ($${submittedRfq.estimatedBudgetUsd.toLocaleString()} USD)\n\nPROJECT SCOPE & PARAMETERS:\n${submittedRfq.projectScope}\n\n============================================================\nFuldej Integrated Service Ltd (info@fuldej.com.ng)`)}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email RFQ to info@fuldej.com.ng</span>
              </a>

              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save Consultation Ticket (.ics)</span>
              </button>

              <button
                onClick={onOpenConsole}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs"
              >
                Inspect in Operations Console
              </button>

              <button
                onClick={() => {
                  setSubmittedRfq(null);
                  setStep(1);
                }}
                className="w-full sm:w-auto px-4 py-2.5 text-xs text-slate-400 hover:text-white"
              >
                Submit Another RFQ
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step RFQ Wizard */
          <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl overflow-hidden">
            
            {/* Step header */}
            <div className="px-6 py-4 bg-slate-950/60 border-b border-white/10 flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-4 sm:gap-8">
                <button
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-2 ${step === 1 ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step === 1 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>1</span>
                  <span>Service Division</span>
                </button>

                <button
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-2 ${step === 2 ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step === 2 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>2</span>
                  <span>Location & Timeline</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className={`flex items-center gap-2 ${step === 3 ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step === 3 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>3</span>
                  <span>Corporate Credentials</span>
                </button>
              </div>

              <span className="hidden sm:inline font-mono text-cyan-400 text-xs">
                CAC RC 7360949 Portal
              </span>
            </div>

            {/* Form Steps */}
            <div className="p-6 sm:p-8">
              
              {/* STEP 1: Division Select */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Select Target Service Division</h3>
                    <p className="text-xs text-slate-400">Choose the division corresponding to your operational requirement.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'technology' as const, title: 'Technology and Software Solutions', desc: 'Custom enterprise software, databases, cloud server architecture & IT systems.' },
                      { id: 'engineering' as const, title: 'Engineering and Technical Services', desc: 'Civil construction, deep borehole drilling, mechatronics & mining exploration.' },
                      { id: 'renewable' as const, title: 'Renewable Energy and Smart Infrastructure', desc: 'Commercial solar PV micro-grids, lithium storage arrays & generator synchronization.' },
                      { id: 'consultancy' as const, title: 'Digital & Business Consultancy', desc: 'Bankable feasibility studies, statutory ESIA permits & corporate advisory.' },
                      { id: 'procurement' as const, title: 'Industrial Supply and Procurement', desc: 'High-specification machinery, drilling accessories, electrical switchgear & supply chain.' }
                    ].map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setDivision(s.id)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all ${
                          division === s.id
                            ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10'
                            : 'bg-slate-950/60 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <h4 className="text-sm font-bold text-white">{s.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-semibold text-xs flex items-center gap-2"
                    >
                      <span>Continue to Timeline & Location</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Timeline & Location */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Operating Location & Project Horizon</h3>
                    <p className="text-xs text-slate-400">Specify operational corridor across Nigeria and target delivery timeframe.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 p-5 rounded-xl bg-slate-950/60 border border-white/10">
                      <label className="block text-xs font-semibold text-slate-200">
                        Target Timeline & Urgency
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Urgent (1 - 2 Weeks Turnaround)">Urgent (1 - 2 Weeks Turnaround)</option>
                        <option value="Standard (2 - 4 Weeks Turnaround)">Standard (2 - 4 Weeks Turnaround)</option>
                        <option value="Quarterly Multi-Stage Deployment">Quarterly Multi-Stage Deployment</option>
                        <option value="Annual Retainer / Corporate Framework">Annual Retainer / Corporate Framework</option>
                      </select>
                    </div>

                    <div className="space-y-3 p-5 rounded-xl bg-slate-950/60 border border-white/10">
                      <label className="block text-xs font-semibold text-slate-200">
                        Operational Geographic Corridor
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Kano State (Headquarters Corridor)">Kano State (Headquarters Corridor)</option>
                        <option value="Kaduna / Zaria Industrial Axis">Kaduna / Zaria Industrial Axis</option>
                        <option value="Abuja FCT & North-Central">Abuja FCT & North-Central</option>
                        <option value="Zamfara / Katsina / Sokoto Mining Corridor">Zamfara / Katsina / Sokoto Mining Corridor</option>
                        <option value="Bauchi / Plateau / Gombe Axis">Bauchi / Plateau / Gombe Axis</option>
                        <option value="Lagos / Southern Regional Deployment">Lagos / Southern Regional Deployment</option>
                      </select>

                      <div className="pt-2">
                        <label className="block text-xs text-slate-400 mb-1">Site / Facility Address</label>
                        <input
                          type="text"
                          value={specificAddress}
                          onChange={(e) => setSpecificAddress(e.target.value)}
                          placeholder="e.g. Challawa Industrial Area, BUK Old Campus, or Company Premises"
                          className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-semibold text-xs flex items-center gap-2"
                    >
                      <span>Continue to Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Corporate Contact Details */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Client Enterprise Credentials</h3>
                    <p className="text-xs text-slate-400">Provide official contact details for formal tender transmission.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Alhaji Bashir / Dr. Amina"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Enterprise / Institution Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Northern Agro-Industrial Ltd"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Corporate Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@organization.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Direct Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 803 000 0000"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Detailed Project Scope & Terms of Reference (TOR)
                    </label>
                    <textarea
                      rows={3}
                      value={projectScope}
                      onChange={(e) => setProjectScope(e.target.value)}
                      placeholder="Specify required capacity, software stack, borehole depth, mineral assays, or procurement bill of quantities..."
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950/80 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Dispatch Official RFQ</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
