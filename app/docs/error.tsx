'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home, FileText } from 'lucide-react'
import Link from 'next/link'

interface DocsErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DocsErrorPage({ error, reset }: DocsErrorPageProps) {
  useEffect(() => {
    console.error('Documentation error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-lg">Documentation Error</CardTitle>
          <CardDescription>
            Unable to load the documentation content. This might be due to a temporary issue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <details className="text-sm bg-muted p-3 rounded border">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
                {error.toString()}
              </pre>
            </details>
          )}
          
          <div className="flex gap-2 justify-center">
            <Button onClick={reset} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
            <Button asChild size="sm">
              <Link href="/docs">
                <FileText className="mr-2 h-4 w-4" />
                Browse Docs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}