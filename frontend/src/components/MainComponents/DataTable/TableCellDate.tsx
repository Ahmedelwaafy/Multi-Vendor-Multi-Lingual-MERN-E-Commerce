import { cn } from "@/lib/utils";

interface TableCellDateProps {
  title: Date;
  className?: string;
}

export function TableCellDate({ title, className }: TableCellDateProps) {
  return (
    <div className={cn("font-medium ", className)}>
      {new Date(title).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </div>
  );
}
