import { useAppDispatch, useAppSelector } from "@/app/reduxHooks.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import { useState } from "react";
import {
  setShowProductQuickViewPopUp,
  showProductQuickViewPopUp,
} from "../../app/Features/MiscellaneousSlice.tsx";
import { LangLink } from "../MainComponents";
import {
  AddToCartBtn,
  AddToFavorites,
  IncreaseDecreaseProductQty,
  ProductPrice,
  ProductQuickViewPopUpSlider,
  RatingComponent,
  SendMsgToShop,
} from "../SubComponents";
import { ScrollArea } from "../ui/scroll-area.tsx";
import { IVendorType } from "@/types/index.ts";
import { Image } from "@/types/CardsTypes.ts";
import { AvatarFallbackName } from "@/lib/utils.ts";
function ProductQuickViewPopUp({ t }: { t: TFunction }) {
  const { visible, product } = useAppSelector(showProductQuickViewPopUp);
  const dispatchRedux = useAppDispatch();
  const [quantity, setQuantity] = useState(0);

  return (
    <Dialog
      open={visible}
      onOpenChange={() =>
        dispatchRedux(
          setShowProductQuickViewPopUp({ visible: false, product: null })
        )
      }
    >
      <DialogContent className="ProductQuickViewPopUp__content w-3/5 min-w-[750px] md:min-w-[300px] h-3/5 min-h-[460px]  md:w-[90vw] rounded-2xl  shadow-lg  md:h-[80vh]  max-w-full p- overflow-hidden">
        <ScrollArea className="md:h-[73.5vh]  ">
          <div
            className={`w-full h-full  flex gap-7 md:flex-col md:items-center md:justify-between relative `}
          >
            <div className="QuickViewPopUp__left h-full w-1/2 md:w-full flex-col-center gap-5 bg-muted rounded-3xl md:py-5 min-h-[410px] md:min-h-fit">
              <ProductQuickViewPopUpSlider data={product?.images as Image[]} />
              <LangLink
                to={`/brands/${(product?.vendor as IVendorType)?._id}/${(
                  product?.vendor as IVendorType
                )?.name?.replace(/\s+/g, "-")}`}
                className="flex justify-start items-center space-x-4"
              >
                <Avatar>
                  <AvatarImage
                    src={(product?.vendor as IVendorType)?.avatar?.url}
                  />
                  <AvatarFallback className="bg-white font-medium">
                    {AvatarFallbackName((product?.vendor as IVendorType)?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="">
                  {(product?.vendor as IVendorType)?.name}
                </span>
              </LangLink>

              <SendMsgToShop
                id={(product?.vendor as IVendorType)?._id as string}
                t={t}
              />
            </div>
            <div className="QuickViewPopUp__right h-full w-1/2 md:w-full flex-col-center gap-5  min-h-[410px] md:min-h-fit md:px-4">
              <DialogHeader className=" ">
                <DialogTitle className="text-2xl font-semibold text-start ">
                  {product?.name}
                </DialogTitle>
                <DialogDescription className=" text-lg   text-start line-clamp-5">
                  {product?.description}
                </DialogDescription>
              </DialogHeader>
              <ProductPrice
                t={t}
                data={{
                  finalPrice: product?.finalPrice as number,
                  originalPrice: product?.originalPrice as number,
                  sold_out: product?.sold_out as number,
                }}
              />
              <div className="product__love--rating flex justify-between items-center w-full">
                <AddToFavorites
                  id={product?._id as number}
                  isFav={product?.isFav as boolean}
                />
                <RatingComponent
                  className="w-fit"
                  IMutable
                  defaultRating={product?.ratings || 0}
                />
              </div>
              <div className="product__addToCart flex justify-between items-center w-full mt-5 sm:flex-col gap-7">
                <IncreaseDecreaseProductQty
                  quantity={quantity}
                  disabled={quantity === 0}
                  setQuantity={setQuantity}
                  id={product?._id as number}
                />
                <AddToCartBtn id={product?._id as number} type="button" t={t} />
              </div>
            </div>
            <DialogClose className="focus:outline-none hidden absolute -top-6  -right-6 rtl:right-auto rtl:-left-6  rounded-bl-full size-12 md:hidden">
              <FontAwesomeIcon
                className="   cursor-pointer trns active:scale-90 text-3xl "
                icon={faCircleXmark}
              />
            </DialogClose>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ProductQuickViewPopUp;
