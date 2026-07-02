import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = Deno.env.get('RESEND_API_KEY')
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const confirmationHtml = `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 32px;background:#0d0d0d;color:#e8e0d4;">
        <div style="text-align:center;margin-bottom:32px;">
          <img src="https://rasatobacco.com/__l5e/assets-v1/fab30e32-ad30-4a8f-b380-b81aff00a8ef/rasa-logo.png" alt="RASA" style="height:72px;width:auto;display:inline-block;" />
          <p style="color:#888;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;margin:8px 0 0;">Smoke, Perfected.</p>
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
        <p style="font-size:0.95rem;">Email: <a href="mailto:${email}" style="color:#c9a96e;">${email}</a></p>
        <p style="color:#555;font-size:0.75rem;margin-top:24px;">Subscribed via rasatobacco.com</p>
      </div>
    `

    const [subscriberRes, internalRes] = await Promise.allSettled([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'RASA <noreply@rasatobacco.com>',
          to: [email],
          subject: 'You are subscribed to the House of RASA',
          html: confirmationHtml,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'RASA <noreply@rasatobacco.com>',
          to: ['admin@rasatobacco.com'],
          subject: `New Subscriber — ${email}`,
          html: internalHtml,
        }),
      }),
    ])

    if (subscriberRes.status === 'rejected') {
      console.error('Subscriber fetch failed:', subscriberRes.reason)
      return new Response(
        JSON.stringify({ error: 'Failed to send confirmation email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const subscriberData = await subscriberRes.value.json()
    if (subscriberData.statusCode >= 400 || subscriberData.name === 'validation_error') {
      console.error('Resend API error:', subscriberData)
      return new Response(
        JSON.stringify({ error: subscriberData.message || 'Email send failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (internalRes.status === 'rejected') {
      console.error('Internal notification failed (non-critical):', internalRes.reason)
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(
      JSON.stringify({ error: 'Unexpected error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
