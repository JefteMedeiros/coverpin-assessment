import { Header } from "./components/header";
import { LeadFilters } from "./components/lead-filters";
import { LeadsTable } from "./components/leads-table";
import { StatsCards } from "./components/stats-cards";
import { LeadsProvider } from "./store/LeadsContext";

function App() {
	return (
		<LeadsProvider>
			<div className="bg-zinc-900 min-h-screen w-full">
				<div className="max-w-7xl mx-auto py-10 pt-0 space-y-4 p-3">
					<Header />
					<StatsCards />
					<div className="p-4 bg-zinc-800 space-y-4 rounded-lg">
						<LeadFilters />
						<LeadsTable />
					</div>
				</div>
			</div>
		</LeadsProvider>
	);
}

export default App;
