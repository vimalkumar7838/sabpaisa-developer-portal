'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock,
  Globe,
  User,
  Loader2,
  RefreshCw
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface SecurityEvent {
  timestamp: string
  type: string
  ip: string
  userAgent: string
  path: string
  details?: any
}

interface SecurityData {
  events: SecurityEvent[]
  total: number
  summary: {
    rateLimitViolations: number
    suspiciousRequests: number
    apiErrors: number
    lastHour: number
  }
}

const eventTypeColors = {
  'RATE_LIMIT_EXCEEDED': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'SUSPICIOUS_REQUEST': 'bg-red-100 text-red-800 border-red-200',
  'API_ERROR': 'bg-orange-100 text-orange-800 border-orange-200',
  'BLOCKED_IP_ACCESS': 'bg-red-100 text-red-800 border-red-200',
  'CSRF_VALIDATION_FAILED': 'bg-purple-100 text-purple-800 border-purple-200',
  'DEFAULT': 'bg-gray-100 text-gray-800 border-gray-200'
}

function SecurityEventCard({ event }: { event: SecurityEvent }) {
  const colorClass = eventTypeColors[event.type as keyof typeof eventTypeColors] || eventTypeColors.DEFAULT
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-sm font-medium">
                {event.type.replace(/_/g, ' ')}
              </CardTitle>
              <CardDescription className="text-xs">
                {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
              </CardDescription>
            </div>
          </div>
          <Badge className={`text-xs ${colorClass}`}>
            {event.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">IP:</span>
            <code className="bg-muted px-2 py-1 rounded text-xs">{event.ip}</code>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Path:</span>
            <code className="bg-muted px-2 py-1 rounded text-xs">{event.path}</code>
          </div>
        </div>
        {event.userAgent && (
          <div className="mt-3 text-sm">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">User Agent:</span>
            </div>
            <code className="bg-muted px-2 py-1 rounded text-xs block break-all">
              {event.userAgent}
            </code>
          </div>
        )}
        {event.details && (
          <div className="mt-3 text-sm">
            <span className="font-medium">Details:</span>
            <pre className="bg-muted px-3 py-2 rounded text-xs mt-1 overflow-x-auto">
              {JSON.stringify(event.details, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SecuritySummary({ summary }: { summary: SecurityData['summary'] }) {
  const stats = [
    {
      title: 'Rate Limit Violations',
      value: summary.rateLimitViolations,
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Suspicious Requests', 
      value: summary.suspiciousRequests,
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'API Errors',
      value: summary.apiErrors,
      icon: Activity,
      color: 'text-orange-600'
    },
    {
      title: 'Last Hour Activity',
      value: summary.lastHour,
      icon: TrendingUp,
      color: 'text-blue-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function SecurityDashboard() {
  const [securityData, setSecurityData] = useState<SecurityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSecurityData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/security/events')
      
      if (!response.ok) {
        throw new Error('Failed to fetch security data')
      }
      
      const data = await response.json()
      setSecurityData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSecurityData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchSecurityData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !securityData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading security data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {error}. <Button variant="link" onClick={fetchSecurityData} className="p-0 h-auto">Try again</Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Security Dashboard</h1>
              <p className="text-muted-foreground">Monitor security events and system protection status</p>
            </div>
          </div>
          <Button 
            onClick={fetchSecurityData} 
            disabled={loading}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {securityData && (
        <>
          {/* Summary Stats */}
          <SecuritySummary summary={securityData.summary} />

          {/* Security Events */}
          <Tabs defaultValue="recent" className="space-y-6">
            <TabsList>
              <TabsTrigger value="recent">Recent Events</TabsTrigger>
              <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
              <TabsTrigger value="suspicious">Suspicious Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Security Events</CardTitle>
                  <CardDescription>
                    Last {securityData.events.length} security events (most recent first)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {securityData.events.length === 0 ? (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 mx-auto text-green-600 mb-4" />
                      <h3 className="text-lg font-semibold text-green-600 mb-2">All Clear!</h3>
                      <p className="text-muted-foreground">No security events detected recently.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {securityData.events.map((event, index) => (
                        <SecurityEventCard key={index} event={event} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rate-limits">
              <Card>
                <CardHeader>
                  <CardTitle>Rate Limit Violations</CardTitle>
                  <CardDescription>
                    Requests that exceeded rate limits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityData.events
                      .filter(event => event.type === 'RATE_LIMIT_EXCEEDED')
                      .map((event, index) => (
                        <SecurityEventCard key={index} event={event} />
                      ))}
                    {securityData.events.filter(event => event.type === 'RATE_LIMIT_EXCEEDED').length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No rate limit violations detected.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suspicious">
              <Card>
                <CardHeader>
                  <CardTitle>Suspicious Activity</CardTitle>
                  <CardDescription>
                    Potentially malicious or unusual requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityData.events
                      .filter(event => 
                        event.type === 'SUSPICIOUS_REQUEST' || 
                        event.type === 'BLOCKED_IP_ACCESS' || 
                        event.type === 'CSRF_VALIDATION_FAILED'
                      )
                      .map((event, index) => (
                        <SecurityEventCard key={index} event={event} />
                      ))}
                    {securityData.events.filter(event => 
                      event.type === 'SUSPICIOUS_REQUEST' || 
                      event.type === 'BLOCKED_IP_ACCESS' || 
                      event.type === 'CSRF_VALIDATION_FAILED'
                    ).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No suspicious activity detected.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}