const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const ALWAYS_CC  = 'mdkorotkiy@gmail.com'

function post(params) {
  return fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_key: ACCESS_KEY, ...params }),
  }).then(r => r.json())
}

export function sendEmail(params) {
  // Fire to the registered inbox, then CC mdkorotkiy@gmail.com
  return Promise.all([
    post(params),
    post({ ...params, to: ALWAYS_CC, subject: `[CC] ${params.subject || 'Klime notification'}` }),
  ]).then(([r]) => { if (!r.success) throw new Error(r.message) })
}
