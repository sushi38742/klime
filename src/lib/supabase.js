import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, key)

/**
 * Returns a map of { "YYYY-MM-DD|slot": count } for the given host + dates.
 * Used to show remaining spots on each time slot button.
 */
export async function getSlotCounts(host, dates) {
  const { data, error } = await supabase
    .from('bookings')
    .select('date, slot')
    .eq('host', host)
    .in('date', dates)

  if (error) throw error

  const counts = {}
  ;(data || []).forEach(({ date, slot }) => {
    const key = `${date}|${slot}`
    counts[key] = (counts[key] || 0) + 1
  })
  return counts
}

/**
 * Inserts a new booking row. Throws if the slot is already full or the
 * email has already booked this host+date.
 */
export async function createBooking({ host, date, slot, name, email }) {
  const { error } = await supabase
    .from('bookings')
    .insert({ host, date, slot, name, email })

  if (error) {
    if (error.code === '23505') throw new Error('You have already booked this session.')
    throw new Error('Something went wrong. Please try again.')
  }
}
