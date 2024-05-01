import { ItemSlider, LangLink } from "@/components/MainComponents";
import {
  AddToCartBtn,
  AddToFavorites,
  IncreaseDecreaseProductQty,
  ProductPrice,
  RatingComponent,
  SendMsgToShop,
  VendorQuickViewPopover,
} from "@/components/SubComponents";
import { IProductType } from "@/types/CardsTypes";
import { TFunction } from "i18next";
import { useState } from "react";

function ProductShowcase({
  product,
  t,
}: {
  product: IProductType;
  t: TFunction;
}) {
  const [quantity, setQuantity] = useState(0);

  return (
    <section className="w-full flex gap-10 md:flex-col">
      <div className="ProductShowcase__left w-1/2 md:w-full">
        <ItemSlider Slides={product?.images} />
      </div>
      <div className="ProductShowcase__right w-1/2 md:w-full ">
        <div className="category__views--love flex items-center justify-between">
          <LangLink
            to={`/categories/${product?.category}`}
            className="rounded-full bg-accent text-xs px-2 py-1 text-background"
          >
            {product?.category}
          </LangLink>
          <h6 className="text-sm">
            {t("views_count", { count: product?.views })}
          </h6>
          <AddToFavorites id={product?.id} is_fav={product?.is_fav} />
        </div>
        <h1 className="text-2xl font-semibold">{product?.name}</h1>
        <h2 className="opacity-70">{product?.description}</h2>
        <RatingComponent
          IMutable
          defaultRating={product?.ratings || 0}
          className2="my-5"
        />
        <ProductPrice t={t} product={product} />{" "}
        <div className="product__actions flex items-center justify-between mt-5 gap-5 xs:flex-col xs:items-start">
          <IncreaseDecreaseProductQty
            quantity={quantity}
            disabled={quantity === 0}
            setQuantity={setQuantity}
            id={product?.id}
          />{" "}
          <AddToCartBtn id={product?.id} type="button" t={t} />
        </div>{" "}
        <div className="vendor__info--actions flex items-center justify-between mt-7 xs:flex-col xs:items-start">
          <VendorQuickViewPopover
            t={t}
            product={product}
            className="text-secondary"
          />
          <SendMsgToShop id={product?.shop_id} t={t} />
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
