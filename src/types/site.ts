export interface Fundraiser {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  isActive: boolean;
  imageUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SiteEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isFeatured: boolean;
  imageUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Sponsor {
  id: string;
  name: string;
  website: string;
  registrationNumber: string;
  tier: "gold" | "silver" | "bronze";
  createdAt: number;
}
