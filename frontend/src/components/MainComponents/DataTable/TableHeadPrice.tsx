import { cn, formatCurrency } from "@/lib/utils";

interface TableHeadPriceProps {
  title: string;
  className?: string;
}

export function TableHeadPrice({ title, className }: TableHeadPriceProps) {
  return (
    <div className={cn("font-medium text-right", className)}>
      {formatCurrency(parseFloat(title))}
    </div>
  );
}
