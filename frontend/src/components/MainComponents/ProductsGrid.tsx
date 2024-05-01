import { IProductType } from "@/types/CardsTypes";
import Container from "./Container";
import { ProductCard } from "../CardsComponents";
import HeadingTwo from "./HeadingTwo";
import { TFunction } from "i18next";

type props = {
  title: string;
  data: IProductType[];
  t: TFunction;
};
function ProductsGrid({ title, data, t }: props) {
  return (
    <section>
      <Container>
        <HeadingTwo className=" text-secondary  mb-7">
          {title ?? ""}
        </HeadingTwo>
        <ul className="w-full grid grid-cols-auto_fit gap-[33px] ">
          {data?.map((product) => (
            <ProductCard t={t} product={product} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default ProductsGrid;
