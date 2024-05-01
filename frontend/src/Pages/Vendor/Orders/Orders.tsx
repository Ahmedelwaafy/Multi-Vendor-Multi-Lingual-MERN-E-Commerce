import { DataTable, Heading, HelmetTags } from "@/components/MainComponents";
import { useFetchData } from "@/Hooks/useAxios";
import { USER } from "@/Utilities/Constants/Queries";
import UserOrdersColumns from "@/Utilities/TablesColumns/UserOrdersColumns";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

export function Component() {
  const { t, i18n } = useTranslation("UserOrders");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";

  const [userProfileData, refetchUserProfileData] = useOutletContext();
  const {
    data: orders,
    refetch,
    isPending,
    isError,
    isPaused,
  } = useFetchData(
    USER.ORDERS,
    import.meta.env.VITE_GET_USER_ORDERS,
    false,
    "",
    30 * 60 * 1000,
    30 * 60 * 1000,
    true,
    true
  );
  const data = [
    {
      date: new Date(),
      order_id: 123456,
      status: "Shipped",
      total: 12575,
      quantity: 3,
    },
    {
      date: new Date(
        "fri Apr 26 2024 14:42:53 GMT+0300 (Eastern European Summer Time)"
      ),
      order_id: 789012,
      status: "Pending",
      total: 99.99,
      quantity: 1,
    },
    {
      date: new Date(
        "tue Apr 25 2024 14:42:53 GMT+0300 (Eastern European Summer Time)"
      ),
      order_id: 789012,
      status: "Pending",
      total: 99.99,
      quantity: 1,
    },
    // Add more objects as needed
  ];
  const columns = UserOrdersColumns(t);

  return (
    <section className="flex-col-center w-full pt-5  ">
      <HelmetTags
        title={`${userProfileData?.name || ""} ${t("tab.title")}`}
        description={`${userProfileData?.name || ""} ${t("tab.description")}`}
        index={false}
      />

      <Heading className="mb-5 text-secondary uppercase">
        {t("heading")}
      </Heading>
      <DataTable
        columns={columns}
        data={data}
        filteredColumn="status"
        t={t}
        lng={lng}
        className="lg:w-[440px] sm:w-[250px]"
      />
    </section>
  );
}
