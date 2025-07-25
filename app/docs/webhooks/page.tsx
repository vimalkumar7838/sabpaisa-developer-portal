'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Webhook, 
  Shield, 
  Key, 
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Copy,
  Play,
  AlertCircle,
  Code,
  Settings,
  Zap,
  Bell,
  Lock
} from 'lucide-react'
import { CodeBlock } from '@/components/ui/code-block'

const webhookEvents = [
  {
    event: 'payment.success',
    title: 'Payment Success',
    description: 'Triggered when a payment is completed successfully',
    category: 'payment',
    frequency: 'High',
    payload: {
      event: 'payment.success',
      paymentId: 'pay_abc123',
      orderId: 'order_456',
      amount: 100000,
      currency: 'INR',
      status: 'completed',
      completedAt: '2024-01-15T10:30:00Z',
      method: 'card',
      card: {
        last4: '1111',
        brand: 'visa',
        type: 'credit'
      },
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210'
      }
    }
  },
  {
    event: 'payment.failed',
    title: 'Payment Failed',
    description: 'Triggered when a payment fails or is declined',
    category: 'payment',
    frequency: 'Medium',
    payload: {
      event: 'payment.failed',
      paymentId: 'pay_def456',
      orderId: 'order_789',
      amount: 50000,
      currency: 'INR',
      status: 'failed',
      failureReason: 'insufficient_funds',
      failureCode: 'CARD_DECLINED',
      failedAt: '2024-01-15T10:35:00Z',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    }
  },
  {
    event: 'payment.pending',
    title: 'Payment Pending',
    description: 'Triggered when a payment is pending (e.g., net banking)',
    category: 'payment',
    frequency: 'Medium',
    payload: {
      event: 'payment.pending',
      paymentId: 'pay_ghi789',
      orderId: 'order_012',
      amount: 75000,
      currency: 'INR',
      status: 'pending',
      method: 'netbanking',
      bank: 'HDFC',
      createdAt: '2024-01-15T10:40:00Z'
    }
  },
  {
    event: 'refund.processed',
    title: 'Refund Processed',
    description: 'Triggered when a refund is successfully processed',
    category: 'refund',
    frequency: 'Low',
    payload: {
      event: 'refund.processed',
      refundId: 'refund_jkl012',
      paymentId: 'pay_abc123',
      amount: 25000,
      currency: 'INR',
      status: 'completed',
      reason: 'customer_request',
      processedAt: '2024-01-15T11:00:00Z'
    }
  },
  {
    event: 'mandate.created',
    title: 'E-NACH Mandate Created',
    description: 'Triggered when an E-NACH mandate is successfully created',
    category: 'enach',
    frequency: 'Low',
    payload: {
      event: 'mandate.created',
      mandateId: 'mandate_mno345',
      customerId: 'customer_678',
      amount: 99900,
      frequency: 'monthly',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      status: 'active',
      createdAt: '2024-01-15T12:00:00Z'
    }
  },
  {
    event: 'mandate.debit_success',
    title: 'Mandate Debit Success',
    description: 'Triggered when an E-NACH debit is successful',
    category: 'enach',
    frequency: 'Medium',
    payload: {
      event: 'mandate.debit_success',
      mandateId: 'mandate_mno345',
      debitId: 'debit_pqr678',
      amount: 99900,
      currency: 'INR',
      debitDate: '2024-02-01',
      status: 'completed',
      completedAt: '2024-02-01T09:00:00Z'
    }
  }
]

const securityFeatures = [
  {
    title: 'HMAC Signature Verification',
    description: 'Every webhook includes an HMAC-SHA256 signature for authenticity verification',
    implementation: 'Required'
  },
  {
    title: 'IP Whitelisting',
    description: 'Webhooks are sent from specific IP addresses that can be whitelisted',
    implementation: 'Recommended'
  },
  {
    title: 'HTTPS Only',
    description: 'All webhook URLs must use HTTPS for secure transmission',
    implementation: 'Required'
  },
  {
    title: 'Retry Mechanism',
    description: 'Failed webhooks are retried with exponential backoff',
    implementation: 'Automatic'
  }
]

