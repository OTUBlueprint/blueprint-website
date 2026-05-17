import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const TEMPLATE_IDS = {
  newsletter: import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE,
  careers:    import.meta.env.VITE_EMAILJS_CAREERS_TEMPLATE,
}

export interface NewsletterPayload {
  email: string
  name?: string
  type: 'newsletter' | 'careers'
}

export async function subscribeNewsletter(payload: NewsletterPayload): Promise<boolean> {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_IDS[payload.type],
      {
        to_email: payload.email,
        to_name:  payload.name || 'there',
      },
      PUBLIC_KEY
    )
    return true
  } catch (e) {
    console.error('EmailJS error:', e)
    return false
  }
}