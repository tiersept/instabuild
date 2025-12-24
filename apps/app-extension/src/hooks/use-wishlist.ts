import type {
  Message,
  MessageResponse,
  WishlistItem,
} from "@repo/shared/types";
import { useEffect, useState } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const loadWishlist = () => {
      chrome.storage.sync.get(["wishlist"], (result) => {
        if (chrome.runtime.lastError) {
          console.error("Storage error:", chrome.runtime.lastError);
          // Fallback to local storage
          chrome.storage.local.get(["wishlist"], (localResult) => {
            setWishlist((localResult.wishlist as WishlistItem[]) || []);
            setLoading(false);
          });
        } else {
          setWishlist((result.wishlist as WishlistItem[]) || []);
          setLoading(false);
        }
      });
    };

    loadWishlist();

    // Listen for changes
    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.wishlist) {
        const newWishlist = (changes.wishlist.newValue as WishlistItem[]) || [];
        setWishlist(newWishlist);
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  const removeItem = (itemId: string) => {
    chrome.runtime.sendMessage<Message, MessageResponse>(
      {
        action: "removeFromWishlist",
        itemId,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message error:", chrome.runtime.lastError);
          return;
        }

        if (!response?.success) {
          console.error("Failed to remove item:", response?.error);
        }
      },
    );
  };

  return { wishlist, loading, removeItem };
}
