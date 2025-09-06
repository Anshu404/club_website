import { teamData } from "@/components/Team/teamData";
import ImageSlider from "@/components/Team/ImageSlider";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const getMemberBySlug = (slug: string) => {
  return teamData.find((member) => member.slug === slug);
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const member = getMemberBySlug(params.slug);
  if (!member) {
    return { title: "Member Not Found" };
  }
  return {
    title: `${member.name} | Nirmaan Team`,
    description: member.designation,
  };
}

const TeamDetailsPage = ({ params }: { params: { slug: string } }) => {
  const member = getMemberBySlug(params.slug);

  if (!member) {
    return (
      <section className="pt-[150px] pb-[120px]">
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">404 - Member Not Found</h1>
        </div>
      </section>
    );
  }

  const categoryMembers = teamData.filter(
    (item) => item.category === member.category
  );
  const currentIndex = categoryMembers.findIndex(
    (item) => item.slug === member.slug
  );
  const previousMember = categoryMembers[currentIndex - 1];
  const nextMember = categoryMembers[currentIndex + 1];

  return (
    // --- CHANGE 1: Added `relative` and `z-10` to the section tag ---
    <section className="relative z-10 pt-[150px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div className="mb-8">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.70711 0.292893C7.31658 -0.0976311 6.68342 -0.0976311 6.29289 0.292893L0.292893 6.29289C-0.0976311 6.68342 -0.0976311 7.31658 0.292893 7.70711L6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071C8.09763 13.3166 8.09763 12.6834 7.70711 12.2929L3.41421 8H17C17.5523 8 18 7.55228 18 7C18 6.44772 17.5523 6 17 6H3.41421L7.70711 1.70711C8.09763 1.31658 8.09763 0.683417 7.70711 0.292893Z" fill="currentColor"/></svg>
                Back to Our Team
              </Link>
            </div>
            
            <ImageSlider imageGallery={member.imageGallery} />
            
            <div className="rounded-lg bg-white p-8 shadow-one dark:bg-dark sm:p-10">
              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                {member.name}
              </h1>
              <div className="mb-8 flex flex-wrap items-center justify-between border-b border-body-color/10 pb-6 dark:border-white/10">
                <div className="flex flex-wrap items-center">
                    <h4 className="mb-1 text-base font-medium text-dark dark:text-white">
                      {member.designation}
                    </h4>
                </div>
                <div className="mb-5">
                    <p className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                        {member.category}
                    </p>
                </div>
              </div>
              
              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: member.content }}
              />
              
              <div className="mt-12 flex items-center justify-between border-t border-body-color/10 pt-8 dark:border-white/10">
                <div>
                  {previousMember && (
                    <Link href={`/team/${previousMember.slug}`} className="group flex items-center text-primary hover:underline">
                      <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                      <div>
                        <p className="text-sm text-body-color dark:text-body-color-dark">Previous Member</p>
                        <p className="font-semibold">{previousMember.name}</p>
                      </div>
                    </Link>
                  )}
                </div>
                <div className="text-right">
                  {nextMember && (
                    <Link href={`/team/${nextMember.slug}`} className="group flex items-center text-primary hover:underline">
                       <div>
                        <p className="text-sm text-body-color dark:text-body-color-dark">Next Member</p>
                        <p className="font-semibold">{nextMember.name}</p>
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

      {/* --- CHANGE 2: Pasted the SVG shapes from Testimonials and made IDs unique --- */}
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
            fill="url(#member-paint0_linear_83:2)"
          />
          <rect
            opacity="0.3"
            x="426.568"
            y="144.886"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(51.2997 426.568 144.886)"
            fill="url(#member-paint1_linear_83:2)"
          />
          <defs>
            <linearGradient
              id="member-paint0_linear_83:2"
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
              id="member-paint1_linear_83:2"
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
              stroke="url(#member-paint0_linear_72:302)"
            />
            <path
              d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
              stroke="url(#member-paint1_linear_72:302)"
            />
            <path
              d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
              stroke="url(#member-paint2_linear_72:302)"
            />
            <path
              d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
              stroke="url(#member-paint3_linear_72:302)"
            />
          </g>
          <defs>
            <linearGradient
              id="member-paint0_linear_72:302"
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
              id="member-paint1_linear_72:302"
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
              id="member-paint2_linear_72:302"
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
              id="member-paint3_linear_72:302"
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

export default TeamDetailsPage;

