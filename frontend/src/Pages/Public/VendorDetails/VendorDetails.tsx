import { Container, HelmetTags } from "@/components/MainComponents";
import { ErrorMessage } from "@/components/SubComponents";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { VENDOR } from "@/Utilities/Constants/Queries";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import VendorDetailsAside from "./components/VendorDetailsAside";
import VendorTabs from "./components/VendorTabs";

export function Component() {
  const { t, i18n } = useTranslation("vendorDetails");
  const { vendorID } = useParams();

  const { isPending, error, isPaused, data } = useFetchData(
    VENDOR.VENDOR_PUBLIC_DATA,
    `${import.meta.env.VITE_GET_VENDOR_PUBLIC_DATA}${vendorID}`,
    false,
    vendorID,
    5000,
    0,
    true,
    true
  );

  const { mutate } = usePostData();
  useEffect(() => {
    mutate({
      api: import.meta.env.VITE_INCREASE_VENDOR_VIEWS,
      method: "PATCH",
      data: { vendor_id: vendorID },
    });
    window.scrollTo({ top: 0 });
  }, [mutate, vendorID]);

  if (error instanceof AxiosError && error?.response?.status === 404) {
    return <Navigate to={`/${i18n.language}/not-found`} />;
  }
  if (error || isPaused) {
    return <ErrorMessage message={t("ErrorMessage")} />;
  }

  return (
    <Container className="flex gap-10 md:flex-col h-full min-h-[calc(100vh-180px)] pt-10">
      <HelmetTags
        title={data?.vendor?.name + t("tab.title")}
        description={data?.vendor?.description || ""}
        canonical={`${i18n.language}/vendors/${
          data?.vendor?._id
        }/${data?.vendor?.name?.replace(/\s/g, "-")}`}
      />
      <VendorDetailsAside
        className="w-80 shrink-0 md:w-full h-full sticky top-[140px] md:static min-h-page-height bg-primary text-background rounded-xl overflow-hidden"
        vendor={data?.vendor}
        t={t}
        isPending={isPending}
      />
      <VendorTabs
        className="grow md:w-full"
        vendor={data?.vendor}
        t={t}
        isPending={isPending}
      />
    </Container>
  );
}
