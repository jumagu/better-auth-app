'use client';

import { useEffect } from 'react';

import { authClient } from '@/lib/auth-client';

export const UserEmailInformation = () => {
  // ? This is how you can get the user session on the client side
  // ? See: https://better-auth.com/docs/basic-usage#client-side
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    console.log({ session, isPending, error });
  }, [session, isPending, error]);

  return (
    <div className="shrink-0 text-right">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {session?.user?.name ?? 'Guest'}
      </p>
      <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
        {session?.user?.email ?? '--'}
      </p>
    </div>
  );
};
