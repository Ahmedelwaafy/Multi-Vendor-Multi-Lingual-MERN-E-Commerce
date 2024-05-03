import { Container, HelmetTags } from "@/components/MainComponents";
import { products } from "@/constants";
import { useFetchData } from "@/Hooks/useAxios";
import { VENDOR } from "@/Utilities/Constants/Queries";
import { useTranslation } from "react-i18next";
import { Navigate, useParams } from "react-router-dom";
import VendorDetailsAside from "./components/VendorDetailsAside";

export function Component() {
  const { t, i18n } = useTranslation("vendorDetails");
  const { vendorID } = useParams();

  const {
    isPending,
    error,
    isPaused,
    data,
    data: vendor,
  } = useFetchData(
    VENDOR.VENDOR_PUBLIC_DATA,
    `${import.meta.env.VITE_SINGLE_VENDOR_PUBLIC_DATA}${vendorID}`,
    false,
    vendorID,
    5000,
    0,
    true,
    true
  );
  /*  useFetchData(
    VENDOR.VENDOR_INCREASE_VIEWS,
    `${import.meta.env.VITE_INCREASE_SINGLE_VENDOR_VIEWS}${product?.id}`,
    true,
    vendorID,
    5000,
    0,
    !!product,
    true
  ); */

  /* useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [vendorID]); */

  if (error?.response?.status === 404) {
    return <Navigate to={`/${i18n.language}/not-found`} />;
  }
  /*  if (error || isPaused) {
    return <ErrorMessage message={t("ErrorMessage")} />;
  } */
  /* if (isPending) {
    return <Loader className="  h-[calc(100vh-135px)] mb-32" />;
  } */

  return (
    <Container className="bg- mt-10 flex-col-center gap-14">
      <HelmetTags
        title={vendor?.name + t("tab.title")}
        description={vendor?.description || ""}
        canonical={`${i18n.language}/vendors/${
          vendor?.id
        }/${vendor?.name?.replace(/\s/g, "-")}`}
      />
      <VendorDetailsAside vendor={vendor} t={t} />
      <vendorDetailsTabs vendor={vendor} t={t} />
    </Container>
  );
}
