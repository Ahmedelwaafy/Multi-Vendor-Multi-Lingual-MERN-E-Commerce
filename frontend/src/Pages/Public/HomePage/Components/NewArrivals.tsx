import { TFunction } from "i18next";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { SwiperOptions } from "swiper/types";
import { Container, HeadingTwo, LangLink } from "@/components/MainComponents";
register();

type props = {
  title: string;
  data: string[];
  t: TFunction;
};
function NewArrivals({ title, data, t }: props) {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      effect: "cards",
      cardsEffect: { slideShadows: false, rotate: true },
      slidesPerView: 1,
      speed: 1000,
      spaceBetween: 0,
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: false,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      loop: false,
    };
    if (data) {
      Object.assign(swiperElRef?.current, swiperParams);
      swiperElRef?.current?.initialize();
    }
  }, [data]);

  return (
    <section className="">
      <Container className="flex justify-between items-center gap-10 md:flex-col">
        <div className="NewArrivals__left w-1/2 md:w-full flex-col flex gap- ">
          <HeadingTwo className=" text-secondary text- mb-7">
            {title ?? ""}
          </HeadingTwo>
          <p className="sm:text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam soluta
            facere, dicta corrupti provident expedita distinctio fugiat iure
            commodi velit deleniti officiis! In doloremque alias esse obcaecati
            magni accusamus, quia autem sunt rerum a nihil laborum similique
            velit dolor fuga!
          </p>
        </div>
        <div className="NewArrivals__right w-1/2 md:w-full  gap-7 ">
          <swiper-container init={false} ref={swiperElRef}>
            {data?.map((slide) => (
              <swiper-slide key={slide}>
                <div className="w-full flex justify-center">
                  <div className="relative w-9/12 max-w-[400px] max-h-[450px] rounded-[30px] overflow-hidden border  group">
                    <img
                      className="w-full  object-cover"
                      src={slide}
                      alt={slide}
                    />
                    <LangLink
                      className="absolute right-1/2 translate-x-1/2 bottom-12 rounded-full h-11 px-4 flex-center bg-accent text-background transition-all duration-500 ease-in-out hover:scale-105 translate-y-10 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto"
                      to={`/products/`}
                    >
                      {t("show_product")}
                    </LangLink>
                  </div>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </Container>
    </section>
  );
}

export default NewArrivals;
