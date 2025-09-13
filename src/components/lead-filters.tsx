import { useState } from "react";
import { useLeads } from "@/store/LeadsContext";
import { LeadStatus } from "@/types/leads";
import { Input } from "./ui/input";
import { Option, Select, SelectContent, SelectTrigger } from "./ui/select";

export function LeadFilters() {
	const { isLoading, error } = useLeads();

	const values = Object.values(LeadStatus);
	const ALL_STATUS = "All Status";

	const [selected, setSelected] = useState(ALL_STATUS);

	const _handleSelect = (value: unknown) => {
		setSelected(value as LeadStatus | typeof ALL_STATUS);
	};

	return (
		<div className="flex flex-col md:flex-row items-center w-full gap-2">
			<Input disabled={isLoading || !!error} className="w-full md:max-w-3/4" placeholder="Search by name or company..." />
			<Select disabled={isLoading || !!error} value={selected} onChange={_handleSelect}>
				<SelectTrigger className="w-full md:max-w-1/4">{selected}</SelectTrigger>
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
