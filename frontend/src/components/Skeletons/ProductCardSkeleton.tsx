import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full pt-5 border shadow-md max-w-[300px] mx-auto ",
        className
      )}
    >
      <Skeleton className="w-full h-60 " />
      <div className="py-5">
        <div className="flex items-center justify-start gap-7 bg-gray-100 py-3 px-5">
          <Skeleton className="  rounded-full size-7 " />
          <Skeleton className="  rounded-full size-7 " />
          <Skeleton className="  rounded-full size-7 " />
        </div>
        <div className="px-5 pt-4 space-y-3">


          <Skeleton className="w-2/3 h-4 " />
          <Skeleton className="w-full h-7 " />
          <Skeleton className="w-2/3 h-4 " />
          <div className="flex justify-between items-center">
          <Skeleton className="w-1/4 h-4 " />
          <Skeleton className="w-1/4 h-4 " />

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
