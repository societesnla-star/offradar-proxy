module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  try {
    const params = new URLSearchParams();
    params.set("app_id", process.env.ADZUNA_ID || "");
    params.set("app_key", process.env.ADZUNA_KEY || "");
    
    // req.query est la bonne façon d'accéder aux paramètres dans Vercel
    const q = req.query || {};
    if (q.what) params.set("what", q.what);
    if (q.where) params.set("where", q.where);
    if (q.results_per_page) params.set("results_per_page", q.results_per_page);
    if (q.page) params.set("page", q.page);
    if (q.salary_min) params.set("salary_min", q.salary_min);
    if (q.contract_type) params.set("contract_type", q.contract_type);

    const response = await fetch("https://api.adzuna.com/v1/api/jobs/fr/search/1?" + params);
    const text = await response.text();
    
    try {
      res.status(response.status).json(JSON.parse(text));
    } catch(e) {
      res.status(500).json({ error: "Réponse Adzuna invalide", detail: text.slice(0, 300) });
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
