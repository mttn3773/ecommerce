import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { DataPovider } from "../store/GlobalState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataPovider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DataPovider>
  );
}

export default MyApp;
