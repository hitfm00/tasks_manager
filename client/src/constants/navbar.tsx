import {
  IconChevronRight,
  IconHome,
  IconList,
  IconPlus,
} from "@tabler/icons-react";


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
        id: "add",
        title: "Додати задачу",
        href: "/tasks/create",
        icon: <IconPlus />,
      },

      {
        id: "all",
        title: "Всі задачі",
        href: "/tasks",
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
