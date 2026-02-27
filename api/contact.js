// api/contact.js
import "dotenv/config";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message, anonymous, attachment } = req.body;

  // Validate required fields
  if (!name || !subject || !message) {
    return res.status(400).json({ error: "Name, subject and message are required" });
  }
  if (!anonymous && !email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!anonymous && email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
  }

  // Validate attachment if present
  // attachment = { name, type, size, data (base64) }
  if (attachment) {
    if (attachment.size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: "File exceeds 10MB limit" });
    }
  }

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim()
    || req.socket?.remoteAddress
    || "unknown";
  const userAgent = req.headers["user-agent"] || "unknown";

  try {
    // ── 1. Save to MongoDB ───────────────────────────────────────────────────
    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB_NAME || "portfolio");
    await db.collection("contacts").insertOne({
      name,
      email:     anonymous ? "anonymous" : email,
      subject,
      message,
      anonymous: !!anonymous,
      hasAttachment: !!attachment,
      attachmentName: attachment?.name || null,
      ip,
      userAgent,
      createdAt: new Date(),
      read: false,
    });

    const transporter = createTransporter();

    // Build attachment for nodemailer if file was sent
    const mailAttachments = attachment
      ? [{
          filename: attachment.name,
          content:  attachment.data,   // base64 string
          encoding: "base64",
          contentType: attachment.type,
        }]
      : [];

    // ── 2. Send full notification to YOU ────────────────────────────────────
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_RECEIVE,
      ...(anonymous ? {} : { replyTo: email }),
      subject: `[Portfolio] ${anonymous ? "🕵️ Anonymous — " : ""}${subject}`,
      attachments: mailAttachments,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#7c3aed;">
            ${anonymous ? "🕵️ Anonymous Contact Form Submission" : "New Contact Form Submission"}
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px;font-weight:bold;width:120px;color:#6b7280;">Name</td>
              <td style="padding:8px;">${name}</td>
            </tr>
            <tr style="background:#f9fafb;">
              <td style="padding:8px;font-weight:bold;color:#6b7280;">Email</td>
              <td style="padding:8px;">
                ${anonymous
                  ? '<span style="color:#9ca3af;font-style:italic;">Anonymous</span>'
                  : `<a href="mailto:${email}" style="color:#7c3aed;">${email}</a>`}
              </td>
            </tr>
            <tr>
              <td style="padding:8px;font-weight:bold;color:#6b7280;">Subject</td>
              <td style="padding:8px;">${subject}</td>
            </tr>
            <tr style="background:#f9fafb;">
              <td style="padding:8px;font-weight:bold;color:#6b7280;">Attachment</td>
              <td style="padding:8px;">
                ${attachment
                  ? `📎 ${attachment.name} (${(attachment.size / 1024).toFixed(1)} KB)`
                  : '<span style="color:#9ca3af;">None</span>'}
              </td>
            </tr>
            <tr>
              <td style="padding:8px;font-weight:bold;color:#6b7280;">IP Address</td>
              <td style="padding:8px;font-family:monospace;">${ip}</td>
            </tr>
            <tr style="background:#f9fafb;">
              <td style="padding:8px;font-weight:bold;color:#6b7280;">Browser</td>
              <td style="padding:8px;font-size:12px;color:#6b7280;">${userAgent}</td>
            </tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;border-left:3px solid #7c3aed;">
            <p style="font-weight:bold;margin:0 0 8px;">Message</p>
            <p style="margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="margin-top:16px;color:#9ca3af;font-size:11px;">
            ${new Date().toUTCString()}
          </p>
        </div>
      `,
    });

    // ── 3. Simple acknowledgement to sender (not anonymous only) ────────────
    if (!anonymous && email) {
      await transporter.sendMail({
        from:    `"Faiyaz Morshed Khan" <${process.env.GMAIL_USER}>`,
        to:      email,
        subject: `Message received — ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#7c3aed;">Hi ${name},</h2>
            <p>Thank you for reaching out. Your message has been received and I'll get back to you as soon as possible.</p>
            ${attachment ? `<p style="color:#6b7280;">Your attachment <strong>${attachment.name}</strong> was received successfully.</p>` : ""}
            <p style="color:#6b7280;">If you didn't submit this form, please ignore this email.</p>
            <p style="margin-top:24px;">
              Best regards,<br/>
              <strong>Faiyaz Morshed Khan</strong><br/>
              <span style="color:#9ca3af;font-size:13px;">HCI Researcher · Full Stack Engineer</span><br/>
                <a href="https://www.linkedin.com/in/faiyazmorshedkhan/" style="color: #7c3aed;">LinkedIn</a> ·
                <a href="https://github.com/galahal" style="color: #7c3aed;">GitHub</a><br/>
                <a href="https://www.faiyaz.org/" style="color: #7c3aed;">https://www.faiyaz.org/</a>
            </p>
          </div>
        `,
      });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again." });
  }
}