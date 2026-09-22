'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'rounded-2xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-200 overflow-hidden',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/70', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-xs text-slate-400 dark:text-slate-500 mt-0.5', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-content" className={cn('p-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 py-3.5 bg-slate-50/60 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/70', className)}
      {...props}
    />
  );
}

function CardHeading({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-heading" className={cn('space-y-0.5', className)} {...props} />;
}

function CardToolbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-toolbar" className={cn('flex items-center gap-2', className)} {...props} />;
}

function CardTable({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-table" className={cn('p-0', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardHeading, CardTable, CardTitle, CardToolbar };
