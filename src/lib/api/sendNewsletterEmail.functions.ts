import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'

export type NewsletterPayload = {
  email: string
}

export const sendNewsletterEmail = createServerFn({ method: 'POST' })
  .inputValidator((data: NewsletterPayload) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error('RESEND_API_KEY is not set')

    const resend = new Resend(apiKey)

    const confirmationHtml = `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 32px;background:#0d0d0d;color:#e8e0d4;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="color:#c9a96e;font-size:2rem;font-weight:400;letter-spacing:0.05em;margin:0;">RASA</h1>
          <p style="color:#888;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;margin:6px 0 0;">Smoke, Perfected.</p>
        </div>
        <hr style="border:none;border-top:1px solid #2a2a2a;margin:0 0 32px;" />
        <h2 style="color:#e8e0d4;font-size:1.5rem;font-weight:400;margin:0 0 16px;">You are now subscribed.</h2>
        <p style="color:#b0a898;line-height:1.8;margin:0 0 24px;font-size:0.95rem;">
          Welcome to the House of RASA. You will be among the first to receive product launches, 
          collection releases, flavour updates, partnership opportunities, and curated industry news.
        </p>
        <p style="color:#b0a898;line-height:1.8;margin:0 0 32px;font-size:0.95rem;">
          We do not believe in noise. Only in substance.
        </p>
        <hr style="border:none;border-top:1px solid #2a2a2a;margin:0 0 24px;" />
        <p style="color:#555;font-size:0.75rem;text-align:center;margin:0;">
          RASA Tobacco Partners Pvt. Ltd. · Gurugram, Haryana<br />
          You received this because you subscribed at rasatobacco.com
        </p>
      </div>
    `

    const internalHtml = `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px;background:#0d0d0d;color:#e8e0d4;">
        <h2 style="color:#c9a96e;letter-spacing:0.1em;font-size:1rem;text-transform:uppercase;">New Newsletter Subscriber — RASA</h2>
        <hr style="border-color:#333;margin:16px 0;" />
        <p style="font-size:0.95rem;">Email: <a href="mailto:${data.email}" style="color:#c9a96e;">${data.email}</a></p>
        <p style="color:#555;font-size:0.75rem;margin-top:24px;">Subscribed via rasatobacco.com popup</p>
      </div>
    `

    const [subscriberResult, internalResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'RASA <noreply@rasatobacco.com>',
        to: [data.email],
        subject: 'You are subscribed to the House of RASA',
        html: confirmationHtml,
      }),
      resend.emails.send({
        from: 'RASA <noreply@rasatobacco.com>',
        to: ['admin@rasatobacco.com'],
        subject: `New Subscriber — ${data.email}`,
        html: internalHtml,
      }),
    ])

    if (subscriberResult.status === 'rejected') {
      const reason = subscriberResult.reason
      const msg = reason instanceof Error ? reason.message : 'Failed to send confirmation email'
      throw new Error(msg)
    }

    if (internalResult.status === 'rejected') {
      console.error('Internal subscriber notification failed:', internalResult.reason)
    }

    return { ok: true }
  })
