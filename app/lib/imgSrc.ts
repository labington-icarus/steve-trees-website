export function imgSrc(src: string): string {
  if (src.startsWith("http")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}
