import { Container, HelmetTags } from "@/components/MainComponents";
import ProductShowcase from "./components/ProductShowcase";
import ProductInfoTabs from "./components/ProductInfoTabs";
import RelatedProducts from "./components/RelatedProducts";
import { Navigate, useParams } from "react-router-dom";
import { ErrorMessage } from "@/components/SubComponents";
import { useFetchData, usePostData } from "@/Hooks/useAxios";
import { IProductType } from "@/types/CardsTypes";
import { useTranslation } from "react-i18next";
import { products } from "@/constants";
import { PRODUCT } from "@/Utilities/Constants/Queries";
import { useEffect } from "react";
import { MainLoader } from "@/components/LayoutComponents";

export function Component() {
  const { t, i18n } = useTranslation("ProductDetails");
  const { productID } = useParams();

  const { isPending, error, isPaused, data } = useFetchData(
    PRODUCT.PRODUCT_DETAILS,
    `${import.meta.env.VITE_SINGLE_PRODUCT_DETAILS}${productID}`,
    true,
    productID,
    5000,
    0,
    true,
    true
  );
  console.log(data);

  const { mutate } = usePostData();
  useEffect(() => {
    mutate({
      api: import.meta.env.VITE_INCREASE_SINGLE_PRODUCT_VIEWS,
      method: "PATCH",
      data: { productID },
    });
    window.scrollTo({ top: 0 });
  }, [mutate, productID]);

  if (error?.response?.status === 404) {
    return <Navigate to={`/${i18n.language}/not-found`} />;
  }
  if (error || isPaused) {
    return <ErrorMessage message={t("ErrorMessage")} />;
  }
  if (isPending) {
    return <MainLoader />;
  }
  return (
    <Container className="bg- mt-10 flex-col-center gap-14">
      <HelmetTags
        title={data?.product?.name + t("tab.title")}
        description={data?.description || ""}
        canonical={`${i18n.language}/products/${
          data?.product?.id
        }/${data?.product?.name?.replace(/\s/g, "-")}`}
      />
      <ProductShowcase product={data?.product} vendor={data?.vendor} t={t} />
      <ProductInfoTabs product={data?.product} vendor={data?.vendor} t={t} />
      <RelatedProducts RelatedProducts={data?.RelatedProducts} t={t} />
    </Container>
  );
}
