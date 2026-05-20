module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.BREVO_API_KEY
  const applicantTemplateId = process.env.BREVO_APPLICATION_RECEIVED
  const internalTemplateId = process.env.BREVO_APPLICATION_INTERNAL

  const payload = req.body

  try {
    const r1 = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        to: [{ email: payload.to_email, name: payload.to_name || '' }],
        templateId: Number(applicantTemplateId),
        params: payload,
      }),
    })
    const d1 = await r1.json()
    console.log('Applicant email response:', JSON.stringify(d1))

    const r2 = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        to: [{ email: 'hello@otublueprint.com', name: 'Blueprint OTU' }],
        templateId: Number(internalTemplateId),
        params: payload,
      }),
    })
    const d2 = await r2.json()
    console.log('Internal email response:', JSON.stringify(d2))

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('Unexpected error:', e)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}