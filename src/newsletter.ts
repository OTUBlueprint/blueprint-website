export interface NewsletterPayload {
  email: string
  name?: string
  type: 'newsletter' | 'careers'
}

export async function subscribeNewsletter(payload: NewsletterPayload): Promise<void> {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: payload.email, name: payload.name || '', type: payload.type }),
  })

  if (res.status === 409) throw new Error('already_subscribed')
  if (!res.ok) throw new Error('failed')
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