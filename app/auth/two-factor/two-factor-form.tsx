'use client';

import { useState, type SubmitEvent } from 'react';

import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';
import { OtpInput } from '../components/otp-input';

export function TwoFactorForm() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = await authClient.twoFactor.verifyTotp({
      code: code,
      trustDevice: false,
    });

    console.info('[Sign-in] 2FA verification result:', { data, error });

    if (error) {
      alert(error.message ?? 'Something went wrong. Please try again.');
      return;
    }

    router.replace('/dashboard');
  };

  const isComplete = code.length === 6;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label
          htmlFor="code"
          className="text-center text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Verification code
        </label>
        <OtpInput id="code" name="code" value={code} onChange={setCode} />
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          Enter the 6-character code from your authenticator app.
        </p>
      </div>

      <button
        type="submit"
        disabled={!isComplete}
        className="h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Verify
      </button>
    </form>
  );
}
