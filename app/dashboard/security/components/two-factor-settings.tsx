'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

import { TwoFactorSetup } from './two-factor-setup';
import { PasswordConfirmModal } from './password-confirm-modal';

type TwoFactorSettingsProps = {
  isEnabled?: boolean;
};

type SetupData = {
  totpUri: string;
  secretKey: string;
  backupCodes: string[];
};

export function TwoFactorSettings({
  isEnabled = false,
}: TwoFactorSettingsProps) {
  const router = useRouter();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalAction, setModalAction] = useState<'enable' | 'disable'>(
    'enable'
  );
  const [setupData, setSetupData] = useState<SetupData | null>(null);

  const handleOpenPasswordModal = (action: 'enable' | 'disable') => {
    setModalAction(action);
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => setShowPasswordModal(false);

  const handlePasswordConfirmed = async (password: string) => {
    if (modalAction === 'enable') {
      // call the authClient with the password and use its response
      const { data, error } = await authClient.twoFactor.enable({
        password: password,
        // issuer: 'Better Auth App', // ? (Optional) Already defined in the betterAuth instance within appName
      });

      console.info('2FA enable result:', { data, error });

      if (error) {
        alert(error.message ?? 'Something went wrong. Please try again.');
        return;
      }

      setSetupData({
        totpUri: data.totpURI,
        secretKey: 'JBSWY3DPEHPK3PXP',
        backupCodes: data.backupCodes,
      });
      setShowPasswordModal(false);

      return;
    }

    // * Disable
    const { data, error } = await authClient.twoFactor.disable({
      password: password,
    });

    console.info('2FA disable result:', { data, error });

    if (error) {
      alert(error.message ?? 'Something went wrong. Please try again.');
      return;
    }

    router.refresh();
    setShowPasswordModal(false);
  };

  const handleCancelSetup = () => setSetupData(null);

  const handleCompleteSetup = async (code: string) => {
    const { data, error } = await authClient.twoFactor.verifyTotp({
      code: code,
      trustDevice: false,
    });

    console.info('2FA verification result:', { data, error });

    if (error) {
      alert(error.message ?? 'Something went wrong. Please try again.');
      return;
    }

    setSetupData(null);
    router.refresh();
  };

  const modalCopy =
    modalAction === 'enable'
      ? {
          title: 'Confirm your password',
          description:
            "Before enabling two-step authentication, we need to verify it's you.",
          confirmLabel: 'Enable 2FA',
        }
      : {
          title: 'Confirm your password',
          description:
            "Before disabling two-step authentication, we need to verify it's you.",
          confirmLabel: 'Disable 2FA',
        };

  return (
    <div className="space-y-6">
      <StatusCard isEnabled={isEnabled} />

      {setupData ? (
        <TwoFactorSetup
          totpUri={setupData.totpUri}
          secretKey={setupData.secretKey}
          backupCodes={setupData.backupCodes}
          onComplete={handleCompleteSetup}
          onCancel={handleCancelSetup}
        />
      ) : !isEnabled ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Why enable 2FA?
          </h2>
          <ul className="mt-4 space-y-3">
            {[
              'Protects your account even if someone knows your password.',
              'Adds a second factor with an app like Google Authenticator or Authy.',
              'Reduces the risk of unauthorized access to your dashboard.',
            ].map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  aria-hidden
                >
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => handleOpenPasswordModal('enable')}
            className="mt-6 h-11 rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Enable two-step authentication
          </button>
        </section>
      ) : (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Two-step authentication is active on your account.
          </p>
          <button
            type="button"
            onClick={() => handleOpenPasswordModal('disable')}
            className="mt-4 h-11 rounded-lg border border-zinc-300 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Disable two-step authentication
          </button>
        </section>
      )}

      <PasswordConfirmModal
        isOpen={showPasswordModal}
        onClose={handleClosePasswordModal}
        onConfirm={handlePasswordConfirmed}
        title={modalCopy.title}
        description={modalCopy.description}
        confirmLabel={modalCopy.confirmLabel}
      />
    </div>
  );
}

function StatusCard({ isEnabled }: { isEnabled: boolean }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800"
            aria-hidden
          >
            <ShieldIcon />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Two-step authentication (2FA)
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {isEnabled
                ? 'Your account requires a verification code when signing in.'
                : 'Two-step authentication is not set up on your account.'}
            </p>
          </div>
        </div>
        <span
          className={
            isEnabled
              ? 'rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              : 'rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
          }
        >
          {isEnabled ? 'Active' : 'Disabled'}
        </span>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 text-zinc-700 dark:text-zinc-300"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}
