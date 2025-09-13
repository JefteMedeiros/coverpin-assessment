import { z } from "zod";
import { LeadStatus } from "@/types/leads";

export const editLeadSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	status: z.nativeEnum(LeadStatus, {
		message: "Please select a valid status",
	})
});

export type EditLeadSchema = z.infer<typeof editLeadSchema>;