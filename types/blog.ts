type ImageGallery = {
  folder: string;
  count: number;
  fileType: "jpg" | "png";
};

export type Author = {
  name: string;
  imageLight: string;
  imageDark: string;
  designation: string;
};

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
