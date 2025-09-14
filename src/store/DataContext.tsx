import type React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import leadsData from "@/assets/leads.json";
import type { Lead, LeadStatus } from "@/types/leads";
import type { Opportunity, OpportunityStage } from "@/types/opportunity";

interface DataContextValue {
  data: Lead[];
  rawData: Lead[];
  isLoading: boolean;
  error: string | null;
  updateLead: (id: number, updates: Partial<Lead>) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: LeadStatus | "ALL";
  setStatusFilter: (status: LeadStatus | "ALL") => void;
  sortByScore: () => void;
  sortDescending: boolean;
  opportunities: Opportunity[];
  convertLead: (
    leadId: number,
    opportunityData: {
      name: string;
      stage: OpportunityStage;
      amount?: number;
      accountName: string;
    },
  ) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [rawData, setRawData] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "ALL">("ALL");
  const [sortDescending, setSortDescending] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setRawData(leadsData.leads as Lead[]);
      setOpportunities(leadsData.opportunities as Opportunity[]);
    } catch (_err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLead = useCallback((id: number, updates: Partial<Lead>): void => {
    setRawData((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead)));
  }, []);

  const convertLead = useCallback(
    (
      leadId: number,
      opportunityData: {
        name: string;
        stage: OpportunityStage;
        amount?: number;
        accountName: string;
      },
    ): void => {
      const leadToConvert = rawData.find((lead) => lead.id === leadId);
      if (!leadToConvert) {
        console.error("Lead not found");
        return;
      }

      const newOpportunity: Opportunity = {
        // In a real application, I would have used a better approach such as Crypto.RandomUUID()
        id: Math.floor(Math.random() * 1000000),
        name: opportunityData.name,
        stage: opportunityData.stage,
        amount: opportunityData.amount,
        accountName: opportunityData.accountName,
      };

      setOpportunities((prev) => [...prev, newOpportunity]);

      setRawData((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: "Converted" as LeadStatus } : lead,
        ),
      );
    },
    [rawData],
  );

  const sortByScore = useCallback(() => {
    setSortDescending((prev) => !prev);
  }, []);

  const filteredAndSortedData = useMemo(() => {
    let filtered = rawData;

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    filtered = filtered.sort((a, b) => {
      return sortDescending ? b.score - a.score : a.score - b.score;
    });

    return filtered;
  }, [rawData, searchTerm, statusFilter, sortDescending]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <DataContext.Provider
      value={{
        data: filteredAndSortedData,
        rawData,
        isLoading: loading,
        error,
        updateLead,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        sortByScore,
        sortDescending,
        opportunities,
        convertLead,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
