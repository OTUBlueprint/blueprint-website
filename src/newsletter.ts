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

export async function subscribeNewsletter(payload: NewsletterPayload): Promise<void> {
  await emailjs.send(SERVICE_ID, TEMPLATE_IDS[payload.type], { to_email: payload.email, to_name: payload.name || 'there' }, PUBLIC_KEY)
}

export interface ApplicationPayload {
  to_name:        string
  to_email:       string
  role:           string
  team:           string
  program:        string
  linkedin:       string
  github:         string
  portfolio:      string
  resume:         string
  why_blueprint:  string
  why_role:       string
  experience:     string
  tech_for_good:  string
  commitment:     string
  availability:   string
  hours:          string
  secondary_team: string
  secondary_role: string
}

export async function sendApplication(payload: ApplicationPayload): Promise<boolean> {
  try {
    await fetch('/api/send-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return true
  } catch (e) { console.error('Error:', e); return false }
}