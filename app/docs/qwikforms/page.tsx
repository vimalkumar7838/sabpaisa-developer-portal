import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from '@/components/ui/code-block'
import { Separator } from '@/components/ui/separator'
import { 
  FormInput, 
  Palette, 
  Zap, 
  Shield, 
  CheckCircle,
  Smartphone,
  Code2,
  Settings,
  Play,
  Code,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    title: 'Drag & Drop Builder',
    description: 'Create custom payment forms with intuitive visual builder',
    icon: FormInput
  },
  {
    title: 'Custom Branding',
    description: 'Match your brand with custom colors, logos, and styling',
    icon: Palette
  },
  {
    title: 'Smart Validation',
    description: 'Built-in form validation with real-time error checking',
    icon: Shield
  },
  {
    title: 'Mobile Responsive',
    description: 'Forms that look perfect on all devices and screen sizes',
    icon: Smartphone
  }
]

const formTypes = [
  { 
    title: 'Registration Forms', 
    description: 'Event registration with payment collection',
    fields: ['Name', 'Email', 'Phone', 'Event Selection', 'Payment']
  },
  { 
    title: 'Subscription Forms', 
    description: 'Service subscriptions with recurring billing',
    fields: ['Personal Info', 'Plan Selection', 'Billing Details', 'Payment Setup']
  },
  { 
    title: 'Donation Forms', 
    description: 'Fundraising and charity donation collection',
    fields: ['Donor Info', 'Cause Selection', 'Donation Amount', 'Anonymous Option']
  },
  { 
    title: 'Booking Forms', 
    description: 'Appointment booking with advance payment',
    fields: ['Service Type', 'Date/Time', 'Customer Details', 'Advance Payment']
  },
  { 
    title: 'Survey Forms', 
    description: 'Paid surveys and market research',
    fields: ['Demographics', 'Survey Questions', 'Incentive Selection', 'Payment Info']
  },
  { 
    title: 'Application Forms', 
    description: 'Job applications with processing fees',
    fields: ['Personal Details', 'Qualifications', 'Documents Upload', 'Application Fee']
  }
]

const formConfiguration = `{
  "formId": "form_registration_001",
  "formInfo": {
    "title": "Tech Conference 2024 Registration",
    "description": "Register for the biggest tech conference of the year",
    "theme": {
      "primaryColor": "#6366f1",
      "backgroundColor": "#ffffff",
      "fontFamily": "Inter",
      "logoUrl": "https://yoursite.com/logo.png"
    }
  },
  "fields": [
    {
      "id": "full_name",
      "type": "text",
      "label": "Full Name",
      "placeholder": "Enter your full name",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 100
      }
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "placeholder": "your.email@example.com",
      "required": true,
      "validation": {
        "pattern": "email"
      }
    },
    {
      "id": "phone",
      "type": "tel",
      "label": "Phone Number",
      "placeholder": "+91 9876543210",
      "required": true,
      "validation": {
        "pattern": "phone_indian"
      }
    },
    {
      "id": "ticket_type",
      "type": "select",
      "label": "Ticket Type",
      "required": true,
      "options": [
        {
          "value": "early_bird",
          "label": "Early Bird - ₹2,999",
          "price": 299900
        },
        {
          "value": "regular",
          "label": "Regular - ₹3,999",
          "price": 399900
        },
        {
          "value": "vip",
          "label": "VIP Pass - ₹7,999",
          "price": 799900
        }
      ]
    },
    {
      "id": "dietary_preferences",
      "type": "checkbox",
      "label": "Dietary Preferences",
      "required": false,
      "options": [
        {"value": "vegetarian", "label": "Vegetarian"},
        {"value": "vegan", "label": "Vegan"},
        {"value": "gluten_free", "label": "Gluten Free"}
      ]
    }
  ],
  "paymentSettings": {
    "currency": "INR",
    "dynamicPricing": true,
    "allowPartialPayment": false,
    "processingFee": {
      "type": "percentage",
      "value": 2.5,
      "cappedAt": 5000
    }
  },
  "notifications": {
    "confirmationEmail": true,
    "reminderEmails": true,
    "webhookUrl": "https://yourapp.com/webhook/qwikforms"
  },
  "customization": {
    "submitButtonText": "Register & Pay",
    "successMessage": "Registration successful! Check your email for confirmation.",
    "redirectUrl": "https://yoursite.com/registration-success"
  }
}`

