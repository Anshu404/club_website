import { activityData } from "@/components/Activities/activityData";
import ImageSlider from "@/components/Activities/ImageSlider";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const getActivityBySlug = (slug: string) => {
  return activityData.find((activity) => activity.slug === slug);
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const activity = getActivityBySlug(params.slug);
  if (!activity) {
    return { title: "Activity Not Found" };
  }
  return {
    title: `${activity.title} | Nirmaan Activities`,
    description: activity.paragraph,
  };
}

const ActivityDetailsPage = ({ params }: { params: { slug: string } }) => {
  const activity = getActivityBySlug(params.slug);

  if (!activity) {
    return (
      <section className="pt-[150px] pb-[120px]">
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">404 - Activity Not Found</h1>
          <p className="mt-4 text-lg text-body-color dark:text-body-color-dark">The page you are looking for does not exist.</p>
        </div>
      </section>
    );
  }

  const categoryActivities = activityData.filter(
    (item) => item.category === activity.category
  );
  const currentIndex = categoryActivities.findIndex(
    (item) => item.slug === activity.slug
  );
  const previousActivity = categoryActivities[currentIndex + 1];
  const nextActivity = categoryActivities[currentIndex - 1];

  return (
    // --- CHANGE 1: Added `relative`, `z-10`, and `overflow-hidden` to the section tag ---
    <section className="relative z-10 overflow-hidden pt-[150px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div className="mb-8">
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.70711 0.292893C7.31658 -0.0976311 6.68342 -0.0976311 6.29289 0.292893L0.292893 6.29289C-0.0976311 6.68342 -0.0976311 7.31658 0.292893 7.70711L6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071C8.09763 13.3166 8.09763 12.6834 7.70711 12.2929L3.41421 8H17C17.5523 8 18 7.55228 18 7C18 6.44772 17.5523 6 17 6H3.41421L7.70711 1.70711C8.09763 1.31658 8.09763 0.683417 7.70711 0.292893Z" fill="currentColor"/></svg>
                Back to All Activities
              </Link>
            </div>
            
            <ImageSlider imageGallery={activity.imageGallery} />
            
            <div className="rounded-lg bg-white p-8 shadow-one dark:bg-dark sm:p-10">
              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                {activity.title}
              </h1>
              <div className="mb-8 flex flex-wrap items-center justify-between border-b border-body-color/10 pb-6 dark:border-white/10">
                <div className="flex flex-wrap items-center">
                  <div className="mr-10 mb-5 flex items-center">
                    <div className="mr-4 h-10 w-10 flex-shrink-0">
                      <div className="relative h-full w-full">
                        <Image src={activity.author.imageLight} alt="author" fill className="object-contain dark:hidden" />
                        <Image src={activity.author.imageDark} alt="author" fill className="hidden object-contain dark:block" />
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-base font-medium text-dark dark:text-white">
                        {activity.author.name}
                      </h4>
                      <p className="text-xs text-body-color">{activity.author.designation}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                    <p className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                        {activity.category}
                    </p>
                </div>
              </div>
              
              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: activity.content }}
              />
              
              <div className="mt-12 flex items-center justify-between border-t border-body-color/10 pt-8 dark:border-white/10">
                <div>
                  {previousActivity && (
                    <Link href={`/activities/${previousActivity.slug}`} className="group flex items-center text-primary hover:underline">
                      <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                      <div>
                        <p className="text-sm text-body-color dark:text-body-color-dark">Previous {previousActivity.category}</p>
                        <p className="font-semibold">{previousActivity.title.substring(0, 20)}...</p>
                      </div>
                    </Link>
                  )}
                </div>
                <div className="text-right">
                  {nextActivity && (
                    <Link href={`/activities/${nextActivity.slug}`} className="group flex items-center text-primary hover:underline">
                       <div>
                        <p className="text-sm text-body-color dark:text-body-color-dark">Next {nextActivity.category}</p>
                        <p className="font-semibold">{nextActivity.title.substring(0, 20)}...</p>
                      </div>
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CHANGE 2: Pasted the SVG shapes from Footer and made IDs unique --- */}
      <div className="absolute right-0 top-14 z-[-1]">
        <svg
          width="55"
          height="99"
          viewBox="0 0 55 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
          <mask
            id="activity-detail-mask"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="99"
            height="99"
          >
            <circle
              opacity="0.8"
              cx="49.5"
              cy="49.5"
              r="49.5"
              fill="#4A6CF7"
            />
          </mask>
          <g mask="url(#activity-detail-mask)">
            <circle
              opacity="0.8"
              cx="49.5"
              cy="49.5"
              r="49.5"
              fill="url(#activity-detail-paint0_radial)"
            />
            <g opacity="0.8" filter="url(#activity-detail-filter0_f)">
              <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
            </g>
          </g>
          <defs>
            <filter
              id="activity-detail-filter0_f"
              x="12.4852"
              y="-15.1763"
              width="82.7646"
              height="82.7646"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10.5"
                result="effect1_foregroundBlur_94:899"
              />
            </filter>
            <radialGradient
              id="activity-detail-paint0_radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
            >
              <stop stopOpacity="0.47" />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-24 left-0 z-[-1]">
        <svg
          width="79"
          height="94"
          viewBox="0 0 79 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-41"
            y="26.9426"
            width="66.6675"
            height="66.6675"
            transform="rotate(-22.9007 -41 26.9426)"
            fill="url(#activity-detail-paint0_linear)"
          />
          <rect
            x="-41"
            y="26.9426"
            width="66.6675"
            height="66.6675"
            transform="rotate(-22.9007 -41 26.9426)"
            stroke="url(#activity-detail-paint1_linear)"
            strokeWidth="0.7"
          />
          <path
            opacity="0.3"
            d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
            fill="url(#activity-detail-paint2_linear)"
          />
          <path
            d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
            stroke="url(#activity-detail-paint3_linear)"
            strokeWidth="0.7"
          />
          <path
            opacity="0.3"
            d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
            fill="url(#activity-detail-paint4_linear)"
          />
          <path
            d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
            stroke="url(#activity-detail-paint5_linear)"
            strokeWidth="0.7"
          />
          <defs>
            <linearGradient
              id="activity-detail-paint0_linear"
              x1="-41"
              y1="21.8445"
              x2="36.9671"
              y2="59.8878"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="activity-detail-paint1_linear"
              x1="25.6675"
              y1="95.9631"
              x2="-42.9608"
              y2="20.668"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
            </linearGradient>
            <linearGradient
              id="activity-detail-paint2_linear"
              x1="20.325"
              y1="-3.98039"
              x2="90.6248"
              y2="25.1062"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="activity-detail-paint3_linear"
              x1="18.3642"
              y1="-1.59742"
              x2="113.9"
              y2="80.6826"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
            </linearGradient>
            <linearGradient
              id="activity-detail-paint4_linear"
              x1="61.1098"
              y1="62.3249"
              x2="-8.82468"
              y2="58.2156"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="activity-detail-paint5_linear"
              x1="65.4236"
              y1="65.0701"
              x2="24.0178"
              y2="41.6598"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default ActivityDetailsPage;
