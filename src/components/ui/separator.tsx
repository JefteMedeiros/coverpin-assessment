import { cn } from "@/utils/cn";

interface Props {
  className?: string;
}

export function Separator({ className }: Props) {
  return (
    <div className={cn("w-full h-[1px] bg-zinc-700", className)} />
  )
}