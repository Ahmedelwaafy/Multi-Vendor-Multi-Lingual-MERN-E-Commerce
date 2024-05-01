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

export function Component() {
  const { t, i18n } = useTranslation("HomePage");
  const { data } = useFetchData(
    "HomePage",
    import.meta.env.VITE_LANDING_PAGE,
    false,
    "",
    30 * 60 * 1000,
    5 * 60 * 1000
  );

  return (
    <section className=" flex-col flex gap-10 ">
      <HelmetTags
        title={t("tab.title")}
        description={"meta_description"}
        canonical=""
      />
      <Hero t={t} data={heroSlides} />
      <Features />
      <ProductsGrid
        t={t}
        title={t("best_deals")}
        data={products?.slice(0, 4)}
      />
      <NewArrivals t={t} title={t("new_arrivals")} data={NewArrivalsData} />
      <PopularEvents t={t} title={t("popular_events")} event={events[7]} />
      <ProductsGrid
        t={t}
        title={t("featured_products")}
        data={products?.slice(0, 12)}
      />
    </section>
  );
}
