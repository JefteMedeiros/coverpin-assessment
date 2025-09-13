import leadsData from "@/assets/leads.json";
import type { LeadStatus } from "@/types/leads";
import { ArrowDownUp } from "./icons/arrow-down-up";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function LeadsTable() {
	const leads = leadsData.leads;
	const _statusColors: Record<LeadStatus, string> = {
		New: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
		Contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
		Qualified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
		Converted: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
	};

	return (
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
					{leads.slice(0, 10).map((lead) => (
						<TableRow key={lead.id}>
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
	);
}
