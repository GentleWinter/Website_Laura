export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.psilauraribeiro.com" || url.protocol !== "https:") {
      url.protocol = "https:";
      url.hostname = "psilauraribeiro.com";
      return Response.redirect(url.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  },
};
