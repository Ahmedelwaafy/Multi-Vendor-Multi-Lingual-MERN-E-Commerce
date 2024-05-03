import ProductsGrid from "@/components/MainComponents/ProductsGrid";
import { products } from "@/constants";
import { TFunction } from "i18next";
import { useParams } from "react-router-dom";

function VendorProductsTab({ t, isPending }: { t: TFunction }) {
  const { vendorID } = useParams();

  return (
    <>
      {products?.length === 0 ? (
        <p className="text-center mt-10">{t("no_products")}</p>
      ) : (
        <ProductsGrid className="!w-full" t={t} data={products} />
      )}
    </>
  );
}

export default VendorProductsTab;
