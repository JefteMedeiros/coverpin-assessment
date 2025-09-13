import { Bullseye } from "./icons/bullseye";
import { GraphUpArrow } from "./icons/graph-up-arrow";
import { People } from "./icons/people";
import { StatsCard } from "./ui/stats-card";



export function StatsCards() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
			<StatsCard
				title="Total Leads"
				value="1,234"
				change="+12% from last month"
				icon={
          <People className="w-5 h-5" />
        }
			/>
			<StatsCard
				title="Qualified"
				value="456"
				change="+8% from last month"
				icon={
          <Bullseye className="w-5 h-5"/>
        }
			/>
			<StatsCard
				title="Converted"
				value="89"
				change="+15% from last month"
				icon={
          <GraphUpArrow className="w-5 h-5"/>
        }
			/>
		</div>
	);
}
