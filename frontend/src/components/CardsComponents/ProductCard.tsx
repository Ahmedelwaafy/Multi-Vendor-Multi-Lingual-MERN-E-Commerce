import { IProductType } from "@/types/CardsTypes";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AddToCartBtn,
  AddToFavorites,
  ProductPrice,
  RatingComponent,
  VendorQuickViewPopover,
} from "../SubComponents";
import { LangLink } from "../MainComponents";
import { TFunction } from "i18next";
import { setShowProductQuickViewPopUp } from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import { cn } from "@/lib/utils";
function ProductCard({
  product,
  t,
  slider,
  className,
}: {
  product: IProductType;
  t: TFunction;
  slider?: boolean;
  className?: string;
}) {
  const dispatchRedux = useAppDispatch();

  return (
    <div
      className={cn(
        "w-full h-  border- muted border -2 rounded-xl  pt-5 shadow-md hover:-translate-y-2 transition-transform duration-500 ease-in-out max-w-[300px] mx-auto ",
        slider && "mt-2 mb-3",
        className
      )}
    >
      <LangLink
        to={`/products/${product?.id}/${product.name?.replace(/\s+/g, "-")}`}
        className="product__img--wrapper group w-full h-60  overflow-hidden block relative"
      >
        <img
          className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110 object-cover"
          src={product.images[0]?.url}
          alt={product.name}
        />
        <span className="product__category absolute left-0 bottom-0 px-2 bg-secondary text-background rounded-r-full text-sm py-1 flex-center rtl:left-auto rtl:right-0 rtl:rounded-r-none rtl:rounded-l-full">
          {product?.category}
        </span>
      </LangLink>
      <div className="product__details--wrapper py-5">
        <TooltipProvider>
          <div className="product__actions flex items-center justify-start gap-7 bg-gray-100 py-3 px-5">
            <Tooltip>
              <TooltipTrigger>
                <AddToFavorites id={product?.id} is_fav={product?.is_fav} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("product_card.tooltips.add_to_wishlist")}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <AddToCartBtn id={product?.id} type="icon" t={t} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("product_card.tooltips.add_to_cart")}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <FontAwesomeIcon
                  className="text-xl cursor-pointer flex-center hover:animate-wiggle trns active:scale-90"
                  icon={faEye}
                  onClick={() =>
                    dispatchRedux(
                      setShowProductQuickViewPopUp({
                        visible: true,
                        product,
                      })
                    )
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("product_card.tooltips.view_details")}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <div className="px-5">
          <VendorQuickViewPopover t={t} product={product} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <LangLink
                  to={`/products/${product?.id}/${product.name?.replace(
                    /\s+/g,
                    "-"
                  )}`}
                  className=" mb-3 line-clamp-2 font-semibold text-xl "
                >
                  {product?.name}
                </LangLink>
              </TooltipTrigger>
              <TooltipContent>{product?.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <RatingComponent IMutable defaultRating={product?.ratings || 0} />
          <ProductPrice t={t} product={product} />{" "}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
