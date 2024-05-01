import { ProductsSlider } from "@/components/MainComponents";
import { products } from "@/constants";
import { IProductType } from "@/types/CardsTypes";
import { TFunction } from "i18next";

function RelatedProducts({
  product,
  t,
}: {
  product: IProductType;
  t: TFunction;
}) {
  return (
    <section className="w-full">
      <h3 className=" font-semibold text-3xl text-start">
        {t("related_products")}
      </h3>{" "}
      <ProductsSlider Slides={products} t={t} />
    </section>
  );
}

export default RelatedProducts;
