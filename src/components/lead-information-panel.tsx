import { useState } from "react";
import type { Lead } from "@/types/leads";
import { LeadStatus } from "@/types/leads";
import type { EditLeadSchema } from "@/utils/schemas/lead";
import { getScoreColor } from "@/utils/score-colors";
import { getStatusColor } from "@/utils/status-colors";
import { Bullseye } from "./icons/bullseye";
import { Envelope } from "./icons/envelope";
import { Badge } from "./ui/badge";
import { CardItem, InformationCard } from "./ui/information-card";
import { InlineEditEmail, InlineEditSelect, validateFormComplete } from "./ui/inline-edit";
import { SlideOverBody, SlideOverFooter, SlideOverPanel } from "./ui/slide-over-panel";

interface Props {
	isSlideOverOpen: boolean;
	handleCloseSlideOver: () => void;
	selectedLead: Lead | null;
	// onUpdateLead?: (leadId: number, updates: Partial<Pick<Lead, "email" | "status">>) => void;
}

export function LeadInformationPanel({
	isSlideOverOpen,
	handleCloseSlideOver,
	selectedLead,
	// onUpdateLead,
}: Props) {
	const [isEditing, setIsEditing] = useState(false);

	const [formData, setFormData] = useState<EditLeadSchema>({
		email: selectedLead?.email || "",
		status: selectedLead?.status || LeadStatus.NEW,
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleStartEdit = () => {
		if (selectedLead) {
			setFormData({
				email: selectedLead.email,
				status: selectedLead.status,
			});
			setErrors({});
			setIsEditing(true);
		}
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formErrors = validateFormComplete(formData);

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		if (selectedLead) {
			// onUpdateLead(selectedLead.id, { email: formData.email, status: formData.status });
			setIsEditing(false);
			setErrors({});
			alert("Changes saved successfully!");
		}
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setErrors({});
		if (selectedLead) {
			setFormData({
				email: selectedLead.email,
				status: selectedLead.status,
			});
		}
	};

	const handleFieldChange = (field: keyof EditLeadSchema, value: string | LeadStatus) => {
		const newFormData = { ...formData, [field]: value } as EditLeadSchema;
		setFormData(newFormData);
	};

	return (
		<SlideOverPanel
			className="bg-zinc-800 border-none"
			open={isSlideOverOpen}
			onClose={handleCloseSlideOver}
			title={selectedLead ? `Lead Details - ${selectedLead.name}` : "Lead Details"}
			size="lg"
		>
			{selectedLead && (
				<form onSubmit={handleFormSubmit}>
					<SlideOverBody>
						<div className="space-y-6">
							<InformationCard title="Contact Information" icon={<Envelope className="w-5 h-5" />}>
								<CardItem label="Name" content={selectedLead.name} />
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Email</p>
									{isEditing ? (
										<InlineEditEmail
											value={formData.email}
											onChange={(value) => handleFieldChange("email", value)}
											error={errors.email}
										/>
									) : (
										<p className="text-input">{selectedLead.email}</p>
									)}
								</div>
								<CardItem label="Company" content={selectedLead.company} />
							</InformationCard>

							<InformationCard title="Lead Status" icon={<Bullseye className="w-5 h-5" />}>
								<CardItem label="Source" content={selectedLead.source} />
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Status</p>
									{isEditing ? (
										<InlineEditSelect
											value={formData.status}
											onChange={(value) => handleFieldChange("status", value)}
											error={errors.status}
										/>
									) : (
										<Badge className={getStatusColor[selectedLead.status]} variant="default">
											{selectedLead.status}
										</Badge>
									)}
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Score</p>
									<Badge className={getScoreColor(selectedLead.score)} variant="default">
										{selectedLead.score}
									</Badge>
								</div>
							</InformationCard>
						</div>
					</SlideOverBody>

					<SlideOverFooter>
						<div className="flex justify-end gap-3">
							{isEditing ? (
								<>
									<button
										type="button"
										onClick={handleCancelEdit}
										className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
									>
										Save Changes
									</button>
								</>
							) : (
								<button
									type="button"
									onClick={handleStartEdit}
									className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
								>
									Edit
								</button>
							)}
						</div>
					</SlideOverFooter>
				</form>
			)}
		</SlideOverPanel>
	);
}
