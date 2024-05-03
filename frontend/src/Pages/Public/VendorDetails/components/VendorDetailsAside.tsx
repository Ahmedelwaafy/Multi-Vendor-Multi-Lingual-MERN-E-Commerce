import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarFallbackName, cn, FormatDate } from "@/lib/utils";
import { IVendorType } from "@/types";
import { TFunction } from "i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function VendorDetailsAside({
  vendor,
  t,
  className,
  isPending,
}: {
  vendor: IVendorType;
  t: TFunction;
  isPending: boolean;
  className: string;
}) {
  return (
    <aside className={cn("  ", className)}>
      <ScrollArea className="h-page-height md:h-auto  p-5  w-full ">
        <div className="space-y-5  md:text-center">
          {isPending ? (
            <>
              <Skeleton className="h-20 w-20 mx-auto rounded-full bg-background" />
              <Skeleton className="h-3 w-40 mx-auto  bg-background" />
              <div className="space-y-2 ">
                <Skeleton className="h-1 w-60 mx-auto  bg-background" />
                <Skeleton className="h-1 w-60 mx-auto  bg-background" />
                <Skeleton className="h-1 w-60 mx-auto  bg-background" />
              </div>
              <div className="space-y-2 py-2 ">
                <Skeleton className="h-2 w-20   bg-background" />
                <Skeleton className="h-1 w-40   bg-background" />
              </div>
              <div className="space-y-2 py-2 ">
                <Skeleton className="h-2 w-20   bg-background" />
                <Skeleton className="h-1 w-40   bg-background" />
              </div>
              <div className="space-y-2 py-2 ">
                <Skeleton className="h-2 w-20   bg-background" />
                <Skeleton className="h-1 w-40   bg-background" />
              </div>
              <div className="space-y-2 py-2 ">
                <Skeleton className="h-2 w-20   bg-background" />
                <Skeleton className="h-1 w-40   bg-background" />
              </div>
              <div className="space-y-2 py-2 ">
                <Skeleton className="h-2 w-20   bg-background" />
                <Skeleton className="h-1 w-40   bg-background" />
              </div>
            </>
          ) : (
            <>
              <Avatar className=" h-20 w-20 mx-auto">
                <AvatarImage
                  className="object-cover rounded-full"
                  src={vendor?.avatar?.url}
                />
                <AvatarFallback className="bg-background text-secondary font-medium">
                  {AvatarFallbackName(vendor?.name)}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-medium text-center ">
                {vendor?.name}
              </h1>
              <h2 className="text-sm text-justify md:text-center opacity-70">
                {vendor?.description}
              </h2>
              <div className="vendor__address ">
                <h3 className="font-semibold ">{t("address")}</h3>
                <h2 className="text-sm">{vendor?.address}</h2>
              </div>
              <div className="vendor__phone ">
                <h3 className="font-semibold ">{t("phone")}</h3>
                <h2 className="text-sm">{vendor?.phone}</h2>
              </div>
              <div className="vendor__total--products ">
                <h3 className="font-semibold ">{t("total_products")}</h3>
                <h2 className="text-sm">{vendor?.totalProducts}</h2>
              </div>
              <div className="vendor__ratings ">
                <h3 className="font-semibold ">{t("ratings")}</h3>
                <h2 className="text-sm">{vendor?.rating}/5</h2>
              </div>
              <div className="vendor__views ">
                <h3 className="font-semibold ">{t("views")}</h3>
                <h2 className="text-sm">
                  {t("views_count", { count: vendor?.views })}
                </h2>
              </div>
              <div className="vendor__joined_on ">
                <h3 className="font-semibold ">{t("joined_on")}</h3>
                <h2 className="text-sm">{FormatDate(vendor?.createdAt)}</h2>
              </div>{" "}
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

export default VendorDetailsAside;
