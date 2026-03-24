const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export function sendEmail(params) {
  return fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_key: ACCESS_KEY, ...params }),
  })
    .then(r => r.json())
    .then(r => { if (!r.success) throw new Error(r.message) })
}
