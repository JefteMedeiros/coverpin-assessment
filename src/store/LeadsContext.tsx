import type React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lead, LeadStatus } from "@/types/leads";
import leadsData from "../assets/leads.json";

interface LeadsContextValue {
	data: Lead[];
	isLoading: boolean;
	error: string | null;
	updateLead: (id: number, updates: Partial<Lead>) => void;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	statusFilter: LeadStatus | "ALL";
	setStatusFilter: (status: LeadStatus | "ALL") => void;
	sortByScore: () => void;
	sortDescending: boolean;
}

const LeadsContext = createContext<LeadsContextValue | undefined>(undefined);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
	const [rawData, setRawData] = useState<Lead[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<LeadStatus | "ALL">("ALL");
	const [sortDescending, setSortDescending] = useState(true);

	const loadLeads = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			await new Promise((resolve) => setTimeout(resolve, 300));
			setRawData(leadsData.leads as Lead[]);
		} catch (_err) {
			setError("Failed to load leads");
		} finally {
			setLoading(false);
		}
	}, []);

	const updateLead = useCallback((id: number, updates: Partial<Lead>): void => {
		setRawData((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)));
	}, []);

	const sortByScore = useCallback(() => {
		setSortDescending((prev) => !prev);
	}, []);

	// Apply filtering and sorting to the data
	const filteredAndSortedData = useMemo(() => {
		let filtered = rawData;

		// Apply search filter
		if (searchTerm) {
			filtered = filtered.filter(
				(lead) =>
					lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					lead.company.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Apply status filter
		if (statusFilter !== "ALL") {
			filtered = filtered.filter((lead) => lead.status === statusFilter);
		}

		// Apply sorting by score
		filtered = filtered.sort((a, b) => {
			return sortDescending ? b.score - a.score : a.score - b.score;
		});

		return filtered;
	}, [rawData, searchTerm, statusFilter, sortDescending]);

	useEffect(() => {
		loadLeads();
	}, [loadLeads]);

	return (
		<LeadsContext.Provider 
			value={{ 
				data: filteredAndSortedData, 
				isLoading: loading, 
				error, 
				updateLead,
				searchTerm,
				setSearchTerm,
				statusFilter,
				setStatusFilter,
				sortByScore,
				sortDescending
			}}
		>
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
