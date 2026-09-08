const pngChainSlugs = new Set(["gut"]);

export function getChainIconUrl(chain) {
  const slug = chain?.chainSlug;
  if (!slug) return "/unknown-logo.png";

  const extension = pngChainSlugs.has(slug) ? "png" : "jpg";
  return `https://icons.llamao.fi/icons/chains/rsz_${slug}.${extension}`;
}
