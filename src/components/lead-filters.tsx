import { useLeads } from "@/store/LeadsContext";
import { LeadStatus } from "@/types/leads";
import { Input } from "./ui/input";
import { Option, Select, SelectContent, SelectTrigger } from "./ui/select";

export function LeadFilters() {
	const { isLoading, error, searchTerm, setSearchTerm, statusFilter, setStatusFilter } = useLeads();

	const values = Object.values(LeadStatus);
	const ALL_STATUS = "All Status";

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleStatusChange = (value: unknown) => {
		const newStatus = value === ALL_STATUS ? "ALL" : (value as LeadStatus);
		setStatusFilter(newStatus);
	};

	const displayStatusValue = statusFilter === "ALL" ? ALL_STATUS : statusFilter;

	return (
		<div className="flex flex-col md:flex-row items-center w-full gap-2">
			<Input
				disabled={isLoading || !!error}
				className="w-full md:max-w-3/4"
				placeholder="Search by name or company..."
				value={searchTerm}
				onChange={handleSearchChange}
			/>
			<Select
				disabled={isLoading || !!error}
				value={displayStatusValue}
				onChange={handleStatusChange}
			>
				<SelectTrigger className="w-full md:max-w-1/4">{displayStatusValue}</SelectTrigger>
				<SelectContent>
					<Option key={ALL_STATUS} value={ALL_STATUS}>
						{ALL_STATUS}
					</Option>
					{values.map((value) => (
						<Option key={value} value={value}>
							{value}
						</Option>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
