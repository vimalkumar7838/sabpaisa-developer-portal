'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Lock, 
  Key, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  Database,
  Network,
  Eye,
  Clock,
  Award,
  ExternalLink,
  Download,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

const securityStandards = [
  {
    name: 'PCI DSS Level 1',
    description: 'Payment Card Industry Data Security Standard compliance',
    status: 'certified',
    icon: Award,
    details: 'Highest level of PCI DSS compliance for handling credit card transactions'
  },
  {
    name: 'ISO 27001',
    description: 'Information Security Management System',
    status: 'certified',
    icon: Shield,
    details: 'International standard for information security management'
  },
  {
    name: 'SOC 2 Type II',
    description: 'Service Organization Control 2 audit',
    status: 'certified',
    icon: FileText,
    details: 'Independent audit of security, availability, and confidentiality controls'
  },
  {
    name: 'GDPR Compliant',
    description: 'General Data Protection Regulation compliance',
    status: 'compliant',
    icon: Users,
    details: 'Full compliance with European data protection regulations'
  },
  {
    name: 'RBI Guidelines',
    description: 'Reserve Bank of India payment system guidelines',
    status: 'compliant',
    icon: FileText,
    details: 'Adherence to RBI guidelines for payment aggregators and gateways'
  }
]

const securityFeatures = [
  {
    title: 'End-to-End Encryption',
    description: 'All sensitive data is encrypted using industry-standard AES-256 encryption',
    icon: Lock,
    implementation: 'Automatic'
  },
  {
    title: 'Token-Based Authentication',
    description: 'Secure API access using JWT tokens with configurable expiration',
    icon: Key,
    implementation: 'Built-in'
  },
  {
    title: 'IP Whitelisting',
    description: 'Restrict API access to specific IP addresses or ranges',
    icon: Network,
    implementation: 'Configurable'
  },
  {
    title: 'Rate Limiting',
    description: 'Automatic protection against brute force and DDoS attacks',
    icon: Clock,
    implementation: 'Automatic'
  },
  {
    title: 'Fraud Detection',
    description: 'AI-powered fraud detection and risk scoring for transactions',
    icon: Eye,
    implementation: 'Automatic'
  },
  {
    title: 'Data Masking',
    description: 'Sensitive data is masked in logs, dashboards, and API responses',
    icon: Database,
    implementation: 'Automatic'
  }
]

const bestPractices = [
  {
    category: 'API Security',
    practices: [
      'Always validate and sanitize input data',
      'Use HTTPS for all API communications',
      'Implement proper authentication and authorization',
      'Verify webhook signatures using HMAC',
      'Store API keys securely and rotate them regularly',
      'Log security events for monitoring and audit'
    ]
  },
  {
    category: 'Data Protection',
    practices: [
      'Never store sensitive payment data',
      'Use tokenization for recurring payments',
      'Encrypt data at rest and in transit',
      'Implement proper access controls',
      'Regular security audits and penetration testing',
      'Data retention policies and secure deletion'
    ]
  },
  {
    category: 'Infrastructure Security',
    practices: [
      'Keep systems and dependencies updated',
      'Use secure network configurations',
      'Implement monitoring and alerting',
      'Regular backup and disaster recovery testing',
      'Multi-factor authentication for admin access',
      'Network segmentation and firewalls'
    ]
  }
]

