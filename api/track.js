// api/track.js
// Vercel Serverless Function — logs visitor data
// Captures: IP, geo location (via ipinfo.io), browser, OS, referrer, page, timestamp

import "dotenv/config";
import { MongoClient } from "mongodb";

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

// Parse basic browser/OS info from User-Agent string
function parseUserAgent(ua = "") {
  let browser = "Unknown";
  let os = "Unknown";

  // Browser detection
  if (ua.includes("Edg/"))              browser = "Edge";
  else if (ua.includes("OPR/") || ua.includes("Opera"))
                                         browser = "Opera";
  else if (ua.includes("Chrome/"))      browser = "Chrome";
  else if (ua.includes("Firefox/"))     browser = "Firefox";
  else if (ua.includes("Safari/") && !ua.includes("Chrome"))
                                         browser = "Safari";

  // OS detection
  if (ua.includes("Windows NT 10.0"))   os = "Windows 10/11";
  else if (ua.includes("Windows"))       os = "Windows";
  else if (ua.includes("Mac OS X"))      os = "macOS";
  else if (ua.includes("Android"))       os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad"))
                                          os = "iOS";
  else if (ua.includes("Linux"))         os = "Linux";

  // Device type
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
  const device = isMobile ? "Mobile" : "Desktop";

  return { browser, os, device };
}

export default async function handler(req, res) {
  // Allow GET (beacon) and POST
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ── Get IP ───────────────────────────────────────────────────────────────
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";

    // Skip tracking for localhost / development
    if (ip === "::1" || ip === "127.0.0.1" || ip === "unknown") {
      return res.status(200).json({ success: true, dev: true });
    }

    const userAgent = req.headers["user-agent"] || "";
    const { browser, os, device } = parseUserAgent(userAgent);

    // Get page and referrer from body (POST) or query (GET)
    const page     = req.body?.page     || req.query?.page     || "/";
    const referrer = req.body?.referrer || req.query?.referrer || "";

    // ── Geo lookup via ipinfo.io (free tier: 50k req/month) ─────────────────
    let geo = { city: "Unknown", region: "Unknown", country: "Unknown", org: "" };
    try {
      const token = process.env.IPINFO_TOKEN; // optional but recommended
      const geoUrl = token
        ? `https://ipinfo.io/${ip}?token=${token}`
        : `https://ipinfo.io/${ip}/json`;

      const geoRes = await fetch(geoUrl, { signal: AbortSignal.timeout(3000) });
      if (geoRes.ok) {
        const data = await geoRes.json();
        geo = {
          city:    data.city    || "Unknown",
          region:  data.region  || "Unknown",
          country: data.country || "Unknown",
          org:     data.org     || "",
          loc:     data.loc     || "",          // "lat,lng"
          timezone: data.timezone || "",
        };
      }
    } catch {
      // Geo lookup failed — continue without it
    }

    // ── Save to MongoDB ──────────────────────────────────────────────────────
    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB_NAME || "portfolio");
    const collection = db.collection("visitors");

    await collection.insertOne({
      ip,
      page,
      referrer,
      browser,
      os,
      device,
      userAgent,
      geo,
      visitedAt: new Date(),
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Tracking error:", err);
    // Silently fail — don't break the user experience
    return res.status(200).json({ success: false });
  }
}