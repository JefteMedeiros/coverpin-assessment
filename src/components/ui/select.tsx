import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { cn } from "@/utils/cn";
import { CheckIcon } from "../icons/check";
import { ChevronDown } from "../icons/chevron-down";

interface SelectProps extends React.ComponentProps<typeof Listbox> {
  className?: string;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <Listbox {...props}>
      {children}
    </Listbox>
  );
}

interface SelectTriggerProps extends React.ComponentProps<typeof ListboxButton> {
  className?: string;
}

export function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  return (
    <ListboxButton
      className={cn(
        "placeholder:text-muted-foreground bg-zinc-800 dark:bg-input/30 border-zinc-500 flex items-center h-10 w-full min-w-0 rounded-md border px-3 py-1 text-base text-input shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "relative pr-8 text-left cursor-default",
        className
      )}
      {...props}
    >
      {typeof children === 'function' ? children : (
        <>
          {children}
          <ChevronDown className="pointer-events-none absolute top-2.5 right-2.5 size-4 text-muted-foreground" />
        </>
      )}
    </ListboxButton>
  );
}

interface SelectContentProps extends React.ComponentProps<typeof ListboxOptions> {
  className?: string;
}

export function SelectContent({ className, children, ...props }: SelectContentProps) {
  return (
    <ListboxOptions
      anchor="bottom"
      transition
      className={cn(
        "w-[var(--button-width)] rounded-md border border-zinc-500 bg-zinc-800 p-1 [--anchor-gap:4px] focus:outline-none shadow-md z-50",
        "transition duration-100 ease-in data-leave:data-closed:opacity-0 data-leave:data-closed:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </ListboxOptions>
  );
}

interface OptionProps extends React.ComponentProps<typeof ListboxOption> {
  className?: string;
}

export function Option({ className, children, ...props }: OptionProps) {
  return (
    <ListboxOption
      className={cn(
        "group text-input flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 select-none text-sm outline-none data-focus:bg-accent data-focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      {typeof children === 'function' ? children : (
        <>
          <CheckIcon className="invisible size-4 group-data-selected:visible" />
          <div>{children}</div>
        </>
      )}
    </ListboxOption>
  );
}
