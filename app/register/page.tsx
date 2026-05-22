'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Check } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'One number', met: /[0-9]/.test(formData.password) },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!passwordRequirements.every((r) => r.met)) {
      toast.error('Please meet all password requirements')
      return
    }

    if (!agreed) {
      toast.error('Please agree to the terms and conditions')
      return
    }

    setIsLoading(true)

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })
      toast.success('Account created successfully!')
      router.push('/')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="relative hidden flex-1 lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-[#1A3A2F]/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="font-[family-name:var(--font-playfair)] text-2xl text-white">
            &ldquo;Design is not just what it looks like. Design is how it works.&rdquo;
          </p>
          <p className="mt-4 text-sm text-white/70">- Steve Jobs</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="inline-block">
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2D2A26]">
              Zee Collection
            </span>
          </Link>

          <h1 className="mt-10 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26]">
            Create Account
          </h1>
          <p className="mt-2 text-[#2D2A26]/70">
            Join us to discover exceptional furniture
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName" className="text-[#2D2A26]">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-2 border-[#E8E4DD] focus:border-[#C9B99A] focus:ring-[#C9B99A]"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-[#2D2A26]">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-2 border-[#E8E4DD] focus:border-[#C9B99A] focus:ring-[#C9B99A]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-[#2D2A26]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="mt-2 border-[#E8E4DD] focus:border-[#C9B99A] focus:ring-[#C9B99A]"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-[#2D2A26]">
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
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
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req) => (
                  <div
                    key={req.label}
                    className={`flex items-center gap-2 text-xs ${
                      req.met ? 'text-green-600' : 'text-[#2D2A26]/50'
                    }`}
                  >
                    <Check className={`h-3 w-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-[#2D2A26]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-2 border-[#E8E4DD] focus:border-[#C9B99A] focus:ring-[#C9B99A]"
              />
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded border-[#E8E4DD] text-[#C9B99A] focus:ring-[#C9B99A]"
              />
              <span className="text-sm text-[#2D2A26]/70">
                I agree to the{' '}
                <Link href="/terms" className="text-[#B8A076] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#B8A076] hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#2D2A26] py-6 text-white hover:bg-[#2D2A26]/90"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#2D2A26]/70">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[#B8A076] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
