import { json } from '@sveltejs/kit';
import { RESEND_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get API key from environment
    if (!RESEND_API_KEY) {
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Tenda Development <onboarding@resend.dev>', // Update with your verified domain
        to: ['tendadevelop@gmail.com'], // Your email
        reply_to: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      return json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return json({ success: true, id: data.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};

