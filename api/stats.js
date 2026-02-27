// api/stats.js
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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Password check ───────────────────────────────────────────────────────
  const auth = req.headers["x-stats-password"];
  if (!auth || auth !== process.env.STATS_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB_NAME || "portfolio");

    // ── Visitors ─────────────────────────────────────────────────────────────
    const visitors = await db
      .collection("visitors")
      .find({})
      .sort({ visitedAt: -1 })
      .toArray();

    const totalVisits   = visitors.length;
    const uniqueIPs     = [...new Set(visitors.map((v) => v.ip))].length;

    // Browser breakdown
    const browserCount = {};
    visitors.forEach((v) => {
      browserCount[v.browser] = (browserCount[v.browser] || 0) + 1;
    });

    // OS breakdown
    const osCount = {};
    visitors.forEach((v) => {
      osCount[v.os] = (osCount[v.os] || 0) + 1;
    });

    // Device breakdown
    const deviceCount = {};
    visitors.forEach((v) => {
      deviceCount[v.device] = (deviceCount[v.device] || 0) + 1;
    });

    // Country breakdown
    const countryCount = {};
    visitors.forEach((v) => {
      const c = v.geo?.country || "Unknown";
      countryCount[c] = (countryCount[c] || 0) + 1;
    });

    // Page breakdown
    const pageCount = {};
    visitors.forEach((v) => {
      pageCount[v.page] = (pageCount[v.page] || 0) + 1;
    });

    // Visits per day (last 30 days)
    const last30 = {};
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      last30[d.toISOString().slice(0, 10)] = 0;
    }
    visitors.forEach((v) => {
      const day = new Date(v.visitedAt).toISOString().slice(0, 10);
      if (day in last30) last30[day]++;
    });

    // ── Contacts ─────────────────────────────────────────────────────────────
    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({
      visitors: {
        total: totalVisits,
        uniqueIPs,
        browserCount,
        osCount,
        deviceCount,
        countryCount,
        pageCount,
        dailyLast30: last30,
        logs: visitors.map((v) => ({
          id:        v._id,
          ip:        v.ip,
          page:      v.page,
          referrer:  v.referrer,
          browser:   v.browser,
          os:        v.os,
          device:    v.device,
          city:      v.geo?.city,
          country:   v.geo?.country,
          timezone:  v.geo?.timezone,
          visitedAt: v.visitedAt,
        })),
      },
      contacts: {
        total: contacts.length,
        logs: contacts.map((c) => ({
          id:        c._id,
          name:      c.name,
          email:     c.email,
          subject:   c.subject,
          message:   c.message,
          anonymous: c.anonymous,
          ip:        c.ip,
          createdAt: c.createdAt,
        })),
      },
    });

  } catch (err) {
    console.error("Stats API error:", err);
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
}