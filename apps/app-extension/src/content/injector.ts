import { adapterRegistry, tweakersAdapter } from "@repo/shared/adapters";
import type { Message, MessageResponse } from "@repo/shared/types";

// Register all adapters
adapterRegistry.register(tweakersAdapter);

function showSuccessFeedback() {
  const button = document.querySelector(".wishlist-btn") as HTMLButtonElement;
  if (button) {
    const originalText = button.textContent;
    button.textContent = "Added!";
    button.disabled = true;
    button.style.backgroundColor = "#28a745";

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      button.style.backgroundColor = "#007bff";
    }, 2000);
  }
}

function showErrorFeedback(error?: string) {
  const button = document.querySelector(".wishlist-btn") as HTMLButtonElement;
  if (button) {
    const originalText = button.textContent;
    button.textContent = error || "Error";
    button.style.backgroundColor = "#dc3545";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "#007bff";
    }, 2000);
  }
}

async function handleAddToWishlist() {
  const adapter = adapterRegistry.getAdapterForUrl(window.location.href);
  if (!adapter) {
    console.warn("No adapter found for current URL");
    return;
  }

  const product = adapter.extractProduct();
  if (!product) {
    showErrorFeedback("Could not extract product data");
    return;
  }

  try {
    const response = await chrome.runtime.sendMessage<Message, MessageResponse>(
      {
        action: "addToWishlist",
        product,
      },
    );

    if (chrome.runtime.lastError) {
      console.error("Message error:", chrome.runtime.lastError);
      showErrorFeedback(chrome.runtime.lastError.message);
      return;
    }

    if (response?.success) {
      showSuccessFeedback();
    } else {
      showErrorFeedback(response?.error);
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    showErrorFeedback("Failed to add item");
  }
}

function injectButton() {
  // Check if button already exists
  if (document.querySelector(".wishlist-btn")) {
    return;
  }

  const adapter = adapterRegistry.getAdapterForUrl(window.location.href);
  if (!adapter) {
    // No adapter for this site, don't inject button
    return;
  }

  // Get insertion point from adapter
  const insertionPoint = adapter.getButtonInsertionPoint();
  if (!insertionPoint) {
    console.warn("Could not find insertion point for button");
    return;
  }

  // Create button
  const button = document.createElement("button");
  button.className = "wishlist-btn";
  button.textContent = "Add to Wishlist";
  button.style.cssText = `
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 16px;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;
  `;

  // Add hover effect
  button.addEventListener("mouseenter", () => {
    if (!button.disabled) {
      button.style.backgroundColor = "#0056b3";
    }
  });
  button.addEventListener("mouseleave", () => {
    if (!button.disabled) {
      button.style.backgroundColor = "#007bff";
    }
  });

  // Add click handler
  button.addEventListener("click", handleAddToWishlist);

  // Insert into DOM - try to insert after first child (usually the title)
  const firstChild = insertionPoint.firstElementChild;
  if (firstChild?.nextSibling) {
    insertionPoint.insertBefore(button, firstChild.nextSibling);
  } else {
    insertionPoint.appendChild(button);
  }
}

// Wait for DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectButton);
} else {
  injectButton();
}

// Handle SPA navigation
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(injectButton, 500);
  }
}).observe(document, { subtree: true, childList: true });