const sdkImplementation = `// Initialize QwikForms SDK
const sabPaisaForms = new SabPaisa.QwikForms({
  clientCode: process.env.SABPAISA_CLIENT_CODE,
  clientSecret: process.env.SABPAISA_CLIENT_SECRET,
  environment: 'sandbox'
});

// Create custom form
async function createPaymentForm(formConfig) {
  try {
    const formRequest = {
      formId: formConfig.formId,
      formInfo: formConfig.info,
      fields: formConfig.fields,
      paymentSettings: {
        currency: 'INR',
        dynamicPricing: formConfig.dynamicPricing || false,
        allowPartialPayment: formConfig.allowPartial || false,
        processingFee: formConfig.processingFee
      },
      notifications: {
        confirmationEmail: true,
        reminderEmails: formConfig.reminders || false,
        webhookUrl: \`\${process.env.BASE_URL}/webhook/qwikforms\`
      },
      customization: formConfig.customization
    };

    const response = await sabPaisaForms.create(formRequest);
    
    return {
      success: true,
      formId: response.formId,
      formUrl: response.formUrl,
      embedCode: response.embedCode,
      qrCode: response.qrCode
    };
  } catch (error) {
    console.error('Form creation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Get form analytics
async function getFormAnalytics(formId, dateRange) {
  try {
    const response = await sabPaisaForms.analytics.get({
      formId: formId,
      startDate: dateRange.start,
      endDate: dateRange.end,
      includeFields: true
    });
    
    return {
      success: true,
      totalSubmissions: response.totalSubmissions,
      completedPayments: response.completedPayments,
      conversionRate: response.conversionRate,
      totalRevenue: response.totalRevenue,
      fieldAnalytics: response.fieldAnalytics,
      dropOffPoints: response.dropOffPoints
    };
  } catch (error) {
    console.error('Analytics fetch failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Update form configuration
async function updateFormConfig(formId, updates) {
  try {
    const response = await sabPaisaForms.update(formId, {
      fields: updates.fields,
      paymentSettings: updates.paymentSettings,
      customization: updates.customization,
      isActive: updates.isActive !== undefined ? updates.isActive : true
    });
    
    return {
      success: true,
      formId: response.formId,
      lastModified: response.lastModified,
      version: response.version
    };
  } catch (error) {
    console.error('Form update failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Embed form in website
function embedForm(formId, containerId, options = {}) {
  const script = document.createElement('script');
  script.src = 'https://forms.sabpaisa.com/embed.js';
  script.onload = function() {
    window.SabPaisaForms.embed({
      formId: formId,
      container: containerId,
      theme: options.theme || 'default',
      width: options.width || '100%',
      height: options.height || 'auto',
      onSubmit: options.onSubmit,
      onPaymentSuccess: options.onPaymentSuccess,
      onPaymentError: options.onPaymentError
    });
  };
  document.head.appendChild(script);
}`

const webhookHandler = `// QwikForms Webhook handler
app.post('/webhook/qwikforms', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-sabpaisa-signature'];
  const payload = req.body;

  // Verify webhook signature
  const expectedSignature = sabPaisaForms.webhooks.generateSignature(payload);
  
  if (signature !== expectedSignature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(payload);
  
  switch (event.type) {
    case 'form.submitted':
      // Handle form submission (before payment)
      logFormSubmission(event.data.formId, event.data.submissionId);
      sendSubmissionNotification(event.data.formData);
      break;
      
    case 'payment.completed':
      // Handle successful payment
      processFormPayment(event.data.submissionId, event.data.paymentData);
      sendConfirmationEmail(event.data.formData.email, event.data.receiptUrl);
      updateRegistrationStatus(event.data.submissionId, 'confirmed');
      break;
      
    case 'payment.failed':
      // Handle payment failure
      logPaymentFailure(event.data.submissionId, event.data.errorReason);
      sendPaymentFailureNotification(event.data.formData.email);
      schedulePaymentRetry(event.data.submissionId);
      break;
      
    case 'form.abandoned':
      // Handle form abandonment (analytics)
      trackFormAbandonment(event.data.formId, event.data.abandonedAt);
      triggerRetargetingCampaign(event.data.partialData);
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.status(200).json({ received: true });
});`

