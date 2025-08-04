import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'stefantolkeng6@gmail.com',
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
})

export async function POST(request: Request) {
  const { name, number, email, message } = await request.json()

  if (!name || !number || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields.' }), { status: 400 })
  }

  try {
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: 'stefantolkeng6@gmail.com',
      subject: `Message from ${name}`,
      text: `Name: ${name}\nNumber: ${number}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: `${email}`,
      html: `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 24px;">
        <h2 style="color: #333; margin-top: 0;">New Message</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
          <td style="font-weight: bold; padding: 8px 0;">Name:</td>
          <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
          <td style="font-weight: bold; padding: 8px 0;">Number:</td>
          <td style="padding: 8px 0;">${number}</td>
          </tr>
          <tr>
          <td style="font-weight: bold; padding: 8px 0;">Email:</td>
          <td style="padding: 8px 0;">${email}</td>
          </tr>
          <tr>
          <td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Message:</td>
          <td style="padding: 8px 0; white-space: pre-line;">${message}</td>
          </tr>
        </table>
        </div>
      </div>
      `,
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 })
  }
}
