import type { WishlistItem } from "@repo/shared/types";
import { ListItem as ListItemComponent } from "./list-item";

interface ListProps {
  items: WishlistItem[];
  onRemove: (itemId: string) => void;
}

export function List({ items, onRemove }: ListProps) {
  return (
    <div className="space-y-3 mb-4">
      {items.map((item) => (
        // <CardItem key={item.id} />
        <ListItemComponent key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
}
