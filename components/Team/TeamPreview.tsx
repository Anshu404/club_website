"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { teamData } from "./teamData";
import TeamCard from "./TeamCard";
import Link from "next/link";

const TeamPreview = () => {
  const featuredMembers = teamData.slice(0, 12);

  return (
    // --- CHANGE 1: Added `relative` and `z-10` to the section tag ---
    <section 
      id="team-preview" 
      className="relative z-10 wow fadeInUp py-12" 
      data-wow-delay=".1s"
    >
      <div className="container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
            Meet Our Team
          </h2>
          <Link
            href="/team"
            className="rounded-md bg-primary/10 px-6 py-3 text-base font-medium text-primary transition-all duration-300 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
          >
            View All Members &rarr;
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="mySwiper"
        >
          {featuredMembers.map((member) => (
            <SwiperSlide key={member.slug} className="pb-12">
              <TeamCard member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- CHANGE 2: Pasted the exact SVG shapes from your Testimonials file here --- */}
      {/* I've also made the IDs unique to prevent conflicts */}
      <div className="absolute right-0 top-5 z-[-1]">
        <svg
          width="238"
          height="531"
          viewBox="0 0 238 531"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="422.819"
            y="-70.8145"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 422.819 -70.8145)"
            fill="url(#team-paint0_linear_83:2)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#team-paint1_linear_83:2)"
          />
          <defs>
            <linearGradient
              id="team-paint0_linear_83:2"
              x1="517.152"
              y1="-251.373"
              x2="517.152"
              y2="459.865"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="team-paint1_linear_83:2"
              x1="455.327"
              y1="-35.673"
              x2="455.327"
              y2="675.565"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-5 left-0 z-[-1]">
        <svg
          width="279"
          height="106"
          viewBox="0 0 279 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <path
              d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
              stroke="url(#team-paint0_linear_72:302)"
            />
            <path
              d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
              stroke="url(#team-paint1_linear_72:302)"
            />
            <path
              d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
              stroke="url(#team-paint2_linear_72:302)"
            />
            <path
              d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
              stroke="url(#team-paint3_linear_72:302)"
            />
          </g>
          <defs>
            <linearGradient
              id="team-paint0_linear_72:302"
              x1="256.267"
              y1="53.6717"
              x2="-40.8688"
              y2="8.15715"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="team-paint1_linear_72:302"
              x1="256.267"
              y1="42.6717"
              x2="-40.8688"
              y2="-2.84285"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="team-paint2_linear_72:302"
              x1="256.267"
              y1="64.6717"
              x2="-40.8688"
              y2="19.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="team-paint3_linear_72:302"
              x1="256.267"
              y1="76.6717"
              x2="-40.8688"
              y2="31.1572"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default TeamPreview;





// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

// import { teamData } from "./teamData";
// import TeamCard from "./TeamCard";
// import Link from "next/link";

// const TeamPreview = () => {
//   // Showing up to 12 members now, which is better for a wider carousel
//   const featuredMembers = teamData.slice(0, 12);

//   return (
//     // --- CHANGE 1: Reduced vertical padding here ---
//     // Changed from py-16/20/24 to a much smaller py-12
//     <section 
//       id="team-preview" 
//       className="wow fadeInUp py-12" 
//       data-wow-delay=".1s"
//     >
//       <div className="container">
//         <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
//           <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">
//             Meet Our Team
//           </h2>
//           <Link
//             href="/team"
//             className="rounded-md bg-primary/10 px-6 py-3 text-base font-medium text-primary transition-all duration-300 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
//           >
//             View All Members &rarr;
//           </Link>
//         </div>

//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={30}
//           loop={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//             dynamicBullets: true,
//           }}
//           // --- CHANGE 2: Showing more cards to make each card smaller ---
//           breakpoints={{
//             640: { slidesPerView: 2 }, // 2 on mobile landscape
//             768: { slidesPerView: 3 }, // 3 on tablet
//             1024: { slidesPerView: 4 }, // 4 on laptop
//             1280: { slidesPerView: 5 }, // 5 on desktop
//           }}
//           className="mySwiper"
//         >
//           {featuredMembers.map((member) => (
//             <SwiperSlide key={member.slug} className="pb-12">
//               <TeamCard member={member} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default TeamPreview;
