import { useMemo } from "react";
import { useData } from "@/store/DataContext";
import { LeadStatus } from "@/types/leads";
import { Bullseye } from "./icons/bullseye";
import { GraphUpArrow } from "./icons/graph-up-arrow";
import { People } from "./icons/people";
import { ErrorCard } from "./ui/error-card";
import { StatsCard } from "./ui/stats-card";

export function StatsCards() {
	const { rawData: leads, isLoading, error } = useData();

	const stats = useMemo(() => {
		if (!leads || error) return { total: "0", qualified: "0", converted: "0" };

		const statusCounts = leads.reduce(
			(acc, lead) => {
				acc[lead.status] = (acc[lead.status] || 0) + 1;
				return acc;
			},
			{} as Record<LeadStatus, number>,
		);

		return {
			total: leads.length.toString(),
			qualified: (statusCounts[LeadStatus.QUALIFIED] || 0).toString(),
			converted: (statusCounts[LeadStatus.CONVERTED] || 0).toString(),
		};
	}, [leads, error]);

	const cardConfigs = [
		{
			title: "Total Leads",
			value: stats.total,
			change: "+12% from last month",
			icon: <People className="w-5 h-5" />,
		},
		{
			title: "Qualified",
			value: stats.qualified,
			change: "+8% from last month",
			icon: <Bullseye className="w-5 h-5" />,
		},
		{
			title: "Converted",
			value: stats.converted,
			change: "+15% from last month",
			icon: <GraphUpArrow className="w-5 h-5" />,
		},
	];

	if (error) {
		return (
			<ErrorCard
				title="Unable to load statistics"
				message="There was an issue retrieving the lead statistics. Please try refreshing the page."
			/>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
			{cardConfigs.map((config) => (
				<StatsCard
					error={error}
					key={config.title}
					title={config.title}
					value={config.value}
					change={config.change}
					icon={config.icon}
					isLoading={isLoading}
				/>
			))}
		</div>
	);
}
