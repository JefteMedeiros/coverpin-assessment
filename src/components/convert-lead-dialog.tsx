import { useId, useState } from "react";
import type { Lead } from "@/types/leads";
import { OpportunityStage } from "@/types/opportunity";
import { type ConvertLeadSchema, convertLeadSchema } from "@/utils/schemas/convert-lead";
import { GraphUpArrow } from "./icons/graph-up-arrow";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Option, Select, SelectContent, SelectTrigger } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface ConvertLeadDialogProps {
	lead: Lead;
	onConvert?: (leadId: number, data: ConvertLeadSchema) => void;
}

function validateConvertForm(data: ConvertLeadSchema): Record<string, string> {
	const result = convertLeadSchema.safeParse(data);

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

export function ConvertLeadDialog({ lead, onConvert }: ConvertLeadDialogProps) {
	const [open, setOpen] = useState(false);

	const nameId = useId();
	const stageId = useId();
	const amountId = useId();
	const accountNameId = useId();
	const expectedCloseDateId = useId();
	const notesId = useId();

	const [formData, setFormData] = useState<ConvertLeadSchema>({
		name: "",
		stage: OpportunityStage.PROSPECTING,
		amount: "",
		accountName: lead.company,
		notes: "",
		expectedCloseDate: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const validationErrors = validateConvertForm(formData);

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		setIsSubmitting(true);

		try {
			await onConvert?.(lead.id, formData);
			setOpen(false);
			setFormData({
				name: "",
				stage: OpportunityStage.PROSPECTING,
				amount: "",
				accountName: lead.company,
				notes: "",
				expectedCloseDate: "",
			});
			setErrors({});
		} catch (error) {
			console.error("Failed to convert lead:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	function handleCancel() {
		setOpen(false);
		setFormData({
			name: "",
			stage: OpportunityStage.PROSPECTING,
			amount: "",
			accountName: lead.company,
			notes: "",
			expectedCloseDate: "",
		});
		setErrors({});
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger variant="default" size="sm">
				<GraphUpArrow className="w-4 h-4" />
				Convert Lead
			</DialogTrigger>
			<DialogContent className="bg-zinc-800 max-w-xl w-full backdrop-blur-sm border-border/50 max-h-[95dvh] overflow-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-input">
						Convert Lead to Opportunity
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit}>
					<DialogBody className="space-y-4">
						<div className="space-y-2">
							<label htmlFor={nameId} className="text-sm font-medium text-input block">
								Opportunity Name <span className="text-destructive">*</span>
							</label>
							<Input
								id={nameId}
								type="text"
								placeholder="Enter opportunity name"
								value={formData.name}
								onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
								aria-invalid={!!errors.name}
							/>
							{errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
						</div>

						<div className="space-y-2">
							<label htmlFor={stageId} className="text-sm font-medium text-input block">
								Stage <span className="text-destructive">*</span>
							</label>
							<Select
								value={formData.stage}
								onChange={(value) =>
									setFormData((prev) => ({ ...prev, stage: value as OpportunityStage }))
								}
							>
								<SelectTrigger id={stageId} aria-invalid={!!errors.stage}>
									{formData.stage}
								</SelectTrigger>
								<SelectContent>
									{Object.values(OpportunityStage).map((stage) => (
										<Option key={stage} value={stage}>
											{stage}
										</Option>
									))}
								</SelectContent>
							</Select>
							{errors.stage && <p className="text-xs text-destructive">{errors.stage}</p>}
						</div>

						<div className="space-y-2">
							<label htmlFor={amountId} className="text-sm font-medium text-input block">
								Amount ($) <span className="text-muted-foreground text-xs">(optional)</span>
							</label>
							<Input
								id={amountId}
								type="number"
								placeholder="Enter deal amount"
								value={formData.amount}
								onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
								aria-invalid={!!errors.amount}
							/>
							{errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
						</div>

						<div className="space-y-2">
							<label htmlFor={accountNameId} className="text-sm font-medium text-input block">
								Account Name <span className="text-destructive">*</span>
							</label>
							<Input
								id={accountNameId}
								type="text"
								placeholder="Enter account name"
								value={formData.accountName}
								onChange={(e) => setFormData((prev) => ({ ...prev, accountName: e.target.value }))}
								aria-invalid={!!errors.accountName}
							/>
							{errors.accountName && (
								<p className="text-xs text-destructive">{errors.accountName}</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor={expectedCloseDateId} className="text-sm font-medium text-input block">
								Expected Close Date <span className="text-destructive">*</span>
							</label>
							<Input
								id={expectedCloseDateId}
								type="date"
								value={formData.expectedCloseDate}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, expectedCloseDate: e.target.value }))
								}
								aria-invalid={!!errors.expectedCloseDate}
							/>
							{errors.expectedCloseDate && (
								<p className="text-xs text-destructive">{errors.expectedCloseDate}</p>
							)}
						</div>

						<div className="space-y-2">
							<label htmlFor={notesId} className="text-sm font-medium text-input block">
								Conversion Notes <span className="text-destructive">*</span>
							</label>
							<Textarea
								id={notesId}
								placeholder="Add notes about the conversion..."
								value={formData.notes}
								onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
								aria-invalid={!!errors.notes}
							/>
							{errors.notes && <p className="text-xs text-destructive">{errors.notes}</p>}
						</div>
					</DialogBody>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={handleCancel}>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Converting..." : "Convert Lead"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
