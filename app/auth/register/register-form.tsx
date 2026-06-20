'use client';

import type { SubmitEvent } from 'react';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

import { AuthField } from '../components/auth-field';
import { AuthDivider } from '../components/auth-divider';
import { SocialSignInButtons } from '../components/social-sign-in-buttons';

export function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { data, error } = await authClient.signUp.email(
      {
        name, // user display name
        email, // user email address
        password, // user password -> min 8 characters by default
        callbackURL: '/dashboard', // * A URL to redirect to after the user verifies their email (optional)
      },
      {
        // * Callbacks
        onRequest: (ctx) => {
          console.log('Triggered sign up request:', { ctx });
          // show loading
        },
        onSuccess: (ctx) => {
          console.log('Signed up successfully:', { ctx });
          // redirect to the dashboard or sign in page
          router.push('/'); // ? Should redirect to a verify email page
        },
        onError: (ctx) => {
          // display the error message
          console.log('Sign up error:', { ctx });
          alert(ctx.error.message);
        },
      }
    );

    console.log('Sign up result:', { data, error });
  };

  return (
    <>
      <SocialSignInButtons />
      <AuthDivider />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthField
          id="name"
          label="Name"
          type="text"
          name="name"
          autoComplete="name"
        />
        <AuthField
          id="email"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Sign up
        </button>
      </form>
    </>
  );
}
