import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from './ui/textarea'

interface ContactFormProps {
  buttonText: string
}

export function ContactForm({ buttonText }: ContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const number = formData.get('number')
    const email = formData.get('email')
    const message = formData.get('message')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, number, email, message }),
      })
      if (res.ok) {
        setSuccess(true)
        form.reset()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send message.')
      }
    } catch {
      setError('Failed to send message.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setTimeout(() => {
      setLoading(false)
      setError('')
      setSuccess(false)
    }, 1000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{buttonText}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!success ? (
          <>
            <DialogHeader>
              <DialogTitle>Contact Me</DialogTitle>
              <DialogDescription>
                Drop me a message below and I'll get back to you!
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">
                    Name & Surname<span className="text-primary">*</span>
                  </Label>
                  <Input id="name-1" name="name" placeholder="John Doe" required={true} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="number-1">
                    Number<span className="text-primary">*</span>
                  </Label>
                  <Input id="number-1" name="number" placeholder="0123456789" required={true} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email-1">
                    Email<span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email-1"
                    name="email"
                    placeholder="john.doe@gmail.com"
                    required={true}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">
                    Message<span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="username-1"
                    name="message"
                    placeholder="Tell me whats on your mind."
                    required={true}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                {error && <p className="text-primary">{error}</p>}
                <DialogClose asChild>
                  <Button variant="outline" type="button" onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Success!</DialogTitle>
              <DialogDescription>
                Thank you for reaching out! Your message has been sent successfully. I'll get back
                to you soon.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button" onClick={handleClose}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
