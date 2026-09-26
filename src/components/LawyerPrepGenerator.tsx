import React, { useState } from 'react';
import { LawyerPrepPacket } from '../types/legal';
import { generateLawyerPrepPacket } from '../services/geminiLegalService';
import { ShieldCheck, Printer, CheckSquare, HelpCircle, FileCheck, Calendar, ArrowRight } from 'lucide-react';

interface LawyerPrepGeneratorProps {
  documentText: string;
}

export const LawyerPrepGenerator: React.FC<LawyerPrepGeneratorProps> = ({ documentText }) => {
  const [userConcerns, setUserConcerns] = useState(
    'I want to know if the 2-year non-compete is enforceable and whether my personal side projects on GitHub will be owned by the company.'
  );
  const [packet, setPacket] = useState<LawyerPrepPacket>(() => generateLawyerPrepPacket(documentText, userConcerns));

  const handleRegenerate = () => {
    setPacket(generateLawyerPrepPacket(documentText, userConcerns));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Attorney Consultation Preparation Packet</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Maximize the value of expensive legal consultations ($300–$700/hr) by entering the room with structured questions, evidence checklists, and highlighted risks.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shadow transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Your Primary Concerns & Context:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userConcerns}
              onChange={(e) => setUserConcerns(e.target.value)}
              className="flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="What specifically worries you about this contract or situation?"
            />
            <button
              onClick={handleRegenerate}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl shadow"
            >
              Update Packet
            </button>
          </div>
        </div>
      </div>

      {/* Printable Package View */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">JurisEase AI • Legal Intake Dossier</span>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Attorney Consultation Action Brief</h1>
              <p className="text-xs text-slate-500 mt-1">Prepared on {new Date().toLocaleDateString()} for legal counsel review</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full font-mono">
                CONFIDENTIAL • CLIENT PREPARATION
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Top Risks to Address */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 text-xs flex items-center justify-center font-bold">1</span>
            <span>Key Legal Vulnerabilities Identified by GenAI</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {packet.topRisksToAddress.map((risk, i) => (
              <div key={i} className="p-4 bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                <strong>Point {i + 1}:</strong> {risk}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 5 Critical Questions for Attorney */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 text-xs flex items-center justify-center font-bold">2</span>
            <span>5 Direct Questions to Ask Your Lawyer</span>
          </h3>
          <div className="space-y-2">
            {packet.criticalQuestionsForAttorney.map((q, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Evidence & Documents to Bring */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 text-xs flex items-center justify-center font-bold">3</span>
            <span>Documents & Evidence Checklist to Bring</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {packet.documentsToBring.map((doc, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-2.5 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-xs text-slate-800 dark:text-slate-200">
                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Recommended Action Timeline */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 text-xs flex items-center justify-center font-bold">4</span>
            <span>Recommended Negotiation Roadmap</span>
          </h3>
          <div className="space-y-2">
            {packet.suggestedTimeline.map((step, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            <strong>NOTICE:</strong> This document was synthesized by JurisEase AI for consumer information preparation and does not constitute attorney-client privileged communication or direct legal representation.
          </p>
        </div>
      </div>
    </div>
  );
};
