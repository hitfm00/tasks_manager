import { createTheme } from "@mantine/core";

import themeStyles from "./styles/theme.module.scss";


export const theme = createTheme({
  defaultRadius: "sm",
  shadows: {
    lg: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  components: {
    Text: {
      classNames: {
        root: themeStyles.text,
      },
    },
  },
});
