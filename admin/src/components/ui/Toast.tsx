"use client";

import React from 'react';
import { Toaster } from 'react-hot-toast';

// Lightweight wrapper around react-hot-toast styled via Tailwind classes.
export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        // apply Tailwind classes to toasts
        className:
          'bg-slate-900 text-slate-100 border border-white/5 px-4 py-2 rounded-lg shadow-lg',
      }}
    />
  );
}
