import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { TFunction } from "i18next";
import React, { FormEvent } from "react";
import { SubmitBtnComponent } from "../FormComponents";
import useHandleLogOut from "@/Hooks/useHandleLogOut";
import { Button } from "../ui/button";
function LogOutPopUp({
  t,
  children,
}: {
  t: TFunction;
  children: React.ReactNode;
}) {
  const [logOut, isPending] = useHandleLogOut();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    logOut();
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="rounded-xl md:max-w-[90%]">
        <DialogHeader>
          <DialogTitle>{t("LogOutPopUp.LogOutPopUpTitle")}</DialogTitle>
          <DialogDescription>
            <form method="post" onSubmit={onSubmit}>
              {/** Submit Button */}
              <div className="w-full flex justify-between items-center mt-5">
                <Button variant={"destructive"} className="rounded-md " asChild>
                  <DialogClose
                    type="button"
                    /*  onClick={() => {
                dispatchRedux(setToggleLogOutPopUp(false));
              }} */
                  >
                    {t("LogOutPopUp.CancelBtnText")}
                  </DialogClose>
                </Button>
                <SubmitBtnComponent
                  disabled={isPending}
                  isPending={isPending}
                  value={t("LogOutPopUp.SubmitBtnText")}
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

export default LogOutPopUp;
