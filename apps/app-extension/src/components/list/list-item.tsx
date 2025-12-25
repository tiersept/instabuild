import type { WishlistItem as WishlistItemType } from "@repo/shared/types";
import { formatPrice } from "@repo/shared/utils";
import { Button } from "@repo/ui/components/ui/button";
import { Icon } from "@repo/ui/components/ui/icon";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";

interface ListItemProps {
  item: WishlistItemType;
  onRemove: (itemId: string) => void;
}

export function ListItem({ item, onRemove }: ListItemProps) {
  return (
    <Item key={item.id} variant="outline" role="listitem">
      {item.imageUrl && (
        <ItemMedia variant="image" className="size-24">
          <img src={item.imageUrl} alt={item.name} className="object-contain" />
        </ItemMedia>
      )}
      <ItemContent className="ml-2">
        <ItemTitle className="line-clamp-1">{item.name}</ItemTitle>
        <ItemDescription>
          <span className="text-lg font-bold text-primary">
            {formatPrice(item.price)}
          </span>
          <br />
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:underline"
          >
            View on {item.siteName || "site"} →
          </a>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => onRemove(item.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:cursor-pointer"
          title="Remove from wishlist"
          aria-label="Remove from wishlist"
        >
          <Icon name="cancel" />
        </Button>
      </ItemActions>
    </Item>
  );
}
