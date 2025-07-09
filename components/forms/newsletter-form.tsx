'use client'

import type React from 'react'
import { useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real application, you would send this to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to our newsletter!',
      })

      setEmail('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition-colors hover:from-purple-700 hover:to-indigo-700"
      >
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  )
}
