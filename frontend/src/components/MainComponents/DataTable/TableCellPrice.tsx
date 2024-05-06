import { cn, formatCurrency } from "@/lib/utils";

interface TableCellPriceProps {
  title: string;
  className?: string;
}

export function TableCellPrice({ title, className }: TableCellPriceProps) {
  return (
    <div className={cn("font-medium text-right", className)}>
      {formatCurrency(parseFloat(title))}
    </div>
  );
}
