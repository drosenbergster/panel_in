export function formatCountyName(county: string): string {
  return county
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
