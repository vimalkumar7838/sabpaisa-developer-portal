'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Key, 
  Database, 
  TestTube,
  ArrowRight,
  Copy,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Code
} from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

const sandboxCredentials = {
  apiKey: 'sb_test_pk_7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p',
  secretKey: 'sb_test_sk_9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k',
  clientCode: 'SB_TEST_CLIENT_001',
  merchantId: 'merchant_test_12345',
  baseUrl: 'https://sandbox.sabpaisa.com'
}

const testCards = [
  {
    type: 'Success Card',
    number: '4111 1111 1111 1111',
    expiry: '12/25',
    cvv: '123',
    description: 'Always successful transactions',
    status: 'success'
  },
  {
    type: 'Insufficient Funds',
    number: '4000 0000 0000 0002',
    expiry: '12/25',
    cvv: '123',
    description: 'Simulates insufficient balance',
    status: 'failed'
  },
  {
    type: 'Card Declined',
    number: '4000 0000 0000 0069',
    expiry: '12/25',
    cvv: '123',
    description: 'Card issuer declines transaction',
    status: 'failed'
  },
  {
    type: 'Processing Delay',
    number: '4000 0000 0000 0259',
    expiry: '12/25',
    cvv: '123',
    description: 'Simulates processing delays',
    status: 'pending'
  }
]

const testScenarios = [
  {
    title: 'Basic Payment Flow',
    description: 'Test end-to-end payment processing',
    steps: [
      'Create payment request',
      'Redirect to payment page',
      'Complete payment with test card',
      'Verify webhook notification',
      'Check payment status'
    ]
  },
  {
    title: 'Failed Payment Handling',
    description: 'Test error scenarios and failure handling',
    steps: [
      'Create payment with declined card',
      'Handle payment failure response',
      'Verify error webhook',
      'Implement retry mechanism'
    ]
  },
  {
    title: 'Refund Processing',
    description: 'Test refund creation and processing',
    steps: [
      'Complete successful payment',
      'Initiate refund request',
      'Check refund status',
      'Verify refund webhook'
    ]
  },
  {
    title: 'E-NACH Mandate Setup',
    description: 'Test recurring payment setup',
    steps: [
      'Create mandate request',
      'Complete bank authentication',
      'Verify mandate status',
      'Test first debit'
    ]
  }
]

const webhookEndpoints = [
  {
    event: 'payment.success',
    description: 'Payment completed successfully',
    samplePayload: {
      event: 'payment.success',
      paymentId: 'pay_test_abc123',
      orderId: 'order_test_456',
      amount: 100000,
      currency: 'INR',
      status: 'completed',
      completedAt: '2024-01-15T10:30:00Z'
    }
  },
  {
    event: 'payment.failed',
    description: 'Payment failed or declined',
    samplePayload: {
      event: 'payment.failed',
      paymentId: 'pay_test_def456',
      orderId: 'order_test_789',
      amount: 50000,
      currency: 'INR',
      status: 'failed',
      failureReason: 'insufficient_funds',
      failedAt: '2024-01-15T10:35:00Z'
    }
  },
  {
    event: 'refund.processed',
    description: 'Refund has been processed',
    samplePayload: {
      event: 'refund.processed',
      refundId: 'refund_test_ghi789',
      paymentId: 'pay_test_abc123',
      amount: 25000,
      currency: 'INR',
      status: 'completed',
      processedAt: '2024-01-15T11:00:00Z'
    }
  }
]

