import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

function WideCouponCardSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn("w-full h-[220px] flex flex-col  ss:gap-4 ", className)}
    >
      <Skeleton className="ml-20 block ss:ml-3 w-24 aspect-square ss:w-16  border border- rounded-sm -translate-y-[75%] ss:-translate-y-[89%] bg-white " />

      <Skeleton className=" h-10 bg-white w-2/3 mx-auto mt-12" />
    </Skeleton>
  );
}

export default WideCouponCardSkeleton;
