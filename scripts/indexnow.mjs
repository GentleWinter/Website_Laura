import { readFileSync } from "node:fs";

const host = "psilauraribeiro.com";
const key = "5a824abca2d8b091a69829f767e3acd622a88a0ef705fc8d";
const endpoint = "https://api.indexnow.org/indexnow";
const sitemap = readFileSync("sitemap.xml", "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const dryRun = process.argv.includes("--dry-run");

if (!urlList.length || urlList.some((url) => !url.startsWith(`https://${host}/`))) throw new Error("O sitemap não contém apenas URLs públicas do domínio oficial.");
const payload = { host, key, keyLocation: `https://${host}/${key}.txt`, urlList };
if (dryRun) { console.log(JSON.stringify(payload, null, 2)); process.exit(0); }

const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify(payload) });
if (!response.ok) throw new Error(`IndexNow respondeu HTTP ${response.status}: ${await response.text()}`);
console.log(`IndexNow aceitou ${urlList.length} URL(s) para ${host}. HTTP ${response.status}.`);
