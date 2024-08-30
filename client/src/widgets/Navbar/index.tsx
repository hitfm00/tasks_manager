import { FC, useState, useCallback } from "react";
import { Stack } from "@mantine/core";

import { NAVBAR_LINKS, NavbarLinkType } from "../../constants/navbar";

import { NavbarHeader } from "./NavbarHeader";
import NavbarItem from "./NavbarItem";


const RenderLinks: FC<{ links: NavbarLinkType[] }> = ({ links }) => {
  const [openedCategories, setOpenedCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleCategory = useCallback((id: string) => {
    setOpenedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  return links.map(({ id, title, href, links, icon }) => {
    const isOpen = openedCategories[id];

    return (
      <div key={id}>
        {links ? (
          <NavbarItem
            id={id}
            title={title}
            icon={icon}
            isOpen={isOpen}
            onClick={() => toggleCategory(id)}
          />
        ) : (
          href && <NavbarItem href={href} title={title} icon={icon} />
        )}
        {isOpen && links && (
          <Stack gap={0}>
            <RenderLinks links={links} />
          </Stack>
        )}
      </div>
    );
  });
};

export const Navbar: FC = () => (
  <Stack gap={0}>
    <NavbarHeader />
    <RenderLinks links={NAVBAR_LINKS} />
  </Stack>
);
