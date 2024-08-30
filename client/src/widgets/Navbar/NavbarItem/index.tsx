import { FC } from "react";
import { Box, Flex, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import css from "./NavbarItem.module.scss";


type NavbarItemProps = {
  id?: string;
  title: string;
  icon: React.ReactNode;
  href?: string;
  isOpen?: boolean;
  onClick?: () => void;
};

const NavbarItem: FC<NavbarItemProps> = ({
  title,
  icon,
  href,
  isOpen,
  onClick,
}) => {
  const content = (
    <Box
      component="button"
      onClick={onClick}
      className={clsx(
        href ? css.linkBtn : css.categoryBtn,
        isOpen && css.openedCategory,
      )}
    >
      <Flex>
        {icon}
        <Text component="p" ml="xs">
          {title}
        </Text>
      </Flex>
      {onClick && (isOpen ? <IconMinus /> : <IconPlus />)}
    </Box>
  );

  return href ? <Link to={href}>{content}</Link> : content;
};

export default NavbarItem;
