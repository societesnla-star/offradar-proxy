// api/jobs.js — remplace l'ancien fichier sur GitHub

export default async function handler(req, res) {
  // CORS complet — autorise toutes les origines y compris file://
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Répondre immédiatement aux requêtes preflight OPTIONS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const params = new URLSearchParams({
      app_id: process.env.ADZUNA_ID,
      app_key: process.env.ADZUNA_KEY,
      ...Object.fromEntries(new URLSearchParams((req.url || "").split("?")[1] || ""))
    });

    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/fr/search/1?${params}`
    );

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: "Adzuna erreur " + response.status, detail: text.slice(0, 200) });
      return;
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
