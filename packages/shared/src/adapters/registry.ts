import type { SiteAdapter } from "./types";

class AdapterRegistry {
  private adapters: SiteAdapter[] = [];

  register(adapter: SiteAdapter): void {
    this.adapters.push(adapter);
  }

  getAdapterForUrl(url: string): SiteAdapter | null {
    return this.adapters.find((adapter) => adapter.matches(url)) || null;
  }

  getAllAdapters(): SiteAdapter[] {
    return [...this.adapters];
  }
}

export const adapterRegistry = new AdapterRegistry();
