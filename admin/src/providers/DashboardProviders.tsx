"use client";

import React from 'react';
import { AuthProvider } from './AuthProvider';
import { AppQueryProvider } from './QueryProvider';

const DashboardProviders: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  return (
    <AuthProvider>
      <AppQueryProvider>{children}</AppQueryProvider>
    </AuthProvider>
  );
};

export default DashboardProviders;
