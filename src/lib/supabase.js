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
