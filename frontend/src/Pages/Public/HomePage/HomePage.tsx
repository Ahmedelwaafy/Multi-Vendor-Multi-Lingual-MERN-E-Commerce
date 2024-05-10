import { HelmetTags } from "@/components/MainComponents";
import ProductsGrid from "@/components/MainComponents/ProductsGrid";
import {
  events,
  heroSlides,
  products,
  NewArrivals as NewArrivalsData,
} from "@/constants";
import { useFetchData } from "@/Hooks/useAxios";
import { useTranslation } from "react-i18next";
import Features from "./Components/Features";
import Hero from "./Components/Hero";
import NewArrivals from "./Components/NewArrivals";
import PopularEvents from "./Components/PopularEvents";
import { PUBLIC } from "@/Utilities/Constants/Queries";

export function Component() {
  const { t, i18n } = useTranslation("HomePage");
  const { data } = useFetchData(
    PUBLIC.HOMEPAGE,
    import.meta.env.VITE_HOMEPAGE,
    false,
    "",
    30 * 60 * 1000,
    5 * 60 * 1000,
    true,
    true
  );

  return (
    <section className=" flex-col flex gap-10 ">
      <HelmetTags
        title={t("tab.title")}
        description={"meta_description"}
        canonical=""
      />
      <Hero t={t} data={data?.data?.sliders} />
      <Features t={t} />
      <ProductsGrid
        t={t}
        title={t("best_deals")}
        data={data?.data?.bestDeals}
      />
      <NewArrivals
        t={t}
        data={data?.data?.newArrivals}
      />
      <PopularEvents
        t={t}
        title={t("popular_events")}
        event={data?.data?.event}
      />
      <ProductsGrid
        t={t}
        title={t("featured_products")}
        data={data?.data?.featuredProducts}
      />
    </section>
  );
}
