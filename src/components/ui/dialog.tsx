import {
	DialogPanel,
	Dialog as HeadlessDialog,
	DialogTitle as HeadlessDialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { createContext, Fragment, type ReactNode, useContext, useState } from "react";
import { cn } from "@/utils/cn";
import { X } from "../icons/x";
import { Button } from "./button";

interface DialogContextType {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

function useDialog() {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("Dialog components must be used within a Dialog");
	}
	return context;
}

interface DialogProps {
	children: ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function Dialog({
	children,
	defaultOpen = false,
	open: controlledOpen,
	onOpenChange,
}: DialogProps) {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);

	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const onOpen = onOpenChange || setInternalOpen;

	return (
		<DialogContext.Provider value={{ open, onOpenChange: onOpen }}>
			{children}
		</DialogContext.Provider>
	);
}

interface DialogTriggerProps {
	children: ReactNode;
	asChild?: boolean;
	className?: string;
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "default" | "sm" | "lg" | "icon";
}

export function DialogTrigger({
	children,
	asChild,
	className,
	variant,
	size,
	...props
}: DialogTriggerProps) {
	const { onOpenChange } = useDialog();

	if (asChild) {
		return (
			<button type="button" onClick={() => onOpenChange(true)} className={className} {...props}>
				{children}
			</button>
		);
	}

	return (
		<Button
      type="button"
			onClick={() => onOpenChange(true)}
			className={className}
			variant={variant}
			size={size}
			{...props}
		>
			{children}
		</Button>
	);
}

interface DialogContentProps {
	children: ReactNode;
	className?: string;
	size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
};

export function DialogContent({ children, className, size = "md" }: DialogContentProps) {
	const { open, onOpenChange } = useDialog();

	return (
		<Transition show={open} as={Fragment}>
			<HeadlessDialog as="div" className="relative z-50" onClose={() => onOpenChange(false)}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/10 backdrop-blur-xs" />
				</TransitionChild>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPanel
								className={cn(
									"w-full rounded-lg bg-card border border-border shadow-lg",
									sizeClasses[size],
									className,
								)}
							>
								{children}
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</HeadlessDialog>
		</Transition>
	);
}

interface DialogHeaderProps {
	children: ReactNode;
	className?: string;
	showClose?: boolean;
}

export function DialogHeader({ children, className, showClose = true }: DialogHeaderProps) {
	const { onOpenChange } = useDialog();

	return (
		<div className={cn("flex items-center justify-between p-6 pb-4", className)}>
			<div className="flex-1">{children}</div>
			{showClose && (
				<button
					type="button"
					className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
					onClick={() => onOpenChange(false)}
				>
					<span className="sr-only">Close dialog</span>
					<X className="w-4 h-4" />
				</button>
			)}
		</div>
	);
}

interface DialogTitleProps {
	children: ReactNode;
	className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
	return (
		<HeadlessDialogTitle as="h2" className={cn("text-lg font-semibold text-foreground", className)}>
			{children}
		</HeadlessDialogTitle>
	);
}

interface DialogBodyProps {
	children: ReactNode;
	className?: string;
}

export function DialogBody({ children, className }: DialogBodyProps) {
	return <div className={cn("px-6 py-2", className)}>{children}</div>;
}

interface DialogFooterProps {
	children: ReactNode;
	className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
	return (
		<div
			className={cn("flex flex-col-reverse gap-2 p-6 pt-4 sm:flex-row sm:justify-end", className)}
		>
			{children}
		</div>
	);
}
