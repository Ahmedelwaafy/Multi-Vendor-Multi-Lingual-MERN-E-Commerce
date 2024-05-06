import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TFunction } from "i18next";
import React, { FormEvent } from "react";
import { SubmitBtnComponent } from "../FormComponents";
function DeletePopUp({
  t,
  children,
  callBackFn,
  isPending,
}: {
  t: TFunction;
  children: React.ReactNode;
  callBackFn: () => void;
  isPending: boolean;
}) {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    callBackFn();
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="rounded-xl md:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>{t("DeletePopUp.Title")}</DialogTitle>
          <DialogDescription>
            <form method="post" onSubmit={onSubmit}>
              {/** Submit Button */}
              <div className="w-full flex justify-between items-center mt-5">
                <DialogClose
                  //onClick={callBackFn}
                  className="btn__destructive"
                  type="button"
                >
                  {t("DeletePopUp.CancelBtnText")}
                </DialogClose>
                <SubmitBtnComponent
                  disabled={isPending}
                  isPending={isPending}
                  value={t("DeletePopUp.SubmitBtnText")}
                  className={"!w-fit !mt-0"}
                />
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePopUp;
