// api/contact.js
import "dotenv/config";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

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

  const { name, email, subject, message, anonymous } = req.body;

  // Validate — email only required if not anonymous
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
      email: anonymous ? "anonymous" : email,
      subject,
      message,
      anonymous: !!anonymous,
      ip,
      userAgent,
      createdAt: new Date(),
      read: false,
    });

    const transporter = createTransporter();

    // ── 2. Send full details to YOU ──────────────────────────────────────────
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_RECEIVE,
      // replyTo only set if not anonymous so you can reply directly
      ...(anonymous ? {} : { replyTo: email }),
      subject: `[Portfolio] ${anonymous ? "🕵️ Anonymous — " : ""}${subject}`,
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
                  ? '<span style="color:#9ca3af;font-style:italic;">Anonymous — not provided</span>'
                  : `<a href="mailto:${email}" style="color:#7c3aed;">${email}</a>`
                }
              </td>
            </tr>
            <tr>
              <td style="padding:8px;font-weight:bold;color:#6b7280;">Subject</td>
              <td style="padding:8px;">${subject}</td>
            </tr>
            <tr style="background:#f9fafb;">
              <td style="padding:8px;font-weight:bold;color:#6b7280;">IP Address</td>
              <td style="padding:8px;font-family:monospace;">${ip}</td>
            </tr>
            <tr>
              <td style="padding:8px;font-weight:bold;color:#6b7280;">Browser</td>
              <td style="padding:8px;font-size:12px;color:#6b7280;">${userAgent}</td>
            </tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;border-left:3px solid #7c3aed;">
            <p style="font-weight:bold;margin:0 0 8px;">Message</p>
            <p style="margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="margin-top:16px;color:#9ca3af;font-size:11px;">
            Sent from your portfolio contact form · ${new Date().toUTCString()}
          </p>
        </div>
      `,
    });

    // ── 3. Send simple acknowledgement to sender (only if NOT anonymous) ─────
    if (!anonymous && email) {
      await transporter.sendMail({
        from: `"Faiyaz Morshed Khan" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Message received — ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#7c3aed;">Hi ${name},</h2>
            <p>
              Thank you for reaching out. Your message has been received and I'll
              get back to you as soon as possible.
            </p>
            <p style="color:#6b7280;">
              If this was sent by mistake or you didn't submit this form, please ignore this email.
            </p>
            <p style="margin-top:24px;">
              Best regards,<br/>
              <strong>Faiyaz Morshed Khan</strong><br/>
              <span style="color:#9ca3af;font-size:13px;">
                HCI Researcher · Full Stack Engineer
                <a href="https://www.linkedin.com/in/faiyazmorshedkhan/" style="color: #7c3aed;">LinkedIn</a> ·
                <a href="https://github.com/galahal" style="color: #7c3aed;">GitHub</a>
              </span>
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