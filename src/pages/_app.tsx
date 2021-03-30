import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { DataPovider } from "../store/GlobalState";
import { Notify } from "../components/Notify/Notify";
import { Layout } from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataPovider>
      <ChakraProvider resetCSS theme={theme}>
        <Layout>
          <Notify />
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </DataPovider>
  );
}

export default MyApp;
