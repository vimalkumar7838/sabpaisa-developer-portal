'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Search,
  Plus,
  Filter,
  Star,
  MessageCircle,
  ThumbsUp,
  Eye,
  Calendar,
  Tag,
  HelpCircle,
  Lightbulb,
  Bug,
  Code,
  Settings,
  Crown,
  Clock
} from 'lucide-react'
import Link from 'next/link'

interface ForumCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  postCount: number
  lastActivity: string
  moderators: string[]
}

interface ForumPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
    role: 'developer' | 'moderator' | 'staff'
    reputation: number
  }
  category: string
  tags: string[]
  createdAt: string
  lastReply: string
  replies: number
  views: number
  likes: number
  status: 'open' | 'closed' | 'solved'
  pinned?: boolean
}

const forumCategories: ForumCategory[] = [
  {
    id: 'qa',
    name: 'Questions & Answers',
    description: 'Get help with integration issues and technical questions',
    icon: HelpCircle,
    color: 'text-blue-600 bg-blue-100',
    postCount: 1247,
    lastActivity: '2 minutes ago',
    moderators: ['SabPaisa Team', 'Community Moderators']
  },
  {
    id: 'feature-requests',
    name: 'Feature Requests',
    description: 'Suggest new features and improvements',
    icon: Lightbulb,
    color: 'text-yellow-600 bg-yellow-100',
    postCount: 89,
    lastActivity: '1 hour ago',
    moderators: ['Product Team']
  },
  {
    id: 'bug-reports',
    name: 'Bug Reports',
    description: 'Report issues and bugs you encounter',
    icon: Bug,
    color: 'text-red-600 bg-red-100',
    postCount: 156,
    lastActivity: '30 minutes ago',
    moderators: ['Engineering Team']
  },
  {
    id: 'code-examples',
    name: 'Code Examples',
    description: 'Share and discuss integration code examples',
    icon: Code,
    color: 'text-green-600 bg-green-100',
    postCount: 234,
    lastActivity: '3 hours ago',
    moderators: ['Developer Advocates']
  },
  {
    id: 'general',
    name: 'General Discussion',
    description: 'General discussions about SabPaisa and payments',
    icon: MessageSquare,
    color: 'text-purple-600 bg-purple-100',
    postCount: 567,
    lastActivity: '15 minutes ago',
    moderators: ['Community Team']
  },
  {
    id: 'announcements',
    name: 'Announcements',
    description: 'Official announcements and updates',
    icon: Settings,
    color: 'text-indigo-600 bg-indigo-100',
    postCount: 23,
    lastActivity: '2 days ago',
    moderators: ['SabPaisa Team']
  }
]

const recentPosts: ForumPost[] = [
  {
    id: '1',
    title: 'How to implement UPI AutoPay with SabPaisa?',
    excerpt: 'I\'m trying to integrate UPI AutoPay for recurring payments but facing issues with mandate creation...',
    author: {
      name: 'dev_raj',
      avatar: '/placeholder-avatar.jpg',
      role: 'developer',
      reputation: 245
    },
    category: 'qa',
    tags: ['UPI', 'AutoPay', 'recurring-payments'],
    createdAt: '2024-01-15T10:30:00Z',
    lastReply: '2024-01-15T11:45:00Z',
    replies: 3,
    views: 127,
    likes: 5,
    status: 'open'
  },
  {
    id: '2',
    title: 'Webhook signature verification failing in production',
    excerpt: 'The HMAC signature verification works in sandbox but fails in production environment...',
    author: {
      name: 'sarah_tech',
      avatar: '/placeholder-avatar.jpg',
      role: 'developer',
      reputation: 892
    },
    category: 'qa',
    tags: ['webhooks', 'security', 'production'],
    createdAt: '2024-01-15T09:15:00Z',
    lastReply: '2024-01-15T10:20:00Z',
    replies: 7,
    views: 234,
    likes: 12,
    status: 'solved'
  },
  {
    id: '3',
    title: 'Feature Request: Support for SEPA payments',
    excerpt: 'It would be great to have SEPA payment method support for European customers...',
    author: {
      name: 'european_dev',
      avatar: '/placeholder-avatar.jpg',
      role: 'developer',
      reputation: 156
    },
    category: 'feature-requests',
    tags: ['SEPA', 'international', 'payments'],
    createdAt: '2024-01-14T16:22:00Z',
    lastReply: '2024-01-15T08:30:00Z',
    replies: 15,
    views: 445,
    likes: 28,
    status: 'open',
    pinned: true
  },
  {
    id: '4',
    title: 'React Native SDK memory leak issue',
    excerpt: 'Experiencing memory leaks when using the React Native SDK for multiple payment flows...',
    author: {
      name: 'mobile_expert',
      avatar: '/placeholder-avatar.jpg',
      role: 'developer',
      reputation: 678
    },
    category: 'bug-reports',
    tags: ['react-native', 'mobile', 'memory-leak'],
    createdAt: '2024-01-14T14:10:00Z',
    lastReply: '2024-01-15T07:45:00Z',
    replies: 4,
    views: 189,
    likes: 8,
    status: 'open'
  },
  {
    id: '5',
    title: 'Complete Node.js integration example with Express',
    excerpt: 'Here\'s a complete working example of SabPaisa integration with Node.js and Express...',
    author: {
      name: 'sabpaisa_team',
      avatar: '/placeholder-avatar.jpg',
      role: 'staff',
      reputation: 2450
    },
    category: 'code-examples',
    tags: ['nodejs', 'express', 'integration'],
    createdAt: '2024-01-13T11:30:00Z',
    lastReply: '2024-01-15T06:15:00Z',
    replies: 12,
    views: 1205,
    likes: 67,
    status: 'open',
    pinned: true
  }
]

