"use client";

import * as React from "react";
import { cn } from '@/src/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'destructive';
}

const variantClass = {
  default: 'bg-sky-600 hover:bg-sky-700 text-white',
  ghost: 'bg-transparent hover:bg-slate-800 text-slate-100',
  destructive: 'bg-rose-600 hover:bg-rose-700 text-white',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant='default', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn('inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium', variantClass[variant], className)}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;
