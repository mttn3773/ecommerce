import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { DataPovider } from "../store/GlobalState";
import { Notify } from "../components/Notify/Notify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataPovider>
      <ChakraProvider resetCSS theme={theme}>
        <Notify />
        <Component {...pageProps} />
      </ChakraProvider>
    </DataPovider>
  );
}

export default MyApp;
