import { Info } from "@/components/icons/info";

interface ErrorCardProps {
	title: string;
	message?: string;
	icon?: React.ReactNode;
	className?: string;
}

export function ErrorCard({ title, message, icon, className = "" }: ErrorCardProps) {
	return (
		<div className={`bg-zinc-900 border border-red-900/50 rounded-lg p-6 ${className}`}>
			<div className="flex items-start gap-3">
				<div className="text-red-400 mt-0.5">{icon || <Info className="w-5 h-5" />}</div>
				<div className="flex-1 space-y-3">
					<div>
						<h3 className="text-red-300 font-medium text-lg">{title}</h3>
						{message && <p className="text-red-200/80 text-base mt-1">{message}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}
