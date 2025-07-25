'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import Link from 'next/link'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error('Application error:', error)
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // sendErrorReport(error)
    }
  }, [error])

  const isNetworkError = error.message.includes('fetch') || error.message.includes('network')
  const isAPIError = error.message.includes('API') || error.message.includes('500')

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl text-destructive">
            {isNetworkError ? 'Connection Error' : isAPIError ? 'Server Error' : 'Something went wrong'}
          </CardTitle>
          <CardDescription className="text-base">
            {isNetworkError 
              ? 'Unable to connect to our servers. Please check your internet connection.'
              : isAPIError 
              ? 'Our servers are experiencing issues. Please try again in a few moments.'
              : 'An unexpected error occurred while loading the application.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error details in development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="text-sm bg-muted p-4 rounded-lg border">
              <summary className="cursor-pointer font-medium mb-2 flex items-center gap-2">
                <Bug className="h-4 w-4" />
                Error Details (Development)
              </summary>
              <div className="mt-2 space-y-2">
                <div>
                  <strong>Message:</strong> {error.message}
                </div>
                {error.digest && (
                  <div>
                    <strong>Digest:</strong> {error.digest}
                  </div>
                )}
                {error.stack && (
                  <pre className="text-xs overflow-auto whitespace-pre-wrap bg-background p-2 rounded mt-2 max-h-40">
                    {error.stack}
                  </pre>
                )}
              </div>
            </details>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>

          {/* Help text */}
          <div className="text-center text-sm text-muted-foreground">
            If this problem persists, please{' '}
            <Link href="/community" className="text-primary hover:underline">
              contact our support team
            </Link>
            {' '}for assistance.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}