export interface Review {
  rating: number;
  ourExperience: string;
  pros: string[];
  cons: string[];
  author: string;
  lastUpdated: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  outcome: string;
  date: string;
}

export interface EEAATMetaData {
  isHumanReviewed: boolean;
  aiContributionPercent: number;
  authorExperience: string[];
  verifiedCaseStudies: CaseStudy[];
  factChecked: boolean;
  lastVerifiedDate: string;
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  title: string;
  experienceYears: number;
  expertise: string[];
  verified: boolean;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    medium?: string;
    youtube?: string;
    bilibili?: string;
    spotify?: string;
    soundcloud?: string;
  };
  credentials?: string[];
  caseStudies?: Array<{
    title: string;
    description: string;
    outcome: string;
  }>;
  publications?: string[];
  speakingEngagements?: string[];
}

export interface Screenshot {
  title: string;
  description: string;
  emoji: string;
  content: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  logo: string;
  description: string;
  categories: string[];
  url: string;
  review: Review;
  alternatives: string[];
  createdAt: string;
  updatedAt: string;
  eeatMetadata: EEAATMetaData;
  faq: FAQItem[];
  screenshots?: Screenshot[];
  pricing?: {
    price?: string;
    currency?: string;
  };
  images?: string[];
  features?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  logo: string;
  url: string;
  founder: Author;
  foundingDate: string;
  organizationDescription: string;
}
