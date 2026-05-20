module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, name, type } = req.body

  if (!email) return res.status(400).json({ error: 'Missing email' })

  const apiKey = process.env.BREVO_API_KEY
  const templateId = type === 'careers'
    ? Number(process.env.BREVO_CAREERS_TEMPLATE)
    : Number(process.env.BREVO_NEWSLETTER_TEMPLATE)

  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { name: 'Blueprint OTU', email: 'hello@otublueprint.com' },
        to: [{ email, name: name || email }],
        templateId,
        params: { to_name: name || 'there', to_email: email },
      }),
    })

    const d = await r.json()
    console.log('Brevo response:', JSON.stringify(d))
    console.log('templateId:', templateId, 'type:', type)

    if (!r.ok) return res.status(500).json({ error: 'Failed to send email' })

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('Subscribe error:', e)
    return res.status(500).json({ error: 'Failed to subscribe' })
  }
}