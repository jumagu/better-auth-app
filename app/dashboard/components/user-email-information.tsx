'use client';

const placeholderUser = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
};

export const UserEmailInformation = () => {
  return (
    <div className="shrink-0 text-right">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {placeholderUser.name}
      </p>
      <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
        {placeholderUser.email}
      </p>
    </div>
  );
};
