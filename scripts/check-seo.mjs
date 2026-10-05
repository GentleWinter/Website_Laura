import { readFileSync, existsSync } from "node:fs";

const origin = "https://psilauraribeiro.com";
const pages = [
  ["index.html", "/"],
  ["sobre.html", "/sobre"],
  ["psicoterapia-em-juiz-de-fora.html", "/psicoterapia-em-juiz-de-fora"],
  ["psicoterapia-online.html", "/psicoterapia-online"],
  ["psicologa-brasileira-no-exterior.html", "/psicologa-brasileira-no-exterior"],
  ["abordagem-psicanalitica.html", "/abordagem-psicanalitica"],
  ["perguntas-frequentes.html", "/perguntas-frequentes"],
  ["privacidade.html", "/privacidade"],
  ["termos.html", "/termos"],
];
const required = ["robots.txt", "sitemap.xml", "llms.txt", "404.html", "_headers", "content.css"];
const failures = [];

for (const file of required) if (!existsSync(file)) failures.push(`Arquivo obrigatório ausente: ${file}`);

const sitemap = readFileSync("sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const robots = readFileSync("robots.txt", "utf8");
if (!robots.includes("User-agent: OAI-SearchBot") || !robots.includes(`Sitemap: ${origin}/sitemap.xml`)) failures.push("robots.txt não possui as diretivas esperadas.");

const allowedPaths = new Set([...pages.map(([, path]) => path), "/termos", "/privacidade"]);
for (const [file, path] of pages) {
  const html = readFileSync(file, "utf8");
  const absolute = `${origin}${path}`;
  if ((html.match(/<h1(?:\s[^>]*)?>/gi) || []).length !== 1) failures.push(`${file} deve conter exatamente um h1.`);
  for (const needle of ["<title>", "name=\"description\"", "rel=\"canonical\"", "property=\"og:title\"", "property=\"og:description\"", "property=\"og:url\"", "property=\"og:image\"", "name=\"twitter:card\""]) if (!html.includes(needle)) failures.push(`${file} não possui ${needle}.`);
  if (!html.includes(`href=\"${absolute}\"`)) failures.push(`${file} tem canonical ausente ou incorreto.`);
  const jsonLd = [...html.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)];
  if (!jsonLd.length) failures.push(`${file} não contém JSON-LD.`);
  for (const block of jsonLd) { try { JSON.parse(block[1]); } catch { failures.push(`${file} contém JSON-LD inválido.`); } }
  for (const match of html.matchAll(/href=\"(\/[^\"#?]*)\"/g)) if (!allowedPaths.has(match[1])) failures.push(`${file} possui link interno não reconhecido: ${match[1]}.`);
  if (!sitemapUrls.includes(absolute)) failures.push(`${file} não consta no sitemap.`);
}

const notFound = readFileSync("404.html", "utf8");
if (!notFound.includes("noindex,follow")) failures.push("404.html deve ser noindex.");
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`SEO check OK: ${pages.length} páginas, ${sitemapUrls.length} URLs no sitemap e JSON-LD válido.`);
