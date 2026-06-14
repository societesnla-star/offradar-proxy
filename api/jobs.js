export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  try {
    const qs = (req.url || "").split("?")[1] || "";
    const params = new URLSearchParams(qs);
    params.set("app_id", process.env.ADZUNA_ID || "");
    params.set("app_key", process.env.ADZUNA_KEY || "");
    const r = await fetch("https://api.adzuna.com/v1/api/jobs/fr/search/1?" + params);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