export default function QwikFormsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FormInput className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">QwikForms</h1>
            <Badge>Custom</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Create dynamic payment forms with customizable fields, smart validation, and seamless payment integration. Perfect for registrations, subscriptions, donations, and more.
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

        {/* Form Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Form Types</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {formTypes.map((formType, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{formType.title}</CardTitle>
                  <CardDescription>{formType.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-muted-foreground">Typical Fields:</h5>
                    <div className="flex flex-wrap gap-2">
                      {formType.fields.map((field, fieldIndex) => (
                        <Badge key={fieldIndex} variant="outline" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              <h4 className="font-semibold mb-2">Design Form</h4>
              <p className="text-sm text-muted-foreground">Use drag-and-drop builder to create custom form</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Configure Payment</h4>
              <p className="text-sm text-muted-foreground">Set up pricing, payment methods, and processing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Publish & Share</h4>
              <p className="text-sm text-muted-foreground">Embed on website or share direct link</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-semibold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Collect & Analyze</h4>
              <p className="text-sm text-muted-foreground">Receive submissions and track performance</p>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Code Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Implementation Examples</h2>
          
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="config">Form Configuration</TabsTrigger>
              <TabsTrigger value="implementation">SDK Usage</TabsTrigger>
              <TabsTrigger value="webhook">Webhook Handler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="config">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Form Configuration JSON</h3>
                <p className="text-muted-foreground">
                  Example configuration for a registration form with payment:
                </p>
                <CodeBlock 
                  code={formConfiguration} 
                  language="json" 
                  filename="form-config.json"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="implementation">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">JavaScript SDK Implementation</h3>
                <p className="text-muted-foreground">
                  Complete implementation for form creation and management:
                </p>
                <CodeBlock 
                  code={sdkImplementation} 
                  language="javascript" 
                  filename="qwikforms-integration.js"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="webhook">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Webhook Event Handler</h3>
                <p className="text-muted-foreground">
                  Handle form submission and payment events:
                </p>
                <CodeBlock 
                  code={webhookHandler} 
                  language="javascript" 
                  filename="qwikforms-webhook.js"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator className="my-12" />

        {/* Customization Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Customization Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Visual Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">• Custom colors and fonts</div>
                  <div className="text-sm">• Logo and branding</div>
                  <div className="text-sm">• Background images</div>
                  <div className="text-sm">• CSS customization</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Functionality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">• Conditional field logic</div>
                  <div className="text-sm">• Multi-step forms</div>
                  <div className="text-sm">• File upload support</div>
                  <div className="text-sm">• Auto-save drafts</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">• Embed codes</div>
                  <div className="text-sm">• API endpoints</div>
                  <div className="text-sm">• Webhook notifications</div>
                  <div className="text-sm">• Third-party integrations</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analytics Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Built-in Analytics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Form completion rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Payment conversion tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Field-wise analytics</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Drop-off point identification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Revenue tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Export capabilities</span>
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
                  Form Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Try our visual form builder and create your first payment form.
                </CardDescription>
                <Button asChild>
                  <Link href="/playground?tab=qwikforms">
                    Launch Builder
                    <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Browse pre-built form templates for common use cases.
                </CardDescription>
                <Button asChild variant="outline">
                  <Link href="/templates/forms">
                    Browse Templates
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Start Building Forms</h3>
          <p className="text-muted-foreground mb-6">
            QwikForms makes it easy to create professional payment forms without any coding. Get started today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/sign-up">Create Account</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/api#qwikforms">API Reference</Link>
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