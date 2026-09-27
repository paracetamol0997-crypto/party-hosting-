import { Resend } from 'resend';
import { Registration } from './db';

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL || process.env.HOST_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Send email notification to Host/Admin when a new guest registers
 */
export async function sendEmailNotification(registration: Registration): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  if (!resend || !adminEmail) {
    console.log('ℹ️ Email notifications skipped: RESEND_API_KEY or ADMIN_EMAIL is not configured.');
    return { success: false, skipped: true };
  }

  const formattedDate = new Date(registration.registered_at).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const subject = `🔥 New Guest Registered: ${registration.full_name} (${registration.number_of_people} ${registration.number_of_people === 1 ? 'person' : 'people'})`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0b10; color: #f0f0f0; margin: 0; padding: 24px; }
          .card { background-color: #14141e; border: 2px solid #ffe600; border-radius: 12px; padding: 28px; max-width: 580px; margin: 0 auto; box-shadow: 0 10px 30px rgba(255, 230, 0, 0.2); }
          .header { text-align: center; border-bottom: 1px dashed #33334d; padding-bottom: 20px; margin-bottom: 20px; }
          .badge { display: inline-block; background-color: #ffe600; color: #000; font-weight: 800; padding: 6px 14px; border-radius: 999px; text-transform: uppercase; font-size: 13px; letter-spacing: 1px; }
          .title { color: #ffffff; font-size: 24px; font-weight: 800; margin-top: 14px; margin-bottom: 4px; }
          .sub { color: #a0a0b5; font-size: 14px; }
          .field { margin-bottom: 16px; background-color: #0d0d14; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #ffe600; }
          .label { font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .val { font-size: 16px; color: #fff; font-weight: 600; }
          .footer { text-align: center; margin-top: 24px; font-size: 13px; color: #888899; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <span class="badge">NIGHT OUT RSVP</span>
            <h1 class="title">NEW PARTY REGISTRATION 🔥</h1>
            <p class="sub">A guest just locked in their spot for Hitesh's Night Out!</p>
          </div>

          <div class="field">
            <div class="label">Name</div>
            <div class="val">${registration.full_name}</div>
          </div>

          <div class="field">
            <div class="label">Phone</div>
            <div class="val"><a href="tel:${registration.phone}" style="color: #ffe600; text-decoration: none;">+91 ${registration.phone}</a></div>
          </div>

          <div class="field">
            <div class="label">Email</div>
            <div class="val"><a href="mailto:${registration.email}" style="color: #00e5ff; text-decoration: none;">${registration.email}</a></div>
          </div>

          <div class="field">
            <div class="label">Number of People</div>
            <div class="val">${registration.number_of_people} (Total Entry: ₹${registration.number_of_people * 300})</div>
          </div>

          ${
            registration.message
              ? `<div class="field">
                  <div class="label">Message for Hitesh</div>
                  <div class="val" style="font-weight: 400; font-style: italic;">"${registration.message}"</div>
                </div>`
              : ''
          }

          <div class="field">
            <div class="label">Registered At (IST)</div>
            <div class="val">${formattedDate}</div>
          </div>

          <div class="footer">
            <p>Hitesh's Night Out • Oct 12, 2026 @ 10:00 PM • Hitesh's House</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const fromAddress = process.env.EMAIL_FROM || 'Night Out <onboarding@resend.dev>';
    const result = await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject,
      html: htmlContent,
    });

    if (result.error) {
      console.error('Resend email error:', result.error);
      return { success: false, error: result.error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to send email via Resend:', err);
    return { success: false, error: err?.message || 'Unknown email error' };
  }
}

/**
 * Send WhatsApp notification using official Meta Cloud API
 * Only triggered if WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, and WHATSAPP_RECIPIENT_NUMBER are configured.
 */
export async function sendWhatsAppNotification(registration: Registration): Promise<{ success: boolean; error?: string; skipped?: boolean }> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER;

  if (!token || !phoneNumberId || !recipient) {
    // Graceful skip
    return { success: false, skipped: true };
  }

  const formattedDate = new Date(registration.registered_at).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const messageText = 
`🔥 *NEW PARTY REGISTRATION - NIGHT OUT* 🔥

👤 *Name:* ${registration.full_name}
📱 *Phone:* ${registration.phone}
✉️ *Email:* ${registration.email}
👥 *People:* ${registration.number_of_people}
💰 *Total Entry:* ₹${registration.number_of_people * 300}
💬 *Message:* ${registration.message || 'None'}
⏰ *Registered:* ${formattedDate}

📍 *Event:* Oct 12, 2026 • 10:00 PM @ Hitesh's House`;

  try {
    // Official Meta Graph WhatsApp Cloud API endpoint
    const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

    // Format recipient (must be international format without + or spaces)
    let cleanRecipient = recipient.replace(/[\s\-\+]/g, '');
    if (cleanRecipient.length === 10) {
      cleanRecipient = '91' + cleanRecipient;
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: cleanRecipient,
      type: 'text',
      text: {
        preview_url: false,
        body: messageText,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Meta WhatsApp API error:', data);
      return { success: false, error: JSON.stringify(data) };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to send WhatsApp message via Meta Cloud API:', err);
    return { success: false, error: err?.message || 'Unknown WhatsApp API error' };
  }
}

/**
 * Unified dispatch for all notification channels
 */
export async function dispatchNotifications(registration: Registration) {
  // Fire and log both concurrently without blocking registration response
  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendEmailNotification(registration),
    sendWhatsAppNotification(registration),
  ]);

  return {
    email: emailResult.status === 'fulfilled' ? emailResult.value : { success: false, error: 'Rejected' },
    whatsapp: whatsappResult.status === 'fulfilled' ? whatsappResult.value : { success: false, error: 'Rejected' },
  };
}
