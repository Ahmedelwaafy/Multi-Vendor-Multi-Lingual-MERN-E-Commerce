import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { SwiperOptions } from "swiper/types";
import { register } from "swiper/element/bundle";
register();
type slide = {
  public_id: string;
  url: string;
};
interface IItemSliderProps {
  Slides: slide[];
  className?: string;
  fullWidth?: boolean;
}
function ItemSlider({ Slides, className }: IItemSliderProps) {
  const swiperElRefMain = useRef(null);
  const swiperElRefThumbs = useRef(null);

  useEffect(() => {
    const commonSwiperParams: SwiperOptions = {
      autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      loop: true,
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      zoom: {
        maxRatio: 5,
      },
    };
    const MainSwiperParams: SwiperOptions = {
      ...commonSwiperParams,
      slidesPerView: 1,
      speed: 1500,
      effect: "coverflow",
      coverflowEffect: {
        slideShadows: false,
      },
      thumbs: {
        swiper: swiperElRefThumbs?.current,
      },
    };
    const ThumbsSwiperParams: SwiperOptions = {
      ...commonSwiperParams,
      spaceBetween: 15,
      speed: 500,
      freeMode: {
        enabled: true,
        momentum: true,
        sticky: false,
      },
      watchSlidesProgress: true,
      breakpoints: {
        300: {
          slidesPerView: Slides.length > 1 ? 2 : Slides.length,
        },
        400: {
          slidesPerView: Slides.length > 2 ? 3 : Slides.length,
        },
        600: {
          slidesPerView: Slides.length > 3 ? 4 : Slides.length,
        },
      },
    };
    if (Slides?.length > 0) {
      Object.assign(swiperElRefMain?.current, MainSwiperParams);
      swiperElRefMain?.current?.initialize();
    }
    //if there is only one image, so no need to show the thumbs slider
    if (Slides?.length > 1) {
      Object.assign(swiperElRefThumbs?.current, ThumbsSwiperParams);
      swiperElRefThumbs?.current?.initialize();
    }
  }, [Slides]);

  if (Slides?.length === 0) {
    return null;
  }
  return (
    <div className={cn(`slider w-full flex-col-center  bg-`, className)}>
      <div className="ItemSlider__main--slider w-2/4 min-w-80 sm:min-w-[300px]">
        <swiper-container
          //thumbs-swiper=".ItemSlider__thumbs-slider"
          init={false}
          ref={swiperElRefMain}
        >
          {Slides?.map((slide) => (
            <swiper-slide key={slide?.id}>
              <div
                className={`img-slider-wrapper w-full aspect-square   overflow-hidden cursor-pointer rounded-2xl `}
              >
                <img
                  className="w-full h-full object-cover max-h-[450px] max-w-[450px]"
                  src={slide?.url}
                  alt={slide?.src}
                />
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>

      <div className="ItemSlider__thumbs-slider w-full flex justify-between items-center  mt-3 ">
        {Slides?.length > 4 && (
          <button
            onClick={() => {
              swiperElRefThumbs?.current?.swiper?.slideNext();
            }}
            className="  rotate-180 rtl:rotate-0 bg-background text-secondary rounded-full size-5 shrink-0  trns hover:scale-110 hover:bg-secondary hover:text-background border-secondary border-2  flex-center group"
          >
            <FontAwesomeIcon
              className=" text-xs font-bold group-hover:animate-spin group-hover:animate-once"
              icon={faChevronRight}
            />
          </button>
        )}
        <div className="w-11/12 ">
          {Slides?.length > 1 && (
            <swiper-container init={false} ref={swiperElRefThumbs}>
              {Slides?.map((slide) => (
                <swiper-slide key={slide?.url}>
                  <div className="flex-center ">
                    <div className="  slide__img--wrapper aspect-square  w-[120px] md:w-24 cursor-pointer opacity-80  trns border-2 border-transparent p-1  overflow-hidden shrink0 rounded-lg">
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={slide?.url}
                        alt={slide?.src}
                      />
                    </div>
                  </div>
                </swiper-slide>
              ))}
            </swiper-container>
          )}
        </div>

        {Slides?.length > 4 && (
          <button
            onClick={() => {
              swiperElRefThumbs?.current?.swiper?.slidePrev();
            }}
            className=" rtl:rotate-180 bg-secondary text-background rounded-full size-5 shrink-0  trns hover:scale-110 hover:bg-background hover:text-secondary border-secondary group border-2  flex-center"
          >
            <FontAwesomeIcon
              className="text-xs font-bold group-hover:animate-spin group-hover:animate-once"
              icon={faChevronRight}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemSlider;
