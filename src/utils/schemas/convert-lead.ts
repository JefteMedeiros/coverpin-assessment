import { z } from "zod";
import { OpportunityStage } from "@/types/opportunity";

export const convertLeadSchema = z.object({
	name: z.string().min(1, "Opportunity name is required"),
	stage: z.enum(OpportunityStage, {
		message: "Please select a valid stage",
	}),
	amount: z
		.string()
		.optional()
		.refine((val) => !val || (!Number.isNaN(Number(val)) && Number(val) > 0), {
			message: "Amount must be a positive number",
		}),
	accountName: z.string().min(1, "Account name is required"),
	
	notes: z.string().min(1, "Conversion notes are required"),
	expectedCloseDate: z.string().min(1, "Expected close date is required"),
});

export type ConvertLeadSchema = z.infer<typeof convertLeadSchema>;
