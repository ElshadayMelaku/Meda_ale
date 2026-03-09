"use client";

import React from 'react';
import { AppQueryProvider } from './QueryProvider';
import AppToaster from '@/src/components/ui/Toast';
import { AuthProvider } from './AuthProvider';

const RootProviders: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  return (
    <AppQueryProvider>
      <AuthProvider>
        {children}
        <AppToaster />
      </AuthProvider>
    </AppQueryProvider>
  );
};

export default RootProviders;
