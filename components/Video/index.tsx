"use client";
import SectionTitle from "../Common/SectionTitle";

const Video = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="From Blueprint to Reality"
          paragraph="We believe in hands-on learning, and our projects reflect the passion and skill we bring to civil engineering. Watch one of our recent highlights below."
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/43] items-center justify-center">
                {/* --- Final Video Player --- */}
                <video
                  // Correct path to your video file
                  src="/videos/nirmaan-reel.mp4"
                  controls
                  className="w-full h-full object-cover"
                  // Correct path to your poster image
                  poster="/videos/nirmaan-poster.jpg"
                >
                  Your browser does not support the video tag.
                </video>
                {/* --- Final Video Player Ends --- */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;