const popularTags = [
  { name: 'payment-gateway', count: 324 },
  { name: 'webhooks', count: 189 },
  { name: 'react', count: 156 },
  { name: 'nodejs', count: 143 },
  { name: 'php', count: 128 },
  { name: 'mobile', count: 98 },
  { name: 'upi', count: 87 },
  { name: 'e-nach', count: 76 }
]

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('')

  const filteredPosts = recentPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'staff': return <Crown className="h-3 w-3 text-yellow-600" />
      case 'moderator': return <Star className="h-3 w-3 text-blue-600" />
      default: return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'staff': return <Badge variant="default" className="text-xs">Staff</Badge>
      case 'moderator': return <Badge variant="secondary" className="text-xs">Moderator</Badge>
      default: return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'solved': return <Badge variant="secondary" className="text-green-700 bg-green-100">Solved</Badge>
      case 'closed': return <Badge variant="outline">Closed</Badge>
      default: return <Badge variant="outline">Open</Badge>
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Community Forums</h1>
            <Badge variant="secondary">Developer Support</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Connect with fellow developers, get help with integration issues, and share your knowledge with the community.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">12,489</div>
                  <div className="text-sm text-muted-foreground">Active Developers</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">2,316</div>
                  <div className="text-sm text-muted-foreground">Total Discussions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">1,847</div>
                  <div className="text-sm text-muted-foreground">Questions Solved</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-sm text-muted-foreground">Response Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="popular">Popular Tags</TabsTrigger>
            </TabsList>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search discussions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {forumCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                    >
                      <option value="">All Tags</option>
                      {popularTags.map((tag) => (
                        <option key={tag.name} value={tag.name}>
                          {tag.name} ({tag.count})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discussion List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://placehold.co/40x40/6366f1/ffffff?text=${post.author.name[0].toUpperCase()}`} />
                        <AvatarFallback>{post.author.name[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {post.pinned && <Star className="h-4 w-4 text-yellow-600 fill-current" />}
                              <Link href={`/community/post/${post.id}`} className="text-lg font-semibold hover:text-primary">
                                {post.title}
                              </Link>
                              {getStatusBadge(post.status)}
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">{post.excerpt}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                {getRoleIcon(post.author.role)}
                                <span>{post.author.name}</span>
                                {getRoleBadge(post.author.role)}
                                <span>• {post.author.reputation} rep</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="mr-1 h-2 w-2" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{post.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Last reply {new Date(post.lastReply).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              {forumCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{category.postCount}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Last activity: {category.lastActivity}</span>
                      <span>Moderated by: {category.moderators.join(', ')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Popular Tags Tab */}
          <TabsContent value="popular" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
                <CardDescription>
                  Most frequently used tags in community discussions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {popularTags.map((tag) => (
                    <Button
                      key={tag.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTag(tag.name)}
                      className="flex items-center gap-2"
                    >
                      <Tag className="h-3 w-3" />
                      {tag.name}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {tag.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>
                  Help us maintain a positive and helpful community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Be respectful and constructive in your interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Search before posting to avoid duplicate questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Provide clear details and code examples when asking for help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Mark solutions as solved to help other developers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Share your knowledge and help others when you can</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}