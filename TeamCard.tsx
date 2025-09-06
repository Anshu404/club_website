import { TeamMember } from "./teamData";
import Image from "next/image";
import Link from "next/link";

const TeamCard = ({ member }: { member: TeamMember }) => {
  const { slug, name, designation, tags, imageGallery } = member;

  const thumbnailUrl = `/images/team/${imageGallery.folder}/1.${imageGallery.fileType}`;

  return (
    <div
      className="wow fadeInUp group mb-10 flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-one duration-300 hover:-translate-y-1 hover-shadow-two dark:border-transparent dark:bg-dark dark:hover:shadow-gray-dark"
      data-wow-delay=".1s"
    >
      <Link href={`/team/${slug}`} className="relative block aspect-square w-full">
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 text-sm font-semibold capitalize text-white">
          {tags[0]}
        </span>

        <Image 
          src={thumbnailUrl} 
          alt={name} 
          fill 
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105" 
        />
      </Link>

      <div className="flex flex-grow flex-col p-4 text-center border-t border-gray-300 dark:border-gray-700">
        <h3>
          <Link 
            href={`/team/${slug}`}
            className="mb-2 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl min-h-[56px] line-clamp-2"
          >
            {name}
          </Link>
        </h3>

        {/* --- CHANGE 1: Added a new div to create the divider line --- */}
        <div className="mx-auto my-1 h-px w-20 bg-gray-300 dark:bg-gray-700"></div>

        {/* --- CHANGE 2: Updated min-height and line-clamp for designation --- */}
        <p className="text-base text-body-color dark:text-body-color-dark min-h-[48px] line-clamp-2 mt-2">
          {designation}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;

