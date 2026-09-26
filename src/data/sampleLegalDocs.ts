export interface SampleDocument {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
  compareContent?: string;
  compareName?: string;
}

export const SAMPLE_LEGAL_DOCS: SampleDocument[] = [
  {
    id: 'employment-contract',
    name: 'Tech Employment Agreement',
    category: 'Employment',
    description: 'Standard technology employment contract featuring non-compete, IP assignment, and arbitration clauses.',
    content: `EMPLOYMENT AGREEMENT

1. POSITION AND DUTIES. The Employee agrees to serve as Lead Software Engineer for Acme Corporation. The Employee shall devote substantially all productive time and efforts to the performance of such duties.

2. AT-WILL EMPLOYMENT & TERMINATION. The Employee's employment is at-will. Acme Corporation reserves the right to terminate Employee's employment at any time, with or without cause and without prior notice. In the event of termination without cause, Employee shall receive two (2) weeks severance pay, conditioned upon execution of a comprehensive liability release.

3. NON-COMPETITION AND NON-SOLICITATION. For a period of twenty-four (24) months following the termination of employment for any reason, Employee shall not directly or indirectly engage in, perform services for, consult with, or invest in any business entity operating within the continent that competes directly or indirectly with any product or service offered, planned, or researched by Company. Employee further agrees not to solicit any customer or employee of the Company for twenty-four (24) months.

4. INTELLECTUAL PROPERTY ASSIGNMENT. Employee irrevocably transfers and assigns to Company all right, title, and interest in and to any and all inventions, designs, source code, patentable ideas, and concepts conceived, developed, or reduced to practice by Employee solely or jointly, either during working hours or during personal non-working hours, utilizing Company equipment or relating directly or tangentially to Company's business.

5. MANDATORY BINDING ARBITRATION & CLASS ACTION WAIVER. Any dispute, controversy, or claim arising out of or relating to this Agreement or breach thereof shall be settled exclusively by final and binding individual arbitration administered by AAA under its commercial arbitration rules in New York City. EMPLOYEE EXPRESSLY WAIVES ANY RIGHT TO PROCEED WITH A CLASS, COLLECTIVE, OR REPRESENTATIVE ACTION IN ANY FORUM. EACH PARTY SHALL BEAR THEIR OWN ARBITRATION EXPENSES REGARDLESS OF OUTCOME.`,
    compareName: 'Proposed Amended Employment Agreement (Worker-Friendly Counter)',
    compareContent: `EMPLOYMENT AGREEMENT (AMENDED DRAFT)

1. POSITION AND DUTIES. The Employee agrees to serve as Lead Software Engineer for Acme Corporation during regular business hours (40 hours/week standard).

2. TERMINATION & SEVERANCE. Acme Corporation may terminate this Agreement without cause upon giving thirty (30) days prior written notice. In such case, Employee shall receive three (3) months severance pay plus accrued benefits without requirement of non-standard releases.

3. REASONABLE NON-SOLICITATION. For a period of six (6) months following termination, Employee shall not knowingly solicit current employees of the Company. The parties explicitly agree that there shall be NO restriction on Employee's right to pursue employment or business opportunities with competing entities, in accordance with applicable state labor standards.

4. IP ASSIGNMENT (CARVEOUTS). Employee assigns inventions developed strictly during working hours utilizing Company equipment that relate directly to the Company's active commercial products. Inventions, software, or creative works developed on personal time using personal equipment without proprietary Company trade secrets remain the sole exclusive property of Employee.

5. DISPUTE RESOLUTION. Disputes shall first be submitted to mutual 30-day mediation. If unresolved, disputes may be adjudicated in the municipal courts of Employee's local residence jurisdiction. The prevailing party shall be entitled to recover reasonable attorney's fees.`
  },
  {
    id: 'residential-lease',
    name: 'Residential Lease Agreement',
    category: 'Real Estate',
    description: 'Standard residential apartment lease with deposit, early termination penalty, and landlord entry terms.',
    content: `RESIDENTIAL APARTMENT LEASE AGREEMENT

1. TERM AND RENT. Landlord hereby leases to Tenant the premises at 742 Evergreen Terrace for a term of twelve (12) months. Monthly rent is $2,400 payable on the first day of each calendar month. Late fee of $150 shall apply after 2 days.

2. SECURITY DEPOSIT & FORFEITURE. Tenant deposits $4,800 as security. Landlord may retain any portion of the security deposit for any cleaning, wear and tear, repainting, or administrative fees upon vacancy. Return period shall be 60 business days.

3. LANDLORD RIGHT OF ENTRY. Landlord, building staff, or prospective purchasers reserve the unrestricted right to enter the leased premises at any hour of the day or night without prior verbal or written notice for maintenance, inspection, or appraisal purposes.

4. EARLY TERMINATION PENALTY. In the event Tenant vacates before the expiration of the full 12-month term, Tenant shall remain strictly liable for the entire remaining aggregate balance of the lease term, plus an liquidated early-breach damages fee equal to three (3) months rent ($7,200).

5. INDEMNIFICATION AND LIABILITY EXCLUSION. Landlord shall not be liable to Tenant or guests for any personal injury, mold exposure, water leakage, property theft, or mechanical failure, regardless of whether caused by Landlord's sole or gross negligence. Tenant agrees to hold Landlord harmless against any and all claims.`
  },
  {
    id: 'saas-terms',
    name: 'SaaS Software Terms & Privacy Policy',
    category: 'Commercial / Privacy',
    description: 'Commercial cloud service terms governing data rights, recurring billing, and unilateral terms modification.',
    content: `TERMS OF SERVICE AND USER DATA POLICY

1. UNILATERAL MODIFICATIONS. We reserve the right to amend, update, or replace any portion of these Terms, pricing structures, or feature availability at our sole discretion at any time without individual notice. Continued use after posting constitutes irrevocable acceptance.

2. SUBSCRIPTION AUTO-RENEWAL. Subscriptions renew automatically for consecutive 12-month terms at the then-current non-discounted rate unless cancelled in writing at least ninety (90) days prior to renewal via certified postal mail.

3. DATA USAGE & AI MODEL TRAINING. By uploading, storing, or transmitting customer content or documents, you grant us a perpetual, worldwide, royalty-free, transferable license to process, store, publicly reproduce, and train our proprietary generative AI models on your raw inputs and confidential records.

4. LIMITATION OF LIABILITY. IN NO EVENT SHALL VENDOR'S TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS EXCEED THE LESSER OF $50 OR AMOUNTS PAID BY CUSTOMER IN THE PRECEDING MONTH, EVEN IF ADVISED OF THE POSSIBILITY OF DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES.`
  }
];
