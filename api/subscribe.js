module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, name, type } = req.body

  if (!email) return res.status(400).json({ error: 'Missing email' })

  const apiKey = process.env.BREVO_API_KEY
  const templateId = type === 'careers'
    ? Number(process.env.BREVO_CAREERS_TEMPLATE)
    : Number(process.env.BREVO_NEWSLETTER_TEMPLATE)
  const listId = type === 'careers'
    ? Number(process.env.BREVO_CAREERS_LIST)
    : Number(process.env.BREVO_NEWSLETTER_LIST)

  try {
    // Check if contact already exists in list
    const checkRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      headers: { 'api-key': apiKey }
    })

    if (checkRes.ok) {
      const contact = await checkRes.json()
      if (contact.listIds && contact.listIds.includes(listId)) {
        return res.status(409).json({ error: 'already_subscribed' })
      }
    }

    // Add to list
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name || '' },
        listIds: [listId],
        updateEnabled: true,
      }),
    })

    // Send welcome email
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { name: 'Blueprint OTU', email: 'hello@otublueprint.com' },
        to: [{ email, name: name || '' }],
        templateId,
        params: { to_name: name || 'there', to_email: email },
      }),
    })

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('Subscribe error:', e)
    return res.status(500).json({ error: 'Failed to subscribe' })
  }
}