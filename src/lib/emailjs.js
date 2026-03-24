import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const TEMPLATE = {
  BOOKING:          import.meta.env.VITE_EMAILJS_TEMPLATE_BOOKING,
  GUIDE_APPLY:      import.meta.env.VITE_EMAILJS_TEMPLATE_GUIDE_APPLY,
  CONTACT:          import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT,
  SESSION_REQUEST:  import.meta.env.VITE_EMAILJS_TEMPLATE_SESSION_REQUEST,
}

export function sendEmail(templateId, params) {
  return emailjs.send(SERVICE_ID, templateId, params, { publicKey: PUBLIC_KEY })
}
