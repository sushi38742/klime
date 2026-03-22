// ─────────────────────────────────────────────────────────────────────────────
// WEEKLY SLOT CONFIG — update this file every Monday, nothing else needs changing.
//
// DAYS format: 'YYYY-MM-DD'
// TIME_SLOTS: labels shown on the booking buttons (must match what's stored in DB)
// CAPACITY: max bookings per slot (currently 10)
// ─────────────────────────────────────────────────────────────────────────────

export const CAPACITY = 10

export const TIME_SLOTS = ['3–4 pm', '4–5 pm', '5–6 pm']

export const HOSTS = {
  ryan: {
    key: 'ryan',
    // Mon, Wed, Fri, Sat this week
    days: ['2026-03-23', '2026-03-25', '2026-03-27', '2026-03-28'],
    zoomLink: 'https://us05web.zoom.us/j/89407237888?pwd=9F3SSPppbZ01abcOZg9h3vTa2t861W.1',
  },
  max: {
    key: 'max',
    // Tue, Thu, Sun this week
    days: ['2026-03-24', '2026-03-26', '2026-03-29'],
    zoomLink: null, // add Max's Zoom link here when ready
  },
}
