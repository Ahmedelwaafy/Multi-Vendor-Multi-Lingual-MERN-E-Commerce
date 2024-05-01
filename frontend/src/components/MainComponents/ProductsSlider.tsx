import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
import { TFunction } from "i18next";
import { useEffect, useRef } from "react";
import { IProductType } from "@/types/CardsTypes";
import { cn } from "@/lib/utils";
import { ProductCard } from "../CardsComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

register();
function ProductsSlider({
  t,
  Slides,
  className,
}: {
  t: TFunction;
  Slides: IProductType[];
  className?: string;
}) {
  const swiperElRef = useRef(null);
  useEffect(() => {
    const swiperParams: SwiperOptions = {
      speed: 1500,
      spaceBetween: 30,
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      loop: true,
      freeMode: {
        enabled: true,
        momentum: true,
        sticky: false,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: -90,
        },
        600: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    };

    if (Slides?.length > 0) {
      Object.assign(swiperElRef?.current, swiperParams);
      swiperElRef?.current?.initialize();
    }
  }, [Slides]);
  if (Slides?.length === 0) {
    return;
  }
  return (
    <div className={cn("relative group", className)}>
      {" "}
      {Slides?.length > 4 && (
        <button
          onClick={() => {
            swiperElRef?.current?.swiper?.slideNext();
          }}
          className="absolute sm:hidden shadow-2xl z-20 top-1/2 -translate-y-1/2 left-0 rtl:left-auto rtl:right-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto  rotate-180 rtl:rotate-0 bg-background text-secondary rounded-full size-10 shrink-0  trns hover:scale-110 hover:bg-secondary hover:text-background border-secondary border-2  flex-center group/parent"
        >
          <FontAwesomeIcon
            className=" text-xs font-bold group-hover/parent:animate-spin group-hover:animate-once"
            icon={faChevronRight}
          />
        </button>
      )}
      <div className="  bg-red- 400">
        <swiper-container init={false} ref={swiperElRef}>
          {Slides?.map((product) => (
            <swiper-slide key={product?.id}>
              <ProductCard key={product?.id} product={product} t={t} slider />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      {Slides?.length > 4 && (
        <button
          onClick={() => {
            swiperElRef?.current?.swiper?.slidePrev();
          }}
          className="absolute sm:hidden shadow-3xl z-20 top-1/2 -translate-y-1/2 right-0 rtl:right-auto rtl:left-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rtl:rotate-180 bg-secondary text-background rounded-full size-10 shrink-0  trns hover:scale-110 hover:bg-background hover:text-secondary border-secondary group/parent border-2  flex-center"
        >
          <FontAwesomeIcon
            className="text-xs font-bold group-hover/parent:animate-spin group-hover:animate-once"
            icon={faChevronRight}
          />
        </button>
      )}
    </div>
  );
}
export default ProductsSlider;
