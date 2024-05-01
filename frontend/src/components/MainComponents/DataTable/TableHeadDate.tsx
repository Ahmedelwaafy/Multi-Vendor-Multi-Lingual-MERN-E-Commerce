import { cn } from "@/lib/utils";

interface TableHeadDateProps {
  title: Date;
  className?: string;
}

export function TableHeadDate({ title, className }: TableHeadDateProps) {
  return (
    <div className={cn("font-medium ", className)}>
      {title.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </div>
  );
}
