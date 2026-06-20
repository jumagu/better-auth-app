import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

import { StatCard } from './components/stat-card';
import { UserEmailInformation } from './components/user-email-information';

const recentActivity = [
  {
    id: '1',
    action: 'New registration',
    detail: 'user@example.com',
    time: '5 min ago',
  },
  {
    id: '2',
    action: 'Sign in',
    detail: 'admin@example.com',
    time: '12 min ago',
  },
  {
    id: '3',
    action: 'Signed out',
    detail: 'guest@example.com',
    time: '1 h ago',
  },
  {
    id: '4',
    action: 'Password updated',
    detail: 'demo@example.com',
    time: '3 h ago',
  },
];

export default async function DashboardPage() {
  // ? This is how you can get the user session on the server side
  // ?  See: https://better-auth.com/docs/basic-usage#server-side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <header className="border-b border-zinc-200 bg-white px-8 py-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Overview
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              General overview of the application. The data is sample data for
              practicing the design.
            </p>
          </div>

          {/* User information */}
          <UserEmailInformation />
        </div>
      </header>

      <main className="flex-1 space-y-8 p-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Users" value="128" hint="+12 this week" />
          <StatCard
            label="Active sessions"
            value="24"
            hint="In the last 24 h"
          />
          <StatCard
            label="Registrations today"
            value="7"
            hint="Since midnight"
          />
          <StatCard
            label="OAuth providers"
            value="2"
            hint="Google and GitHub"
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Activity for: {session?.user?.name}
                </h2>
              </div>
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {recentActivity.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 px-6 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {item.action}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {item.detail}
                      </p>
                    </div>
                    <time className="shrink-0 text-xs text-zinc-500">
                      {item.time}
                    </time>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              System status
            </h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Auth API
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Operational
                </span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Database
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Connected
                </span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Better Auth
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  In setup
                </span>
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-zinc-500">
              When you integrate Better Auth, you can replace these values with
              real session and user data.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
