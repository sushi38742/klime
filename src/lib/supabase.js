import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = (url && key) ? createClient(url, key) : null

export async function getSlotCounts(host, dates) {
  if (!supabase) return {}

  const { data, error } = await supabase
    .from('bookings')
    .select('date, slot')
    .eq('host', host)
    .in('date', dates)

  if (error) return {}

  const counts = {}
  ;(data || []).forEach(({ date, slot }) => {
    const k = `${date}|${slot}`
    counts[k] = (counts[k] || 0) + 1
  })
  return counts
}

export async function submitAscendingInterest(email) {
  if (!supabase) throw new Error('Not configured.')

  const { error } = await supabase
    .from('ascending_interest')
    .insert({ email })

  if (error) {
    if (error.code === '23505') return // already signed up — silent success
    throw new Error('Something went wrong. Please try again.')
  }
}

export async function getBookingByEmail(email) {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('bookings')
    .select('host, date, slot')
    .eq('email', email)
    .order('date', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) return null
  return data
}

export async function submitSessionRequest({ guide, topics, notes, windows, name, email }) {
  if (!supabase) throw new Error('Session requests are not configured yet. Check back soon.')

  const { error } = await supabase
    .from('guide_session_requests')
    .insert({ guide, topics, notes, windows, name, email })

  if (error) {
    if (error.code === '23505') throw new Error('A request with this email is already pending.')
    throw new Error('Something went wrong. Please try again.')
  }
}

export async function createBooking({ host, date, slot, name, email }) {
  if (!supabase) throw new Error('Booking is not configured yet. Check back soon.')

  const { error } = await supabase
    .from('bookings')
    .insert({ host, date, slot, name, email })

  if (error) {
    if (error.code === '23505') throw new Error('You have already booked this session.')
    throw new Error('Something went wrong. Please try again.')
  }
}
