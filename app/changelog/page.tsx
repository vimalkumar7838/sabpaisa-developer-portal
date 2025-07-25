'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
  Plus, 
  ArrowUp, 
  Bug, 
  Shield,
  AlertTriangle,
  Calendar,
  Search,
  ExternalLink,
  GitBranch,
  Tag,
  Clock,
  Filter,
  Bell
} from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

interface ChangelogEntry {
  version: string
  date: string
  type: 'major' | 'minor' | 'patch'
  status: 'latest' | 'stable' | 'deprecated'
  changes: {
    added?: string[]
    improved?: string[]
    fixed?: string[]
    deprecated?: string[]
    breaking?: string[]
    security?: string[]
  }
  migration?: {
    title: string
    description: string
    codeExample?: string
  }
  apiChanges?: {
    endpoint: string
    change: string
    impact: 'breaking' | 'non-breaking'
  }[]
}

const changelogData: ChangelogEntry[] = [
  {
    version: '2.1.0',
    date: '2024-01-15',
    type: 'minor',
    status: 'latest',
    changes: {
      added: [
        'QwikForms API for dynamic form generation',
        'Enhanced webhook retry mechanism with exponential backoff',
        'New payment method: UPI AutoPay for recurring payments',
        'Real-time payment status updates via WebSocket',
        'Support for international cards (Visa, Mastercard)'
      ],
      improved: [
        'Payment processing speed improved by 40%',
        'Enhanced error messages with more context',
        'Better mobile SDK performance on Android',
        'Improved dashboard analytics with real-time charts'
      ],
      fixed: [
        'Fixed issue with E-NACH mandate cancellation',
        'Resolved timeout issues in payment status API',
        'Fixed webhook signature validation in PHP SDK',
        'Corrected amount validation for international transactions'
      ]
    },
    apiChanges: [
      {
        endpoint: '/api/v1/payments/create',
        change: 'Added support for UPI AutoPay method',
        impact: 'non-breaking'
      },
      {
        endpoint: '/api/v1/forms/create',
        change: 'New endpoint for dynamic form creation',
        impact: 'non-breaking'
      }
    ]
  },
  {
    version: '2.0.0',
    date: '2023-12-10',
    type: 'major',
    status: 'stable',
    changes: {
      added: [
        'B2B E-Collect API for bulk payment collection',
        'Advanced fraud detection and risk scoring',
        'Multi-currency support (USD, EUR, GBP)',
        'GraphQL API alongside REST API',
        'Payment Link customization options'
      ],
      improved: [
        'Complete API redesign for better developer experience',
        'Enhanced security with OAuth 2.0 support',
        'Improved webhook delivery reliability',
        'Better error handling and response codes'
      ],
      breaking: [
        'Authentication now requires API version header',
        'Changed response format for payment status endpoint',
        'Removed deprecated v1 endpoints',
        'Updated webhook payload structure'
      ],
      security: [
        'Implemented additional PCI DSS compliance measures',
        'Enhanced encryption for sensitive data',
        'Added IP whitelisting for webhook endpoints'
      ]
    },
    migration: {
      title: 'Migrating to v2.0',
      description: 'Version 2.0 introduces breaking changes that require code updates. Follow this guide to migrate your integration.',
      codeExample: `// Before (v1.x)
const payment = await sabpaisa.payments.create({
  amount: 10000,
  currency: 'INR'
});

// After (v2.0)
const payment = await sabpaisa.payments.create({
  amount: 10000,
  currency: 'INR',
  // New required fields
  orderId: 'unique_order_id',
  customerInfo: {
    name: 'Customer Name',
    email: 'customer@example.com'
  }
}, {
  headers: {
    'API-Version': '2.0'
  }
});`
    },
    apiChanges: [
      {
        endpoint: '/api/v1/payments/create',
        change: 'Added required orderId and customerInfo fields',
        impact: 'breaking'
      },
      {
        endpoint: '/api/v1/payments/{id}/status',
        change: 'Changed response format to include more details',
        impact: 'breaking'
      }
    ]
  },
  {
    version: '1.8.2',
    date: '2023-11-20',
    type: 'patch',
    status: 'stable',
    changes: {
      fixed: [
        'Fixed memory leak in mobile SDKs',
        'Resolved race condition in concurrent payments',
        'Fixed decimal precision issues in amount calculations',
        'Corrected timezone handling in payment timestamps'
      ],
      improved: [
        'Better error messages for invalid API keys',
        'Improved logging for debugging',
        'Enhanced rate limiting feedback'
      ]
    }
  },
  {
    version: '1.8.1',
    date: '2023-11-05',
    type: 'patch',
    status: 'stable',
    changes: {
      fixed: [
        'Fixed webhook delivery for failed payments',
        'Resolved issue with payment link expiration',
        'Fixed amount formatting in payment receipts',
        'Corrected validation for phone numbers'
      ],
      security: [
        'Updated dependencies to address security vulnerabilities',
        'Enhanced input sanitization'
      ]
    }
  },
  {
    version: '1.8.0',
    date: '2023-10-15',
    type: 'minor',
    status: 'deprecated',
    changes: {
      added: [
        'Payment Link API for instant payment collection',
        'Enhanced E-NACH with SIP support',
        'New webhook events for refund processing',
        'Support for partial refunds'
      ],
      improved: [
        'Faster payment processing for net banking',
        'Better mobile responsiveness in payment forms',
        'Enhanced analytics and reporting'
      ],
      deprecated: [
        'Legacy authentication method (Basic Auth)',
        'Old webhook payload format (will be removed in v2.0)'
      ]
    }
  }
]

