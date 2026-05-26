module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password, to_name, to_email, role, format, length, meeting_link, deadline } = req.body

  if (password !== 'Acvvdd04-') return res.status(401).json({ error: 'Unauthorized' })
  if (!to_email || !to_name || !role) return res.status(400).json({ error: 'Missing required fields' })

  const apiKey = process.env.BREVO_API_KEY
  const templateId = Number(process.env.BREVO_INTERVIEW_TEMPLATE)

  try {
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { name: 'Blueprint OTU', email: 'hello@otublueprint.com' },
        to: [{ email: to_email, name: to_name }],
        templateId,
        params: { to_name, role, format, length, meeting_link, deadline },
      }),
    })

    const d = await r.json()
    console.log('Interview email response:', JSON.stringify(d))

    if (!r.ok) return res.status(500).json({ error: 'Failed to send email', details: d })

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('Send interview error:', e)
    return res.status(500).json({ error: 'Unexpected error' })
  }
}
