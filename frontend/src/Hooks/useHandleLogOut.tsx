import { usePostData } from "@/Hooks/useAxios";
import {
  setUserSession,
  setUserData,
  setVendorSession,
  setVendorData,
} from "@/app/Features/AuthenticationSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function useHandleLogOut(type: "user" | "vendor" = "user") {
  const dispatchRedux = useAppDispatch();
  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const errMsg =
    lang === "ar" ? "برجاء تسجيل الدخول أولا!" : "Please log in first!";
  function ResetUserAuthStates() {
    localStorage.removeItem("UD");
    Cookies.remove("UT");
    dispatchRedux(setUserData(null));
    dispatchRedux(setUserSession(null));
    window.location.replace(`/${lang}`);
  }
  function ResetVendorAuthStates() {
    localStorage.removeItem("VD");
    Cookies.remove("VT");
    dispatchRedux(setVendorData(null));
    dispatchRedux(setVendorSession(null));
    window.location.replace(`/${lang}`);
  }
  function ResetUserAuthStatesWithToast() {
    ResetUserAuthStates();
    toast.error(errMsg);
  }
  const {
    mutate,
    isPending,
    error: logoutError,
  } = usePostData(
    false,
    () => {
      type === "user" ? ResetUserAuthStates() : ResetVendorAuthStates();
    },
    true,
    () => {
      type === "user" ? ResetUserAuthStates() : ResetVendorAuthStates();
    }
  );

  function logOut() {
    mutate({
      api:
        type === "user"
          ? import.meta.env.VITE_LOGOUT_USER
          : import.meta.env.VITE_LOGOUT_VENDOR,
    });
  }

  return [logOut, isPending, logoutError, ResetUserAuthStatesWithToast];
}
