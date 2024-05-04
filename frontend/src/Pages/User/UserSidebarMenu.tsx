import {
  currentUserMenuTab,
  setCurrentUserMenuTab as setCurrentTab,
} from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { LangLink, LogOutPopUp } from "@/components/MainComponents";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faCommentDots,
  faUser,
  faRotateLeft,
  faCreditCard,
  faMapLocationDot,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
function UserSidebarMenu({
  pointsCount,
  affiliateListCount,
  notificationsCount,
  className,
}: {
  pointsCount: number;
  affiliateListCount: number;
  notificationsCount: number;
  className?: string;
}) {
  const { pathname } = useLocation();
  const segments = pathname?.split("/");
  const currentTab = useAppSelector(currentUserMenuTab);
  const dispatchRedux = useAppDispatch();
  //dispatchRedux(setCurrentTab(segments?.[segments?.length - 1]));

  const { t } = useTranslation("UserDashboardLayout");

  const MenuItems = [
    {
      id: 1,
      title: t("menu.profile"),
      link: "profile",
      icon: faUser,
    },
    {
      id: 2,
      title: t("menu.orders"),
      link: "orders",
      icon: faBasketShopping,
      count: pointsCount || 0,
    },
    {
      id: 3,
      title: t("menu.refunds"),
      link: "refunds",
      icon: faRotateLeft,
      count: affiliateListCount || 0,
    },
    {
      id: 4,
      title: t("menu.inbox"),
      link: "inbox",
      icon: faCommentDots,
      count: notificationsCount || 0,
    },
    {
      id: 5,
      title: t("menu.track_orders"),
      link: "track",
      icon: faMapLocationDot,
    },
    {
      id: 6,
      title: t("menu.payment_methods"),
      link: "payment-methods",
      icon: faCreditCard,
    },
    {
      id: 7,
      title: t("menu.address"),
      link: "address",
      icon: faAddressCard,
    },
  ];
  return (
    <aside className={cn("sticky top-[140px] min-h-full", className)}>
      <ScrollArea className=" h-page-height ">
        <ul className="flex flex-col gap-1  justify-center  h-page-height  py-5 ">
          {MenuItems?.map((item) => (
            <li
              onClick={() => dispatchRedux(setCurrentTab(item?.link))}
              key={item?.id}
              className={`w-full h-[55px] trns hover:bg-background hover:text-secondary ${
                (currentTab === item?.link || pathname?.includes(item?.link)) &&
                "bg-background text-secondary"
              }`}
            >
              <LangLink
                className={`w-full h-full pl-12 xl:pl-5 md:pl-0 rtl:pl-0 rtl:xl:pl-0 rtl:md:pl-0 rtl:pr-12 rtl:xl:pr-5 rtl:md:pr-0  inline-block`}
                href={`/${item?.link}`}
              >
                <div className="grow  h-full flex items-center justify-start md:justify-center gap-4  text-lg font-">
                  <FontAwesomeIcon
                    icon={item?.icon}
                    className="max-w-[25px] max-h-[25px]   w-[30px] "
                  />
                  <h3 className=" md:hidden">
                    {item?.title}

                    <span className="text-base mx-1 md:hidden">
                      {item?.count
                        ? t("menu.count_formatted", { count: item?.count })
                        : ""}
                    </span>
                  </h3>
                </div>
              </LangLink>
            </li>
          ))}
          <LogOutPopUp t={t}>
            <button
              className={`w-full h-[55px] trns hover:bg-background hover:text-secondary `}
            >
              <div
                className={`w-full h-full pl-12 xl:pl-5 md:pl-0 rtl:pl-0 rtl:xl:pl-0 rtl:md:pl-0 rtl:pr-12 rtl:xl:pr-5 rtl:md:pr-0  inline-block`}
              >
                <div className="grow  h-full flex items-center justify-start md:justify-center gap-4  text-lg font-">
                  {" "}
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="max-w-[25px] max-h-[25px]  w-[30px] "
                  />
                  <h3 className=" md:hidden">{t("menu.log_out")}</h3>
                </div>
              </div>
            </button>
          </LogOutPopUp>
        </ul>
      </ScrollArea>
    </aside>
  );
}

export default UserSidebarMenu;
