import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const payload = req.body

  try {
    const r1 = await fetch('https://api.brevo.com/v3/smtp/email', {
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
    const d1 = await r1.json()
    console.log('Applicant email response:', JSON.stringify(d1))

    const r2 = await fetch('https://api.brevo.com/v3/smtp/email', {
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
    const d2 = await r2.json()
    console.log('Internal email response:', JSON.stringify(d2))

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('Brevo error:', e)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}