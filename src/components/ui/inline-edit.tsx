import { LeadStatus } from "@/types/leads";
import { type EditLeadSchema, editLeadSchema } from "@/utils/schemas/lead";
import { Input } from "./input";
import { Option, Select, SelectContent, SelectTrigger } from "./select";

interface InlineEditEmailProps {
	value: string;
	onChange: (value: string) => void;
	error?: string;
}

export function InlineEditEmail({ value, onChange, error }: InlineEditEmailProps) {
	return (
		<div className="space-y-1">
			<Input
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
	value: LeadStatus;
	onChange: (value: LeadStatus) => void;
	error?: string;
}

export function InlineEditSelect({ value, onChange, error }: InlineEditSelectProps) {
	return (
		<div className="space-y-1">
			<Select value={value} onChange={(value) => onChange(value as LeadStatus)}>
				<SelectTrigger>{value}</SelectTrigger>
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


export function validateFormComplete(data: EditLeadSchema): Record<string, string> {
	const result = editLeadSchema.safeParse(data);
	
	if (result.success) {
		return {};
	}

	const errors: Record<string, string> = {};
	result.error.issues.forEach((issue) => {
		const field = issue.path[0] as string;
		errors[field] = issue.message;
	});
	
	return errors;
}
