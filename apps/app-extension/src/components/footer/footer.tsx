import type { WishlistItem } from "@repo/shared/types";
import { formatPrice } from "@repo/shared/utils";
import { Separator } from "@repo/ui/components/ui/separator";

interface FooterProps {
  items: WishlistItem[];
}

export function Footer({ items }: FooterProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="pt-4 mt-4">
      <Separator className="mb-4" />
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-2xl font-bold text-primary">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
