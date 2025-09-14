import type { LeadStatus } from "@/types/leads";

export const SEARCH_TERM_KEY = 'leadFilters_searchTerm';
export const STATUS_FILTER_KEY = 'leadFilters_statusFilter';

export const loadFromStorage = (key: string, defaultValue: string): string => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const loadStatusFromStorage = (key: string, defaultValue: LeadStatus | "ALL"): LeadStatus | "ALL" => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveToStorage = (key: string, value: string | LeadStatus | "ALL"): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};
