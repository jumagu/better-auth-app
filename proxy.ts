// See: https://nextjs.org/docs/app/getting-started/proxy

import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from './lib/auth';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: '/dashboard/:path*',
};
