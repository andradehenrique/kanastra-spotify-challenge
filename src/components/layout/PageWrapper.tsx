import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export function PageWrapper({ children, className, maxWidth = '2xl' }: PageWrapperProps) {
  return (
    <main
      className={cn(
        'container mx-auto flex-1 px-4 py-6 md:p-8',
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </main>
  );
}
