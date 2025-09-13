export enum LeadStatus {
  NEW = "New",
  QUALIFIED = "Qualified",
  CONTACTED = "Contacted"
}

export enum LeadSource {
  WEBSITE = "Website",
  LINKEDIN = "LinkedIn",
  COLD_CALL = "Cold Call",
  REFERRAL = "Referral",
  TRADE_SHOW = "Trade Show",
  EMAIL_CAMPAIGN = "Email Campaign"
}

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: LeadSource;
  score: number;
  status: LeadStatus;
}

export interface LeadsData {
  leads: Lead[];
}
