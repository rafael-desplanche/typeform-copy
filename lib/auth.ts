import { cookies } from 'next/headers';

export const AUTH_COOKIE = 'internal_auth';

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === '1';
}

export function getInternalPassword() {
  return process.env.INTERNAL_PASSWORD || 'changeme';
}
