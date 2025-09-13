import LeadTabs from "./lead-tabs";

export function Header() {
	return (
		<header className="flex items-end gap-2 justify-between">
			<img className="w-[288px] h-16" src="./sales-hub.png" alt="Coverpin" />
			<LeadTabs />
		</header>
	);
}
