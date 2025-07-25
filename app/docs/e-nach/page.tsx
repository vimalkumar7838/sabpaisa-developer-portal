import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/ui/code-block'
import { Separator } from '@/components/ui/separator'
import { 
  Banknote, 
  RefreshCw, 
  Shield, 
  Calendar, 
  CheckCircle,
  AlertCircle,
  Code,
  Play,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Automated Collections',
    description: 'Set up recurring payments for subscriptions, EMIs, and bills automatically',
    icon: RefreshCw
  },
  {
    title: 'RBI Compliant',
    description: 'Fully compliant with RBI guidelines for electronic mandate processing',
    icon: Shield
  },
  {
    title: 'Flexible Scheduling',
    description: 'Support for various payment frequencies - monthly, quarterly, yearly',
    icon: Calendar
  },
  {
    title: 'High Success Rate',
    description: 'Optimized processing with industry-leading success rates',
    icon: CheckCircle
  }
]

const mandateStates = [
  { state: 'Pending', description: 'Mandate request created, awaiting customer approval', color: 'bg-yellow-100 text-yellow-800' },
  { state: 'Active', description: 'Mandate approved and ready for debit', color: 'bg-green-100 text-green-800' },
  { state: 'Suspended', description: 'Mandate temporarily suspended', color: 'bg-orange-100 text-orange-800' },
  { state: 'Cancelled', description: 'Mandate cancelled by customer or merchant', color: 'bg-red-100 text-red-800' },
  { state: 'Expired', description: 'Mandate expired based on end date', color: 'bg-gray-100 text-gray-800' }
]

const mandateCreation = `{
  "customerId": "cust_12345",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "bankAccount": {
      "accountNumber": "1234567890",
      "ifscCode": "HDFC0001234",
      "accountType": "savings"
    }
  },
  "mandateInfo": {
    "amount": 99900, // Amount in paise (₹999.00)
    "frequency": "monthly",
    "startDate": "2024-02-01",
    "endDate": "2025-01-31",
    "maxAmount": 199900, // Maximum debit amount
    "purpose": "subscription"
  },
  "productInfo": {
    "name": "Premium Subscription",
    "description": "Monthly premium plan"
  },
  "returnUrl": "https://yourapp.com/mandate/success",
  "webhookUrl": "https://yourapp.com/webhook/enach"
}`

const sdkImplementation = `// Initialize E-NACH SDK
const sabPaisaENach = new SabPaisa.ENach({
  clientCode: process.env.SABPAISA_CLIENT_CODE,
  clientSecret: process.env.SABPAISA_CLIENT_SECRET,
  environment: 'sandbox'
});

// Create E-NACH mandate
async function createMandate(mandateDetails) {
  try {
    const mandateRequest = {
      customerId: mandateDetails.customerId,
      customerInfo: mandateDetails.customer,
      mandateInfo: {
        amount: mandateDetails.amount,
        frequency: mandateDetails.frequency,
        startDate: mandateDetails.startDate,
        endDate: mandateDetails.endDate,
        maxAmount: mandateDetails.maxAmount,
        purpose: mandateDetails.purpose
      },
      productInfo: mandateDetails.product,
      returnUrl: \`\${process.env.BASE_URL}/mandate/success\`,
      webhookUrl: \`\${process.env.BASE_URL}/webhook/enach\`
    };

    const response = await sabPaisaENach.mandates.create(mandateRequest);
    
    return {
      success: true,
      mandateId: response.mandateId,
      approvalUrl: response.approvalUrl,
      status: response.status
    };
  } catch (error) {
    console.error('Mandate creation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Process debit request
async function processDebit(mandateId, amount, reference) {
  try {
    const debitRequest = {
      mandateId: mandateId,
      amount: amount,
      reference: reference,
      scheduledDate: new Date().toISOString().split('T')[0]
    };

    const response = await sabPaisaENach.debits.create(debitRequest);
    
    return {
      success: true,
      debitId: response.debitId,
      status: response.status,
      scheduledDate: response.scheduledDate
    };
  } catch (error) {
    console.error('Debit processing failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}`

