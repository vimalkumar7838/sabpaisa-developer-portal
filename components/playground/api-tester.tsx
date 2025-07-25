'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/ui/code-block'
import { 
  Play, 
  Copy, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Code
} from 'lucide-react'

interface ApiEndpoint {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
  title: string
  description: string
  category: string
  requiresAuth: boolean
  samplePayload?: any
  sampleResponse?: any
}

const apiEndpoints: ApiEndpoint[] = [
  {
    id: 'create-payment',
    method: 'POST',
    endpoint: '/api/v1/payments/create',
    title: 'Create Payment',
    description: 'Initiate a new payment request',
    category: 'payments',
    requiresAuth: true,
    samplePayload: {
      amount: 100000,
      currency: 'INR',
      orderId: 'order_123456',
      customerInfo: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210'
      },
      returnUrl: 'https://yourapp.com/success',
      webhookUrl: 'https://yourapp.com/webhook'
    },
    sampleResponse: {
      success: true,
      paymentId: 'pay_abc123',
      paymentUrl: 'https://checkout.sabpaisa.com/pay/abc123',
      status: 'pending'
    }
  },
  {
    id: 'payment-status',
    method: 'GET',
    endpoint: '/api/v1/payments/{paymentId}/status',
    title: 'Payment Status',
    description: 'Check the status of a payment',
    category: 'payments',
    requiresAuth: true,
    sampleResponse: {
      paymentId: 'pay_abc123',
      status: 'completed',
      amount: 100000,
      currency: 'INR',
      completedAt: '2024-01-15T10:30:00Z'
    }
  },
  {
    id: 'create-mandate',
    method: 'POST',
    endpoint: '/api/v1/enach/mandates/create',
    title: 'Create E-NACH Mandate',
    description: 'Set up recurring payment mandate',
    category: 'enach',
    requiresAuth: true,
    samplePayload: {
      customerId: 'cust_12345',
      amount: 99900,
      frequency: 'monthly',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      customerInfo: {
        name: 'John Doe',
        email: 'john@example.com',
        bankAccount: {
          accountNumber: '1234567890',
          ifscCode: 'HDFC0001234'
        }
      }
    },
    sampleResponse: {
      mandateId: 'mandate_xyz789',
      status: 'pending',
      approvalUrl: 'https://enach.sabpaisa.com/approve/xyz789'
    }
  },
  {
    id: 'create-payment-link',
    method: 'POST',
    endpoint: '/api/v1/payment-links/create',
    title: 'Create Payment Link',
    description: 'Generate instant payment link',
    category: 'payment-links',
    requiresAuth: true,
    samplePayload: {
      amount: 25000,
      currency: 'INR',
      description: 'Payment for Invoice #001',
      customerInfo: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      expiryDate: '2024-03-15'
    },
    sampleResponse: {
      linkId: 'link_pll123',
      paymentUrl: 'https://pay.sabpaisa.com/link/pll123',
      shortUrl: 'https://spay.link/pll123',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    }
  },
  {
    id: 'create-refund',
    method: 'POST',
    endpoint: '/api/v1/refunds/create',
    title: 'Create Refund',
    description: 'Process a payment refund',
    category: 'refunds',
    requiresAuth: true,
    samplePayload: {
      paymentId: 'pay_abc123',
      amount: 50000,
      reason: 'Customer request',
      notes: 'Partial refund for order cancellation'
    },
    sampleResponse: {
      refundId: 'refund_xyz456',
      status: 'processing',
      amount: 50000,
      estimatedSettlement: '2024-01-16T10:30:00Z'
    }
  },
  {
    id: 'refund-status',
    method: 'GET',
    endpoint: '/api/v1/refunds/{refundId}/status',
    title: 'Refund Status',
    description: 'Check the status of a refund',
    category: 'refunds',
    requiresAuth: true,
    sampleResponse: {
      refundId: 'refund_xyz456',
      status: 'completed',
      amount: 50000,
      processedAt: '2024-01-16T10:30:00Z'
    }
  },
  {
    id: 'mandate-status',
    method: 'GET',
    endpoint: '/api/v1/enach/mandates/{mandateId}/status',
    title: 'Mandate Status',
    description: 'Check E-NACH mandate status',
    category: 'enach',
    requiresAuth: true,
    sampleResponse: {
      mandateId: 'mandate_xyz789',
      status: 'active',
      nextDebitDate: '2024-02-01',
      totalDebits: 2,
      remainingDebits: 10
    }
  },
  {
    id: 'webhook-payment-success',
    method: 'POST',
    endpoint: '/webhooks/payment/success',
    title: 'Payment Success Webhook',
    description: 'Simulate payment success notification',
    category: 'webhooks',
    requiresAuth: false,
    samplePayload: {
      event: 'payment.success',
      paymentId: 'pay_abc123',
      orderId: 'order_123456',
      amount: 100000,
      currency: 'INR',
      status: 'completed',
      completedAt: '2024-01-15T10:30:00Z',
      customerInfo: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    },
    sampleResponse: {
      received: true,
      message: 'Webhook processed successfully'
    }
  },
  {
    id: 'webhook-payment-failed',
    method: 'POST',
    endpoint: '/webhooks/payment/failed',
    title: 'Payment Failed Webhook',
    description: 'Simulate payment failure notification',
    category: 'webhooks',
    requiresAuth: false,
    samplePayload: {
      event: 'payment.failed',
      paymentId: 'pay_abc123',
      orderId: 'order_123456',
      amount: 100000,
      currency: 'INR',
      status: 'failed',
      failureReason: 'Insufficient funds',
      failedAt: '2024-01-15T10:30:00Z'
    },
    sampleResponse: {
      received: true,
      message: 'Webhook processed successfully'
    }
  }
]

