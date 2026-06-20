'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/security', label: 'Security' },
  { href: '#', label: 'Users' },
  { href: '#', label: 'Sessions' },
  { href: '#', label: 'Settings' },
];

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    console.log('Signing user out...');

    const { data, error } = await authClient.signOut();

    if (error) {
      alert('Error while signing out.');
    }

    console.log({ data });
    router.replace('/');

    // * Another way using fetchOptions callbacks
    // await authClient.signOut({
    //   fetchOptions: {
    //     onSuccess: () => {
    //       router.repalce('/'); // redirect to home page
    //     },
    //   },
    // });
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-8 px-2">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Admin
        </p>
        <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Dashboard
        </p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                isActive
                  ? 'rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
                  : 'rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
        >
          Back to home
        </Link>
        <Link
          href="/auth/login"
          className="mt-1 block rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
        >
          Sign in
        </Link>
        <button
          type="button"
          className="mt-2 block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
