import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'

import { Fragment, type ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { X } from '../icons/x'

interface SlideOverPanelProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

export function SlideOverPanel({
  open,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: SlideOverPanelProps) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel
                  className={cn(
                    'pointer-events-auto w-screen',
                    sizeClasses[size]
                  )}
                >
                  <div
                    className={cn(
                      'flex h-full flex-col overflow-y-scroll bg-card shadow-xl border-l border-border',
                      className
                    )}
                  >
                    {title && (
                      <div className="px-6 py-4 border-b border-border">
                        <div className="flex items-center justify-between">
                          <DialogTitle className="text-lg font-semibold text-input">
                            {title}
                          </DialogTitle>
                          <button
                            type="button"
                            className="rounded-md p-2 text-muted-foreground hover:text-card-foreground hover:bg-muted transition-colors"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className='w-6 h-6' />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex-1 px-6 py-4">
                      {children}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export function SlideOverHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mb-6', className)}>
      {children}
    </div>
  )
}

export function SlideOverBody({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex-1', className)}>
      {children}
    </div>
  )
}

export function SlideOverFooter({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)}>
      {children}
    </div>
  )
}
