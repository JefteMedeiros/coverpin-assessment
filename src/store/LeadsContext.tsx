import type React from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lead } from "@/types/leads";
import leadsData from "../assets/leads.json";

interface LeadsContextValue {
	data: Lead[];
	isLoading: boolean;
	error: string | null;
	updateLead: (id: number, updates: Partial<Lead>) => void;
}

const LeadsContext = createContext<LeadsContextValue | undefined>(undefined);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
	const [data, setData] = useState<Lead[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadLeads = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			await new Promise((resolve) => setTimeout(resolve, 300));
			setData(leadsData.leads as Lead[]);
		} catch (_err) {
			setError("Failed to load leads");
		} finally {
			setLoading(false);
		}
	}, []);

	const updateLead = useCallback((id: number, updates: Partial<Lead>): void => {
		setData((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)));
	}, []);

	useEffect(() => {
		loadLeads();
	}, [loadLeads]);

	return (
		<LeadsContext.Provider value={{ data, isLoading: loading, error, updateLead }}>
			{children}
		</LeadsContext.Provider>
	);
}

export const useLeads = (): LeadsContextValue => {
	const context = useContext(LeadsContext);
	if (!context) {
		throw new Error("useLeadsContext must be used within a LeadsProvider");
	}
	return context;
};
