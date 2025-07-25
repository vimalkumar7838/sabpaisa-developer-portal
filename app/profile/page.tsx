'use client'

import { useState, useTransition } from 'react'
import { useActionState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  User, 
  Settings, 
  Shield, 
  Activity,
  Mail,
  Calendar,
  Key,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react'
import { updateAccount, updatePassword, deleteAccount } from '@/app/(login)/actions'
import { ActionState } from '@/lib/auth/middleware'
import useSWR from 'swr'
import { User as UserType } from '@/lib/db/schema'
import { formatDistanceToNow } from 'date-fns'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Account Information Form
function AccountForm({ user }: { user: UserType }) {
  const [accountState, accountAction, accountPending] = useActionState<ActionState, FormData>(
    updateAccount,
    { error: '' }
  )

  return (
    <form action={accountAction} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={user.name || ''}
            placeholder="Enter your full name"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
            placeholder="Enter your email"
            required
            className="mt-1"
          />
        </div>
      </div>

      {accountState?.error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{accountState.error}</AlertDescription>
        </Alert>
      )}

      {accountState?.success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{accountState.success}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={accountPending} className="w-full sm:w-auto">
        {accountPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Account'
        )}
      </Button>
    </form>
  )
}

// Password Change Form
function PasswordForm() {
  const [passwordState, passwordAction, passwordPending] = useActionState<ActionState, FormData>(
    updatePassword,
    { error: '' }
  )

  return (
    <form action={passwordAction} className="space-y-6">
      <div>
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="Enter your current password"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Enter your new password"
          required
          minLength={8}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your new password"
          required
          minLength={8}
          className="mt-1"
        />
      </div>

      {passwordState?.error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{passwordState.error}</AlertDescription>
        </Alert>
      )}

      {passwordState?.success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{passwordState.success}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={passwordPending} variant="outline" className="w-full sm:w-auto">
        {passwordPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Password'
        )}
      </Button>
    </form>
  )
}

// Account Deletion Form
function DeleteAccountForm() {
  const [deleteState, deleteAction, deletePending] = useActionState<ActionState, FormData>(
    deleteAccount,
    { error: '' }
  )
  const [showDeleteForm, setShowDeleteForm] = useState(false)

  return (
    <div className="space-y-4">
      {!showDeleteForm ? (
        <Button 
          variant="destructive" 
          onClick={() => setShowDeleteForm(true)}
          className="w-full sm:w-auto"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      ) : (
        <div className="space-y-4 p-4 border border-destructive rounded-lg bg-destructive/5">
          <div className="space-y-2">
            <h4 className="font-semibold text-destructive">Confirm Account Deletion</h4>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. This will permanently delete your account and all associated data.
            </p>
          </div>
          
          <form action={deleteAction} className="space-y-4">
            <div>
              <Label htmlFor="password">Enter your password to confirm</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="mt-1"
              />
            </div>

            {deleteState?.error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{deleteState.error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={deletePending}>
                {deletePending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// Account Activity Log
function ActivityLog({ user }: { user: UserType }) {
  // In a real implementation, you'd fetch activity logs from the API
  // For now, we'll show some basic account information
  const accountAge = formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })
  const lastUpdated = formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              Account Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl sm:text-2xl font-bold">{accountAge}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
              Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl sm:text-2xl font-bold">{lastUpdated}</p>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <Activity className="h-4 w-4" />
        <AlertDescription>
          Complete activity logging is available for enterprise accounts. 
          <a href="/docs/security" className="underline ml-1">Learn more about security features</a>.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default function ProfilePage() {
  const { data: user, error, isLoading } = useSWR<UserType>('/api/user', fetcher)

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load user profile. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Profile Settings</h1>
          <Badge variant="secondary">Developer</Badge>
        </div>
        <p className="text-muted-foreground">
          Manage your account settings, security preferences, and view your activity.
        </p>
      </div>

      {/* User Info Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{user.name || 'Developer'}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="account" className="flex items-center gap-1 sm:gap-2">
            <Settings className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2">
            <Shield className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Security</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1 sm:gap-2">
            <Activity className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="danger" className="flex items-center gap-1 sm:gap-2">
            <Trash2 className="h-4 w-4" />
            <span className="text-xs sm:text-sm">Danger</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AccountForm user={user} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>
                View your account activity and security events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityLog user={user} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger">
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeleteAccountForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}