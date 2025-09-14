import { Tab, TabList } from "@headlessui/react";
import { useData } from "@/store/DataContext";

const categories = [
	{
		name: "Leads",
	},
	{
		name: "Opportunities",
	},
];

export default function LeadTabs() {
	const { isLoading, error } = useData();

	return (
		<div className="w-full md:w-fit">
			<TabList className="flex gap-1.5 p-1 bg-zinc-700/50 rounded-lg">
				{categories.map(({ name }) => (
					<Tab
						disabled={isLoading || !!error}
						key={name}
						className="disabled:opacity-50 disabled:cursor-not-allowed rounded-md w-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-primary data-selected:text-zinc-900 data-selected:data-hover:bg-primary/90"
					>
						{name}
					</Tab>
				))}
			</TabList>
		</div>
	);
}
