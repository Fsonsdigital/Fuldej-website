export type ServiceCategory =
  | 'all'
  | 'technology'
  | 'engineering'
  | 'renewable'
  | 'consultancy'
  | 'procurement';

export interface ServiceDivision {
  id: Exclude<ServiceCategory, 'all'>;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  iconName: string;
  caseStudyTitle: string;
  caseStudySummary: string;
}

export interface CorporateProject {
  id: string;
  title: string;
  division: Exclude<ServiceCategory, 'all'>;
  client: string;
  location: string;
  year: string;
  summary: string;
  keyMetrics: { label: string; value: string }[];
  imageSrc: string;
}

export type RfqStatus = 'inquiry_received' | 'technical_review' | 'proposal_issued' | 'contract_awarded';

export interface RfqInquiry {
  id: string;
  referenceNumber: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceDivision: Exclude<ServiceCategory, 'all'>;
  projectScope: string;
  deliveryTimeline: string;
  operatingLocation: string;
  estimatedBudgetNgn: number;
  estimatedBudgetUsd: number;
  status: RfqStatus;
  createdAt: string;
}

export interface ProjectMilestone {
  phase: string;
  status: 'completed' | 'in_progress' | 'pending';
  date: string;
  description: string;
}

export interface ClientProjectTracker {
  projectCode: string;
  clientName: string;
  projectName: string;
  division: Exclude<ServiceCategory, 'all'>;
  location: string;
  leadDirector: string;
  startDate: string;
  targetCompletion: string;
  progressPercent: number;
  milestones: ProjectMilestone[];
  specifications: { label: string; value: string }[];
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  discipline: string;
  experienceYears: number;
  bio: string;
  image?: string;
  isKeyPartner?: boolean;
}

export interface StrategicPartner {
  id: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  description: string;
  logoUrl: string;
  leaderName: string;
  leaderTitle: string;
  focusAreas: string[];
  impactMetrics: { label: string; value: string }[];
  highlightBadge: string;
}
