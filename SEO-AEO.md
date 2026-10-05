# SEO, AEO e descoberta por IA — Laura Ribeiro

## Implementado

- URLs canônicas em `https://psilauraribeiro.com/` e metadados únicos por página indexável.
- Open Graph e Twitter Cards com imagem HTTPS da profissional.
- Dados estruturados: `WebSite`, `Person`, `ProfessionalService`, `WebPage`, `BreadcrumbList` e `FAQPage` onde a FAQ está visível.
- `robots.txt`, `sitemap.xml`, `llms.txt`, cabeçalhos de segurança, página 404 com `noindex` e links internos contextuais.
- Cinco páginas de intenção distinta, sem alegações clínicas, curriculares ou comerciais não verificadas.
- Suporte manual a IndexNow e verificação automática local.

## URLs públicas

- `https://psilauraribeiro.com/`
- `https://psilauraribeiro.com/sobre`
- `https://psilauraribeiro.com/psicoterapia-em-juiz-de-fora`
- `https://psilauraribeiro.com/psicoterapia-online`
- `https://psilauraribeiro.com/psicologa-brasileira-no-exterior`
- `https://psilauraribeiro.com/abordagem-psicanalitica`
- `https://psilauraribeiro.com/perguntas-frequentes`
- `https://psilauraribeiro.com/privacidade`
- `https://psilauraribeiro.com/termos`

## Crawlers e `llms.txt`

`robots.txt` permite o rastreamento de busca, inclusive do `OAI-SearchBot`, e declara o sitemap. O arquivo não bloqueia CSS, JavaScript ou imagens. `llms.txt` apresenta identidade, CRP, modalidades, limites de informação e URLs oficiais para leitores automatizados. Esses recursos melhoram a clareza técnica; eles não garantem posição, indexação ou recomendação por buscadores e sistemas de IA.

## IndexNow

A chave pública está em `https://psilauraribeiro.com/5a824abca2d8b091a69829f767e3acd622a88a0ef705fc8d.txt` após o deploy. Para revisar o lote sem rede, execute:

```bash
npm run indexnow -- --dry-run
```

Para enviar as URLs do sitemap aos mecanismos compatíveis:

```bash
npm run indexnow
```

Execute apenas após uma publicação relevante e bem-sucedida. O script nunca usa localhost e não envia solicitações em cada visualização de página.

## Google Search Console

1. Mantenha a propriedade de domínio `psilauraribeiro.com` validada por DNS.
2. Envie `https://psilauraribeiro.com/sitemap.xml` no relatório **Sitemaps**.
3. Em **Inspeção de URL**, teste a home e solicite indexação depois do deploy.
4. Acompanhe Indexação > Páginas e Desempenho; não reenvie solicitações repetidamente.

Caso uma verificação por meta tag seja escolhida no futuro, insira o token real no `<head>` de `index.html`. Não há token de verificação no repositório.

## Bing Webmaster Tools

Adicione o domínio, valide a propriedade por DNS ou pelo método apresentado pelo Bing e envie o mesmo sitemap. Depois de uma publicação, rode o comando IndexNow manualmente se desejar notificar mecanismos compatíveis.

## Google Business Profile

É uma configuração externa. O perfil deve apontar para `https://psilauraribeiro.com/` e repetir somente dados reais e autorizados: nome profissional, telefone, categoria, modalidades e informações de localização/área de atendimento. Não adicione endereço, horários, avaliações ou serviços não confirmados.

## Redirecionamentos de domínio

O repositório não contém Worker nem `wrangler.toml`; portanto, o redirecionamento de `www` e HTTP para o apex HTTPS precisa ser configurado no painel Cloudflare. A regra deve preservar caminho e query string:

`www.psilauraribeiro.com/*` → `https://psilauraribeiro.com/$1` (301 ou 308)

Ative também **Always Use HTTPS** ou uma Redirect Rule equivalente para `http://psilauraribeiro.com/*` → `https://psilauraribeiro.com/$1`. Teste após configurar para evitar loop.

## Testes

```bash
npm run check:seo
npm run indexnow -- --dry-run
```

Após publicar, confira as URLs especiais, as rotas, os status HTTP e os redirects com `curl -I` ou a Inspeção de URL do Search Console.
