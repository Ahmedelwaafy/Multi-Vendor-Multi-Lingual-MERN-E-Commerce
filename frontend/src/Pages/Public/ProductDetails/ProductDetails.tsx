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

export function Component() {
  const { t, i18n } = useTranslation("ProductDetails");
  const product = products[0];
  const { productID } = useParams();

  const {
    isPending,
    error,
    isPaused,
    data,
    //data: product,
  } = useFetchData(
    PRODUCT.PRODUCT_DETAILS,
    `${import.meta.env.VITE_SINGLE_PRODUCT_DETAILS}${productID}`,
    false,
    productID,
    5000,
    0,
    true,
    true
  );
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
  /*  if (error || isPaused) {
    return <ErrorMessage message={t("ErrorMessage")} />;
  } */
  /* if (isPending) {
    return <Loader className="  h-[calc(100vh-135px)] mb-32" />;
  } */
  return (
    <Container className="bg- mt-10 flex-col-center gap-14">
      <HelmetTags
        title={product?.name + t("tab.title")}
        description={product?.description || ""}
        canonical={`${i18n.language}/products/${
          product?.id
        }/${product?.name?.replace(/\s/g, "-")}`}
      />
      <ProductShowcase product={product} t={t} />
      <ProductInfoTabs product={product} t={t} />
      <RelatedProducts product={product} t={t} />
    </Container>
  );
}
