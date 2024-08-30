import { MantineProvider } from "@mantine/core";

import { theme } from "../theme";


export default function MainPage() {
  return <MantineProvider theme={theme}>Main Page</MantineProvider>;
}
