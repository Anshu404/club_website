import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

const ActivityCard = ({ blog }: { blog: Blog }) => {
  // --- YAHAN CHANGE HAI ---
  // Hum ab 'images' ko nahi, balki 'imageGallery' object ko le rahe hain.
  const { slug, title, paragraph, author, tags, imageGallery } = blog;

  // --- THUMBNAIL LOGIC UPGRADE ---
  // Yeh line ab dynamically pehli image ka path banati hai.
  // Example: /images/activities/bridge-building-contest/1.jpg
  const thumbnailUrl = `/images/activities/${imageGallery.folder}/1.${imageGallery.fileType}`;

  return (
    <div
      className="wow fadeInUp group mb-10 flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-one duration-300 hover:-translate-y-1 hover:shadow-two dark:border-transparent dark:bg-dark dark:hover:shadow-gray-dark"
      data-wow-delay=".1s"
    >
      <Link href={`/activities/${slug}`} className="relative block aspect-[37/22] w-full">
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
          {tags[0]}
        </span>
        {/* Image component ab naye 'thumbnailUrl' ko use kar raha hai */}
        <Image src={thumbnailUrl} alt={title} fill />
      </Link>
      <div className="flex flex-grow flex-col p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
        <h3>
          <Link href={`/activities/${slug}`} className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl min-h-[56px] line-clamp-2">
            {title}
          </Link>
        </h3>
        <p className="mb-7 flex-grow text-base text-body-color line-clamp-3 dark:text-body-color-dark min-h-[72px]">
          {paragraph}
        </p>
        <div className="flex items-center">
          <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
            <Image src={author.image} width={40} height={40} alt="author" />
          </div>
          <div className="w-full">
            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              By {author.name}
            </h4>
            <p className="text-xs text-body-color dark:text-body-color-dark">
              {author.designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
