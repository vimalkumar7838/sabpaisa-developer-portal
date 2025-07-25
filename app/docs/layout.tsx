import { DeveloperPortalLayout } from '@/components/layout/developer-portal-layout'
import { MainSidebar } from '@/components/navigation/main-sidebar'
import { ErrorBoundary } from '@/components/error/error-boundary'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <DeveloperPortalLayout sidebar={<MainSidebar />}>
        {children}
      </DeveloperPortalLayout>
    </ErrorBoundary>
  )
}