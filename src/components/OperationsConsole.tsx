import React, { useState } from 'react';
import { RfqInquiry, RfqStatus } from '../types';
import { FolderKanban, CheckCircle, Clock, Calendar, MapPin, Plus, DollarSign, Send, ArrowRight } from 'lucide-react';

interface OperationsConsoleProps {
  rfqs: RfqInquiry[];
  onUpdateStatus: (id: string, newStatus: RfqStatus) => void;
  currency: 'NGN' | 'USD';
  onNewRfq: () => void;
}

export const OperationsConsole: React.FC<OperationsConsoleProps> = ({
  rfqs,
  onUpdateStatus,
  currency,
  onNewRfq
}) => {
  const [filter, setFilter] = useState<'all' | RfqStatus>('all');
  const [selectedRfq, setSelectedRfq] = useState<RfqInquiry | null>(null);

  const filtered = filter === 'all'
    ? rfqs
    : rfqs.filter(r => r.status === filter);

  const formatCurrency = (valNgn: number) => {
    if (currency === 'NGN') {
      return `₦${valNgn.toLocaleString('en-NG')}`;
    }
    const valUsd = Math.round(valNgn / 1450);
    return `$${valUsd.toLocaleString('en-US')}`;
  };

  const getStatusBadge = (status: RfqStatus) => {
    switch (status) {
      case 'contract_awarded':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'proposal_issued':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
      case 'technical_review':
        return 'text-blue-400 bg-blue-950/60 border-blue-500/40';
      case 'inquiry_received':
      default:
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
    }
  };

  const totalValue = rfqs.reduce(
    (sum, r) => sum + (currency === 'NGN' ? r.estimatedBudgetNgn : r.estimatedBudgetUsd),
    0
  );

  return (
    <section id="console" className="py-16 md:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
              Operations & Tender Dispatch
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Corporate RFQ & Tender Dispatch Console
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Internal workflow management for Fuldej directors: track commercial inquiries across Technology, Engineering, Renewable Energy, Consultancy, and Supply.
            </p>
          </div>

          <button
            onClick={onNewRfq}
            className="px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New RFQ Ticket</span>
          </button>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 block">TOTAL ACTIVE RFQS</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">{rfqs.length}</span>
            <span className="text-[10px] text-slate-500 block">All recorded submissions</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-blue-400 block">UNDER TECHNICAL REVIEW</span>
            <span className="text-2xl font-bold font-mono text-blue-400 tabular-nums">
              {rfqs.filter(r => r.status === 'technical_review').length}
            </span>
            <span className="text-[10px] text-slate-500 block">BOQ calculation active</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-cyan-400 block">PROPOSALS ISSUED</span>
            <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
              {rfqs.filter(r => r.status === 'proposal_issued').length}
            </span>
            <span className="text-[10px] text-slate-500 block">Transmitted to clients</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-emerald-400 block">ESTIMATED PIPELINE</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
              {formatCurrency(totalValue)}
            </span>
            <span className="text-[10px] text-slate-500 block">Gross commercial value</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl text-xs font-mono">
            {(['all', 'inquiry_received', 'technical_review', 'proposal_issued', 'contract_awarded'] as const).map((s) => {
              const count = s === 'all' ? rfqs.length : rfqs.filter(r => r.status === s).length;
              const isActive = filter === s;
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 rounded-lg transition-colors capitalize ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s.replace(/_/g, ' ')} ({count})
                </button>
              );
            })}
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Click status pills on any card to update commercial stage.
          </span>
        </div>

        {/* List of RFQs */}
        <div className="space-y-4">
          {filtered.map((r) => {
            return (
              <div
                key={r.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-white/20 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      #{r.referenceNumber}
                    </span>
                    <span className="text-slate-600 font-mono">·</span>
                    <span className="text-xs text-slate-300 font-semibold uppercase">{r.serviceDivision}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <div>
                      Client: <strong className="text-white">{r.companyName}</strong> ({r.contactPerson})
                    </div>
                    <span className="text-slate-600">·</span>
                    <div className="text-slate-400 font-mono">
                      Timeline: <strong className="text-slate-200">{r.deliveryTimeline}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate max-w-xl">{r.operatingLocation}</span>
                  </div>

                  {r.projectScope && (
                    <p className="text-[11px] text-slate-400 italic line-clamp-1 pt-1">
                      "{r.projectScope}"
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 shrink-0 lg:border-l lg:border-white/10 lg:pl-6">
                  <div className="text-left lg:text-right font-mono">
                    <span className="text-[10px] text-slate-500 block">ESTIMATED INVESTMENT</span>
                    <span className="text-base font-bold text-white tabular-nums">{formatCurrency(r.estimatedBudgetNgn)}</span>
                  </div>

                  {/* Status buttons */}
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="text-[10px] text-slate-500 font-mono">STATUS STAGE:</span>
                    <div className="flex items-center gap-1">
                      {(['inquiry_received', 'technical_review', 'proposal_issued', 'contract_awarded'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => onUpdateStatus(r.id, s)}
                          className={`px-2 py-1 rounded text-[10px] font-mono transition-colors uppercase ${
                            r.status === s
                              ? getStatusBadge(s) + ' font-bold border'
                              : 'text-slate-500 hover:text-slate-300 bg-white/5'
                          }`}
                        >
                          {s === 'inquiry_received' ? 'Inquiry' : s === 'technical_review' ? 'Review' : s === 'proposal_issued' ? 'Issued' : 'Awarded'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRfq(r)}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Details */}
        {selectedRfq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 p-6 sm:p-7 space-y-5 shadow-2xl">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase">
                    Official RFQ File #{selectedRfq.referenceNumber}
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase">{selectedRfq.serviceDivision} Proposal</h3>
                </div>
                <button
                  onClick={() => setSelectedRfq(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ENTERPRISE:</span>
                    <span className="text-white font-sans">{selectedRfq.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">FOCAL CONTACT:</span>
                    <span className="text-white font-sans">{selectedRfq.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">EMAIL:</span>
                    <span className="text-cyan-400">{selectedRfq.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">PHONE:</span>
                    <span className="text-white">{selectedRfq.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">LOCATION:</span>
                    <span className="text-white font-sans truncate max-w-[260px]">{selectedRfq.operatingLocation}</span>
                  </div>
                </div>

                {selectedRfq.projectScope && (
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase">Scope & Requirements:</span>
                    <p className="text-slate-200 font-sans">{selectedRfq.projectScope}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-xs text-slate-400">Current Stage: <strong className="text-white uppercase">{selectedRfq.status.replace(/_/g, ' ')}</strong></span>
                <button
                  onClick={() => setSelectedRfq(null)}
                  className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
