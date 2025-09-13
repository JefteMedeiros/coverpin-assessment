import { cn } from "@/utils/cn"

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-zinc-800 placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary-foreground dark:bg-input/30 border-zinc-500 flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base text-input shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}
