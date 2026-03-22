export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface OrphanProfile {
  id: string;
  name: string;
  country: string;
  description: string;
  years: string;
  imageUrl?: string;
  order?: number;
}

export interface PastSponsorship {
  id: string;
  name: string;
  order?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  isLeadership: boolean;
  imageUrl?: string;
  order: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
}

export interface CampaignEvent {
  id: string;
  name: string;
  emoji: string;
  term: string;
  order: number;
}

export interface FinanceReport {
  id: string;
  name: string;
  year: number;
  url: string;
}

export interface VolunteerCharity {
  id: string;
  name: string;
  focus: string;
  location: string;
  website: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface PastEvent {
  id: string;
  title: string;
  description: string;
  order: number;
}
