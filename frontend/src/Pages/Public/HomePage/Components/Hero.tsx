import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { SwiperOptions } from "swiper/types";
import { LangLink } from "@/components/MainComponents";
import { TFunction } from "i18next";

register();
type SingleSlide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};
type HeroProps = {
  data: SingleSlide[];
  t: TFunction;
};

const Hero = ({ data, t }: HeroProps) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperParams: SwiperOptions = {
      slidesPerView: 1,
      speed: 1500,
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
      loop: true,

      parallax: true,
      zoom: {
        maxRatio: 5,
      },
    };
    if (data) {
      Object.assign(swiperElRef?.current, swiperParams);
      swiperElRef?.current?.initialize();
    }
  }, [data]);
  return (
    <section className="h-[calc(100vh-180px)] w-full relative">
      <button
        onClick={() => {
          swiperElRef?.current?.swiper?.slideNext();
        }}
        className={`swiper-button-next bg-background text-secondary rounded-full w-10 aspect-square absolute left-5 bottom-1/2 translate-y-1/2 z-10  shadow-md trns hover:scale-110 hover:bg-secondary hover:text-background ${
          data?.length < 1 ? "hidden" : "flex-center"
        }`}
      >
        <FontAwesomeIcon
          className="rotate-180 text-xl font-medium"
          icon={faChevronRight}
        />
      </button>

      <swiper-container init={false} ref={swiperElRef}>
        {data?.map((slide) => (
          <swiper-slide key={slide?.id}>
            <div className="w-full h-[calc(100vh-180px)] relative flex-center  text-background ">
              <div className="hero__slider--overlay absolute inset-0 z-10 bg-[#0a1c1f] opacity-50"></div>
              <img
                className="absolute inset-0 w-full h-full object-cover mb-10 z-0"
                src={slide?.image}
                alt={slide?.image}
              />
              <div className="slide_content--text flex-center flex-col max-w-[70%] md:max-w-[90%] text-center gap-3">
                <h4
                  className="relative z-20 line-clamp-1"
                  data-swiper-parallax-x="-200"
                  //data-swiper-parallax-duration="300"
                >
                  {slide?.title}
                </h4>
                <h1
                  className="relative z-20 text-4xl 4xl:text-3xl font-bold mb-3 line-clamp-2 rtl:!leading-normal"
                  data-swiper-parallax-x="-400"
                  //data-swiper-parallax-duration="300"
                >
                  {slide?.subtitle}
                </h1>
                <h3
                  className="relative z-20 text-xl line-clamp-2 "
                  data-swiper-parallax-x="-600"
                  //data-swiper-parallax-duration="300"
                >
                  {slide?.description}
                </h3>{" "}
                <LangLink
                  className="rounded-full py-2 px-4 border-2 border-secondary bg-secondary text-background trns hover:bg-background hover:text-secondary hover:border-background active:scale-90 z-20"
                  to={`/products`}
                >
                  {t("hero_cta")}
                </LangLink>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>

      <button
        onClick={() => {
          swiperElRef?.current?.swiper?.slidePrev();
        }}
        className={` bg-background text-secondary rounded-full w-10 aspect-square absolute right-5 bottom-1/2 translate-y-1/2 z-10 f shadow-md trns hover:scale-110 hover:bg-secondary hover:text-background ${
          data?.length < 1 ? "hidden" : "flex-center"
        }`}
      >
        <FontAwesomeIcon
          className=" text-xl font-medium"
          icon={faChevronRight}
        />
      </button>
    </section>
  );
};
export default Hero;
