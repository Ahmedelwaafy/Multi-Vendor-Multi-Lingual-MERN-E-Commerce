import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TableCellTooltipProps {
  title: string;
  className?: string;
}

export function TableCellTooltip({ title, className }: TableCellTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn("", className)}>{title}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
