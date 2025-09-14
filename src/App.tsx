import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import { Header } from "./components/header";
import { LeadsTable } from "./components/leads-table";
import { OpportunitiesTable } from "./components/opportunities-table";
import { StatsCards } from "./components/stats-cards";
import { DataProvider } from "./store/DataContext";

function App() {
	return (
		<DataProvider>
			<div className="bg-zinc-900 min-h-screen w-full">
				<TabGroup>
					<div className="max-w-7xl mx-auto py-10 pt-0 space-y-4 p-3">
						<Header />
						<StatsCards />
						<TabPanels>
							<TabPanel>
								<LeadsTable />
							</TabPanel>
							<TabPanel>
								<OpportunitiesTable />
							</TabPanel>
						</TabPanels>
					</div>
				</TabGroup>
			</div>
		</DataProvider>
	);
}

export default App;
