import { setCurrentVendorMenuTab as setCurrentTab } from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import { LogOutPopUp } from "@/components/MainComponents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchData } from "@/Hooks/useAxios";
import useHandleLogOut from "@/Hooks/useHandleLogOut";
import { AvatarFallbackName } from "@/lib/utils";
import { VENDOR } from "@/Utilities/Constants/Queries";
import { TFunction } from "i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavDropdownMenuVendor({ t, lng }: { t: TFunction; lng: string }) {
  const navigate = useNavigate();
  const [logOut] = useHandleLogOut("vendor");
  const dispatchRedux = useAppDispatch();
  const { data, error } = useFetchData(
    VENDOR.VENDOR_DATA,
    import.meta.env.VITE_GET_VENDOR_DATA,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    true,
    true
  );

  useEffect(() => {
    if (error?.response?.status === 401) {
      logOut();
    }
  }, [error, logOut]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-background">
        <Avatar>
          <AvatarImage src={data?.vendor?.avatar?.url} />
          <AvatarFallback className="bg-background text-primary font-medium">
            {AvatarFallbackName(data?.vendor?.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={20} className=" w-48  pt-5 pb-2 px-0">
        <DropdownMenuGroup className="flex flex-col gap-5 px-3">
          <DropdownMenuItem
            onClick={() => {
              navigate(`/${lng}/shop/dashboard`);
              dispatchRedux(setCurrentTab("dashboard"));
            }}
            className="focus:bg-inherit focus:text-inherit w-full flex items-center justify-center p-3 bg-primary text-white trns hover:bg-transparent hover:text-primary border-2 border-primary rounded-sm cursor-pointer"
          >
            {t("Navbar.NavDropdownMenuVendor.dashboard")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-inherit focus:text-inherit"
            asChild
          >
            <LogOutPopUp vendor t={t}>
              <div className="w-full flex items-center justify-center p-3 bg-accent text-white trns hover:bg-transparent hover:text-accent border-2 border-accent rounded-sm">
                {t("Navbar.NavDropdownMenuVendor.Log_out")}
              </div>
            </LogOutPopUp>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavDropdownMenuVendor;
