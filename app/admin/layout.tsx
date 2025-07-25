import { redirect } from 'next/navigation'
import { getUser } from '@/lib/db/queries'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  
  // In a real app, you'd check for admin role here
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-3">
          <h2 className="text-lg font-semibold text-card-foreground">
            Admin Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Logged in as: {user.email}
          </p>
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}