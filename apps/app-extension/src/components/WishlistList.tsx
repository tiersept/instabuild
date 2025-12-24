import type { WishlistItem } from "@repo/shared/types";
import { CardItem } from "./Card";

interface WishlistListProps {
  items: WishlistItem[];
  onRemove: (itemId: string) => void;
}

export function WishlistList({ items, onRemove }: WishlistListProps) {
  return (
    <div className="space-y-3 mb-4">
      {items.map((item) => (
        <CardItem key={item.id} />
        // <WishlistItemComponent key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}
