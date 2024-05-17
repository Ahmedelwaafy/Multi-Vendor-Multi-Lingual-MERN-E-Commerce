import { HelmetTags } from "@/components/MainComponents";
import ProductsGrid from "@/components/MainComponents/ProductsGrid";
import { ErrorMessage, NoItemsMessage } from "@/components/SubComponents";
import { useFetchData } from "@/Hooks/useAxios";
import { PUBLIC } from "@/Utilities/Constants/Queries";
import { useTranslation } from "react-i18next";

export function Component() {
  const { t } = useTranslation("BestSelling");

  const { data, isError, isPaused, isPending } = useFetchData(
    PUBLIC.BEST_SELLING,
    import.meta.env.VITE_GET_BEST_SELLING,
    true,
    "",
    5 * 60 * 1000,
    5 * 60 * 1000,
    true,
    true
  );
  return (
    <section>
      <HelmetTags
        title={t("tab.title")}
        description={"meta_description"}
        canonical="best-selling"
      />
      {isError || isPaused ? (
        <ErrorMessage message={t("ErrorMessage")} />
      ) : data?.data?.length === 0 ? (
        <NoItemsMessage message={t("NoItemsMessage")} />
      ) : (
        <ProductsGrid
          t={t}
          title={t("title")}
          data={data?.data}
          isPending={isPending}
          skeletonNum={8}
          className="mt-16"
        />
      )}
    </section>
  );
}
