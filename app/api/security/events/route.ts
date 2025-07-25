import { NextRequest, NextResponse } from 'next/server'
import { getSecurityEvents, addApiSecurityHeaders, logSecurityEvent } from '@/lib/middleware/security'
import { rateLimits } from '@/lib/middleware/rate-limit'
import { getUser } from '@/lib/db/queries'

export async function GET(request: NextRequest) {
  try {
    // Apply strict rate limiting for security endpoints
    const rateLimitResult = rateLimits.strict(request)
    if (rateLimitResult) {
      logSecurityEvent(request, 'RATE_LIMIT_EXCEEDED', { endpoint: 'security-events' })
      return rateLimitResult
    }

    // Check if user is authenticated (in a real app, you'd also check for admin role)
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      )
    }

    const events = getSecurityEvents()
    
    // Return last 100 events for security monitoring
    const recentEvents = events.slice(-100).reverse()
    
    const response = NextResponse.json({
      events: recentEvents,
      total: events.length,
      summary: {
        rateLimitViolations: events.filter(e => e.type === 'RATE_LIMIT_EXCEEDED').length,
        suspiciousRequests: events.filter(e => e.type === 'SUSPICIOUS_REQUEST').length,
        apiErrors: events.filter(e => e.type === 'API_ERROR').length,
        lastHour: events.filter(e => 
          new Date().getTime() - e.timestamp.getTime() < 60 * 60 * 1000
        ).length
      }
    })

    return addApiSecurityHeaders(response)
  } catch (err: unknown) {
    console.error('Security events API error:', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    logSecurityEvent(request, 'API_ERROR', { error: errorMessage, endpoint: 'security-events' })
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
    return addApiSecurityHeaders(response)
  }
}