export default function SecurityPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Security & Compliance</h1>
          <Badge variant="secondary">Enterprise Grade</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          Comprehensive security measures and compliance standards to protect your business and customers. Built with security-first approach.
        </p>
      </div>

      {/* Security Overview */}
      <Card className="mb-8 border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Security Promise
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <p className="mb-4">
            SabPaisa is committed to maintaining the highest standards of security and compliance. 
            We employ multiple layers of security controls and undergo regular third-party audits 
            to ensure your data and transactions are always protected.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">256-bit</div>
              <div className="text-sm">AES Encryption</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm">Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="compliance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="features">Security Features</TabsTrigger>
          <TabsTrigger value="practices">Best Practices</TabsTrigger>
          <TabsTrigger value="vulnerability">Vulnerability</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Compliance Standards</h2>
            <p className="text-muted-foreground mb-6">
              SabPaisa adheres to international security standards and regulatory requirements.
            </p>
            
            <div className="grid gap-4">
              {securityStandards.map((standard, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <standard.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{standard.name}</CardTitle>
                          <CardDescription>{standard.description}</CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={standard.status === 'certified' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {standard.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{standard.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Data Residency and Compliance</CardTitle>
                <CardDescription>
                  Regional compliance and data handling policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">India</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• RBI Payment Aggregator License</li>
                      <li>• IT Act 2000 compliance</li>
                      <li>• Data localization requirements</li>
                      <li>• KYC and AML compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">International</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• GDPR for European customers</li>
                      <li>• PCI DSS global compliance</li>
                      <li>• Cross-border data transfer safeguards</li>
                      <li>• Regional banking regulations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Security Features</h2>
            <p className="text-muted-foreground mb-6">
              Multi-layered security architecture protecting your transactions and data.
            </p>
            
            <div className="grid gap-6">
              {securityFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <CardDescription>{feature.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">{feature.implementation}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Encryption Implementation</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Data in Transit</h4>
                      <CodeBlock
                        code={`// All API communications use TLS 1.3
const response = await fetch('https://api.sabpaisa.com/v1/payments/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(paymentData)
});

// Certificate pinning for mobile SDKs
const pinnedCertificate = 'sha256/AAAAAAAAAAAAAAAAAAAAAAAAA=';`}
                        language="javascript"
                        showLineNumbers={false}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Data at Rest</h4>
                      <CodeBlock
                        code={`// Database encryption with rotating keys
Database: AES-256 encryption
Backups: Encrypted with separate key hierarchy
Logs: Sensitive data automatically masked
Tokens: One-way hashed with salt

// Key management
Key rotation: Automated every 90 days
Key storage: Hardware Security Modules (HSM)
Access control: Multi-party authorization`}
                        language="text"
                        showLineNumbers={false}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Best Practices Tab */}
        <TabsContent value="practices" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Security Best Practices</h2>
            <p className="text-muted-foreground mb-6">
              Follow these guidelines to ensure secure implementation of SabPaisa APIs.
            </p>
            
            <div className="space-y-6">
              {bestPractices.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.practices.map((practice, practiceIndex) => (
                        <li key={practiceIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-5 w-5" />
                  Security Checklist
                </CardTitle>
              </CardHeader>
              <CardContent className="text-amber-700">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Before Going Live</h4>
                    <ul className="text-sm space-y-1">
                      <li>□ SSL certificate installed and configured</li>
                      <li>□ API keys secured and not exposed in frontend code</li>
                      <li>□ Webhook signature verification implemented</li>
                      <li>□ Input validation and sanitization in place</li>
                      <li>□ Error handling doesn't expose sensitive data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Ongoing Security</h4>
                    <ul className="text-sm space-y-1">
                      <li>□ Regular security updates and patches</li>
                      <li>□ API key rotation schedule established</li>
                      <li>□ Security monitoring and alerting active</li>
                      <li>□ Regular security assessments conducted</li>
                      <li>□ Incident response plan documented</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vulnerability Tab */}
        <TabsContent value="vulnerability" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Vulnerability Disclosure</h2>
            <p className="text-muted-foreground mb-6">
              We welcome security researchers to help us maintain the security of our platform.
            </p>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Responsible Disclosure Program
                </CardTitle>
                <CardDescription>
                  Report security vulnerabilities and help us keep SabPaisa secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Scope</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SabPaisa API endpoints and web applications</li>
                      <li>• Mobile SDKs and payment forms</li>
                      <li>• Infrastructure and network security</li>
                      <li>• Authentication and authorization systems</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Reporting Process</h4>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <h5 className="font-medium">Report</h5>
                        <p className="text-xs text-muted-foreground">Send detailed report to security@sabpaisa.com</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Eye className="h-4 w-4 text-primary" />
                        </div>
                        <h5 className="font-medium">Review</h5>
                        <p className="text-xs text-muted-foreground">We review and confirm the vulnerability</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <h5 className="font-medium">Resolve</h5>
                        <p className="text-xs text-muted-foreground">Fix deployed and researcher acknowledged</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button>
                      <Mail className="mr-2 h-4 w-4" />
                      Report Vulnerability
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Guidelines
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Timeline</CardTitle>
                <CardDescription>
                  Our commitment to addressing security vulnerabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Critical</Badge>
                    <span className="text-sm">Response within 2 hours, fix within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">High</Badge>
                    <span className="text-sm">Response within 8 hours, fix within 72 hours</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Medium</Badge>
                    <span className="text-sm">Response within 24 hours, fix within 7 days</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Low</Badge>
                    <span className="text-sm">Response within 48 hours, fix within 30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Security Certifications</h2>
            <p className="text-muted-foreground mb-6">
              Download our security certificates and audit reports.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    PCI DSS Certificate
                  </CardTitle>
                  <CardDescription>
                    Level 1 PCI DSS compliance certificate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>Valid until: December 31, 2024</div>
                    <div>Assessor: Qualified Security Assessor</div>
                    <div>Scope: Full payment processing infrastructure</div>
                  </div>
                  <Button size="sm" className="mt-4" variant="outline">
                    <Download className="mr-2 h-3 w-3" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    ISO 27001 Certificate
                  </CardTitle>
                  <CardDescription>
                    Information Security Management System
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>Valid until: March 15, 2025</div>
                    <div>Certified by: International certification body</div>
                    <div>Scope: Information security management</div>
                  </div>
                  <Button size="sm" className="mt-4" variant="outline">
                    <Download className="mr-2 h-3 w-3" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    SOC 2 Report
                  </CardTitle>
                  <CardDescription>
                    Type II audit report on security controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>Report period: January 1 - December 31, 2023</div>
                    <div>Auditor: Independent CPA firm</div>
                    <div>Opinion: Unqualified opinion</div>
                  </div>
                  <Button size="sm" className="mt-4" variant="outline">
                    <Download className="mr-2 h-3 w-3" />
                    Request Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    GDPR Assessment
                  </CardTitle>
                  <CardDescription>
                    Data protection impact assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>Assessment date: October 2023</div>
                    <div>Assessor: Privacy law firm</div>
                    <div>Status: Fully compliant</div>
                  </div>
                  <Button size="sm" className="mt-4" variant="outline">
                    <Download className="mr-2 h-3 w-3" />
                    Download Summary
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Security Contact</CardTitle>
                <CardDescription>
                  Get in touch with our security team for questions or concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Security Team</h4>
                    <div className="space-y-2 text-sm">
                      <div>Email: security@sabpaisa.com</div>
                      <div>Phone: +91-80-4718-8000</div>
                      <div>Response time: Within 24 hours</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Compliance Team</h4>
                    <div className="space-y-2 text-sm">
                      <div>Email: compliance@sabpaisa.com</div>
                      <div>Phone: +91-80-4718-8001</div>
                      <div>For: Audit requests, compliance queries</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}