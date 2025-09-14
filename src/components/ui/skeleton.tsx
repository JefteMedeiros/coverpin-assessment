interface SkeletonProps {
	className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
	return <div className={`animate-pulse bg-zinc-700 rounded ${className}`} />;
}
