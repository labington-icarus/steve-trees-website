export function imgSrc(src: string): string {
  const base = process.env.__NEXT_ROUTER_BASEPATH || "/steve-trees-website";
  if (src.startsWith("http") || src.startsWith(base)) return src;
  return `${base}${src}`;
}
