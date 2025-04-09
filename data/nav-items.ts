export const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Posts",
    href: "/posts",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Design Resources",
        href: "/resources/design",
      },
      {
        label: "Development Resources",
        href: "/resources/development",
      },
      {
        label: "Books & Articles",
        href: "/resources/books-articles",
      },
    ],
  },
];
