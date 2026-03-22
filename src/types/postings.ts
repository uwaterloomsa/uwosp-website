export interface Posting {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  category: "executive" | "volunteer" | "lead";
  status: "open" | "closed";
  createdAt: number;
  updatedAt: number;
}

export interface Application {
  id: string;
  postingId: string;
  postingTitle: string;
  name: string;
  email: string;
  program: string;
  whyInterested: string;
  experience: string;
  resumeUrl?: string;
  submittedAt: number;
}
