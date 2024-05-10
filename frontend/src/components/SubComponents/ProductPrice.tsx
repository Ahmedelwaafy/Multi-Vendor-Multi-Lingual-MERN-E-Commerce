import { IProductType } from "@/types/CardsTypes";
import { TFunction } from "i18next";

export default function ProductPrice({
  product,
  t,
}: {
  product: IProductType;
  t: TFunction;
}) {
  return (
    <div className="product__price--sold mt-4 flex justify-between items-center">
      <h6 className="product__price--original text-lg font-semibold">
        {t("product_card.tooltips.count_formatted", {
          count: product?.finalPrice,
        })}
        $
        {product?.originalPrice !== product?.finalPrice && (
          <sup className="product__price--discount line-through mx-1 text-accent">
            {t("product_card.tooltips.count_formatted", {
              count: product?.originalPrice,
            })}
            $
          </sup>
        )}
      </h6>
      <p className="product__sold text-sm text-accent font-semibold">
        {t("product_card.tooltips.count_formatted", {
          count: product?.sold_out,
          context: "sold",
        })}
      </p>
    </div>
  );
}
