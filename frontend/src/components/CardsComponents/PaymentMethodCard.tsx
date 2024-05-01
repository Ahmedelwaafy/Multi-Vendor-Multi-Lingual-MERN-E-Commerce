import { IPaymentMethodType } from "@/types/CardsTypes";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePostData } from "@/Hooks/useAxios";
import { TFunction } from "i18next";
function PaymentMethodCard({
  method,
  className,
  t,
}: {
  method: IPaymentMethodType;
  t: TFunction;
  className?: string;
}) {
  const { mutate } = usePostData(true, () => {});
  function DeletePaymentMethod(id: number) {
    mutate({
      api: import.meta.env.VITE_DELETE_USER_PAYMENT_METHOD,
      data: { method_id: id },
    });
  }
  return (
    <li className="relative group">
      {method?.default && (
        <span className="absolute -top-6 left-5 text-sm bg-fuchsia-600 text-background px-3 py-0.5 rounded-sm trns translate-y-5 !z-[-1] group-hover:translate-y-0 ">
          {t("default")}
        </span>
      )}
      <ScrollArea
        className={cn(
          "w-full border-fuchsia-300 bg-fuchsia-200 rounded-xl border ",
          className
        )}
      >
        <div className="w-full flex justify-between items-center   text- background p-5   gap-5 ">
          <div className="card_type--name flex items-center gap-3 shrink-0">
            <img
              className="w-20 h-10 object-contain"
              src={
                method?.card_type === "visa"
                  ? "/assets/images/visa.jpg"
                  : method?.card_type === "master_card"
                  ? "/assets/images/Mastercard.png"
                  : "/assets/images/Paypal.png"
              }
              alt={method?.card_type}
            />
            <h3 className="font-medium text-lg">{method?.name}</h3>
          </div>
          <div className="last_digits--expiry flex items-center gap-5 shrink-0">
            <p className="flex-center gap-1">
              {method?.last_digits} <span className="pt-1">**** **** ****</span>
            </p>
            <p>{method?.expiry_date}</p>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="text-destructive hover:bg-destructive hover:text-background hover:animate-wiggle-more hover:animate-fill-backwards"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl md:max-w-[90%]">
              <DialogHeader>
                <DialogTitle>{t("DeletePaymentMethodPopUp.title")}</DialogTitle>
                <DialogDescription>
                  <div className="w-full flex justify-between items-center mt-5">
                    <Button
                      variant={"destructive"}
                      className="rounded-md "
                      asChild
                    >
                      <DialogClose type="button">
                        {t("DeletePaymentMethodPopUp.cancel")}
                      </DialogClose>
                    </Button>
                    <Button
                      variant={"submit"}
                      onClick={() => DeletePaymentMethod(method?.id)}
                    >
                      {t("DeletePaymentMethodPopUp.confirm")}
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </li>
  );
}

export default PaymentMethodCard;
