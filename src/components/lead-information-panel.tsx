import { useEffect, useState } from "react";
import { useLeads } from "@/store/LeadsContext";
import type { Lead } from "@/types/leads";
import { LeadStatus } from "@/types/leads";
import type { EditLeadSchema } from "@/utils/schemas/lead";
import { getScoreColor } from "@/utils/score-colors";
import { getStatusColor } from "@/utils/status-colors";
import { ConvertLeadDialog } from "./convert-lead-dialog";
import { Envelope } from "./icons/envelope";
import { Pencil } from "./icons/pencil";
import { SdCard } from "./icons/pencil copy";
import { People } from "./icons/people";
import { X } from "./icons/x";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CardItem, InformationCard } from "./ui/information-card";
import { InlineEditEmail, InlineEditSelect, validateFormComplete } from "./ui/inline-edit";
import { SlideOverBody, SlideOverFooter, SlideOverPanel } from "./ui/slide-over-panel";

interface Props {
	isSlideOverOpen: boolean;
	handleCloseSlideOver: () => void;
	selectedLead: Lead | null;
}

export function LeadInformationPanel({
	isSlideOverOpen,
	handleCloseSlideOver,
	selectedLead,
}: Props) {
	const { updateLead, data } = useLeads();
	const [isEditing, setIsEditing] = useState(false);

	const [formData, setFormData] = useState<EditLeadSchema>({
		email: selectedLead?.email || "",
		status: selectedLead?.status || LeadStatus.NEW,
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [updateError, setUpdateError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);

	const currentLead = selectedLead
		? data.find((lead) => lead.id === selectedLead.id) || selectedLead
		: null;

	useEffect(() => {
		if (currentLead && !isEditing) {
			setFormData({
				email: currentLead.email,
				status: currentLead.status,
			});
		}
	}, [currentLead, isEditing]);

	// Clear messages when modal closes
	useEffect(() => {
		if (!isSlideOverOpen) {
			setUpdateError(null);
			setSuccessMessage(null);
			setErrors({});
		}
	}, [isSlideOverOpen]);

	function handleStartEdit() {
		if (currentLead) {
			setFormData({
				email: currentLead.email,
				status: currentLead.status,
			});
			setErrors({});
			setUpdateError(null);
			setSuccessMessage(null);
			setIsEditing(true);
		}
	}

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formErrors = validateFormComplete(formData);

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		if (!selectedLead) return;

		setIsUpdating(true);
		setUpdateError(null);
		setSuccessMessage(null);

		try {
			// TEMPORARY: Simulate a failure for testing
			if (Math.random() > 0.3) { // 70% chance of "failure"
				throw new Error("Simulated network error");
			}

			updateLead(selectedLead.id, {
				email: formData.email,
				status: formData.status,
			});

			setIsEditing(false);
			setErrors({});
			setSuccessMessage("Changes saved successfully!");
		} catch (error) {
			setUpdateError("Failed to save changes. Please try again.");
			console.error("Error updating lead:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	function handleCancelEdit() {
		setIsEditing(false);
		setErrors({});
		setUpdateError(null);
		setSuccessMessage(null);
		if (currentLead) {
			setFormData({
				email: currentLead.email,
				status: currentLead.status,
			});
		}
	}

	const handleFieldChange = (field: keyof EditLeadSchema, value: string | LeadStatus) => {
		const newFormData = { ...formData, [field]: value } as EditLeadSchema;
		setFormData(newFormData);
	};

	return (
		<SlideOverPanel
			className="bg-zinc-800 border-none"
			open={isSlideOverOpen}
			onClose={handleCloseSlideOver}
			title={currentLead ? `Lead Details - ${currentLead.name}` : "Lead Details"}
			size="lg"
		>
			{currentLead && (
				<form onSubmit={handleFormSubmit}>
					<SlideOverBody>
						{updateError && (
							<div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20">
								<p className="text-sm text-destructive font-medium">{updateError}</p>
							</div>
						)}
						{successMessage && (
							<div className="mb-4 p-3 rounded-md bg-green-500/10 border border-green-500/20">
								<p className="text-sm text-green-600 font-medium">{successMessage}</p>
							</div>
						)}
						<div className="space-y-3 md:space-y-6">
							<InformationCard title="Contact Information" icon={<Envelope className="w-5 h-5" />}>
								<CardItem label="Name" content={currentLead.name} />
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Email</p>
									{isEditing ? (
										<InlineEditEmail
											value={formData.email}
											onChange={(value) => handleFieldChange("email", value)}
											error={errors.email}
										/>
									) : (
										<p className="text-base font-medium text-input">{currentLead.email}</p>
									)}
								</div>
								<CardItem label="Company" content={currentLead.company} />
							</InformationCard>

							<InformationCard title="Lead Status" icon={<People className="w-5 h-5" />}>
								<CardItem label="Source" content={currentLead.source} />
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Status</p>
									{isEditing ? (
										<InlineEditSelect
											value={formData.status}
											onChange={(value) => handleFieldChange("status", value)}
											error={errors.status}
										/>
									) : (
										<Badge className={getStatusColor[currentLead.status]} variant="default">
											{currentLead.status}
										</Badge>
									)}
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Score</p>
									<Badge className={getScoreColor(currentLead.score)} variant="default">
										{currentLead.score}
									</Badge>
								</div>
							</InformationCard>
						</div>
					</SlideOverBody>

					<SlideOverFooter>
						<div className="flex justify-end gap-3 w-full">
							{isEditing ? (
								<>
									<Button
										className="flex-1"
										type="button"
										onClick={handleCancelEdit}
										variant="secondary"
										disabled={isUpdating}
									>
										<X className="w-6 h-6" />
										Cancel
									</Button>
									<Button className="flex-1" type="submit" variant="default" disabled={isUpdating}>
										<SdCard className="w-5 h-5" />
										{isUpdating ? "Saving..." : "Save Changes"}
									</Button>
								</>
							) : (
								<div className="flex flex-col gap-2 w-full">
									<Button
										className="w-full"
										onClick={handleStartEdit}
										variant="outline"
										type="button"
									>
										<Pencil className="w-5 h-5" />
										Edit Lead Details
									</Button>
									<ConvertLeadDialog lead={currentLead} />
								</div>
							)}
						</div>
					</SlideOverFooter>
				</form>
			)}
		</SlideOverPanel>
	);
}
