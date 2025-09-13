import { useState } from "react";
import { cn } from "@/utils/cn";

export function Header() {
	const [selectedStatus, setSelectedStatus] = useState("all");

	return (
		<header className="flex items-center gap-2 justify-between">
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
		</header>
	);
}
