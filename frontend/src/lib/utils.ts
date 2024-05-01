import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function AvatarFallbackName(name: string) {
  return name
    ? name?.split(" ")?.length > 1
      ? name?.split(" ")?.[0]?.charAt(0) + name?.split(" ")?.[1]?.charAt(0)
      : name?.split(" ")?.[0]?.charAt(0) + name?.split(" ")?.[0]?.charAt(1)
    : "";
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
