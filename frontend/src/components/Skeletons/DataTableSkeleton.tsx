import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui/skeleton";

function DataTableSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-80 rounded-md border border-muted flex flex-col mt-16 ",
        className
      )}
    >
      <div className="grid grid-cols-3 gap-5 w-[95%] mx-auto">
        <Skeleton className=" bg-gray-200 w-full h-10 my-3 px-5" />
        <Skeleton className=" bg-gray-200 w-full h-10 my-3 px-5" />
        <Skeleton className=" bg-gray-200 w-full h-10 my-3 px-5" />
      </div>
      <div className="h-px bg-muted w-full "></div>
      <div className="space-y-5 w-[95%] mx-auto  grow my-5 flex-col-center">
        <Skeleton className=" bg-gray-200 w-full h-8" />
        <Skeleton className=" bg-gray-200 w-full h-8" />
        <Skeleton className=" bg-gray-200 w-full h-8" />
        <Skeleton className=" bg-gray-200 w-full h-8" />
      </div>
    </div>
  );
}

export default DataTableSkeleton;
