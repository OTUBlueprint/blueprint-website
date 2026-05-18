import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const payload = req.body

  try {
    // Send to applicant
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        to: [{ email: payload.to_email, name: payload.to_name }],
        templateId: Number(process.env.BREVO_APPLICATION_RECEIVED),
        params: payload,
      }),
    })

    // Send internal notification
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        to: [{ email: 'hello@otublueprint.com', name: 'Blueprint OTU' }],
        templateId: Number(process.env.BREVO_APPLICATION_INTERNAL),
        params: payload,
      }),
    })

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('Brevo error:', e)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}