import type {
  ExtractedProduct,
  Message,
  MessageResponse,
  WishlistItem,
} from "@repo/shared/types";
import { generateUuid } from "@repo/shared/utils";

async function getWishlist(): Promise<WishlistItem[]> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["wishlist"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Storage error:", chrome.runtime.lastError);
        // Fallback to local storage
        chrome.storage.local.get(["wishlist"], (localResult) => {
          const wishlist = migrateWishlist(
            (localResult.wishlist as WishlistItem[]) || [],
          );
          resolve(wishlist);
        });
      } else {
        const wishlist = migrateWishlist(
          (result.wishlist as WishlistItem[]) || [],
        );
        resolve(wishlist);
      }
    });
  });
}

function migrateWishlist(wishlist: WishlistItem[]): WishlistItem[] {
  return wishlist.map((item) => {
    if (!item.siteName) {
      return {
        ...item,
        siteName: "Tweakers", // Default for old items
      };
    }
    return item;
  });
}

async function saveWishlist(wishlist: WishlistItem[]): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ wishlist }, () => {
      if (chrome.runtime.lastError) {
        console.error("Storage error:", chrome.runtime.lastError);
        // Fallback to local storage
        chrome.storage.local.set({ wishlist }, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  });
}

async function addItemToWishlist(
  product: ExtractedProduct,
): Promise<WishlistItem> {
  const wishlist = await getWishlist();

  // Check if item already exists (by productId + siteName)
  const existingIndex = wishlist.findIndex((item) => {
    if (
      item.productId &&
      item.siteName &&
      product.productId &&
      product.siteName
    ) {
      return (
        item.productId === product.productId &&
        item.siteName === product.siteName
      );
    }
    return false;
  });

  const newItem: WishlistItem = {
    id: generateUuid(),
    productId: product.productId,
    siteName: product.siteName,
    name: product.name,
    price: product.price,
    currency: product.currency,
    url: product.url,
    imageUrl: product.imageUrl,
    addedAt: Date.now(),
  };

  if (existingIndex >= 0) {
    // Update existing item, preserve the original ID
    newItem.id = wishlist[existingIndex].id;
    wishlist[existingIndex] = newItem;
  } else {
    // Add new item
    wishlist.push(newItem);
  }

  await saveWishlist(wishlist);
  return newItem;
}

async function removeItemFromWishlist(itemId: string): Promise<void> {
  const wishlist = await getWishlist();
  const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
  await saveWishlist(updatedWishlist);
}

chrome.runtime.onMessage.addListener(
  (
    message: Message,
    _sender,
    sendResponse: (response: MessageResponse) => void,
  ) => {
    if (message.action === "addToWishlist" && message.product) {
      addItemToWishlist(message.product)
        .then(() => {
          sendResponse({ success: true });
        })
        .catch((error) => {
          sendResponse({ success: false, error: error.message });
        });

      // Return true to indicate async response
      return true;
    }

    if (message.action === "removeFromWishlist" && message.itemId) {
      removeItemFromWishlist(message.itemId)
        .then(() => {
          sendResponse({ success: true });
        })
        .catch((error) => {
          sendResponse({ success: false, error: error.message });
        });

      return true;
    }

    if (message.action === "getWishlist") {
      getWishlist()
        .then((wishlist) => {
          sendResponse({ success: true, wishlist });
        })
        .catch((error) => {
          sendResponse({ success: false, error: error.message });
        });

      return true;
    }

    return false;
  },
);
