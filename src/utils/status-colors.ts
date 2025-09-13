import type { LeadStatus } from "@/types/leads";

export const getStatusColor: Record<LeadStatus, string> = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Qualified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Converted: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};