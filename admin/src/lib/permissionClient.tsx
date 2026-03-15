"use client";

import React from 'react';
import { useAuth } from '@/src/providers/AuthProvider';
import { hasPermission as permsHas } from './permissions';
import type { Permission } from '@/src/types/models';

export function useHasPermission(permission: Permission) {
  const { user, permissions } = useAuth();
  if (!user) return false;
  if (!permissions) {
    // Fallback: if no explicit permissions, check role equals super admin id (4)
    return user.role_id === 4;
  }
  return permsHas(permissions, permission);
}

// HOC that only renders the component when permission is present
export function withPermission<P extends object>(Component: React.ComponentType<P>, permission: Permission) {
  return function WithPermissionWrapper(props: P) {
    const { user, permissions } = useAuth();
    if (!user) return null;
    const ok = permissions ? permsHas(permissions, permission) : user.role_id === 4;
    if (!ok) return null;
    return <Component {...props} />;
  };
}
