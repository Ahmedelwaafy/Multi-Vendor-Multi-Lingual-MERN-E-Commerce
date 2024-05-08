import { DataTable, Heading, HelmetTags } from "@/components/MainComponents";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { VENDOR } from "@/Utilities/Constants/Queries";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import ProductsColumns from "../Tables/ProductsColumns";
import DataTableSkeleton from "@/components/Skeletons/DataTableSkeleton";
import { ErrorMessage } from "@/components/SubComponents";

export function Component() {
  const { t, i18n } = useTranslation("VendorProducts");
  const lng = i18n.language?.startsWith("ar") ? "ar" : "en";

  const [vendorProfileData, refetchVendorProfileData] = useOutletContext();
  const { data, refetch, isPending, isError, isPaused } = useFetchData(
    VENDOR.PRODUCTS,
    import.meta.env.VITE_GET_VENDOR_PRODUCTS,
    false,
    "",
    3 * 60 * 1000,
    0,
    true,
    true,
    { refetchOnMount: true }
  );
  const { mutate, isPending: isDeleting } = usePostData(true, () => {
    refetch();
  });
  function deleteProduct(id: string) {
    mutate({
      api: import.meta.env.VITE_VENDOR_DELETE_PRODUCT,
      data: { productId: id },
      method: "DELETE",
    });
  }
  const columns = ProductsColumns(t, deleteProduct, isDeleting);

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
      {isError || isPaused ? (
        <ErrorMessage message={t("ErrorMessage")} />
      ) : isPending ? (
        <DataTableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={data?.products}
          filteredColumn="name"
          t={t}
          lng={lng}
          className="5xl:w-[840px] xl:w-[640px] lg:w-[500px] amd:w-[450px]  sm:w-[250px]"
        />
      )}
    </section>
  );
}
