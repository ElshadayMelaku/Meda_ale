"use client";

import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn('mt-1 block w-full rounded-md border border-border bg-card px-3 py-2 text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring', className)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
