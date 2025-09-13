import { Bullseye } from "./icons/bullseye";
import { GraphUpArrow } from "./icons/graph-up-arrow";
import { People } from "./icons/people";

interface Props {
	title: string;
	value: string;
	change: string;
	icon: React.ReactNode;
}

function StatsCard({ title, value, change, icon }: Props) {
	const isPositive = change.startsWith('+');
	
	return (
		<div className="bg-zinc-800 rounded-lg p-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-md font-medium text-muted-foreground">{title}</h3>
				<div className="text-muted-foreground">
					{icon}
				</div>
			</div>
			<div className="space-y-2">
				<p className="text-2xl font-bold text-input">{value}</p>
				<p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
					{change}
				</p>
			</div>
		</div>
	);
}

export function StatsCards() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
