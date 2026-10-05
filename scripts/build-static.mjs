import { cpSync, mkdirSync, rmSync } from "node:fs";

const output = "dist";
const rootFiles = [
  "index.html",
  "404.html",
  "sobre.html",
  "psicoterapia-em-juiz-de-fora.html",
  "psicoterapia-online.html",
  "psicologa-brasileira-no-exterior.html",
  "abordagem-psicanalitica.html",
  "perguntas-frequentes.html",
  "privacidade.html",
  "termos.html",
  "elegant.css",
  "content.css",
  "legal.css",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "_headers",
  "5a824abca2d8b091a69829f767e3acd622a88a0ef705fc8d.txt",
];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of rootFiles) cpSync(file, `${output}/${file}`);
cpSync("assets/img", `${output}/assets/img`, { recursive: true });
console.log(`Static build ready: ${rootFiles.length} root files and assets/img copied to ${output}/.`);
