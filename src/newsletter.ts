export interface NewsletterPayload {
  email: string
  name?: string
  type: 'newsletter' | 'careers'
}

export async function subscribeNewsletter(payload: NewsletterPayload): Promise<boolean> {
  const subject = encodeURIComponent(
    payload.type === 'careers'
      ? 'Blueprint OTU — Careers Newsletter Signup'
      : 'Blueprint OTU — Newsletter Signup'
  )
  const body = encodeURIComponent(
    `Name: ${payload.name || 'Not provided'}\nEmail: ${payload.email}\nList: ${payload.type}`
  )
  const a = document.createElement('a')
  a.href = `mailto:otublueprint@hotmail.com?subject=${subject}&body=${body}`
  a.click()
  return true
}