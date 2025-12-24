import type { ExtractedProduct } from "@repo/shared/types";
import type { SiteAdapter } from "../types";

function parseTweakersPrice(priceText: string): number {
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

export const tweakersAdapter: SiteAdapter = {
  siteName: "Tweakers",

  matches(url: string): boolean {
    return /^https:\/\/tweakers\.net\/pricewatch\/\d+\//.test(url);
  },

  extractProduct(): ExtractedProduct | null {
    // Extract Tweakers ID from URL
    const urlMatch = window.location.pathname.match(/\/pricewatch\/(\d+)\//);
    if (!urlMatch) {
      console.warn("Could not extract Tweakers ID from URL");
      return null;
    }

    const tweakersId = urlMatch[1];

    // Extract product name
    const nameElement = document.querySelector("h1");
    const name = nameElement?.textContent?.trim() || "Unknown Product";

    // Extract price (lowest price from listings)
    const priceElement =
      document.querySelector(".price-listing .price") ||
      document.querySelector('[data-test="price"]') ||
      document.querySelector(".price");
    const priceText = priceElement?.textContent || "";
    const price = parseTweakersPrice(priceText);

    // Extract URL
    const url = window.location.href;

    // Extract image (optional)
    // Try to get the original high-quality image from the thumbnail data-original attribute
    const thumbnailElement = document.querySelector("twk-media-gallery .gallery-thumb[data-original]");
    const imageUrl =
      thumbnailElement?.getAttribute("data-original") ||
      document.querySelector("twk-media-gallery .gallery-trigger img")?.getAttribute("src") ||
      document.querySelector("twk-media-gallery .gallery-thumb img")?.getAttribute("src") ||
      undefined;

    return {
      productId: tweakersId,
      siteName: "Tweakers",
      name,
      price,
      currency: "EUR",
      url,
      imageUrl,
    };
  },

  getButtonInsertionPoint(): HTMLElement | null {
    const productTitle = document.querySelector("h1");
    return productTitle?.parentElement || null;
  },

  parsePrice: parseTweakersPrice,
};