interface ApiTesterProps {
  selectedCategory?: string
}

export function ApiTester({ selectedCategory = 'payments' }: ApiTesterProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(
    apiEndpoints.find(e => e.category === selectedCategory) || apiEndpoints[0]
  )
  const [requestPayload, setRequestPayload] = useState(
    JSON.stringify(selectedEndpoint.samplePayload || {}, null, 2)
  )
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [headers, setHeaders] = useState({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_api_key_here',
    'X-Client-Code': 'your_client_code'
  })

  const filteredEndpoints = apiEndpoints.filter(e => e.category === selectedCategory || (selectedCategory === 'payments' && e.category === 'payment-links'))

  const handleEndpointChange = (endpointId: string) => {
    const endpoint = apiEndpoints.find(e => e.id === endpointId)
    if (endpoint) {
      setSelectedEndpoint(endpoint)
      setRequestPayload(JSON.stringify(endpoint.samplePayload || {}, null, 2))
      setResponse(null)
      setError(null)
      setRetryCount(0)
    }
  }

  const handleTest = async () => {
    setLoading(true)
    setResponse(null)
    setError(null)

    try {
      // Validate request payload for POST requests
      if (selectedEndpoint.method === 'POST') {
        try {
          JSON.parse(requestPayload)
        } catch (parseError) {
          throw new Error('Invalid JSON in request payload')
        }
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate different response scenarios
      const shouldSucceed = Math.random() > 0.1 // 90% success rate
      
      if (shouldSucceed) {
        const mockResponse = {
          status: 200,
          headers: {
            'content-type': 'application/json',
            'x-request-id': `req_${Date.now()}`,
            'x-ratelimit-remaining': '999',
            'x-ratelimit-reset': new Date(Date.now() + 3600000).toISOString()
          },
          data: selectedEndpoint.sampleResponse || { success: true, message: 'Request processed successfully' },
          timestamp: new Date().toISOString(),
          responseTime: Math.floor(Math.random() * 300) + 100
        }
        setResponse(mockResponse)
        setRetryCount(0) // Reset retry count on success
      } else {
        // Simulate error responses
        const errorResponses = [
          { status: 400, error: 'Bad Request', message: 'Invalid request payload' },
          { status: 401, error: 'Unauthorized', message: 'Invalid API key' },
          { status: 422, error: 'Validation Error', message: 'Required field missing: amount' },
          { status: 429, error: 'Rate Limited', message: 'Too many requests' },
          { status: 500, error: 'Internal Server Error', message: 'Something went wrong on our end' }
        ]
        const randomError = errorResponses[Math.floor(Math.random() * errorResponses.length)]
        setResponse({
          ...randomError,
          headers: {
            'content-type': 'application/json',
            'x-request-id': `req_${Date.now()}`
          },
          timestamp: new Date().toISOString(),
          responseTime: Math.floor(Math.random() * 200) + 50
        })
      }
    } catch (error) {
      console.error('API Test Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong processing your request'
      setError(errorMessage)
      setResponse({
        status: 500,
        error: 'Request Failed',
        message: errorMessage,
        timestamp: new Date().toISOString(),
        responseTime: Math.floor(Math.random() * 100) + 50
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    handleTest()
  }

  const clearResults = () => {
    setResponse(null)
    setError(null)
    setRetryCount(0)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Panel - Request Configuration */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              API Request
            </CardTitle>
            <CardDescription>
              Configure and test API endpoints interactively
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Endpoint Selection */}
            <div className="space-y-2">
              <Label>Select Endpoint</Label>
              <Select value={selectedEndpoint.id} onValueChange={handleEndpointChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filteredEndpoints.map((endpoint) => (
                    <SelectItem key={endpoint.id} value={endpoint.id}>
                      <div className="flex items-center gap-2">
                        <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'}>
                          {endpoint.method}
                        </Badge>
                        <span>{endpoint.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Method and URL */}
            <div className="flex gap-2">
              <Badge variant={selectedEndpoint.method === 'POST' ? 'default' : 'secondary'}>
                {selectedEndpoint.method}
              </Badge>
              <code className="flex-1 text-sm bg-muted px-2 py-1 rounded">
                {selectedEndpoint.endpoint}
              </code>
            </div>

            <p className="text-sm text-muted-foreground">
              {selectedEndpoint.description}
            </p>

            {/* Headers */}
            <div className="space-y-2">
              <Label>Headers</Label>
              <Textarea
                value={JSON.stringify(headers, null, 2)}
                onChange={(e) => {
                  try {
                    setHeaders(JSON.parse(e.target.value))
                  } catch {}
                }}
                rows={4}
                className="font-mono text-sm"
              />
            </div>

            {/* Request Body */}
            {(selectedEndpoint.method === 'POST' || selectedEndpoint.method === 'PUT') && (
              <div className="space-y-2">
                <Label>Request Body</Label>
                <Textarea
                  value={requestPayload}
                  onChange={(e) => setRequestPayload(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                  placeholder="Enter JSON payload..."
                />
              </div>
            )}

            {/* Path Parameters */}
            {selectedEndpoint.endpoint.includes('{') && (
              <div className="space-y-2">
                <Label>Path Parameters</Label>
                <div className="text-sm text-muted-foreground mb-2">
                  Replace path parameters in the endpoint URL above
                </div>
                <div className="space-y-2">
                  {selectedEndpoint.endpoint.match(/\{([^}]+)\}/g)?.map((param, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded min-w-[100px]">
                        {param}
                      </code>
                      <Input 
                        placeholder={`Enter ${param.slice(1, -1)}`}
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={handleTest} 
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Test API
                  </>
                )}
              </Button>
              {(response || error) && (
                <Button 
                  variant="outline" 
                  onClick={clearResults}
                  disabled={loading}
                >
                  Clear
                </Button>
              )}
            </div>
            
            {/* Error display and retry */}
            {error && !loading && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-destructive">Request Failed</p>
                    <p className="text-xs text-destructive/80 mt-1">{error}</p>
                    {retryCount > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Retry attempts: {retryCount}/3
                      </p>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRetry}
                      disabled={retryCount >= 3}
                      className="mt-2"
                    >
                      <RefreshCw className="mr-1 h-3 w-3" />
                      {retryCount >= 3 ? 'Max retries reached' : 'Retry'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Response */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {response ? (
                response.status === 200 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )
              ) : (
                <Clock className="h-5 w-5" />
              )}
              Response
            </CardTitle>
            {response && (
              <div className="flex items-center gap-4 text-sm">
                <Badge 
                  variant={
                    response.status >= 200 && response.status < 300 
                      ? 'secondary' 
                      : response.status >= 400 && response.status < 500
                      ? 'destructive'
                      : 'outline'
                  }
                >
                  {response.status}
                </Badge>
                {response.responseTime && (
                  <span className="text-muted-foreground">
                    {response.responseTime}ms
                  </span>
                )}
                {response.timestamp && (
                  <span className="text-muted-foreground">
                    {new Date(response.timestamp).toLocaleTimeString()}
                  </span>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {!response && (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Test API" to see the response</p>
              </div>
            )}

            {response && (
              <Tabs defaultValue="response" className="w-full">
                <TabsList>
                  <TabsTrigger value="response">Response</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="response" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Response Body</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(response.data || response, null, 2))}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CodeBlock
                    code={JSON.stringify(response.data || response, null, 2)}
                    language="json"
                    showLineNumbers={false}
                  />
                </TabsContent>
                
                <TabsContent value="headers" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Response Headers</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(JSON.stringify(response.headers || {}, null, 2))}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CodeBlock
                    code={JSON.stringify(response.headers || {}, null, 2)}
                    language="json"
                    showLineNumbers={false}
                  />
                </TabsContent>
                
                <TabsContent value="curl" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">cURL Command</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const curlCommand = `curl -X ${selectedEndpoint.method} \\
  'https://sandbox.sabpaisa.com${selectedEndpoint.endpoint}' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer your_api_key_here' \\
  -H 'X-Client-Code: your_client_code'${selectedEndpoint.method === 'POST' ? ` \\
  -d '${requestPayload.replace(/\n/g, '').replace(/\s+/g, ' ')}'` : ''}`
                        copyToClipboard(curlCommand)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <CodeBlock
                    code={`curl -X ${selectedEndpoint.method} \\
  'https://sandbox.sabpaisa.com${selectedEndpoint.endpoint}' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer your_api_key_here' \\
  -H 'X-Client-Code: your_client_code'${selectedEndpoint.method === 'POST' ? ` \\
  -d '${requestPayload.replace(/\n/g, '').replace(/\s+/g, ' ')}'` : ''}`}
                    language="bash"
                    showLineNumbers={false}
                  />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}