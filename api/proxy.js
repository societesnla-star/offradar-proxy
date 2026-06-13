// Fichier à créer sur GitHub : api/proxy.js
// (le dossier "api/" est créé automatiquement quand tu tapes "api/proxy.js" comme nom de fichier)
 
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
 
