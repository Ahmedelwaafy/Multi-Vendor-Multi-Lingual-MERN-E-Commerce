import { IAddressType } from "@/types/CardsTypes";
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
function UserAddressCard({
  address,
  className,
  t,
}: {
  address: IAddressType;
  t: TFunction;
  className?: string;
}) {
  const { mutate } = usePostData(true, () => {});
  function DeleteAddress(id: number) {
    mutate({
      api: import.meta.env.VITE_DELETE_USER_ADDRESS,
      data: { address_id: id },
    });
  }
  return (
    <li className="relative group">
      {address?.default && (
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
        <div className="w-full flex justify-between items-center background p-5   gap-5 ">
          <h3 className="font-medium text-lg shrink-0">{address?.address}</h3>

          <p className="shrink-0">{address?.phone}</p>

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
                <DialogTitle>{t("DeleteAddressPopUp.title")}</DialogTitle>
                <DialogDescription>
                  <div className="w-full flex justify-between items-center mt-5">
                    <Button
                      variant={"destructive"}
                      className="rounded-md "
                      asChild
                    >
                      <DialogClose type="button">
                        {t("DeleteAddressPopUp.cancel")}
                      </DialogClose>
                    </Button>
                    <Button
                      variant={"submit"}
                      onClick={() => DeleteAddress(address?.id)}
                    >
                      {t("DeleteAddressPopUp.confirm")}
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

export default UserAddressCard;
