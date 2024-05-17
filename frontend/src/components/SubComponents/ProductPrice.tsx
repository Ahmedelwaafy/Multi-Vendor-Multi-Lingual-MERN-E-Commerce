import { TFunction } from "i18next";

export default function ProductPrice({
  data,
  t,
}: {
  data: { finalPrice: number; originalPrice: number; sold_out: number };
  t: TFunction;
}) {
  return (
    <div className="product__price--sold mt-4 flex justify-between items-center w-full">
      <h6 className="product__price--original text-lg font-semibold">
        {t("product_card.tooltips.count_formatted", {
          count: data?.finalPrice,
        })}
        $
        {data?.originalPrice !== data?.finalPrice && (
          <sup className="product__price--discount line-through mx-1 text-accent">
            {t("product_card.tooltips.count_formatted", {
              count: data?.originalPrice,
            })}
            $
          </sup>
        )}
      </h6>
      <p className="product__sold text-sm text-accent font-semibold">
        {t("product_card.tooltips.count_formatted", {
          count: data?.sold_out,
          context: "sold",
        })}
      </p>
    </div>
  );
}
