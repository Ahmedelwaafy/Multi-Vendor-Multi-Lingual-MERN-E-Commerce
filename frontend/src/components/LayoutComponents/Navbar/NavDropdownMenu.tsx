import { setCurrentUserMenuTab as setCurrentTab } from "@/app/Features/MiscellaneousSlice";
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
import { USER } from "@/Utilities/Constants/Queries";
import UseAuth from "@/Hooks/UseAuth";
import { useFetchData } from "@/Hooks/useAxios";
import useHandleLogOut from "@/Hooks/useHandleLogOut";
import { AvatarFallbackName } from "@/lib/utils";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TFunction } from "i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavDropdownMenu({
  t,
  lng,
  vendor,
}: {
  t: TFunction;
  lng: string;
  vendor?: boolean;
}) {
  const { UserSession } = UseAuth();
  const navigate = useNavigate();
  const [logOut] = useHandleLogOut();
  const dispatchRedux = useAppDispatch();
  const { data, error } = useFetchData(
    USER.USER_DATA,
    import.meta.env.VITE_GET_USER_DATA,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    !!UserSession,
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
        {UserSession ? (
          <div className="flex-center gap-3 ">
            {/* <span className="2xl:hidden">
              {data?.user?.name?.split(" ")?.slice(0, 2)?.join(" ")}
            </span> */}
            <Avatar>
              <AvatarImage src={data?.user?.avatar?.url} />
              <AvatarFallback className="bg-background text-primary font-medium">
                {AvatarFallbackName(data?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <FontAwesomeIcon className="size-8" icon={faCircleUser} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={20} className=" w-48  pt-5 pb-2 px-0">
        {UserSession ? (
          <DropdownMenuGroup className="flex flex-col gap-5 px-3">
            <DropdownMenuItem
              onClick={() => {
                navigate(`/${lng}/profile`);
                dispatchRedux(setCurrentTab("profile"));
              }}
              className="focus:bg-inherit focus:text-inherit w-full flex items-center justify-center p-3 bg-primary text-white trns hover:bg-transparent hover:text-primary border-2 border-primary rounded-sm cursor-pointer"
            >
              {t("Navbar.NavDropDownMenu.my_profile")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="focus:bg-inherit focus:text-inherit"
              asChild
            >
              <LogOutPopUp t={t}>
                <div className="w-full flex items-center justify-center p-3 bg-accent text-white trns hover:bg-transparent hover:text-accent border-2 border-accent rounded-sm">
                  {t("Navbar.NavDropDownMenu.Log_out")}
                </div>
              </LogOutPopUp>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup className="flex flex-col gap-5 px-3">
            <DropdownMenuItem
              onClick={() => {
                navigate(`/${lng}/login`);
              }}
              className="focus:bg-inherit focus:text-inherit w-full flex items-center justify-center p-3 bg-primary text-white trns hover:bg-transparent hover:text-primary border-2 border-primary rounded-sm cursor-pointer"
            >
              {t("Navbar.NavDropDownMenu.Login")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate(`/${lng}/register`);
              }}
              className="focus:bg-inherit focus:text-inherit w-full flex items-center justify-center p-3 bg-primary text-white trns hover:bg-transparent hover:text-primary border-2 border-primary rounded-sm cursor-pointer"
            >
              {t("Navbar.NavDropDownMenu.Register")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavDropdownMenu;
