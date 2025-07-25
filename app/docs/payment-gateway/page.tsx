import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/ui/code-block'
import { Separator } from '@/components/ui/separator'
import { 
  CreditCard, 
  Shield, 
  Zap, 
  Globe, 
  CheckCircle,
  Code,
  Play,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Multiple Payment Methods',
    description: 'Accept payments via Credit/Debit Cards, UPI, Wallets, Net Banking, and more',
    icon: CreditCard
  },
  {
    title: 'Bank-Grade Security',
    description: 'PCI DSS compliant with advanced fraud detection and encryption',
    icon: Shield
  },
  {
    title: 'Instant Processing',
    description: 'Real-time payment processing with immediate confirmation',
    icon: Zap
  },
  {
    title: 'Global Coverage',
    description: 'Support for multiple currencies and international cards',
    icon: Globe
  }
]

const integrationSteps = [
  {
    step: 1,
    title: 'Initialize SDK',
    description: 'Set up the SabPaisa Payment Gateway SDK in your application'
  },
  {
    step: 2,
    title: 'Create Payment Request',
    description: 'Generate a payment request with customer and order details'
  },
  {
    step: 3,
    title: 'Process Payment',
    description: 'Redirect customer to payment page or use embedded checkout'
  },
  {
    step: 4,
    title: 'Handle Response',
    description: 'Process payment success/failure and update order status'
  }
]

const samplePaymentRequest = `{
  "amount": 10000,
  "currency": "INR",
  "orderId": "order_abc123",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "productInfo": {
    "name": "Premium Subscription",
    "description": "Monthly premium plan"
  },
  "returnUrl": "https://yourapp.com/payment/success",
  "cancelUrl": "https://yourapp.com/payment/cancel",
  "webhookUrl": "https://yourapp.com/webhook/payment"
}`

const jsImplementation = `// Initialize SabPaisa Payment Gateway
const sabPaisa = new SabPaisa({
  clientCode: process.env.SABPAISA_CLIENT_CODE,
  clientSecret: process.env.SABPAISA_CLIENT_SECRET,
  environment: 'sandbox' // or 'production'
});

// Create payment request
async function createPayment(orderDetails) {
  try {
    const paymentRequest = {
      amount: orderDetails.amount, // Amount in paise
      currency: 'INR',
      orderId: orderDetails.orderId,
      customerInfo: orderDetails.customer,
      productInfo: orderDetails.product,
      returnUrl: \`\${process.env.BASE_URL}/payment/success\`,
      cancelUrl: \`\${process.env.BASE_URL}/payment/cancel\`,
      webhookUrl: \`\${process.env.BASE_URL}/webhook/payment\`
    };

    const response = await sabPaisa.payments.create(paymentRequest);
    
    return {
      success: true,
      paymentUrl: response.paymentUrl,
      transactionId: response.transactionId
    };
  } catch (error) {
    console.error('Payment creation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}`

const webhookHandler = `// Webhook handler for payment notifications
app.post('/webhook/payment', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-sabpaisa-signature'];
  const payload = req.body;

  // Verify webhook signature
  const expectedSignature = sabPaisa.webhooks.generateSignature(payload);
  
  if (signature !== expectedSignature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(payload);
  
  switch (event.type) {
    case 'payment.success':
      // Handle successful payment
      updateOrderStatus(event.data.orderId, 'paid');
      break;
      
    case 'payment.failed':
      // Handle failed payment
      updateOrderStatus(event.data.orderId, 'failed');
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.status(200).json({ received: true });
});`

export default function PaymentGatewayPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Payment Gateway</h1>
            <Badge variant="secondary">Popular</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Accept online payments seamlessly with SabPaisa's robust payment gateway. Support for multiple payment methods, advanced security, and real-time processing.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Integration Guide */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Integration Steps</h2>
          <div className="space-y-4">
            {integrationSteps.map((step, index) => (
              <div key={index} className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {step.step}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Implementation Examples</h2>
          
          <Tabs defaultValue="request" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="request">Payment Request</TabsTrigger>
              <TabsTrigger value="implementation">JavaScript SDK</TabsTrigger>
              <TabsTrigger value="webhook">Webhook Handler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="request">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sample Payment Request</h3>
                <p className="text-muted-foreground">
                  Here's an example of a payment request payload:
                </p>
                <CodeBlock 
                  code={samplePaymentRequest} 
                  language="json" 
                  filename="payment-request.json"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="implementation">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">JavaScript Implementation</h3>
                <p className="text-muted-foreground">
                  Complete implementation using the SabPaisa JavaScript SDK:
                </p>
                <CodeBlock 
                  code={jsImplementation} 
                  language="javascript" 
                  filename="payment-integration.js"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="webhook">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Webhook Handler</h3>
                <p className="text-muted-foreground">
                  Handle payment notifications with webhook endpoints:
                </p>
                <CodeBlock 
                  code={webhookHandler} 
                  language="javascript" 
                  filename="webhook-handler.js"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="my-12" />

        {/* Testing */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Testing & Sandbox</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Try API Playground
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Test payment gateway APIs interactively with our built-in playground tool.
                </CardDescription>
                <Button asChild>
                  <Link href="/playground">
                    Open Playground
                    <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Sandbox Environment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Use our sandbox environment for safe testing without processing real payments.
                </CardDescription>
                <Button asChild variant="outline">
                  <Link href="/sandbox">
                    Access Sandbox
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you integrate the payment gateway successfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/community">Join Community</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/api">API Reference</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}