const getChangeIcon = (type: string) => {
  switch (type) {
    case 'added': return <Plus className="h-4 w-4 text-green-600" />
    case 'improved': return <ArrowUp className="h-4 w-4 text-blue-600" />
    case 'fixed': return <Bug className="h-4 w-4 text-purple-600" />
    case 'security': return <Shield className="h-4 w-4 text-orange-600" />
    case 'breaking': return <AlertTriangle className="h-4 w-4 text-red-600" />
    case 'deprecated': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    default: return <FileText className="h-4 w-4 text-gray-600" />
  }
}

const getChangeColor = (type: string) => {
  switch (type) {
    case 'added': return 'text-green-700 border-green-200 bg-green-50'
    case 'improved': return 'text-blue-700 border-blue-200 bg-blue-50'
    case 'fixed': return 'text-purple-700 border-purple-200 bg-purple-50'
    case 'security': return 'text-orange-700 border-orange-200 bg-orange-50'
    case 'breaking': return 'text-red-700 border-red-200 bg-red-50'
    case 'deprecated': return 'text-yellow-700 border-yellow-200 bg-yellow-50'
    default: return 'text-gray-700 border-gray-200 bg-gray-50'
  }
}

export default function ChangelogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedVersion, setSelectedVersion] = useState<string>('all')

  const filteredChangelog = changelogData.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(entry.changes).flat().some(change => 
        change?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    
    const matchesType = selectedType === 'all' || entry.type === selectedType
    const matchesVersion = selectedVersion === 'all' || entry.version === selectedVersion

    return matchesSearch && matchesType && matchesVersion
  })

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Changelog</h1>
            <Badge variant="secondary">Version History</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Stay updated with the latest features, improvements, and fixes in SabPaisa APIs and services.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">v{changelogData[0].version}</div>
                  <div className="text-sm text-muted-foreground">Latest Version</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{changelogData[0].date}</div>
                  <div className="text-sm text-muted-foreground">Release Date</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{changelogData.length}</div>
                  <div className="text-sm text-muted-foreground">Total Releases</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-muted-foreground">Days Avg. Cycle</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Releases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search versions or changes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Release Type</label>
                <select 
                  className="w-full px-3 py-2 border rounded-md"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="major">Major Releases</option>
                  <option value="minor">Minor Releases</option>
                  <option value="patch">Patch Releases</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Version</label>
                <select 
                  className="w-full px-3 py-2 border rounded-md"
                  value={selectedVersion}
                  onChange={(e) => setSelectedVersion(e.target.value)}
                >
                  <option value="all">All Versions</option>
                  {changelogData.map((entry) => (
                    <option key={entry.version} value={entry.version}>
                      v{entry.version}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {filteredChangelog.map((entry, index) => (
            <Card key={entry.version} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={entry.status === 'latest' ? 'default' : entry.status === 'stable' ? 'secondary' : 'outline'}
                      className="text-lg px-3 py-1"
                    >
                      v{entry.version}
                    </Badge>
                    <Badge variant="outline">{entry.type}</Badge>
                    {entry.status === 'latest' && <Badge variant="default">Latest</Badge>}
                    {entry.status === 'deprecated' && <Badge variant="destructive">Deprecated</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="changes" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="changes">Changes</TabsTrigger>
                      {entry.apiChanges && <TabsTrigger value="api">API Changes</TabsTrigger>}
                      {entry.migration && <TabsTrigger value="migration">Migration</TabsTrigger>}
                    </TabsList>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`https://github.com/sabpaisa/api/releases/tag/v${entry.version}`}>
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View Release
                      </Link>
                    </Button>
                  </div>

                  <TabsContent value="changes" className="space-y-6">
                    {Object.entries(entry.changes).map(([type, changes]) => 
                      changes && changes.length > 0 && (
                        <div key={type} className={`border rounded-lg p-4 ${getChangeColor(type)}`}>
                          <div className="flex items-center gap-2 mb-3">
                            {getChangeIcon(type)}
                            <h4 className="font-semibold capitalize">{type}</h4>
                          </div>
                          <ul className="space-y-2">
                            {changes.map((change, changeIndex) => (
                              <li key={changeIndex} className="flex items-start gap-2 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0"></span>
                                <span>{change}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </TabsContent>

                  {entry.apiChanges && (
                    <TabsContent value="api" className="space-y-4">
                      <div className="space-y-4">
                        {entry.apiChanges.map((apiChange, apiIndex) => (
                          <div key={apiIndex} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <code className="text-sm bg-muted px-2 py-1 rounded">
                                {apiChange.endpoint}
                              </code>
                              <Badge variant={apiChange.impact === 'breaking' ? 'destructive' : 'secondary'}>
                                {apiChange.impact}
                              </Badge>
                            </div>
                            <p className="text-sm">{apiChange.change}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  )}

                  {entry.migration && (
                    <TabsContent value="migration" className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold mb-2">{entry.migration.title}</h4>
                        <p className="text-muted-foreground mb-4">{entry.migration.description}</p>
                        {entry.migration.codeExample && (
                          <CodeBlock
                            code={entry.migration.codeExample}
                            language="javascript"
                          />
                        )}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredChangelog.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No releases found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Subscribe to Updates */}
        <Card className="mt-8 border-2 border-dashed border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Stay Updated
            </CardTitle>
            <CardDescription>
              Get notified about new releases and important updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">RSS Feed</h4>
                  <p className="text-sm text-muted-foreground mb-3">Subscribe to our changelog RSS feed</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Email Updates</h4>
                  <p className="text-sm text-muted-foreground mb-3">Get release notes in your inbox</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">GitHub Releases</h4>
                  <p className="text-sm text-muted-foreground mb-3">Watch our GitHub repository</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Follow
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}