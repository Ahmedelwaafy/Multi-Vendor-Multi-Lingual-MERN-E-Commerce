import {
  currentVendorMenuTab,
  setCurrentVendorMenuTab as setCurrentTab,
} from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { LangLink, LogOutPopUp } from "@/components/MainComponents";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  faArrowRightFromBracket,
  faBasketShopping,
  faCalendarDays,
  faCalendarPlus,
  faChartSimple,
  faCommentDots,
  faDolly,
  faGears,
  faGift,
  faMoneyBillTransfer,
  faRotateLeft,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
function VendorSidebarMenu({
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
/*   console.log(segments?.[segments?.length - 1]);
 */
  const currentTab = useAppSelector(currentVendorMenuTab);
  const dispatchRedux = useAppDispatch();

  const { t } = useTranslation("VendorDashboardLayout");

  const MenuItems = [
    {
      id: 1,
      title: t("menu.dashboard"),
      link: "dashboard",
      icon: faChartSimple,
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
      title: t("menu.products"),
      link: "products",
      icon: faDolly,
      count: pointsCount || 0,
    },
    {
      id: 4,
      title: t("menu.create_product"),
      link: "create-product",
      icon: faSquarePlus,
      count: pointsCount || 0,
    },
    {
      id: 5,
      title: t("menu.events"),
      link: "events",
      icon: faCalendarDays,
      count: pointsCount || 0,
    },
    {
      id: 6,
      title: t("menu.create_event"),
      link: "create-event",
      icon: faCalendarPlus,
      count: pointsCount || 0,
    },

    {
      id: 7,
      title: t("menu.withdraw"),
      link: "withdraw-money",
      icon: faMoneyBillTransfer,
      count: notificationsCount || 0,
    },
    {
      id: 8,
      title: t("menu.inbox"),
      link: "inbox",
      icon: faCommentDots,
      count: notificationsCount || 0,
    },
    {
      id: 9,
      title: t("menu.discount_codes"),
      link: "discount-codes",
      icon: faGift,
    },

    {
      id: 10,
      title: t("menu.refunds"),
      link: "refunds",
      icon: faRotateLeft,
      count: affiliateListCount || 0,
    },
    {
      id: 11,
      title: t("menu.settings"),
      link: "settings",
      icon: faGears,
      count: affiliateListCount || 0,
    },
  ];
  return (
    <aside className={cn(" min-h-full", className)}>
      <ScrollArea className=" h-vendor-dash-page-height py-11">
        <ul className="flex flex-col gap-1  justify-center  ">
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
                href={`/shop/${item?.link}`}
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
          <LogOutPopUp vendor t={t}>
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

export default VendorSidebarMenu;
