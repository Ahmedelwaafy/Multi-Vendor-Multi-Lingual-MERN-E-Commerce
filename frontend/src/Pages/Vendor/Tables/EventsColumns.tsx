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
import { IEventType } from "@/types/CardsTypes";
import { ColumnDef } from "@tanstack/react-table";
import { TFunction } from "i18next";
import { DeletePopUp } from "@/components/SubComponents";
import { TableCellDate } from "@/components/MainComponents/DataTable/TableCellDate";
type event = Partial<IEventType>;
const EventsColumns = (
  t: TFunction,
  callBackFn: (id: string) => void,
  isPending: boolean
): ColumnDef<event>[] => [
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
    header: () => <p className="w-28 ">{t("table.headers.event_id")}</p>,
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
    accessorKey: "finalPrice",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.price")} />
    ),
    cell: ({ row }) => (
      <TableCellPrice
        title={row.getValue("finalPrice")}
        className="text-center"
      />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.stock")} />
    ),
    cell: ({ row }) => (
      <p>{(row.getValue("stock") as number).toLocaleString()}</p>
    ),
  },
  {
    accessorKey: "sold_out",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.sold_out")} />
    ),
    cell: ({ row }) => (
      <p>{(row.getValue("sold_out") as number).toLocaleString()}</p>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.startDate")} />
    ),
    cell: ({ row }) => <TableCellDate title={row.getValue("startDate")} />,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <TableHeadSortHide column={column} title={t("table.headers.endDate")} />
    ),
    cell: ({ row }) => <TableCellDate title={row.getValue("endDate")} />,
  },
  {
    accessorKey: "status",
    header: t("table.headers.status"),
  },
  {
    accessorKey: "preview",
    header: () => <p>{t("table.headers.preview")}</p>,

    cell: ({ row }) => (
      <LangLink
        target="_blanck"
        to={`/events/${row.getValue("_id")}/${String(
          row.getValue("name")
        )?.replace(/\s+/g, "-")}`}
      >
        <FontAwesomeIcon icon={faEye} />
      </LangLink>
    ),
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
      const Event = row.original;

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
                to={`/events/edit/${row.getValue("_id")}/${String(
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

export default EventsColumns;
