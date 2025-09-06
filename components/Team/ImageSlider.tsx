"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { TeamImageGallery } from "./teamData"; // teamData se type import karein

// Swiper ke styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const ImageSlider = ({ imageGallery }: { imageGallery: TeamImageGallery }) => {
  // Logic bilkul same hai, bas '/images/team/' ka path use hoga
  const images = Array.from(
    { length: imageGallery.count },
    (_, i) => `/images/team/${imageGallery.folder}/${i + 1}.${imageGallery.fileType}`
  );

  return (
    <div className="wow fadeInUp relative mb-10 w-full overflow-hidden rounded-lg">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-[97/50] w-full">
              <Image
                src={src}
                alt={`Member image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
