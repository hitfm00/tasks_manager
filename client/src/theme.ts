import { createTheme } from "@mantine/core";

import themeStyles from "./styles/theme.module.scss";


export const theme = createTheme({
  defaultRadius: "sm",
  components: {
    Text: {
      classNames: {
        root: themeStyles.text,
      },
    },
  },
});
