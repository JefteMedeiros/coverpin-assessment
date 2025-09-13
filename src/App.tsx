import { useState } from "react";
import leadsData from "./assets/leads.json";
import { ArrowDownUp } from "./components/icons/arrow-down-up";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Option, Select, SelectContent, SelectTrigger } from "./components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./components/ui/table";
import type { LeadStatus } from "./types/leads";
import { cn } from "./utils/cn";

const people = [
	{ id: 1, name: "Tom Cook" },
	{ id: 2, name: "Wade Cooper" },
	{ id: 3, name: "Tanya Fox" },
];

const leads = leadsData.leads;

function App() {
	const [selected, setSelected] = useState(people[1]);

	const _handleSelect = (value: unknown) => {
		setSelected(value as { id: number; name: string });
	};

	const _statusColors: Record<LeadStatus, string> = {
		New: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
		Contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
		Qualified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
		Converted: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
	};

	const [selectedStatus, setSelectedStatus] = useState("all");

	return (
		<div className="h-screen w-screen bg-zinc-900">
			<div className="max-w-7xl mx-auto py-10 space-y-4">
				<div className="flex items-center gap-2 justify-between">
					<img className="w-[288px] h-16" src="./sales-hub.png" alt="Coverpin" />
					<div className="bg-zinc-700 flex gap-2 p-2 w-fit rounded-lg">
						<button
							className={cn(
								"h-10 bg-zinc-900 rounded-md text-white p-2",
								selectedStatus === "all" && "bg-zinc-500",
							)}
							type="button"
							onClick={() => setSelectedStatus("all")}
						>
							Leads
						</button>
						<button
							className={cn(
								"h-10 bg-zinc-900 rounded-md text-white p-2",
								selectedStatus === "qualified" && "bg-zinc-500",
							)}
							type="button"
							onClick={() => setSelectedStatus("qualified")}
						>
							Opportunities
						</button>
					</div>
				</div>
				<div className="p-4 bg-zinc-700 space-y-4 rounded-lg">
					<div className="flex items-center gap-2">
						<Input placeholder="Search by name or company..." />
						<Select value={selected} onChange={_handleSelect}>
							<SelectTrigger>{selected.name}</SelectTrigger>
							<SelectContent>
								{people.map((person) => (
									<Option key={person.id} value={person}>
										{person.name}
									</Option>
								))}
							</SelectContent>
						</Select>
					</div>
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
											<Badge 
                        className={_statusColors[lead.status as LeadStatus]} 
                        variant="default"
                      >
                        {lead.status}
                      </Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
