import { describe, it, expect } from 'vitest';
import { simplifyDocumentWithAI, compareDocumentsWithAI, askDocumentQuestionWithAI, generateLawyerPrepPacket } from '../services/geminiLegalService';
import { SAMPLE_LEGAL_DOCS } from '../data/sampleLegalDocs';

describe('JurisEase AI Legal Intelligence Engine Tests', () => {
  const sampleDoc = SAMPLE_LEGAL_DOCS[0];

  it('correctly deconstructs and simplifies employment agreement clauses', async () => {
    const analysis = await simplifyDocumentWithAI(sampleDoc.content);

    expect(analysis).toBeDefined();
    expect(analysis.clauses.length).toBeGreaterThan(0);
    expect(analysis.readabilityScoreSimplified).toBeGreaterThan(analysis.readabilityScoreOriginal);
    expect(analysis.executiveSummary).toBeTruthy();

    // Check that non-compete was flagged as high or critical risk
    const nonCompeteClause = analysis.clauses.find(c => c.originalText.includes('NON-COMPETITION'));
    expect(nonCompeteClause).toBeDefined();
    expect(['high', 'critical']).toContain(nonCompeteClause?.riskLevel);
  });

  it('accurately identifies arbitration and class action waiver risk', async () => {
    const analysis = await simplifyDocumentWithAI(sampleDoc.content);
    const arbClause = analysis.clauses.find(c => c.originalText.includes('ARBITRATION'));

    expect(arbClause).toBeDefined();
    expect(arbClause?.riskLevel).toBe('critical');
    expect(arbClause?.riskExplanation).toContain('constitutional right');
  });

  it('detects risk shift during contract comparison', async () => {
    const comparison = await compareDocumentsWithAI(sampleDoc.content, sampleDoc.compareContent || '');

    expect(comparison).toBeDefined();
    expect(comparison.diffItems.length).toBeGreaterThan(0);
    
    // Counter draft should favor Doc B (more balanced)
    const hasDocBFavored = comparison.diffItems.some(d => d.favorsParty === 'Doc B');
    expect(hasDocBFavored).toBe(true);
  });

  it('answers grounded questions citing relevant clauses', async () => {
    const question = 'What are the rules regarding arbitration and can I take them to court?';
    const response = await askDocumentQuestionWithAI(question, sampleDoc.content, []);

    expect(response).toBeDefined();
    expect(response.text.toLowerCase()).toContain('arbitration');
    expect(response.citations?.length).toBeGreaterThan(0);
  });

  it('generates an actionable attorney consultation preparation packet', () => {
    const packet = generateLawyerPrepPacket(sampleDoc.content, 'Concerned about non-compete clause');

    expect(packet).toBeDefined();
    expect(packet.topRisksToAddress.length).toBeGreaterThan(0);
    expect(packet.criticalQuestionsForAttorney.length).toBeGreaterThanOrEqual(4);
    expect(packet.documentsToBring.length).toBeGreaterThan(0);
    expect(packet.suggestedTimeline.length).toBeGreaterThan(0);
  });
});
