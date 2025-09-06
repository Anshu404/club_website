// Naya 'ImageGallery' type
type ImageGallery = {
  folder: string; // e.g., "bridge-building-contest"
  count: number;  // Total number of images in the folder
  fileType: "jpg" | "png"; // The type of images
};

// This is the updated Author type
export type Author = {
  name: string;
  imageLight: string; // The logo for day mode
  imageDark: string;  // The logo for night mode
  designation: string;
};

// This Blog type now correctly uses the exported Author type
export type Blog = {
  slug: string;
  title: string;
  paragraph: string;
  content: string;
  author: Author;
  tags: string[];
  publishDate: string;
  category?: string;
  imageGallery: ImageGallery;
};