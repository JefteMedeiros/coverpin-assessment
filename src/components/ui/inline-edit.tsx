import { LeadStatus } from "@/types/leads";
import { Input } from "./input";
import { Option, Select, SelectContent, SelectTrigger } from "./select";

interface InlineEditEmailProps {
	id?: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
}

export function InlineEditEmail({ id, value, onChange, error }: InlineEditEmailProps) {
	return (
		<div className="space-y-1">
			<Input
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Enter email address"
				aria-invalid={!!error}
			/>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

interface InlineEditSelectProps {
	id?: string;
	value: LeadStatus;
	onChange: (value: LeadStatus) => void;
	error?: string;
}

export function InlineEditSelect({ id, value, onChange, error }: InlineEditSelectProps) {
	return (
		<div className="space-y-1">
			<Select value={value} onChange={(value) => onChange(value as LeadStatus)}>
				<SelectTrigger id={id}>{value}</SelectTrigger>
				<SelectContent>
					{Object.values(LeadStatus).map((status) => (
						<Option key={status} value={status}>
							{status}
						</Option>
					))}
				</SelectContent>
			</Select>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

