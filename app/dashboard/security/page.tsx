import { UserEmailInformation } from '../components/user-email-information';
import { TwoFactorSettings } from './components/two-factor-settings';

export const metadata = {
  title: 'Security — Dashboard',
};

export default function SecurityPage() {
  return (
    <>
      <header className="border-b border-zinc-200 bg-white px-8 py-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Security
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Manage two-step authentication and other options for protecting
              your account.
            </p>
          </div>

          <UserEmailInformation />
        </div>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-3xl">
          <TwoFactorSettings />
        </div>
      </main>
    </>
  );
}
