import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/ui/code-block'
import { Separator } from '@/components/ui/separator'
import { 
  LinkIcon, 
  Zap, 
  Share, 
  QrCode, 
  CheckCircle,
  Clock,
  Shield,
  Smartphone,
  Play,
  Code,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Instant Generation',
    description: 'Generate payment links instantly without complex integration',
    icon: Zap
  },
  {
    title: 'Easy Sharing',
    description: 'Share via SMS, email, WhatsApp, or social media platforms',
    icon: Share
  },
  {
    title: 'QR Code Support',
    description: 'Auto-generated QR codes for mobile payments',
    icon: QrCode
  },
  {
    title: 'Mobile Optimized',
    description: 'Responsive payment pages that work on all devices',
    icon: Smartphone
  }
]

const useCases = [
  { title: 'Invoice Payments', description: 'Send payment links with invoices for quick settlement' },
  { title: 'Event Tickets', description: 'Sell event tickets with shareable payment links' },
  { title: 'Service Bookings', description: 'Accept payments for appointments and services' },
  { title: 'Product Sales', description: 'Sell products without setting up a full e-commerce site' },
  { title: 'Donations', description: 'Collect donations and fundraising payments' },
  { title: 'Subscription Plans', description: 'One-time payments for subscription activation' }
]

const linkCreation = `{
  "amount": 25000, // Amount in paise (₹250.00)
  "currency": "INR",
  "purpose": "invoice_payment",
  "description": "Payment for Invoice #INV-001",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "linkSettings": {
    "expiryDate": "2024-03-15",
    "maxPayments": 1,
    "customUrl": "inv-001-payment",
    "theme": "default"
  },
  "webhookUrl": "https://yourapp.com/webhook/payment-link",
  "successUrl": "https://yourapp.com/payment/success",
  "cancelUrl": "https://yourapp.com/payment/cancel"
}`

const sdkImplementation = `// Initialize Payment Link SDK
const sabPaisaLink = new SabPaisa.PaymentLink({
  clientCode: process.env.SABPAISA_CLIENT_CODE,
  clientSecret: process.env.SABPAISA_CLIENT_SECRET,
  environment: 'sandbox'
});

// Create payment link
async function createPaymentLink(linkDetails) {
  try {
    const linkRequest = {
      amount: linkDetails.amount,
      currency: 'INR',
      purpose: linkDetails.purpose,
      description: linkDetails.description,
      customerInfo: linkDetails.customer,
      linkSettings: {
        expiryDate: linkDetails.expiryDate,
        maxPayments: linkDetails.maxPayments || 1,
        customUrl: linkDetails.customUrl,
        theme: linkDetails.theme || 'default'
      },
      webhookUrl: \`\${process.env.BASE_URL}/webhook/payment-link\`,
      successUrl: \`\${process.env.BASE_URL}/payment/success\`,
      cancelUrl: \`\${process.env.BASE_URL}/payment/cancel\`
    };

    const response = await sabPaisaLink.create(linkRequest);
    
    return {
      success: true,
      linkId: response.linkId,
      paymentUrl: response.paymentUrl,
      qrCode: response.qrCode,
      shortUrl: response.shortUrl
    };
  } catch (error) {
    console.error('Payment link creation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Send payment link via email
async function sendPaymentLinkEmail(linkId, customerEmail) {
  try {
    const response = await sabPaisaLink.send({
      linkId: linkId,
      method: 'email',
      recipient: customerEmail,
      template: 'invoice_payment'
    });
    
    return { success: true, messageId: response.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

// Send payment link via SMS
async function sendPaymentLinkSMS(linkId, customerPhone) {
  try {
    const response = await sabPaisaLink.send({
      linkId: linkId,
      method: 'sms',
      recipient: customerPhone,
      template: 'payment_reminder'
    });
    
    return { success: true, messageId: response.messageId };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error: error.message };
  }
}`

export default function PaymentLinkPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <LinkIcon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Payment Link</h1>
            <Badge>Quick Setup</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Generate instant payment links for quick transactions without complex integrations. Perfect for invoices, bookings, and one-time payments.
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

        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">{useCase.title}</h4>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Create Link</h4>
              <p className="text-sm text-muted-foreground">Generate payment link with amount and details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Share Link</h4>
              <p className="text-sm text-muted-foreground">Send via email, SMS, or social media</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Customer Pays</h4>
              <p className="text-sm text-muted-foreground">Customer clicks link and completes payment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Get Notified</h4>
              <p className="text-sm text-muted-foreground">Receive instant payment confirmation</p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Implementation Example</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Create Payment Link</h3>
              <p className="text-muted-foreground mb-4">
                Example request to create a payment link:
              </p>
              <CodeBlock 
                code={linkCreation} 
                language="json" 
                filename="payment-link-request.json"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">JavaScript SDK Usage</h3>
              <p className="text-muted-foreground mb-4">
                Complete implementation with the JavaScript SDK:
              </p>
              <CodeBlock 
                code={sdkImplementation} 
                language="javascript" 
                filename="payment-link-integration.js"
              />
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Link Settings */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Link Configuration</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Expiry Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Default Expiry:</span>
                    <span className="font-medium">30 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Minimum Expiry:</span>
                    <span className="font-medium">1 hour</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Maximum Expiry:</span>
                    <span className="font-medium">1 year</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>SSL encrypted payment pages</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>PCI DSS compliant processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Fraud detection enabled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testing & Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Testing & Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Try Payment Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Test payment link creation and sharing in our interactive playground.
                </CardDescription>
                <Button asChild>
                  <Link href="/playground?tab=payment-links">
                    Test Now
                    <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Quick Start Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Step-by-step guide to integrate payment links in your application.
                </CardDescription>
                <Button asChild variant="outline">
                  <Link href="/docs/getting-started">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Ready to Start?</h3>
          <p className="text-muted-foreground mb-6">
            Payment Links are the fastest way to start accepting payments. Get started in minutes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/sign-up">Create Account</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/api#payment-links">API Reference</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}