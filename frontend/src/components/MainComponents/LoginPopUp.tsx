import { useAppDispatch, useAppSelector } from "@/app/reduxHooks.ts";
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
import {
  setShowLoginPopUp,
  showLoginPopUp,
} from "../../app/Features/AuthenticationSlice.tsx";
import LangLink from "./LangLink.tsx";
import { TFunction } from "i18next";
function LoginPopUp({ t }: { t: TFunction }) {
  const toggleLoginPopUp = useAppSelector(showLoginPopUp);
  const dispatchRedux = useAppDispatch();

  return (
    <Dialog
      open={toggleLoginPopUp}
      onOpenChange={() => dispatchRedux(setShowLoginPopUp(false))}
    >
      <DialogContent className="LoginPopUp__content w-1/2 min-w-[750px] md:min-w-[300px] h-1/2 min-h-[420px]  md:w-full rounded-md md:rounded-none  shadow-lg  md:h-full  max-w-full p-0 overflow-hidden">
        <div
          className={`w-full h-full flex bg-white md:flex-col md:items-center md:justify-between relative`}
        >
          <DialogHeader className="w-1/2 md:w-full h-auto flex flex-col items-center justify-center p-7 gap-3 ">
            {/*  <img
              className="w-14  aspect-square "
              src={favIconSrc}
              alt="fav-icon"
            /> */}
            <DialogTitle className="text-2xl font-medium text-center ">
              {t("LoginPopUp.heading")}
            </DialogTitle>
            <DialogDescription className=" text-lg   items-center hidden md:flex ">
              {t("LoginPopUp.sub_heading")}
            </DialogDescription>
            <DialogClose
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
              className="focus:outline-none w-full rounded-md  h-10  flex-center gap-2 px-2 py-[6px] bg-secondary trns  hover:bg-background hover:text-secondary text-background text-lg mt-5 mb-3 md:max-w-xs"
            >
              {t("LoginPopUp.Login")}
            </DialogClose>
            <DialogClose className=" w-full md:max-w-xs focus:outline-none">
              <LangLink
                to="/register"
                className=" w-full rounded-md  h-10  flex-center gap-2 px-2 py-[6px] bg-background trns  hover:bg-secondary hover:text-background text-secondary text-lg "
              >
                {t("LoginPopUp.Register")}
              </LangLink>
            </DialogClose>
          </DialogHeader>
          <div className="w-1/2 md:w-full md:pt-7 md:gap-4 h-auto bg-background flex justify-between px- 7 flex-col items-center ">
            <p className=" text-xl font-medium h-[15%] md:h-auto  flex items-center md:hidden">
              {t("LoginPopUp.sub_heading")}
            </p>

            <img
              className="h-[85%] md:h-auto object-cover md:max-w-xs"
              src={
                "https://images.unsplash.com/photo-1607083206139-7c5b07e66ac3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="favoritesIllustration"
            />
          </div>
          <DialogClose className="focus:outline-none">
            <FontAwesomeIcon
              className=" absolute left-5 rtl:left-auto rtl:right-5 top-5 cursor-pointer trns active:scale-90 text-3xl "
              icon={faCircleXmark}
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginPopUp;
