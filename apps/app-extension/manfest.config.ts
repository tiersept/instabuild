import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    16: "icons/icon16.jpeg",
    48: "icons/icon48.jpeg",
    128: "icons/icon128.jpeg",
  },
  description: "Save items and pricing to a list and track total cost",
  permissions: ["sidePanel", "storage", "activeTab"],
  host_permissions: ["https://tweakers.net/*"],
  content_scripts: [
    {
      matches: ["https://tweakers.net/pricewatch/*/*.html"],
      js: ["src/content/injector.ts"],
      run_at: "document_idle",
    },
  ],
  background: {
    service_worker: "src/background/service-worker.ts",
    type: "module",
  },
  side_panel: {
    default_path: "src/sidepanel/index.html",
  },
  action: {
    default_popup: "src/popup/index.html",
    default_icon: {
      16: "icons/icon16.jpeg",
      48: "icons/icon48.jpeg",
      128: "icons/icon128.jpeg",
    },
  },
});
