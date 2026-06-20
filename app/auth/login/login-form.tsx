'use client';

import type { SubmitEvent } from 'react';

import { authClient } from '@/lib/auth-client';

import { AuthField } from '../components/auth-field';
import { AuthDivider } from '../components/auth-divider';
import { SocialSignInButtons } from '../components/social-sign-in-buttons';

export function LoginForm() {
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { data, error } = await authClient.signIn.email(
      {
        email, // The user email
        password, // The user password
        callbackURL: '/dashboard', // * A URL to redirect to after the user verifies their email (optional)
        rememberMe: false, // remember the user session after the browser is closed. (default: true)
      },
      {
        // * Callbacks
        onRequest: (ctx) => {
          console.log('Triggered sign in request:', { ctx });
          // show loading
        },
        onSuccess: (ctx) => {
          console.log('Signed in successfully:', { ctx });
          // redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          console.log('Sign in error:', { ctx });
          // display the error message
          alert(ctx.error.message);
        },
      }
    );

    console.log('Sign in result:', { data, error });
  };

  return (
    <>
      <SocialSignInButtons />
      <AuthDivider />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Sign in
        </button>
      </form>
    </>
  );
}
