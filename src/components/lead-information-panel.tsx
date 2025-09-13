import type { Lead, LeadStatus } from "@/types/leads";
import { getStatusColor } from "@/utils/status-colors";
import { Badge } from "./ui/badge";
import { SlideOverBody, SlideOverFooter, SlideOverHeader, SlideOverPanel } from "./ui/slide-over-panel";

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
	return (
		<SlideOverPanel
			open={isSlideOverOpen}
			onClose={handleCloseSlideOver}
			title={selectedLead ? `Lead Details - ${selectedLead.name}` : "Lead Details"}
			size="lg"
		>
			{selectedLead && (
				<>
					<SlideOverHeader>
						<div className="flex items-center gap-4">
							<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
								<span className="text-lg font-semibold text-primary">
									{selectedLead.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</span>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-card-foreground">{selectedLead.name}</h3>
								<p className="text-sm text-muted-foreground">{selectedLead.company}</p>
							</div>
						</div>
					</SlideOverHeader>

					<SlideOverBody>
						<div className="space-y-6">
							<div>
								<h4 className="text-sm font-medium text-card-foreground mb-3">
									Contact Information
								</h4>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-sm text-muted-foreground">Email</span>
										<span className="text-sm text-card-foreground">{selectedLead.email}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-muted-foreground">Company</span>
										<span className="text-sm text-card-foreground">{selectedLead.company}</span>
									</div>
								</div>
							</div>

							<div>
								<h4 className="text-sm font-medium text-card-foreground mb-3">Lead Details</h4>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-sm text-muted-foreground">Source</span>
										<Badge variant="outline">{selectedLead.source}</Badge>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-muted-foreground">Score</span>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium text-card-foreground">
												{selectedLead.score}
											</span>
											<div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
												<div
													className="h-full bg-primary rounded-full transition-all"
													style={{ width: `${selectedLead.score}%` }}
												/>
											</div>
										</div>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-muted-foreground">Status</span>
										<Badge
											className={getStatusColor[selectedLead.status as LeadStatus]}
											variant="default"
										>
											{selectedLead.status}
										</Badge>
									</div>
								</div>
							</div>

							<div>
								<h4 className="text-sm font-medium text-card-foreground mb-3">Notes</h4>
								<textarea
									placeholder="Add notes about this lead..."
									className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring resize-none"
								/>
							</div>
						</div>
					</SlideOverBody>

					<SlideOverFooter>
						<button
							type="button"
							onClick={handleCloseSlideOver}
							className="rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
						>
							Close
						</button>
						<div className="flex gap-2">
							<button
								type="button"
								className="rounded-md bg-secondary px-4 py-2 text-sm text-secondary-foreground hover:bg-secondary/90 transition-colors"
							>
								Contact
							</button>
							<button
								type="button"
								className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
							>
								Convert
							</button>
						</div>
					</SlideOverFooter>
				</>
			)}
		</SlideOverPanel>
	);
}
