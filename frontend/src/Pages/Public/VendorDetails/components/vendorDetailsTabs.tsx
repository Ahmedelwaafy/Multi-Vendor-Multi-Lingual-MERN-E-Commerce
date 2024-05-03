import { cn } from "@/lib/utils";
import { IVendorType } from "@/types";
import { TFunction } from "i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorProductsTab from "./VendorProductsTab";
import VendorEventsTab from "./VendorEventsTab";
import VendorReviewsTab from "./VendorReviewsTab";

function VendorDetailsTabs({
  vendor,
  t,
  className,
}: {
  vendor: IVendorType;
  t: TFunction;
  className: string;
}) {
  return (
    <section className={cn("  ", className)}>
      <Tabs defaultValue="products" className="w-full  ">
        <TabsList className="w-full justify-between bg-primary text-background rounded-full px-2  mb-5">
          <TabsTrigger value="products">{t("tabs.products")}</TabsTrigger>
          <TabsTrigger value="events">{t("tabs.events")}</TabsTrigger>
          <TabsTrigger value="reviews">{t("tabs.reviews")}</TabsTrigger>
        </TabsList>
        <TabsContent className="" value="products">
          <VendorProductsTab t={t} />
        </TabsContent>
        <TabsContent className="" value="events">
          <VendorEventsTab t={t} />
        </TabsContent>
        <TabsContent value="reviews" className="flex flex-col gap-9 ">
          <VendorReviewsTab t={t} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default VendorDetailsTabs;
