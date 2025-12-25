import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@repo/ui/lib/utils";
import * as React from "react";
import { type IconName, iconRegistry } from "./icon-registry";

type IconProps = Omit<
  React.ComponentProps<typeof HugeiconsIcon>,
  "icon" | "strokeWidth"
> & {
  name?: IconName;
  icon?: React.ComponentProps<typeof HugeiconsIcon>["icon"];
  strokeWidth?: number;
};

function Icon({ name, icon, strokeWidth = 2, className, ...props }: IconProps) {
  const iconComponent = name ? iconRegistry[name] : icon;

  if (!iconComponent) {
    throw new Error(
      `Icon component requires either a "name" prop (e.g., name="plus") or an "icon" prop (e.g., icon={PlusSignIcon})`,
    );
  }

  return (
    <HugeiconsIcon
      icon={iconComponent}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export { Icon, type IconProps, type IconName };
