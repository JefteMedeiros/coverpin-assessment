import { useState } from "react";
import leadsData from "@/assets/leads.json";
import type { Lead, LeadStatus } from "@/types/leads";
import { ArrowDownUp } from "./icons/arrow-down-up";
import { Badge } from "./ui/badge";
import {
	SlideOverBody,
	SlideOverFooter,
	SlideOverHeader,
	SlideOverPanel,
} from "./ui/slide-over-panel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function LeadsTable() {
	const leads = leadsData.leads;
	const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
	const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

	const handleLeadClick = (lead: Lead) => {
		setSelectedLead(lead);
		setIsSlideOverOpen(true);
	};

	const handleCloseSlideOver = () => {
		setIsSlideOverOpen(false);
		setSelectedLead(null);
	};
	const _statusColors: Record<LeadStatus, string> = {
		New: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
		Contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
		Qualified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
		Converted: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
	};

	return (
		<>
			<div className="rounded-md border border-zinc-500 bg-zinc-800">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Company</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Source</TableHead>
							<TableHead className="flex items-center gap-2">
								Score
								<button type="button">
									<ArrowDownUp className="w-4 h-4" />
								</button>
							</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{leads.map((lead) => (
							<TableRow
								key={lead.id}
								className="cursor-pointer hover:bg-muted/50 transition-colors"
								onClick={() => handleLeadClick(lead as Lead)}
							>
								<TableCell>{lead.name}</TableCell>
								<TableCell>{lead.company}</TableCell>
								<TableCell>{lead.email}</TableCell>
								<TableCell>
									<Badge variant="outline">{lead.source}</Badge>
								</TableCell>
								<TableCell>{lead.score}</TableCell>
								<TableCell>
									<Badge className={_statusColors[lead.status as LeadStatus]} variant="default">
										{lead.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

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
									<h3 className="text-lg font-semibold text-card-foreground">
										{selectedLead.name}
									</h3>
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
												className={_statusColors[selectedLead.status as LeadStatus]}
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
		</>
	);
}
