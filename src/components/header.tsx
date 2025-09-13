import LeadTabs from "./lead-tabs";

export function Header() {
	return (
		<header className="sticky md:static bg-zinc-900 py-8 z-10 md:pt-10 pb-4 top-0 left-0 w-full flex items-start md:items-end flex-col md:flex-row gap-2 justify-between">
			<img className="w-[200px] md:w-[288px]" src="./sales-hub.png" alt="Coverpin" />
			<LeadTabs />
		</header>
	);
}
