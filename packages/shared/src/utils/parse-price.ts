export function parsePrice(priceText: string): number {
  // Remove currency symbols, spaces, commas
  // "€ 459,-" -> 459
  // "€ 1.234,56" -> 1234.56
  const cleaned = priceText
    .replace(/€/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "") // Remove thousand separators
    .replace(",", ".") // Convert decimal comma to dot
    .replace(/[^\d.]/g, "");

  return parseFloat(cleaned) || 0;
}
