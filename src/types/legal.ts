export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ClauseAnalysis {
  id: string;
  originalText: string;
  simplifiedText: string;
  category: 'obligation' | 'liability' | 'termination' | 'intellectual_property' | 'payment' | 'dispute_resolution' | 'general';
  riskLevel: RiskLevel;
  riskExplanation?: string;
  actionableRecommendation?: string;
}

export interface DocumentAnalysisResult {
  title: string;
  documentType: string;
  readabilityScoreOriginal: number; // e.g., 28 (College Graduate / Dense Legalese)
  readabilityScoreSimplified: number; // e.g., 78 (Easy Plain English)
  executiveSummary: string;
  keyObligations: string[];
  criticalRisks: string[];
  clauses: ClauseAnalysis[];
  suggestedNextSteps: string[];
}

export interface ComparisonDiffItem {
  id: string;
  topic: string;
  doc1Clause: string;
  doc2Clause: string;
  changeType: 'modified' | 'added' | 'removed' | 'identical';
  impactAssessment: string;
  favorsParty: 'Doc A' | 'Doc B' | 'Neutral';
  riskShift: 'higher' | 'lower' | 'neutral';
}

export interface ComparisonResult {
  title: string;
  summary: string;
  diffItems: ComparisonDiffItem[];
  overallRecommendation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  citations?: { clauseId: string; title: string; excerpt: string }[];
  suggestedQuestions?: string[];
}

export interface LawyerPrepPacket {
  clientContext: string;
  matterSummary: string;
  topRisksToAddress: string[];
  criticalQuestionsForAttorney: string[];
  documentsToBring: string[];
  suggestedTimeline: string[];
}
