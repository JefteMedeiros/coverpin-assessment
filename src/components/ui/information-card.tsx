interface CardItemProps {
	label: string;
	content: string;
	className?: string;
}

export function CardItem({ label, content, className = "" }: CardItemProps) {
	return (
		<div className={`space-y-1 ${className}`}>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-base font-medium text-input">{content}</p>
		</div>
	);
}

interface InformationCardProps {
	title: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

export function InformationCard({ title, icon, children, className = "" }: InformationCardProps) {
	return (
		<div className={`bg-zinc-700 rounded-lg p-6 ${className}`}>
			<div className="flex items-center gap-3 mb-4">
				{icon && <div className="text-muted-foreground">{icon}</div>}
				<h3 className="text-lg font-semibold text-input">{title}</h3>
			</div>
			<div className="space-y-4">{children}</div>
		</div>
	);
}
