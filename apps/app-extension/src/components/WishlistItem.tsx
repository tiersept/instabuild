import type { WishlistItem as WishlistItemType } from "@repo/shared/types";
import { formatPrice } from "@repo/shared/utils";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";

interface WishlistItemProps {
  item: WishlistItemType;
  onRemove: (itemId: string) => void;
}

export function WishlistItem({ item, onRemove }: WishlistItemProps) {
  return (
    <Card size="sm">
      <CardContent className="p-3">
        <div className="flex gap-3">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-16 h-16 object-cover rounded shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate mb-1">{item.name}</h3>
            <p className="text-lg font-bold text-primary mb-2">
              {formatPrice(item.price)}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              View on {item.siteName || "site"} →
            </a>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRemove(item.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
            title="Remove from wishlist"
            aria-label="Remove from wishlist"
          >
            x
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
