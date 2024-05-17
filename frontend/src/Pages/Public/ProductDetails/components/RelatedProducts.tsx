import { ProductsSlider } from "@/components/MainComponents";
import { IProductType } from "@/types/CardsTypes";
import { TFunction } from "i18next";

function RelatedProducts({
  RelatedProducts,
  t,
}: {
  RelatedProducts: IProductType[];
  t: TFunction;
}) {
  if (RelatedProducts?.length === 0) return null;
  return (
    <section className="w-full">
      <h3 className=" font-semibold text-3xl text-start mb-3">
        {t("related_products")}
      </h3>{" "}
      <ProductsSlider Slides={RelatedProducts} t={t} />
    </section>
  );
}

export default RelatedProducts;
