import { TFunction } from "i18next";
import { IProductType } from "../../types/CardsTypes";
import LangLink from "./LangLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  AddToCartBtn,
  AddToFavorites,
  IncreaseDecreaseProductQty,
} from "../SubComponents";
import { useState } from "react";

function CartWishListItemCard({
  product,
  type,
  t,
  setToggleCart,
}: {
  product: IProductType;
  type: "cart" | "wishlist";
  t: TFunction;
  setToggleCart: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full h-36 flex justify-between gap-7 first: mt-5 pb-5 border-b border-gray-200">
      <div className="relative h-full w-32 ">
        <LangLink
          onClick={() => setToggleCart(false)}
          to={`/products/${product?.id}`}
          className="item__img--wrapper  h-full w-full group  rounded-xl overflow-hidden block border "
        >
          <img
            className=" w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out object-"
            src={product?.images?.[0]?.url}
            alt={product?.name}
          />
        </LangLink>
        {type === "cart" && (
          <button className="item__remove absolute flex-center rounded-full trns hover:scale-105 active:scale-95 -top-2.5 -left-2.5 rtl:-left-auto rtl:-right-2.5  bg-accent p-1 shrink-0 size-5 text-xs text-background hover:animate-pulse shadow-md">
            <FontAwesomeIcon className="text-" icon={faClose} />
          </button>
        )}
      </div>
      <div className="grow flex flex-col items-start justify-between">
        <div className="item__name--category flex flex-col items-start">
          <LangLink
            onClick={() => setToggleCart(false)}
            to={`/products/${product?.id}`}
            className="item__name line-clamp-2 grow font-semibold text-lg "
          >
            {product?.name}
          </LangLink>
          <LangLink
            onClick={() => setToggleCart(false)}
            to={`/categories/${product?.category}`}
            className="item__category opacity-70"
          >
            {product?.category}
          </LangLink>
        </div>
        <div className="item__options--bottom w-full flex items-center justify-between">
          {type === "cart" ? (
            <>
              <IncreaseDecreaseProductQty
                quantity={quantity}
                disabled={quantity === 1}
                setQuantity={setQuantity}
                id={product?.id}
                className="h-9"
              />
              <h4 className="font-semibold">
                {t("Navbar.cart.price_formatted", {
                  price: quantity * product?.discount_Price,
                })}
              </h4>
            </>
          ) : (
            <>
              <AddToFavorites
                is_fav={product?.is_fav}
                id={product?.id}
                onSuccess={() => {}}
              />
              <AddToCartBtn
                className="h-9 bg-secondary"
                type="button"
                t={t}
                id={product?.id}
                onSuccess={() => {}}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartWishListItemCard;
