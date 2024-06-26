import { Heading, HelmetTags } from "@/components/MainComponents";
import { useFetchData } from "@/Hooks/useAxios";
import { VENDOR } from "@/Utilities/Constants/Queries";
import UserOrdersColumns from "@/Utilities/TablesColumns/UserOrdersColumns";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

export function Component() {
  const { t, i18n } = useTranslation("VendorDashboard");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";

  const [vendorProfileData] = useOutletContext();
  const {
    data: orders,
    refetch,
    isPending,
    isError,
    isPaused,
  } = useFetchData(
    VENDOR.DASHBOARD,
    import.meta.env.VITE_GET_VENDOR_DASHBOARD,
    false,
    "",
    3 * 60 * 1000,
    3 * 60 * 1000,
    true,
    true
  );

  const columns = UserOrdersColumns(t);

  return (
    <section className="flex-col-center w-full pt-5  ">
      <HelmetTags
        title={`${vendorProfileData?.name || ""} ${t("tab.title")}`}
        description={`${vendorProfileData?.name || ""} ${t("tab.description")}`}
        index={false}
      />

      <Heading className="mb-5 text-secondary uppercase">
        {t("heading")}
      </Heading>
    </section>
  );
}
