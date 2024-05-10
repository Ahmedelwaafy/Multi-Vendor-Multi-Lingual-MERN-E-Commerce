import { useFetchData } from "@/Hooks/useAxios";
import { PUBLIC } from "@/Utilities/Constants/Queries";

export function Component() {
  const { data } = useFetchData(
    PUBLIC.ALL_PRODUCTS,
    import.meta.env.VITE_GET_ALL_PRODUCTS,
    false,
    "",
    5 * 60 * 1000,
    5 * 60 * 1000,
    true,
    true
  );
  return <section>products</section>;
}
