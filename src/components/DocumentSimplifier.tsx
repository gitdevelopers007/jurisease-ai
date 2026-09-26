import React, { useState } from 'react';
import { DocumentAnalysisResult, ClauseAnalysis } from '../types/legal';
import { SAMPLE_LEGAL_DOCS } from '../data/sampleLegalDocs';
import { simplifyDocumentWithAI } from '../services/geminiLegalService';
import { Sparkles, FileText, CheckCircle2, AlertCircle, ArrowRight, Gauge, ChevronDown, ChevronUp } from 'lucide-react';

interface DocumentSimplifierProps {
  documentText: string;
  setDocumentText: (text: string) => void;
  apiKey: string;
}

export const DocumentSimplifier: React.FC<DocumentSimplifierProps> = ({
  documentText,
  setDocumentText,
  apiKey
}) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysisResult | null>(null);
  const [expandedClause, setExpandedClause] = useState<string | null>(null);

  const handleSelectSample = (sampleId: string) => {
    const doc = SAMPLE_LEGAL_DOCS.find(d => d.id === sampleId);
    if (doc) {
      setDocumentText(doc.content);
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) return;
    setLoading(true);
    try {
      const result = await simplifyDocumentWithAI(documentText, apiKey);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (level: ClauseAnalysis['riskLevel']) => {
    switch (level) {
      case 'critical':
        return <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs px-2.5 py-0.5 rounded-full font-semibold">Critical Risk</span>;
      case 'high':
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs px-2.5 py-0.5 rounded-full font-semibold">High Risk</span>;
      case 'medium':
        return <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 text-xs px-2.5 py-0.5 rounded-full font-medium">Moderate</span>;
      default:
        return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-medium">Standard</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Legal Document Simplifier & Plain-English Translator</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Deconstructs impenetrable legal contracts into 8th-grade conversational English, highlights hidden obligations, and quantifies risk levels.
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Load Sample:</span>
            {SAMPLE_LEGAL_DOCS.map(sample => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample.id)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-200 transition-colors"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="mt-4">
          <textarea
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Paste your legal document, lease, employment agreement, NDA, or terms of service here..."
            rows={8}
            className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-slate-100 font-mono"
            aria-label="Legal document text input"
          />
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {documentText.length} characters • {documentText.split(/\s+/).filter(Boolean).length} words
            </span>
            <button
              onClick={handleAnalyze}
              disabled={loading || !documentText.trim()}
              className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Analyzing with GenAI...' : 'Simplify & Analyze Contract'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Readability & Executive Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Gauge className="w-4 h-4 text-blue-500" />
                <span>Readability Transformation</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-center">
                  <div className="text-2xl font-black text-rose-500">{analysis.readabilityScoreOriginal}/100</div>
                  <div className="text-xs text-slate-500">Original (Legalese)</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400" />
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-500">{analysis.readabilityScoreSimplified}/100</div>
                  <div className="text-xs text-slate-500">JurisEase (Plain English)</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                +{(analysis.readabilityScoreSimplified - analysis.readabilityScoreOriginal)}% comprehension boost for non-lawyers.
              </p>
            </div>

            <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Executive Plain-Language Overview
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {analysis.executiveSummary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs font-medium px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  Document Type: {analysis.documentType}
                </span>
                <span className="text-xs font-medium px-2 py-1 rounded bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                  {analysis.clauses.filter(c => c.riskLevel === 'high' || c.riskLevel === 'critical').length} Critical/High Risk Flags
                </span>
              </div>
            </div>
          </div>

          {/* Clause-by-Clause Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
              <span>Clause-by-Clause Simplification & Redlines ({analysis.clauses.length} Clauses)</span>
              <span className="text-xs font-normal text-slate-500">Click any clause to expand full original legalese</span>
            </h3>

            <div className="space-y-4">
              {analysis.clauses.map((clause) => {
                const isExpanded = expandedClause === clause.id;
                return (
                  <div
                    key={clause.id}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1.5">
                          <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                            {clause.category.replace('_', ' ')}
                          </span>
                          {getRiskBadge(clause.riskLevel)}
                        </div>

                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border-l-4 border-blue-500">
                          {clause.simplifiedText}
                        </div>

                        {clause.riskExplanation && (
                          <div className="mt-2 flex items-start space-x-2 text-xs text-rose-600 dark:text-rose-400">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span><strong>Risk Alert:</strong> {clause.riskExplanation}</span>
                          </div>
                        )}

                        {clause.actionableRecommendation && (
                          <div className="mt-1 flex items-start space-x-2 text-xs text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            <span><strong>Actionable Step:</strong> {clause.actionableRecommendation}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setExpandedClause(isExpanded ? null : clause.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                        aria-label={isExpanded ? "Collapse original clause" : "Expand original clause"}
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 p-3 rounded">
                        <div className="font-semibold text-slate-500 mb-1">ORIGINAL RAW LEGALESE:</div>
                        {clause.originalText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
