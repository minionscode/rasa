import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-key',
}

const ADMIN_KEY = 'rasa_admin_2024'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== ADMIN_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { ...cors, 'Content-Type': 'application/json' }
    })
  }

  try {
    const url = new URL(req.url)
    const section = url.searchParams.get('section') ?? 'overview'
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = 20
    const offset = (page - 1) * limit

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const db = createClient(supabaseUrl, supabaseKey)

    if (section === 'overview') {
      const [eq, pr, ns, lm, users] = await Promise.all([
        db.from('enquiries').select('id', { count: 'exact', head: true }),
        db.from('partner_registrations').select('id', { count: 'exact', head: true }),
        db.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
        db.from('loyalty_members').select('id', { count: 'exact', head: true }),
        db.from('users').select('id', { count: 'exact', head: true }),
      ])
      return new Response(JSON.stringify({
        enquiries: eq.count ?? 0,
        partners: pr.count ?? 0,
        subscribers: ns.count ?? 0,
        loyalty_members: lm.count ?? 0,
        users: users.count ?? 0,
      }), { headers: { ...cors, 'Content-Type': 'application/json' } })
    }

    if (section === 'enquiries') {
      const status = url.searchParams.get('status')
      let q = db.from('enquiries').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + limit - 1)
      if (status) q = q.eq('status', status)
      const { data, count } = await q
      return new Response(JSON.stringify({ data, count }), { headers: { ...cors, 'Content-Type': 'application/json' } })
    }

    if (section === 'partners') {
      const { data, count } = await db.from('partner_registrations').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + limit - 1)
      return new Response(JSON.stringify({ data, count }), { headers: { ...cors, 'Content-Type': 'application/json' } })
    }

    if (section === 'subscribers') {
      const { data, count } = await db.from('newsletter_subscribers').select('*', { count: 'exact' }).order('subscribed_at', { ascending: false }).range(offset, offset + limit - 1)
      return new Response(JSON.stringify({ data, count }), { headers: { ...cors, 'Content-Type': 'application/json' } })
    }

    if (section === 'loyalty') {
      const tier = url.searchParams.get('tier')
      let q = db.from('loyalty_members').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + limit - 1)
      if (tier) q = q.eq('tier', tier)
      const { data, count } = await q
      return new Response(JSON.stringify({ data, count }), { headers: { ...cors, 'Content-Type': 'application/json' } })
    }

    if (section === 'users') {
      const { data, count } = await db.from('users').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + limit - 1)
      return new Response(JSON.stringify({ data, count }), { headers: { ...cors, 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ error: 'Invalid section' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('admin-data error:', err)
    return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } })
  }
})
