import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About Us",
    // This now correctly points to your new, dedicated About page.
    path: "/about",
    newTab: false,
  },
  {
    id: 2,
    title: "Join Us",
    path: "/joinus",
    newTab: false,
  },
  {
    id: 3,
    title: "Activities",
    path: "/activities", // We are reusing the blog page for events
    newTab: false,
  },
  // {
  //   id: 4,
  //   title: "Projects",
  //   path: "/projects", // This page doesn't exist yet, that's fine for now
  //   newTab: false,
  // },
  {
    id: 4, // Make sure the ID is unique
    title: "Our Team",
    path: "/team",
    newTab: false,
  },
  {
    id: 5,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];

export default menuData;










