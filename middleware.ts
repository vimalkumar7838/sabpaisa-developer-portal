import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken, verifyToken } from '@/lib/auth/session';
import { addSecurityHeaders, isIpBlocked, validateCsrfToken, logSecurityEvent } from '@/lib/middleware/security';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');

  // Check if IP is blocked
  if (isIpBlocked(request)) {
    logSecurityEvent(request, 'BLOCKED_IP_ACCESS', { path: pathname })
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    )
  }
  
  // Validate CSRF for state-changing requests
  if (!validateCsrfToken(request)) {
    logSecurityEvent(request, 'CSRF_VALIDATION_FAILED', { path: pathname })
    return NextResponse.json(
      { error: 'Invalid request origin' },
      { status: 403 }
    )
  }

  let res = NextResponse.next();

  if (sessionCookie && request.method === 'GET') {
    try {
      const parsed = await verifyToken(sessionCookie.value);
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookies.set({
        name: 'session',
        value: await signToken({
          ...parsed,
          expires: expiresInOneDay.toISOString()
        }),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: expiresInOneDay
      });
    } catch (error) {
      console.error('Error updating session:', error);
      res.cookies.delete('session');
    }
  }

  // Add security headers to all responses
  res = addSecurityHeaders(res);
  
  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  runtime: 'nodejs'
};
