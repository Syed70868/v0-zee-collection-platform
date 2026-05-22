'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast.success('Welcome back!')
      router.push('/')
    } catch (error: any) {
      toast.error(error.message || 'Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="inline-block">
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2D2A26]">
              Zee Collection
            </span>
          </Link>

          <h1 className="mt-10 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26]">
            Welcome Back
          </h1>
          <p className="mt-2 text-[#2D2A26]/70">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#2D2A26]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="mt-2 border-[#E8E4DD] focus:border-[#C9B99A] focus:ring-[#C9B99A]"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#2D2A26]">
                Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-[#E8E4DD] pr-10 focus:border-[#C9B99A] focus:ring-[#C9B99A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D2A26]/50"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-[#E8E4DD] text-[#C9B99A] focus:ring-[#C9B99A]"
                />
                <span className="text-sm text-[#2D2A26]/70">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#B8A076] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#2D2A26] py-6 text-white hover:bg-[#2D2A26]/90"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#2D2A26]/70">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-[#B8A076] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden flex-1 lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-[#2D2A26]/30" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="font-[family-name:var(--font-playfair)] text-2xl text-white">
            &ldquo;The furniture we choose tells the story of who we are.&rdquo;
          </p>
          <p className="mt-4 text-sm text-white/70">
            - Zee Collection Philosophy
          </p>
        </div>
      </div>
    </main>
  )
}
