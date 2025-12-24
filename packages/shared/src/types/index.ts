export interface ExtractedProduct {
  productId: string;
  siteName: string;
  name: string;
  price: number;
  currency: string;
  url: string;
  imageUrl?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  siteName: string;
  name: string;
  price: number;
  currency: string;
  url: string;
  imageUrl?: string;
  specifications?: Record<string, string>;
  addedAt: number;
}

export interface Message {
  action: "addToWishlist" | "removeFromWishlist" | "getWishlist";
  product?: ExtractedProduct;
  itemId?: string;
}

export interface MessageResponse {
  success: boolean;
  error?: string;
  wishlist?: WishlistItem[];
}