const webhookHandler = `// E-NACH Webhook handler
app.post('/webhook/enach', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-sabpaisa-signature'];
  const payload = req.body;

  // Verify webhook signature
  const expectedSignature = sabPaisaENach.webhooks.generateSignature(payload);
  
  if (signature !== expectedSignature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(payload);
  
  switch (event.type) {
    case 'mandate.approved':
      // Handle mandate approval
      updateMandateStatus(event.data.mandateId, 'active');
      sendMandateApprovalNotification(event.data.customerId);
      break;
      
    case 'mandate.rejected':
      // Handle mandate rejection
      updateMandateStatus(event.data.mandateId, 'rejected');
      sendMandateRejectionNotification(event.data.customerId);
      break;
      
    case 'debit.success':
      // Handle successful debit
      updatePaymentStatus(event.data.debitId, 'success');
      processSubscriptionRenewal(event.data.customerId);
      break;
      
    case 'debit.failed':
      // Handle failed debit
      updatePaymentStatus(event.data.debitId, 'failed');
      handlePaymentFailure(event.data.customerId, event.data.reason);
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.status(200).json({ received: true });
});`

export default function ENachPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Banknote className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">E-NACH</h1>
            <Badge>Recurring Payments</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Automate recurring payment collection with Electronic National Automated Clearing House (E-NACH). Perfect for subscriptions, EMIs, and regular bill payments.
          </p>
        </div>

        {/* Alert */}
        <div className="mb-8">
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-1">Important Note</h3>
                  <p className="text-sm text-orange-800">
                    E-NACH mandates require customer bank account verification and approval. The process typically takes 1-2 business days for activation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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

        {/* Mandate Lifecycle */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Mandate Lifecycle</h2>
          <div className="space-y-3">
            {mandateStates.map((mandate, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <Badge className={mandate.color}>{mandate.state}</Badge>
                <p className="text-sm">{mandate.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Implementation Examples</h2>
          
          <Tabs defaultValue="mandate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mandate">Create Mandate</TabsTrigger>
              <TabsTrigger value="implementation">SDK Usage</TabsTrigger>
              <TabsTrigger value="webhook">Webhook Handler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mandate">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Mandate Creation Request</h3>
                <p className="text-muted-foreground">
                  Example payload for creating an E-NACH mandate:
                </p>
                <CodeBlock 
                  code={mandateCreation} 
                  language="json" 
                  filename="mandate-request.json"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="implementation">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">JavaScript SDK Implementation</h3>
                <p className="text-muted-foreground">
                  Complete implementation for mandate creation and debit processing:
                </p>
                <CodeBlock 
                  code={sdkImplementation} 
                  language="javascript" 
                  filename="enach-integration.js"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="webhook">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Webhook Event Handler</h3>
                <p className="text-muted-foreground">
                  Handle E-NACH events and notifications:
                </p>
                <CodeBlock 
                  code={webhookHandler} 
                  language="javascript" 
                  filename="enach-webhook.js"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="my-12" />

        {/* Testing & Documentation */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Testing & Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Test E-NACH APIs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Test E-NACH mandate creation and debit processing in our interactive playground.
                </CardDescription>
                <Button asChild>
                  <Link href="/playground?tab=enach">
                    Test APIs
                    <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Integration Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Step-by-step integration guide for different platforms and frameworks.
                </CardDescription>
                <Button asChild variant="outline">
                  <Link href="/docs/integration/server">
                    View Integration
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Best Practices</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Clear Communication</h4>
                    <p className="text-sm text-muted-foreground">
                      Always inform customers about mandate amounts, frequency, and purposes before requesting approval.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Handle Failures Gracefully</h4>
                    <p className="text-sm text-muted-foreground">
                      Implement retry logic for failed debits and provide clear failure reasons to customers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Monitor Mandate Health</h4>
                    <p className="text-sm text-muted-foreground">
                      Regularly check mandate status and proactively address issues to maintain high success rates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Need Help with E-NACH?</h3>
          <p className="text-muted-foreground mb-6">
            E-NACH integration can be complex. Our support team is here to help you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/community">Join Community</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/api#enach">API Reference</Link>
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