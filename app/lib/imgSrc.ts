export function imgSrc(src: string): string {
  const base = process.env.__NEXT_ROUTER_BASEPATH || "/steve-trees-website";
  if (src.startsWith("http")) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${base}${path}`;
}
