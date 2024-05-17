import { IProductType } from "@/types/CardsTypes";
import Container from "./Container";
import { ProductCard } from "../CardsComponents";
import HeadingTwo from "./HeadingTwo";
import { TFunction } from "i18next";
import { ProductCardSkeleton } from "../Skeletons";

type props = {
  title: string;
  data: IProductType[];
  t: TFunction;
  isPending?: boolean;
  className?: string;
  skeletonNum?: number;
};
function ProductsGrid({
  title,
  data,
  t,
  className,
  isPending,
  skeletonNum = 3,
}: props) {
  return (
    <section>
      <Container className={className}>
        <HeadingTwo className=" text-secondary  mb-7">{title ?? ""}</HeadingTwo>
        <ul className="w-full grid grid-cols-auto_fit gap-[33px] ">
          {isPending
            ? Array(skeletonNum)
                .fill("")
                .map((_, i) => <ProductCardSkeleton key={i} />)
            : data?.map((product) => (
                <ProductCard t={t} product={product} key={product._id} />
              ))}
        </ul>
      </Container>
    </section>
  );
}

export default ProductsGrid;
