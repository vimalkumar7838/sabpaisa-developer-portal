import { DeveloperPortalLayout } from '@/components/layout/developer-portal-layout'
import { MainSidebar } from '@/components/navigation/main-sidebar'

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DeveloperPortalLayout sidebar={<MainSidebar />}>
      {children}
    </DeveloperPortalLayout>
  )
}