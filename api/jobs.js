// Fichier à créer sur GitHub : api/jobs.js
// (Vercel le servira automatiquement à l'URL : https://ton-projet.vercel.app/api/jobs)

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const params = new URLSearchParams({
    app_id: process.env.ADZUNA_ID,
    app_key: process.env.ADZUNA_KEY,
    ...Object.fromEntries(new URLSearchParams((req.url || "").split("?")[1] || ""))
  });

  const response = await fetch(
    `https://api.adzuna.com/v1/api/jobs/fr/search/1?${params}`
  );
  const data = await response.json();
  res.json(data);
}
