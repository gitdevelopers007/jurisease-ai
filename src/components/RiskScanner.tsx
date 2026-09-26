import React, { useState } from 'react';
import { ClauseAnalysis } from '../types/legal';
import { AlertTriangle, ShieldAlert, CheckCircle, HelpCircle, Download } from 'lucide-react';

interface RiskScannerProps {
  documentText: string;
}

export const RiskScanner: React.FC<RiskScannerProps> = ({ documentText }) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');

  // Scanner pattern definitions
  const riskPatterns = [
    {
      id: 'arb-waiver',
      title: 'Mandatory Binding Arbitration & Class Action Waiver',
      severity: 'critical' as const,
      found: documentText.toLowerCase().includes('arbitrat') && (documentText.toLowerCase().includes('class action') || documentText.toLowerCase().includes('expenses')),
      category: 'Dispute Resolution',
      snippet: 'Disputes settled exclusively by individual arbitration with class action waiver.',
      implication: 'Denies your constitutional right to a jury trial. Prevents joining class lawsuits to split costs. Often forces arbitration in an inconvenient distant jurisdiction.',
      suggestedFix: 'Strike class action waiver; demand employer/vendor cover all administrative arbitration fees.'
    },
    {
      id: 'non-compete',
      title: 'Overly Broad Non-Compete & Non-Solicitation Covenants',
      severity: 'high' as const,
      found: documentText.toLowerCase().includes('non-compet') || (documentText.toLowerCase().includes('compete') && documentText.toLowerCase().includes('month')),
      category: 'Career Freedom',
      snippet: 'Restricts post-termination employment with competitors for up to 24 months.',
      implication: 'May prevent you from earning a living in your industry. (Note: Many jurisdictions and federal rules now severely restrict or ban non-competes).',
      suggestedFix: 'Remove non-compete completely or limit strictly to direct proprietary competitors for at most 3-6 months.'
    },
    {
      id: 'unilateral-terms',
      title: 'Unilateral Modifications Without Notice',
      severity: 'high' as const,
      found: documentText.toLowerCase().includes('unilateral') || documentText.toLowerCase().includes('sole discretion at any time'),
      category: 'Contract Fairness',
      snippet: 'Vendor reserves right to alter terms, fees, or features without individual notification.',
      implication: 'You are bound to rules that can be rewritten against your interest after you have already committed.',
      suggestedFix: 'Mandate 30-day prior email notice for material changes with penalty-free opt-out termination.'
    },
    {
      id: 'ai-training',
      title: 'AI Training Rights on Proprietary Data',
      severity: 'high' as const,
      found: documentText.toLowerCase().includes('train') && (documentText.toLowerCase().includes('ai') || documentText.toLowerCase().includes('model')),
      category: 'Intellectual Property',
      snippet: 'User data licensed for training proprietary generative AI models.',
      implication: 'Confidential documents and trade secrets may be absorbed into generative models and exposed to third parties.',
      suggestedFix: 'Require explicit written enterprise opt-out from all model training and commercial exploitation.'
    },
    {
      id: 'unannounced-entry',
      title: 'Unrestricted Landlord Right of Entry',
      severity: 'critical' as const,
      found: documentText.toLowerCase().includes('without prior') && documentText.toLowerCase().includes('enter'),
      category: 'Tenant Privacy',
      snippet: 'Right to enter leased premises at any hour without prior notice.',
      implication: 'Violates statutory quiet enjoyment laws in most jurisdictions.',
      suggestedFix: 'Require minimum 24-48 hours written notice before non-emergency entry.'
    },
    {
      id: 'severe-penalties',
      title: 'Disproportionate Early Termination Liquidated Damages',
      severity: 'medium' as const,
      found: documentText.toLowerCase().includes('liquidated') || documentText.toLowerCase().includes('early termination'),
      category: 'Financial Liability',
      snippet: 'Full remaining balance of contract plus punitive early termination penalties.',
      implication: 'Forces full payment regardless of whether the other party successfully mitigates damages by re-leasing or re-selling.',
      suggestedFix: 'Cap early breach fee to maximum 1 month fee, subject to statutory duty to mitigate.'
    }
  ];

  const detected = riskPatterns.filter(p => p.found);
  const filtered = filter === 'all' ? detected : detected.filter(p => p.severity === filter);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <span>Red Flag & Unfair Terms Scanner</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Automated audit for abusive clauses, one-sided indemnity, secret arbitration mandates, and hidden liability traps.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Filter Severity:</span>
            {(['all', 'critical', 'high', 'medium'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
                  filter === lvl
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <div className="text-xl font-bold text-slate-900 dark:text-white">{detected.length}</div>
            <div className="text-xs text-slate-500">Total Flags Detected</div>
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl text-center">
            <div className="text-xl font-bold text-rose-600 dark:text-rose-400">
              {detected.filter(d => d.severity === 'critical').length}
            </div>
            <div className="text-xs text-rose-600 dark:text-rose-400">Critical Risks</div>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl text-center">
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {detected.filter(d => d.severity === 'high').length}
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400">High Risks</div>
          </div>
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl text-center">
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {detected.filter(d => d.severity === 'medium').length}
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Moderate Risks</div>
          </div>
        </div>
      </div>

      {/* Flag List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="font-medium text-sm">No flags matching this filter in the current document text.</p>
          </div>
        ) : (
          filtered.map(flag => (
            <div
              key={flag.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    flag.severity === 'critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' :
                    flag.severity === 'high' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                  }`}>
                    {flag.severity} RISK
                  </span>
                  <span className="text-xs text-slate-400">• {flag.category}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {flag.title}
              </h3>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                &ldquo;{flag.snippet}&rdquo;
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl">
                  <div className="font-bold text-rose-700 dark:text-rose-400 mb-1 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Legal & Practical Risk:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{flag.implication}</p>
                </div>

                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>How to Negotiate / Fix:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{flag.suggestedFix}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
