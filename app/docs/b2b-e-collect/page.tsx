import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/ui/code-block'
import { Separator } from '@/components/ui/separator'
import { 
  Building2, 
  TrendingUp, 
  FileText, 
  Shield, 
  CheckCircle,
  BarChart3,
  Clock,
  Users,
  Play,
  Code,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Bulk Payment Collection',
    description: 'Process multiple business payments simultaneously with batch operations',
    icon: Users
  },
  {
    title: 'Advanced Reconciliation',
    description: 'Automated matching and reconciliation with detailed reporting',
    icon: BarChart3
  },
  {
    title: 'Multi-Entity Support',
    description: 'Manage collections for multiple business entities from one dashboard',
    icon: Building2
  },
  {
    title: 'Real-time Tracking',
    description: 'Monitor payment statuses with instant notifications and updates',
    icon: Clock
  }
]

const benefits = [
  { title: 'Reduce Manual Effort', description: 'Automate invoice generation and payment tracking' },
  { title: 'Improve Cash Flow', description: 'Faster collections with multiple payment options' },
  { title: 'Better Visibility', description: 'Real-time dashboards and comprehensive reporting' },
  { title: 'Enhanced Security', description: 'Bank-grade security for business transactions' },
  { title: 'Scalable Solution', description: 'Handle growing transaction volumes effortlessly' },
  { title: 'Compliance Ready', description: 'Built-in compliance with financial regulations' }
]

const collectionRequest = `{
  "collectionId": "coll_b2b_12345",
  "businessInfo": {
    "entityId": "entity_abc123",
    "entityName": "ABC Enterprises Ltd",
    "gstNumber": "22AAAAA0000A1Z5"
  },
  "payerInfo": {
    "businessName": "XYZ Corporation",
    "contactPerson": "John Smith",
    "email": "accounts@xyzcorp.com",
    "phone": "9876543210",
    "gstNumber": "29BBBBB1111B2Y6"
  },
  "invoiceDetails": {
    "invoiceNumber": "INV-2024-001",
    "invoiceDate": "2024-01-15",
    "dueDate": "2024-02-14",
    "amount": 50000000, // Amount in paise (₹5,00,000.00)
    "currency": "INR",
    "description": "Software licensing and maintenance charges",
    "lineItems": [
      {
        "description": "Software License - Annual",
        "quantity": 1,
        "unitPrice": 40000000,
        "amount": 40000000
      },
      {
        "description": "Maintenance Support - Annual", 
        "quantity": 1,
        "unitPrice": 10000000,
        "amount": 10000000
      }
    ]
  },
  "paymentOptions": {
    "methods": ["bank_transfer", "rtgs", "neft", "imps"],
    "partialPayments": true,
    "installments": {
      "allowed": true,
      "maxInstallments": 3
    }
  },
  "notificationSettings": {
    "sendInvoice": true,
    "reminderSchedule": ["7_days", "3_days", "1_day"],
    "escalationLevel": "manager"
  },
  "webhookUrl": "https://yourapp.com/webhook/b2b-collect"
}`

const sdkImplementation = `// Initialize B2B E-Collect SDK
const sabPaisaB2B = new SabPaisa.B2BCollect({
  clientCode: process.env.SABPAISA_CLIENT_CODE,
  clientSecret: process.env.SABPAISA_CLIENT_SECRET,
  environment: 'sandbox'
});

// Create collection request
async function createB2BCollection(collectionDetails) {
  try {
    const collectionRequest = {
      collectionId: collectionDetails.collectionId,
      businessInfo: collectionDetails.business,
      payerInfo: collectionDetails.payer,
      invoiceDetails: {
        invoiceNumber: collectionDetails.invoice.number,
        invoiceDate: collectionDetails.invoice.date,
        dueDate: collectionDetails.invoice.dueDate,
        amount: collectionDetails.invoice.amount,
        currency: 'INR',
        description: collectionDetails.invoice.description,
        lineItems: collectionDetails.invoice.items
      },
      paymentOptions: {
        methods: ['bank_transfer', 'rtgs', 'neft', 'imps'],
        partialPayments: true,
        installments: collectionDetails.allowInstallments || false
      },
      notificationSettings: {
        sendInvoice: true,
        reminderSchedule: ['7_days', '3_days', '1_day'],
        escalationLevel: 'manager'
      },
      webhookUrl: \`\${process.env.BASE_URL}/webhook/b2b-collect\`
    };

    const response = await sabPaisaB2B.collections.create(collectionRequest);
    
    return {
      success: true,
      collectionId: response.collectionId,
      invoiceUrl: response.invoiceUrl,
      paymentUrl: response.paymentUrl,
      trackingId: response.trackingId
    };
  } catch (error) {
    console.error('B2B collection creation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Process bulk collections
async function processBulkCollections(collectionsArray) {
  try {
    const bulkRequest = {
      batchId: \`batch_\${Date.now()}\`,
      collections: collectionsArray,
      processingMode: 'async', // or 'sync' for smaller batches
      notificationEmail: 'admin@yourcompany.com'
    };

    const response = await sabPaisaB2B.collections.createBulk(bulkRequest);
    
    return {
      success: true,
      batchId: response.batchId,
      totalCollections: response.totalCollections,
      processed: response.processed,
      failed: response.failed,
      statusUrl: response.statusUrl
    };
  } catch (error) {
    console.error('Bulk collection processing failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Get collection status and analytics
async function getCollectionAnalytics(dateRange) {
  try {
    const response = await sabPaisaB2B.analytics.getCollections({
      startDate: dateRange.start,
      endDate: dateRange.end,
      groupBy: 'day', // 'day', 'week', 'month'
      includeDetails: true
    });
    
    return {
      success: true,
      totalAmount: response.totalAmount,
      totalCollections: response.totalCollections,
      successRate: response.successRate,
      averageCollectionTime: response.averageCollectionTime,
      topPayers: response.topPayers,
      breakdown: response.breakdown
    };
  } catch (error) {
    console.error('Analytics fetch failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}`

