import type { ExtractedProduct } from "@repo/shared/types";

export interface SiteAdapter {
  siteName: string;
  matches(url: string): boolean;
  extractProduct(): ExtractedProduct | null;
  getButtonInsertionPoint(): HTMLElement | null;
  parsePrice?(priceText: string): number;
}
