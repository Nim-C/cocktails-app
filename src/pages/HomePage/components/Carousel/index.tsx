import { FC } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  FreeMode,
} from "swiper/modules";

import "./CustomizeSwiper.css";

export type CarouselProps = {
  collection: { id: string; node: React.ReactNode }[];
};

const SwiperCarousel: FC<CarouselProps> = ({ collection }) => {
  return (
    <section className="carousel-container">
      <Swiper
        /* Functionality */
        freeMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, FreeMode]}
        /* Styling */
        spaceBetween={20}
        slidesPerView="auto"
        className="custom-swiper"
      >
        {collection.map(({ id, node }) => (
          <SwiperSlide className="slide-unit" key={id}>
            {node}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SwiperCarousel;
