import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext";
import { ReactQueryDevtools } from "react-query/devtools";


import { makeServer } from "../services/mirage";
import { QueryClientProvider, QueryClient } from "react-query";
import { queryClient } from "../services/queryClient";


if(process.env.NODE_ENV === 'development'){
    makeServer()
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <SidebarDrawerProvider>
                    <Component {...pageProps} />
                </SidebarDrawerProvider>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </ChakraProvider>
    );
}

export default MyApp;
