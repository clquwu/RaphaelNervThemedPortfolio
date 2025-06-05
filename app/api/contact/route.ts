import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body
    
    console.log('Received POST request:', body)
    
    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      console.error('Discord webhook URL not found')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    
    console.log('Sending to Discord...')
    
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `**New Portfolio Contact**\n**Name:** ${name}\n**Email:** ${email}\n**Message:**\n${message}`,
      }),
    })
    
    if (!discordResponse.ok) {
      console.error('Discord API error:', discordResponse.status)
      throw new Error(`Discord API error: ${discordResponse.status}`)
    }
    
    console.log('Message sent successfully')
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error in contact API:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}