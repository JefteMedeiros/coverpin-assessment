import { useState } from "react";
import { LeadStatus } from "@/types/leads";
import { Input } from "./ui/input";
import { Option, Select, SelectContent, SelectTrigger } from "./ui/select";

export function LeadFilters() {
	const values = Object.values(LeadStatus);

	const [selected, setSelected] = useState(values[0]);

	const _handleSelect = (value: unknown) => {
		setSelected(value as LeadStatus);
	};

	return (
		<div className="flex items-center w-full gap-2">
			<Input className="max-w-3/4" placeholder="Search by name or company..." />
			<Select value={selected} onChange={_handleSelect}>
				<SelectTrigger className="max-w-1/4">{selected}</SelectTrigger>
				<SelectContent>
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
