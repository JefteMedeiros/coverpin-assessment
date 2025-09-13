import { useState } from "react";
import leadsData from "@/assets/leads.json";
import type { Lead, LeadStatus } from "@/types/leads";
import { getStatusColor } from "@/utils/status-colors";
import { ArrowDownUp } from "./icons/arrow-down-up";
import { LeadInformationPanel } from "./lead-information-panel";
import { Badge } from "./ui/badge";
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
									<Badge className={getStatusColor[lead.status as LeadStatus]} variant="default">
										{lead.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<LeadInformationPanel
				isSlideOverOpen={isSlideOverOpen}
				handleCloseSlideOver={handleCloseSlideOver}
				selectedLead={selectedLead}
			/>
		</>
	);
}
