export interface UserProfile {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  mobileNumber: string;
  email?: string;
  country: string;
  state?: string;
  preferredLanguage: string;
  profilePicture: string;
  isLoggedIn: boolean;
}

export interface VerificationQuery {
  id: string;
  queryText: string;
  category: string;
  country: string;
  state?: string;
  language: string;
  timestamp: string;
  reportMarkdown: string;
  sources: CitationSource[];
  demandedAmount?: string;
  actualAmount?: string;
  isFavorite?: boolean;
}

export interface CitationSource {
  title: string;
  url: string;
}

export interface FraudCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  popularQuery: string;
  authorityName: string;
  officialHelpline: string;
}

export interface EmergencyHelpline {
  sector: string;
  country: string;
  name: string;
  number: string;
  description: string;
  officialWebsite: string;
  category: string;
}