export default function WebhooksPage() {
  const [selectedEvent, setSelectedEvent] = useState(webhookEvents[0])
  const [webhookUrl, setWebhookUrl] = useState('https://your-app.com/webhooks/sabpaisa')
  const [testResult, setTestResult] = useState<any>(null)
  const [isTestingWebhook, setIsTestingWebhook] = useState(false)

  const handleWebhookTest = async () => {
    setIsTestingWebhook(true)
    setTestResult(null)

    // Simulate webhook test
    await new Promise(resolve => setTimeout(resolve, 2000))

    const success = Math.random() > 0.3 // 70% success rate for demo
    
    setTestResult({
      success,
      status: success ? 200 : 500,
      responseTime: Math.floor(Math.random() * 300) + 100,
      timestamp: new Date().toISOString(),
      error: success ? null : 'Connection timeout or invalid response'
    })
    
    setIsTestingWebhook(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Webhook className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Webhooks & IPN</h1>
          <Badge variant="secondary">Real-time</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          Instant Payment Notifications (IPN) system for real-time event handling. Stay synchronized with payment events and automate your business processes.
        </p>
      </div>

      {/* Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            How Webhooks Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Event Occurs</h4>
              <p className="text-sm text-muted-foreground">Payment processed, refund issued, etc.</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Webhook Sent</h4>
              <p className="text-sm text-muted-foreground">HTTP POST to your endpoint</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Verify Signature</h4>
              <p className="text-sm text-muted-foreground">HMAC validation for security</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Process Event</h4>
              <p className="text-sm text-muted-foreground">Update your system state</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">Event Types</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        {/* Event Types Tab */}
        <TabsContent value="events" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Webhook Events</h2>
            <p className="text-muted-foreground mb-6">
              SabPaisa sends webhooks for various events. Configure your endpoint to handle these events.
            </p>
            
            <div className="grid gap-4">
              {webhookEvents.map((event, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-colors ${selectedEvent.event === event.event ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{event.category}</Badge>
                        <Badge variant={event.frequency === 'High' ? 'default' : event.frequency === 'Medium' ? 'secondary' : 'outline'}>
                          {event.frequency}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <code className="text-sm text-muted-foreground">{event.event}</code>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Event Payload */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sample Payload: {selectedEvent.title}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(selectedEvent.payload, null, 2))}
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy Payload
                </Button>
              </div>
              <CodeBlock
                code={JSON.stringify(selectedEvent.payload, null, 2)}
                language="json"
                showLineNumbers={false}
              />
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Security Implementation</h2>
            <p className="text-muted-foreground mb-6">
              Webhook security is crucial for protecting your application from malicious requests.
            </p>
            
            <div className="grid gap-6">
              {securityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        {feature.title}
                      </CardTitle>
                      <Badge variant={feature.implementation === 'Required' ? 'destructive' : feature.implementation === 'Recommended' ? 'default' : 'secondary'}>
                        {feature.implementation}
                      </Badge>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">HMAC Signature Verification</h3>
              <p className="text-muted-foreground mb-4">
                Every webhook includes an HMAC-SHA256 signature in the headers. Verify this signature to ensure the webhook is from SabPaisa.
              </p>
              
              <Tabs defaultValue="node" className="w-full">
                <TabsList>
                  <TabsTrigger value="node">Node.js</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                </TabsList>
                
                <TabsContent value="node">
                  <CodeBlock
                    code={`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  const actualSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(actualSignature, 'hex')
  );
}

// Express.js example
app.post('/webhooks/sabpaisa', (req, res) => {
  const signature = req.headers['x-sabpaisa-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Unauthorized');
  }
  
  // Process the webhook
  console.log('Valid webhook:', req.body);
  res.status(200).send('OK');
});`}
                    language="javascript"
                  />
                </TabsContent>
                
                <TabsContent value="python">
                  <CodeBlock
                    code={`import hmac
import hashlib
import json

def verify_webhook_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    actual_signature = signature.replace('sha256=', '')
    
    return hmac.compare_digest(expected_signature, actual_signature)

# Flask example
@app.route('/webhooks/sabpaisa', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-SabPaisa-Signature')
    payload = request.get_data(as_text=True)
    
    if not verify_webhook_signature(payload, signature, WEBHOOK_SECRET):
        return 'Unauthorized', 401
    
    # Process the webhook
    data = request.get_json()
    print(f'Valid webhook: {data}')
    return 'OK', 200`}
                    language="python"
                  />
                </TabsContent>
                
                <TabsContent value="php">
                  <CodeBlock
                    code={`<?php
function verifyWebhookSignature($payload, $signature, $secret) {
    $expectedSignature = hash_hmac('sha256', $payload, $secret);
    $actualSignature = str_replace('sha256=', '', $signature);
    
    return hash_equals($expectedSignature, $actualSignature);
}

// Handle webhook
$signature = $_SERVER['HTTP_X_SABPAISA_SIGNATURE'] ?? '';
$payload = file_get_contents('php://input');

if (!verifyWebhookSignature($payload, $signature, $webhookSecret)) {
    http_response_code(401);
    echo 'Unauthorized';
    exit;
}

// Process the webhook
$data = json_decode($payload, true);
error_log('Valid webhook: ' . print_r($data, true));
echo 'OK';
?>`}
                    language="php"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Webhook Testing</h2>
            <p className="text-muted-foreground mb-6">
              Test your webhook endpoint to ensure it's correctly configured and can handle SabPaisa events.
            </p>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Test Your Webhook
                </CardTitle>
                <CardDescription>
                  Send a test webhook to your endpoint to verify integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-app.com/webhooks/sabpaisa"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Event Type</Label>
                  <select 
                    className="w-full px-3 py-2 border rounded-md"
                    value={selectedEvent.event}
                    onChange={(e) => {
                      const event = webhookEvents.find(ev => ev.event === e.target.value)
                      if (event) setSelectedEvent(event)
                    }}
                  >
                    {webhookEvents.map((event) => (
                      <option key={event.event} value={event.event}>
                        {event.title} ({event.event})
                      </option>
                    ))}
                  </select>
                </div>

                <Button 
                  onClick={handleWebhookTest}
                  disabled={isTestingWebhook || !webhookUrl}
                  className="w-full"
                >
                  {isTestingWebhook ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Sending Test Webhook...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Test Webhook
                    </>
                  )}
                </Button>

                {testResult && (
                  <div className="mt-4 p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {testResult.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">
                        Test {testResult.success ? 'Successful' : 'Failed'}
                      </span>
                      <Badge variant={testResult.success ? 'secondary' : 'destructive'}>
                        {testResult.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Response Time: {testResult.responseTime}ms</div>
                      <div>Timestamp: {new Date(testResult.timestamp).toLocaleString()}</div>
                      {testResult.error && (
                        <div className="text-red-600">Error: {testResult.error}</div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <AlertCircle className="h-5 w-5" />
                  Testing Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-amber-700 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Always return HTTP 200 status code for successful webhook processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Process webhooks idempotently - handle duplicate events gracefully</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Respond within 20 seconds to avoid timeouts and retries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Use HTTPS URLs only - HTTP webhooks will be rejected</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Implementation Tab */}
        <TabsContent value="implementation" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Implementation Guide</h2>
            <p className="text-muted-foreground mb-6">
              Step-by-step guide to implement webhooks in your application.
            </p>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Configure Webhook URL</CardTitle>
                  <CardDescription>
                    Set your webhook endpoint in the SabPaisa merchant dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`// Example webhook URL
https://your-app.com/webhooks/sabpaisa

// URL Requirements:
// - Must use HTTPS
// - Should be publicly accessible
// - Must respond within 20 seconds
// - Should return 200 status for success`}
                    language="text"
                    showLineNumbers={false}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Handle Webhook Events</CardTitle>
                  <CardDescription>
                    Create an endpoint to receive and process webhook events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`// Express.js example
app.post('/webhooks/sabpaisa', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-sabpaisa-signature'];
  const event = JSON.parse(req.body);
  
  // Verify signature (see Security tab)
  if (!verifySignature(req.body, signature)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Handle different event types
  switch (event.event) {
    case 'payment.success':
      await handlePaymentSuccess(event);
      break;
    case 'payment.failed':
      await handlePaymentFailed(event);
      break;
    case 'refund.processed':
      await handleRefundProcessed(event);
      break;
    default:
      console.log('Unhandled event type:', event.event);
  }
  
  res.status(200).send('OK');
});`}
                    language="javascript"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Implement Event Handlers</CardTitle>
                  <CardDescription>
                    Create specific handlers for each event type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`async function handlePaymentSuccess(event) {
  const { paymentId, orderId, amount, status } = event;
  
  try {
    // Update order status in database
    await db.orders.update(orderId, {
      status: 'paid',
      paymentId: paymentId,
      paidAmount: amount,
      paidAt: new Date(event.completedAt)
    });
    
    // Send confirmation email
    await sendPaymentConfirmation(event.customer.email, {
      orderId,
      amount,
      paymentId
    });
    
    // Update inventory if needed
    await updateInventory(orderId);
    
    console.log('Payment success processed:', paymentId);
  } catch (error) {
    console.error('Error processing payment success:', error);
    throw error; // This will cause webhook retry
  }
}

async function handlePaymentFailed(event) {
  const { paymentId, orderId, failureReason } = event;
  
  try {
    // Update order status
    await db.orders.update(orderId, {
      status: 'payment_failed',
      failureReason: failureReason,
      failedAt: new Date(event.failedAt)
    });
    
    // Send failure notification
    await sendPaymentFailureNotification(event.customer.email, {
      orderId,
      reason: failureReason
    });
    
    console.log('Payment failure processed:', paymentId);
  } catch (error) {
    console.error('Error processing payment failure:', error);
    throw error;
  }
}`}
                    language="javascript"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 4: Error Handling & Retries</CardTitle>
                  <CardDescription>
                    Implement proper error handling and idempotency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`// Idempotency key tracking
const processedWebhooks = new Set();

app.post('/webhooks/sabpaisa', async (req, res) => {
  const event = JSON.parse(req.body);
  const eventId = event.paymentId + '_' + event.event;
  
  // Check if already processed
  if (processedWebhooks.has(eventId)) {
    console.log('Duplicate webhook ignored:', eventId);
    return res.status(200).send('Already processed');
  }
  
  try {
    // Process the webhook
    await processWebhookEvent(event);
    
    // Mark as processed
    processedWebhooks.add(eventId);
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook processing failed:', error);
    // Return 500 to trigger retry
    res.status(500).send('Processing failed');
  }
});

// Retry configuration (handled by SabPaisa)
// - Initial retry after 1 minute
// - Subsequent retries: 5min, 15min, 1hr, 6hr, 24hr
// - Maximum 6 retry attempts
// - Exponential backoff with jitter`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}