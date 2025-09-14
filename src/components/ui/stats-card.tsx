import { Skeleton } from "./skeleton";

interface Props {
	title: string;
	value?: string;
	change?: string;
	icon: React.ReactNode;
	isLoading?: boolean;
	error?: string | null;
}

export function StatsCard({ title, value, change, icon, isLoading = false, error = null }: Props) {
	const isPositive = change?.startsWith("+");

	if (error) {
		return (
			<div className="bg-zinc-800 rounded-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-md font-medium text-muted-foreground">{title}</h3>
					<div className="text-muted-foreground">{icon}</div>
				</div>
				<div className="space-y-2">
					<p className="text-sm text-red-500">Error: {error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-zinc-800 rounded-lg p-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-md font-medium text-muted-foreground">{title}</h3>
				<div className="text-muted-foreground">{icon}</div>
			</div>
			<div className="space-y-2">
				{isLoading ? (
					<>
						<Skeleton className="h-8 w-16" />
						<Skeleton className="h-4 w-24" />
					</>
				) : (
					<>
						<p className="text-2xl font-bold text-input">{value}</p>
						<p className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>{change}</p>
					</>
				)}
			</div>
		</div>
	);
}
