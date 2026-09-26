import React, { useState } from 'react';
import { ComparisonResult } from '../types/legal';
import { SAMPLE_LEGAL_DOCS } from '../data/sampleLegalDocs';
import { compareDocumentsWithAI } from '../services/geminiLegalService';
import { Scale, ArrowRightLeft, Sparkles, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ContractComparatorProps {
  apiKey: string;
}

export const ContractComparator: React.FC<ContractComparatorProps> = ({ apiKey }) => {
  const defaultSample = SAMPLE_LEGAL_DOCS[0];
  const [doc1Text, setDoc1Text] = useState(defaultSample.content);
  const [doc2Text, setDoc2Text] = useState(defaultSample.compareContent || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const handleCompare = async () => {
    if (!doc1Text.trim() || !doc2Text.trim()) return;
    setLoading(true);
    try {
      const res = await compareDocumentsWithAI(doc1Text, doc2Text, apiKey);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Contract & Policy Comparator</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Compare original contracts against counterproposals or updated terms of service to track risk shifts and unfair changes.
            </p>
          </div>

          <button
            onClick={handleCompare}
            disabled={loading || !doc1Text.trim() || !doc2Text.trim()}
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Comparing Documents...' : 'Run GenAI Comparison'}</span>
          </button>
        </div>

        {/* Dual Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Document A (e.g., Company Standard Draft)
            </label>
            <textarea
              value={doc1Text}
              onChange={(e) => setDoc1Text(e.target.value)}
              rows={8}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="Paste first contract version..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Document B (e.g., Counterproposal / Updated Terms)
            </label>
            <textarea
              value={doc2Text}
              onChange={(e) => setDoc2Text(e.target.value)}
              rows={8}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="Paste second contract version..."
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {result.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  {result.summary}
                </p>
                <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-xl text-xs text-blue-900 dark:text-blue-300 font-medium border border-blue-100 dark:border-blue-900">
                  <strong>Recommendation:</strong> {result.overallRecommendation}
                </div>
              </div>
            </div>
          </div>

          {/* Diff Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Detailed Clause Diff & Impact Breakdown
            </h3>

            <div className="space-y-4">
              {result.diffItems.map((diff) => (
                <div
                  key={diff.id}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{diff.topic}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        diff.favorsParty === 'Doc B' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' :
                        diff.favorsParty === 'Doc A' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        Favors {diff.favorsParty}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        diff.riskShift === 'lower' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300' :
                        diff.riskShift === 'higher' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        Risk Shift: {diff.riskShift}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg">
                      <div className="font-bold text-red-700 dark:text-red-400 mb-1">DOC A:</div>
                      <div className="text-slate-800 dark:text-slate-300">{diff.doc1Clause}</div>
                    </div>
                    <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg">
                      <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">DOC B:</div>
                      <div className="text-slate-800 dark:text-slate-300">{diff.doc2Clause}</div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <strong>Impact Assessment:</strong> {diff.impactAssessment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
