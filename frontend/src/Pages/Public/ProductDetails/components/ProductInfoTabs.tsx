import { IProductType } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewCard } from "@/components/CardsComponents";
import { VendorAvatar } from "@/components/SubComponents";
import { Button } from "@/components/ui/button";
import { IVendorType } from "@/types";
import { FormatDate } from "@/lib/utils";
import { LangLink } from "@/components/MainComponents";

function ProductInfoTabs({
  product,
  vendor,
  t,
}: {
  product: IProductType;
  vendor: Partial<IVendorType>;
  t: TFunction;
}) {
  return (
    <section className="bg-muted py-7 rounded-xl w-full">
      <Tabs defaultValue="product_details" className="w-full px-7 ">
        <TabsList className="w-full justify-between bg-primary text-background rounded-full px-2 sm:flex-col sm:h-44 sm:justify-center sm:gap-5 mb-5">
          <TabsTrigger value="product_details">
            {t("tabs.product_details")}
          </TabsTrigger>
          <TabsTrigger value="product_reviews">
            {t("tabs.product_reviews")}
          </TabsTrigger>
          <TabsTrigger value="seller_information">
            {t("tabs.seller_information")}
          </TabsTrigger>
        </TabsList>
        <TabsContent className="px-7 md:px-0" value="product_details">
          {product?.description}
        </TabsContent>
        <TabsContent
          value="product_reviews"
          className="flex flex-col gap-9 px-7 md:px-0"
        >
          {product?.reviews?.length === 0 ? (
            <p className="text-center">{t("no_reviews")}</p>
          ) : (
            product?.reviews?.map((review) => (
              <ReviewCard key={review?.id} review={review} />
            ))
          )}
        </TabsContent>
        <TabsContent
          className="px-7 md:px-0 flex justify-between md:flex-col gap-14 md:gap-5"
          value="seller_information"
        >
          <div className="grow ">
            <VendorAvatar
              vendor={{
                img: vendor?.avatar?.url as string,
                name: vendor?.name as string,
                rating: vendor?.rating as number,
              }}
              t={t}
            />
            <h6 className="mt-5">{vendor?.description}</h6>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <h4>
              <span className="font-semibold">{t("joined_on")}:</span>{" "}
              {FormatDate(vendor?.createdAt as Date)}
            </h4>
            <h4>
              <span className="font-semibold">{t("total_products")}:</span>{" "}
              {vendor?.totalProducts?.toLocaleString()}
            </h4>
            <h4>
              <span className="font-semibold">{t("total_reviews")}:</span>{" "}
              {vendor?.totalReviews}
            </h4>
            <Button className="w-fit" asChild>
              <LangLink
                to={`/brands/${vendor?._id}/${vendor?.name?.replace(
                  /\s+/g,
                  "-"
                )}`}
              >
                {t("visit_shop")}
              </LangLink>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default ProductInfoTabs;
