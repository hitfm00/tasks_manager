import { IconChevronRight, IconHome, IconList } from "@tabler/icons-react";


export const NAVBAR_LINKS = [
  {
    id: "home",
    title: "Головна",
    href: "/",
    icon: <IconHome />,
  },
  {
    id: "tasks",
    title: "Задачі",
    icon: <IconList />,
    links: [
      {
        id: "current",
        title: "Поточні задачі",
        href: "/tasks?status=current",
        icon: <IconChevronRight />,
      },
      {
        id: "completed",
        title: "Виконані задачі",
        href: "/tasks?status=completed",
        icon: <IconChevronRight />,
      },
    ],
  },
];

export type NavbarLinkType = {
  id: string;
  title: string;
  href?: string;
  icon?: React.ReactNode;
  links?: { id: string; title: string; href?: string; icon: React.ReactNode }[];
};