export default function SandboxPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Sandbox Environment</h1>
            <Badge variant="secondary">Test Mode</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Safe testing environment for SabPaisa integration development. Test your implementations without affecting real transactions.
          </p>
        </div>

        {/* Quick Setup */}
        <div className="mb-8">
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Quick Setup Guide
              </CardTitle>
              <CardDescription>
                Get started with sandbox testing in under 5 minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                  <h4 className="font-medium mb-1">Get Credentials</h4>
                  <p className="text-sm text-muted-foreground">Copy sandbox API keys below</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                  <h4 className="font-medium mb-1">Configure Environment</h4>
                  <p className="text-sm text-muted-foreground">Set base URL to sandbox</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                  <h4 className="font-medium mb-1">Start Testing</h4>
                  <p className="text-sm text-muted-foreground">Use test cards and scenarios</p>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Button asChild>
                  <Link href="#credentials">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="test-data">Test Data</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
          
          {/* Credentials Tab */}
          <TabsContent value="credentials" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Sandbox Credentials</h2>
              <p className="text-muted-foreground mb-6">
                Use these credentials for all your sandbox testing. These keys are safe to use in your development environment.
              </p>
              
              <div className="grid gap-4">
                {Object.entries(sandboxCredentials).map(([key, value]) => (
                  <Card key={key}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
                          <CardDescription className="font-mono text-sm">{value}</CardDescription>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(value)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Environment Configuration</h3>
                <CodeBlock
                  code={`// Environment Variables
SABPAISA_API_KEY=${sandboxCredentials.apiKey}
SABPAISA_SECRET_KEY=${sandboxCredentials.secretKey}
SABPAISA_CLIENT_CODE=${sandboxCredentials.clientCode}
SABPAISA_MERCHANT_ID=${sandboxCredentials.merchantId}
SABPAISA_BASE_URL=${sandboxCredentials.baseUrl}
SABPAISA_ENVIRONMENT=sandbox`}
                  language="bash"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </TabsContent>

          {/* Test Data Tab */}
          <TabsContent value="test-data" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Test Cards & Data</h2>
              <p className="text-muted-foreground mb-6">
                Use these test cards to simulate different payment scenarios in your integration.
              </p>
              
              <div className="grid gap-4">
                {testCards.map((card, index) => (
                  <Card key={index} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {card.type}
                            <Badge 
                              variant={
                                card.status === 'success' ? 'secondary' : 
                                card.status === 'failed' ? 'destructive' : 'outline'
                              }
                            >
                              {card.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Card Number:</span>
                          <div className="font-mono">{card.number}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expiry:</span>
                          <div className="font-mono">{card.expiry}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">CVV:</span>
                          <div className="font-mono">{card.cvv}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Test Bank Accounts (E-NACH)</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Account Number:</span>
                        <div className="font-mono">1234567890123456</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">IFSC Code:</span>
                        <div className="font-mono">SBIN0001234</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Account Holder:</span>
                        <div>Test Account Holder</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bank Name:</span>
                        <div>State Bank of India (Test)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Test Scenarios Tab */}
          <TabsContent value="scenarios" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Test Scenarios</h2>
              <p className="text-muted-foreground mb-6">
                Follow these predefined scenarios to test different aspects of your integration.
              </p>
              
              <div className="grid gap-6">
                {testScenarios.map((scenario, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{scenario.title}</CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {scenario.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center font-medium">
                              {stepIndex + 1}
                            </div>
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <TestTube className="mr-2 h-3 w-3" />
                          Run Test
                        </Button>
                        <Button size="sm" variant="outline">
                          <Code className="mr-2 h-3 w-3" />
                          View Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Webhook Testing</h2>
              <p className="text-muted-foreground mb-6">
                Test webhook endpoints with sample payloads to ensure your integration handles notifications correctly.
              </p>
              
              <div className="grid gap-6">
                {webhookEndpoints.map((webhook, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {webhook.event}
                        <Badge variant="outline">{webhook.event.split('.')[0]}</Badge>
                      </CardTitle>
                      <CardDescription>{webhook.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Sample Payload</h4>
                          <CodeBlock
                            code={JSON.stringify(webhook.samplePayload, null, 2)}
                            language="json"
                            showLineNumbers={false}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <RefreshCw className="mr-2 h-3 w-3" />
                            Send Test Webhook
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="mr-2 h-3 w-3" />
                            Copy Payload
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <AlertTriangle className="h-5 w-5" />
                    Webhook Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 mb-4">
                    To receive webhook notifications in sandbox, configure your webhook URL in the merchant dashboard:
                  </p>
                  <CodeBlock
                    code="https://your-app.com/webhooks/sabpaisa"
                    language="text"
                    showLineNumbers={false}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Testing Tools</h2>
              <p className="text-muted-foreground mb-6">
                Additional tools to help with sandbox testing and development.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Payment Status Checker
                    </CardTitle>
                    <CardDescription>
                      Check the status of any payment using payment ID
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Payment ID</label>
                        <input 
                          type="text" 
                          placeholder="pay_test_abc123"
                          className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                        />
                      </div>
                      <Button size="sm" className="w-full">
                        <CheckCircle className="mr-2 h-3 w-3" />
                        Check Status
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      API Key Validator
                    </CardTitle>
                    <CardDescription>
                      Validate your API credentials and permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">API Key</label>
                        <input 
                          type="text" 
                          placeholder="sb_test_pk_..."
                          className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                        />
                      </div>
                      <Button size="sm" className="w-full">
                        <Shield className="mr-2 h-3 w-3" />
                        Validate Key
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sandbox Limitations</CardTitle>
                  <CardDescription>
                    Important limitations to keep in mind while testing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Sandbox payments are not processed with real banks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Rate limiting is more lenient in sandbox (1000 requests/minute)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Webhook delivery may have delays up to 5 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                      <span>Test data resets every 30 days</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}