import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { SwiperOptions } from "swiper/types";

register();
type SingleSlide = {
  public_id: string;
  url: string;
};
type ProductQuickViewPopUpSliderProps = {
  data: SingleSlide[];
};

const ProductQuickViewPopUpSlider = ({
  data,
}: ProductQuickViewPopUpSliderProps) => {
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
    };
    if (data) {
      Object.assign(swiperElRef?.current, swiperParams);
      swiperElRef?.current?.initialize();
    }
  }, [data]);
  return (
    <div className="size-64 mx-auto  relative border shadow-xl rounded-2xl overflow-hidden">
      <button
        onClick={() => {
          swiperElRef?.current?.swiper?.slideNext();
        }}
        className={`swiper-button-next bg-background text-secondary rounded-full w-7 aspect-square absolute left-2 bottom-1/2 translate-y-1/2 z-10  shadow-md trns hover:scale-110 hover:bg-secondary hover:text-background ${
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
          <swiper-slide key={slide?.public_id}>
            <img
              className=" size-64 object-cover "
              src={slide?.url}
              alt={slide?.url}
            />
          </swiper-slide>
        ))}
      </swiper-container>

      <button
        onClick={() => {
          swiperElRef?.current?.swiper?.slidePrev();
        }}
        className={` bg-background text-secondary rounded-full w-7 aspect-square absolute right-2 bottom-1/2 translate-y-1/2 z-10 f shadow-md trns hover:scale-110 hover:bg-secondary hover:text-background ${
          data?.length < 1 ? "hidden" : "flex-center"
        }`}
      >
        <FontAwesomeIcon
          className=" text-xl font-medium"
          icon={faChevronRight}
        />
      </button>
    </div>
  );
};
export default ProductQuickViewPopUpSlider;
