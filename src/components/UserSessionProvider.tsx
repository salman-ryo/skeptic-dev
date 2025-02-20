'use client';

import { getBaseUrl } from '@/utils/getBaseUrl';
import { SessionProvider } from 'next-auth/react';

export default function UserSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider basePath={`/api/auth`}>{children}</SessionProvider>;
}