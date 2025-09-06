"use client";

import Image from "next/image";
import { useState } from "react";

// --- Image Slider Data ---
// To add more images in the future, just add their paths to this list.
// Make sure the images are in the `public/images/perks/` folder.
const perkImages = [
  { src: "/images/perks/perk-1.jpg", alt: "Official Nirmaan Certificate" },
  { src: "/images/perks/perk-2.jpg", alt: "Exclusive Nirmaan Club Merchandise" },
  // Example for adding a third image:
  // { src: "/images/perks/perk-3.jpg", alt: "SNTC Membership Event" },
];

// --- NAME CHANGE ---
// The component name is now updated to match the filename for consistency.
const JoinUsSectionTwo = () => {
  // State to track the currently displayed image index
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? perkImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === perkImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            {/* --- START OF IMAGE SLIDER --- */}
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              {/* The Image */}
              <Image
                // The `src` is now dynamic, based on the current index state
                src={perkImages[currentIndex].src}
                alt={perkImages[currentIndex].alt}
                fill
                className="rounded-lg object-cover"
              />

              {/* Left Arrow Button */}
              <button
                onClick={goToPrevious}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition hover:bg-black/75"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={goToNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition hover:bg-black/75"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {/* --- END OF IMAGE SLIDER --- */}
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              {/* Perk 1: Certification */}
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Official Certification
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Receive a formal certificate recognizing your contributions and skills, a valuable addition to your professional profile.
                </p>
              </div>

              {/* Perk 2: SNTC Membership */}
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Prestigious SNTC Membership
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  As a member of Nirmaan, you are automatically part of IIT Mandi's esteemed Science & Technology Council (SNTC), opening doors to wider technical opportunities.
                </p>
              </div>

              {/* Perk 3: Exclusive Merchandise */}
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Exclusive Club Merchandise
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Show your club pride with exclusive, high-quality hoodies, t-shirts, and other gear designed for Nirmaan members only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSectionTwo;
