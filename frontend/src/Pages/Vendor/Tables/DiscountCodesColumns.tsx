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
import {
  faEllipsisVertical,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LangLink } from "@/components/MainComponents";
import { TableCellCopyToClipboard } from "@/components/MainComponents/DataTable/TableCellCopyToClipboard";
import { TableCellPrice } from "@/components/MainComponents/DataTable/TableCellPrice";
import { TableCellTooltip } from "@/components/MainComponents/DataTable/TableCellTooltip";
import { TableHeadSortHide } from "@/components/MainComponents/DataTable/TableHeadSortHide";
import { IDiscountCodeType } from "@/types/CardsTypes";
import { ColumnDef } from "@tanstack/react-table";
import { TFunction } from "i18next";
import { DeletePopUp } from "@/components/SubComponents";
import { TableCellDate } from "@/components/MainComponents/DataTable/TableCellDate";
type discountCode = Partial<IDiscountCodeType>;
const DiscountCodesColumns = (
  t: TFunction,
  callBackFn: (id: string) => void,
  isPending: boolean
): ColumnDef<discountCode>[] => [
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
    accessorKey: "_id",
    header: () => <p className="w-28 ">{t("table.headers.discountCode_id")}</p>,
    cell: ({ row }) => (
      <TableCellCopyToClipboard
        title={row.getValue("_id")}
        className="!min-w-36"
        t={t}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.name")} />
    ),
    cell: ({ row }) => (
      <TableCellTooltip
        title={row.getValue("name")}
        className="w-44 mx-auto truncate"
      />
    ),
  },
  {
    accessorKey: "ProductName",
    header: ({ column }) => (
      <TableHeadSortHide
        column={column}
        title={t("table.headers.ProductName")}
      />
    ),
    cell: ({ row }) => (
      <LangLink
        target="_blanck"
        to={`/products/${row.getValue("ProductID")}/${String(
          row.getValue("ProductName")
        )?.replace(/\s+/g, "-")}`}
      >
        {row.getValue("ProductName")}
      </LangLink>
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.value")} />
    ),
    cell: ({ row }) => (
      <TableCellTooltip
        title={row.getValue("value")}
        className="w-44 mx-auto truncate"
      />
    ),
  },

  {
    accessorKey: "maxUsage",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.maxUsage")} />
    ),
    cell: ({ row }) => (
      <p>{(row.getValue("maxUsage") as number).toLocaleString()}</p>
    ),
  },
  {
    accessorKey: "usageCount",
    header: ({ column }) => (
      <TableHeadSortHide
        column={column}
        title={t("table.headers.usageCount")}
      />
    ),
    cell: ({ row }) => (
      <p>{(row.getValue("usageCount") as number).toLocaleString()}</p>
    ),
  },
  {
    accessorKey: "minPrice",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.minPrice")} />
    ),
    cell: ({ row }) => (
      <TableCellPrice
        title={row.getValue("minPrice")}
        className="text-center"
      />
    ),
  },
  {
    accessorKey: "maxPrice",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.maxPrice")} />
    ),
    cell: ({ row }) => (
      <TableCellPrice
        title={row.getValue("maxPrice")}
        className="text-center"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.createdAt")} />
    ),
    cell: ({ row }) => <TableCellDate title={row.getValue("createdAt")} />,
  },

  {
    accessorKey: "Delete",
    header: () => <p>{t("table.headers.delete")}</p>,
    cell: ({ row }) => (
      <DeletePopUp
        callBackFn={() => callBackFn(row.original._id as unknown as string)}
        isPending={isPending}
        t={t}
      >
        <FontAwesomeIcon className="text-destructive" icon={faTrashAlt} />
      </DeletePopUp>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const DiscountCode = row.original;

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
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LangLink
                className="w-full"
                target="_blanck"
                to={`/discountCodes/edit/${row.getValue("_id")}/${String(
                  row.getValue("name")
                )?.replace(/\s+/g, "-")}`}
              >
                {t("table.actions.edit")}
              </LangLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default DiscountCodesColumns;
