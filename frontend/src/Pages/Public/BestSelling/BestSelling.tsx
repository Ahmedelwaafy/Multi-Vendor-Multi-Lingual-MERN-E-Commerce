import { useFetchData } from "@/Hooks/useAxios";
import { PUBLIC } from "@/Utilities/Constants/Queries";

export function Component() {
  const { data } = useFetchData(
    PUBLIC.BEST_SELLING,
    import.meta.env.VITE_GET_BEST_SELLING,
    false,
    "",
    5 * 60 * 1000,
    5 * 60 * 1000,
    true,
    true
  );
  return <section>products</section>;
}