const webhookHandler = `// B2B E-Collect Webhook handler
app.post('/webhook/b2b-collect', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-sabpaisa-signature'];
  const payload = req.body;

  // Verify webhook signature
  const expectedSignature = sabPaisaB2B.webhooks.generateSignature(payload);
  
  if (signature !== expectedSignature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(payload);
  
  switch (event.type) {
    case 'collection.created':
      // Handle new collection request
      updateCollectionStatus(event.data.collectionId, 'pending');
      sendInvoiceToCustomer(event.data.collectionId);
      break;
      
    case 'payment.received':
      // Handle payment received
      updateCollectionStatus(event.data.collectionId, 'paid');
      updateAccountsReceivable(event.data.collectionId, event.data.amount);
      sendPaymentConfirmation(event.data.payerEmail);
      break;
      
    case 'payment.partial':
      // Handle partial payment
      updatePartialPayment(event.data.collectionId, event.data.paidAmount);
      scheduleFollowUpReminder(event.data.collectionId);
      break;
      
    case 'collection.overdue':
      // Handle overdue collection
      updateCollectionStatus(event.data.collectionId, 'overdue');
      escalateToManager(event.data.collectionId);
      sendOverdueNotice(event.data.payerEmail);
      break;
      
    case 'collection.cancelled':
      // Handle cancelled collection
      updateCollectionStatus(event.data.collectionId, 'cancelled');
      reverseAccountsReceivable(event.data.collectionId);
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.status(200).json({ received: true });
});`

export default function B2BECollectPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">B2B E-Collect</h1>
            <Badge>Enterprise</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Streamline business-to-business payment collection with advanced features for bulk processing, automated reconciliation, and comprehensive reporting.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Enterprise Features</h2>
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

        {/* Business Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Business Benefits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Workflow */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Collection Workflow</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Create Invoice</h4>
              <p className="text-sm text-muted-foreground">Generate digital invoice with payment details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Send Notice</h4>
              <p className="text-sm text-muted-foreground">Automated invoice delivery via email/SMS</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Track Status</h4>
              <p className="text-sm text-muted-foreground">Real-time payment status monitoring</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Receive Payment</h4>
              <p className="text-sm text-muted-foreground">Accept payments via multiple channels</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">5</span>
              </div>
              <h4 className="font-semibold mb-2">Reconcile</h4>
              <p className="text-sm text-muted-foreground">Automated reconciliation and reporting</p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Implementation Examples</h2>
          
          <Tabs defaultValue="collection" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="collection">Create Collection</TabsTrigger>
              <TabsTrigger value="implementation">SDK Usage</TabsTrigger>
              <TabsTrigger value="webhook">Webhook Handler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="collection">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">B2B Collection Request</h3>
                <p className="text-muted-foreground">
                  Example payload for creating a business collection request:
                </p>
                <CodeBlock 
                  code={collectionRequest} 
                  language="json" 
                  filename="b2b-collection-request.json"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="implementation">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">JavaScript SDK Implementation</h3>
                <p className="text-muted-foreground">
                  Complete implementation for B2B collections and analytics:
                </p>
                <CodeBlock 
                  code={sdkImplementation} 
                  language="javascript" 
                  filename="b2b-collect-integration.js"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="webhook">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Webhook Event Handler</h3>
                <p className="text-muted-foreground">
                  Handle B2B collection events and notifications:
                </p>
                <CodeBlock 
                  code={webhookHandler} 
                  language="javascript" 
                  filename="b2b-collect-webhook.js"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="my-12" />

        {/* Analytics Dashboard */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Analytics & Reporting</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Collection Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate:</span>
                    <span className="font-medium text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Collection Time:</span>
                    <span className="font-medium">3.2 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Volume:</span>
                    <span className="font-medium">₹12.4 Cr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>RTGS/NEFT:</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IMPS:</span>
                    <span className="font-medium">23%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bank Transfer:</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Reports Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">• Daily Collection Summary</div>
                  <div className="text-sm">• Aging Analysis Report</div>
                  <div className="text-sm">• Payer Performance Report</div>
                  <div className="text-sm">• Reconciliation Report</div>
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
                  Test B2B APIs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Test B2B collection creation and bulk processing in our interactive playground.
                </CardDescription>
                <Button asChild>
                  <Link href="/playground?tab=b2b-collect">
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
                  Step-by-step integration guide for enterprise payment collection.
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

        {/* Support */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Enterprise Support</h3>
          <p className="text-muted-foreground mb-6">
            B2B E-Collect is designed for enterprise needs. Our dedicated support team ensures smooth integration and operation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/contact/enterprise">Contact Enterprise Sales</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/api#b2b-collect">API Reference</Link>
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