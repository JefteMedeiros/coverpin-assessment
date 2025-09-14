export enum OpportunityStage {
	PROSPECTING = "Prospecting",
	QUALIFICATION = "Qualification",
	PROPOSAL = "Proposal",
	NEGOTIATION = "Negotiation",
	CLOSED_WON = "Closed Won",
	CLOSED_LOST = "Closed Lost",
}

export interface Opportunity {
	id: number;
	name: string;
	stage: OpportunityStage;
	amount?: number;
	accountName: string;
}
