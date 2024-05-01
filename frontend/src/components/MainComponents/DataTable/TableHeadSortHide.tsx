import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  faArrowDown,
  faArrowUp,
  faEyeSlash,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TableHeadSortHideProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function TableHeadSortHide<TData, TValue>({
  column,
  title,
  className,
}: TableHeadSortHideProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex-center  " , className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className=" h-8 border-none rounded-md data-[state=open]:bg-secondary data-[state=open]:text-background font-medium"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <FontAwesomeIcon className="ml-2 h-4 w-4" icon={faArrowDown} />
            ) : column.getIsSorted() === "asc" ? (
              <FontAwesomeIcon className="ml-2 h-4 w-4" icon={faArrowUp} />
            ) : (
              <FontAwesomeIcon className="ml-2 h-4 w-4" icon={faSort} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <FontAwesomeIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              icon={faArrowUp}
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <FontAwesomeIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              icon={faArrowDown}
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <FontAwesomeIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              icon={faEyeSlash}
            />{" "}
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
