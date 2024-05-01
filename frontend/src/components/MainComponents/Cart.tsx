import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { faCartShopping, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import LangLink from "./LangLink";
import { Button } from "../ui/button";
import { products } from "@/constants";
import CartWishListItemCard from "./CartWishListItemCard";
import { useState } from "react";
import { toast } from "sonner";
function Cart({ lng, t }: { lng: string; t: TFunction }) {
  const [toggleCart, setToggleCart] = useState(false);
  return (
    <Sheet open={toggleCart} onOpenChange={setToggleCart}>
      <SheetTrigger className="relative group cart">
        <span className="absolute bg-accent size-4 transition-transform duration-500 ease-in-out bottom-0 right-1/2 translate-x-1/2 translate-y-2.5  group-hover:translate-x-[120%] group-hover:-translate-y-4 group-hover: z-50 rounded-full text-center text-background text-xs">
          7
        </span>
        <FontAwesomeIcon className="text-xl" icon={faCartShopping} />
      </SheetTrigger>
      <SheetContent
        side={lng === "ar" ? "right" : "left"}
        className="w-3/4 max-w-[500px] p-0 border-none h-[100vh] "
      >
        <SheetHeader className="space-y-0">
          <SheetTitle className="bg-secondary text-background h-12 flex items-center justify-between p-5 text-base font-medium shadow-md">
            <div className="flex-center gap-2 select-none group">
              <FontAwesomeIcon
                className="group-hover:animate-wiggle-more"
                icon={faCartShopping}
              />

              <h6>{t("Navbar.cart.count_formatted", { count: 1100 })}</h6>
            </div>
            {products?.length > 0 && (
              <button
                onClick={() => {
                  setToggleCart(false);
                  toast.success(t("Navbar.cart.clear_cart_toast"));
                }}
                className="text-sm flex-center gap-2 px-2 py-1 bg-pink-500 trns hover:scale-x-105 active:scale-x-95  rounded-full"
              >
                {t("Navbar.cart.clear_Cart")}{" "}
                <FontAwesomeIcon className="text-" icon={faClose} />
              </button>
            )}
          </SheetTitle>

          <SheetDescription className="p-0 mt-0">
            <ScrollArea className="h-[calc(100vh-208px)] bg- ">
              <div className="px-5 ">
                {products?.map((product) => (
                  <CartWishListItemCard
                    setToggleCart={setToggleCart}
                    t={t}
                    product={product}
                    key={product?.id}
                    type="cart"
                  />
                ))}
              </div>
            </ScrollArea>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className="w-full bg-secondary h-40 p-5 text-background flex-col flex items-center justify-between shadow-md">
          <div className="w-full flex items-center justify-between">
            <h5 className="uppercase text-lg">{t("Navbar.cart.sub_total")}</h5>
            <h4>{t("Navbar.cart.price_formatted", { price: 15000 })}</h4>
          </div>
          <p className="text-sm font-medium text-center">
            {t("Navbar.cart.taxes")}
          </p>
          <Button asChild>
            <LangLink
              onClick={() => setToggleCart(false)}
              className=""
              to="/checkout"
            >
              {t("Navbar.cart.checkout")}
            </LangLink>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
