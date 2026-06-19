'use client';

import type { SubmitEvent } from 'react';
import { AuthDivider } from '../components/auth-divider';
import { AuthField } from '../components/auth-field';
import { SocialSignInButtons } from '../components/social-sign-in-buttons';

export function RegisterForm() {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Register:', { name, email, password });
  }

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
