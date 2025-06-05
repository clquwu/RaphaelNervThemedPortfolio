// pages/api/contact.ts (or app/api/contact/route.ts for App Router)
import { NextApiRequest, NextApiResponse } from 'next'

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimit = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 3 // Max 3 requests per minute per IP

function getRateLimitKey(req: NextApiRequest) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const requests = rateLimit.get(key) || []
  
  // Clean old requests
  const recentRequests = requests.filter((time: number) => now - time < RATE_LIMIT_WINDOW)
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return true
  }
  
  recentRequests.push(now)
  rateLimit.set(key, recentRequests)
  return false
}

function validateInput(data: any) {
  const { name, email, message } = data
  
  if (!name || !email || !message) {
    return { valid: false, error: 'All fields are required' }
  }
  
  if (name.length > 100) {
    return { valid: false, error: 'Name too long' }
  }
  
  if (message.length > 1000) {
    return { valid: false, error: 'Message too long' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  return { valid: true }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  // Check rate limiting
  const rateLimitKeyRaw = getRateLimitKey(req)
  const rateLimitKey = Array.isArray(rateLimitKeyRaw) ? rateLimitKeyRaw.join(',') : rateLimitKeyRaw
  if (isRateLimited(rateLimitKey)) {
    return res.status(429).json({ error: 'Too many requests' })
  }
  
  // Validate input
  const validation = validateInput(req.body)
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error })
  }
  
  const { name, email, message } = req.body
  
  // Check if webhook URL exists
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('Discord webhook URL not configured')
    return res.status(500).json({ error: 'Server configuration error' })
  }
  
  try {
    // Send to Discord webhook
    const discordPayload = {
      content: `**New Portfolio Contact**\n**Name:** ${name}\n**Email:** ${email}\n**Message:**\n${message}`,
    }
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    })
    
    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`)
    }
    
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error sending message:', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
}