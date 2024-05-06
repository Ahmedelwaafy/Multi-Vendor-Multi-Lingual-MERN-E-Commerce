import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TableHeadSortHide } from "@/components/MainComponents/DataTable/TableHeadSortHide";
import { ColumnDef } from "@tanstack/react-table";
import { TFunction } from "i18next";
import { formatCurrency } from "@/lib/utils";
import { TableCellDate } from "@/components/MainComponents/DataTable/TableCellDate";
import { TableCellPrice } from "@/components/MainComponents/DataTable/TableCellPrice";
type order = {
  date: Date;
  order_id: number;
  total: number;
  quantity: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
const UserOrdersColumns = (t: TFunction): ColumnDef<order>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "date",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.date")} />
    ),
    cell: ({ row }) => <TableCellDate title={row.getValue("date")} />,
  },
  {
    accessorKey: "order_id",
    header: t("table.headers.order_id"),
  },
  {
    accessorKey: "status",
    header: t("table.headers.status"),
  },

  {
    accessorKey: "quantity",
    header: t("table.headers.quantity"),
  },

  {
    accessorKey: "total",
    header: () => (
      <div className="text-right font-medium">{t("table.headers.total")}</div>
    ),
    cell: ({ row }) => <TableCellPrice title={row.getValue("total")} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <FontAwesomeIcon icon={faEllipsisVertical} />{" "}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("table.actions.label")}</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(payment.order_id))
              }
            >
              {t("table.actions.copy")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default UserOrdersColumns;
