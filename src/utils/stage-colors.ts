import type { OpportunityStage } from "@/types/opportunity";

export const getStageColor: Record<OpportunityStage, string> = {
	Prospecting: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
	Qualification: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
	Proposal: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
	Negotiation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
	"Closed Won": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
	"Closed Lost": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};
