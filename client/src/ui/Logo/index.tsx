import { Image } from "@mantine/core";

import css from "./Logo.module.scss";


export const Logo = () => {
  return (
    <Image
      src="/images/logo.png"
      w={50}
      h={50}
      alt="logo"
      className={css.logo}
    />
  );
};
