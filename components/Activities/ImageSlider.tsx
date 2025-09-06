"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Blog } from "@/types/blog"; // Blog type ko import karein

// Swiper ke styles ko import karna zaroori hai
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// --- YAHAN CHANGE HAI ---
// Component ab 'images' ka array nahi, balki poora 'imageGallery' object leta hai.
const ImageSlider = ({ imageGallery }: { imageGallery: Blog["imageGallery"] }) => {
  
  // --- YEH HAI SMART LOGIC ---
  // Yeh code 'imageGallery' object se dynamically saare image paths banata hai.
  // Example: Agar count: 3 hai, to yeh [..., "1.jpg", "2.jpg", "3.jpg"] ka array banayega.
  const images = Array.from(
    { length: imageGallery.count },
    (_, i) => `/images/activities/${imageGallery.folder}/${i + 1}.${imageGallery.fileType}`
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
                alt={`Activity image ${index + 1}`}
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
