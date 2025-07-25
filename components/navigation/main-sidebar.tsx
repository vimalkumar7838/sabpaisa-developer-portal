'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { 
  ChevronDown,
  Home,
  Book,
  Code,
  TestTube,
  Webhook,
  MessageSquare,
  Shield,
  FileText,
  Zap,
  CreditCard,
  Banknote,
  Link as LinkIcon,
  Building2,
  FormInput,
  Search
} from 'lucide-react'

interface NavItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  items?: NavItem[]
  badge?: string
}

const navigationItems: NavItem[] = [
  {
    title: 'Getting Started',
    icon: Home,
    href: '/'
  },
  {
    title: 'Search',
    icon: Search,
    href: '/search'
  },
  {
    title: 'Products',
    icon: CreditCard,
    items: [
      {
        title: 'Payment Gateway',
        icon: CreditCard,
        href: '/docs/payment-gateway',
      },
      {
        title: 'E-NACH',
        icon: Banknote,
        href: '/docs/e-nach',
      },
      {
        title: 'Payment Link',
        icon: LinkIcon,
        href: '/docs/payment-link',
      },
      {
        title: 'B2B E-Collect',
        icon: Building2,
        href: '/docs/b2b-e-collect',
      },
      {
        title: 'QwikForms',
        icon: FormInput,
        href: '/docs/qwikforms',
      },
    ]
  },
  {
    title: 'Integration Modules',
    icon: Code,
    items: [
      {
        title: 'Server Integration',
        href: '/docs/integration/server'
      },
      {
        title: 'Web Integration',
        href: '/docs/integration/web'
      },
      {
        title: 'Hybrid Integration',
        href: '/docs/integration/hybrid'
      },
      {
        title: 'E-commerce Platforms',
        href: '/docs/integration/ecommerce'
      },
      {
        title: 'Native Mobile',
        href: '/docs/integration/native'
      }
    ]
  },
  {
    title: 'API Reference',
    icon: Book,
    href: '/docs/api'
  },
  {
    title: 'API Playground',
    icon: TestTube,
    href: '/playground'
  },
  {
    title: 'Sandbox',
    icon: Zap,
    href: '/sandbox'
  },
  {
    title: 'Webhooks & IPN',
    icon: Webhook,
    href: '/docs/webhooks'
  },
  {
    title: 'Security & Compliance',
    icon: Shield,
    href: '/docs/security'
  },
  {
    title: 'Changelog',
    icon: FileText,
    href: '/changelog'
  },
  {
    title: 'Community',
    icon: MessageSquare,
    href: '/community'
  }
]

interface MainSidebarProps {
  className?: string
}

export function MainSidebar({ className }: MainSidebarProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  // Auto-expand parent items based on current path
  useEffect(() => {
    const newOpenItems = new Set<string>()
    navigationItems.forEach((item) => {
      if (item.items) {
        const hasActiveChild = item.items.some(child => 
          child.href && pathname.startsWith(child.href)
        )
        if (hasActiveChild) {
          newOpenItems.add(item.title)
        }
      }
    })
    setOpenItems(newOpenItems)
  }, [pathname])

  const toggleItem = (title: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(title)) {
      newOpenItems.delete(title)
    } else {
      newOpenItems.add(title)
    }
    setOpenItems(newOpenItems)
  }

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const Icon = item.icon
    const hasChildren = item.items && item.items.length > 0
    const isItemOpen = openItems.has(item.title)
    const active = isActive(item.href)

    if (hasChildren) {
      return (
        <Collapsible
          key={item.title}
          open={isItemOpen}
          onOpenChange={() => toggleItem(item.title)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-auto py-2 px-3 font-normal",
                level > 0 && "ml-4",
                active && "bg-accent text-accent-foreground"
              )}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              <span className="truncate">{item.title}</span>
              {item.badge && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronDown className={cn(
                "ml-auto h-4 w-4 transition-transform",
                isItemOpen && "rotate-180"
              )} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            <div className="ml-4 space-y-1">
              {item.items!.map((subItem) => renderNavItem(subItem, level + 1))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    const content = (
      <Button
        variant={active ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start h-auto py-2 px-3 font-normal",
          level > 0 && "ml-4"
        )}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span className="truncate">{item.title}</span>
        {item.badge && (
          <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </Button>
    )

    if (item.href) {
      return (
        <Link key={item.title} href={item.href}>
          {content}
        </Link>
      )
    }

    return <div key={item.title}>{content}</div>
  }

  return (
    <Sidebar className={className}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SP</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">SabPaisa</h2>
            <p className="text-xs text-muted-foreground">Developer Portal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationItems.map((item) => renderNavItem(item))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}