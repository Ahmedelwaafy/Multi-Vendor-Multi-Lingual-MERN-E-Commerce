import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TablePaginationProps<TData> {
  table: Table<TData>;
  lng: string;
}

export function TablePagination<TData>({
  table,
  lng,
}: TablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 sm:px-0 lg:flex-col-reverse lg:gap-5 ">
      <div className=" text-sm opacity-70">
        {table.getFilteredSelectedRowModel().rows.length}{" "}
        {lng === "ar" ? "من" : "of"} {table.getFilteredRowModel().rows.length}{" "}
        {lng === "ar" ? "صف تم اختيارة" : "row(s) selected."}
      </div>
      {/*  {(table.getFilteredRowModel().rows.length > table.getState().pagination.pageSize  ||
        table.getRowModel().rows?.length > table.getState().pagination.pageSize) &&(

          
        )} */}
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">
          {lng === "ar" ? "صفوف الصفحة" : "Rows per page"}
        </p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-6 sm:flex-col-reverse sm:w-full sm:gap-3 sm:space-x-0">
        <div className="flex shrink-0 items-center justify-center text-sm font-medium">
          {lng === "ar" ? "صفحة" : "Page"}{" "}
          {table.getState().pagination.pageIndex + 1}{" "}
          {lng === "ar" ? "من" : "of"} {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2 sm:justify-between  w-full">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <FontAwesomeIcon
              className=" h-4 w-4 rotate-180"
              icon={faAnglesRight}
            />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <FontAwesomeIcon className=" h-4 w-4" icon={faChevronLeft} />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <FontAwesomeIcon className=" h-4 w-4" icon={faChevronRight} />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <FontAwesomeIcon className=" h-4 w-4" icon={faAnglesRight} />
          </Button>
        </div>
      </div>
    </div>
  );
}
