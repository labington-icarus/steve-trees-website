export function imgSrc(src: string): string {
  if (src.startsWith("http") || src.startsWith("data:")) return src;
  const basePath =
    process.env.__NEXT_ROUTER_BASEPATH ||
    (typeof window !== "undefined" && (window as any).__NEXT_DATA__?.basePath) ||
    "";
  const clean = src.startsWith("/") ? src : `/${src}`;
  // Avoid double prefixing if the URL is already absolute or already has basePath.
  if (basePath && !clean.startsWith(basePath + "/")) {
    return basePath + clean;
  }
  return clean;
}
