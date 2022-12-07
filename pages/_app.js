import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { NextIntlProvider } from "next-intl";
import stores from "../stores/index.js";
import { CONFIGURE } from "../stores/constants";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  useEffect(function () {
    stores.dispatcher.dispatch({ type: CONFIGURE });
  }, []);

  useEffect(() => {
    Fathom.load("TKCNGGEZ", {
      includedDomains: ["chainlist.defillama.com", "chainlist.org"],
      url: "https://surprising-powerful.llama.fi/script.js",
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlProvider messages={pageProps.messages}>
        <Component {...pageProps} />
        {/* <SnackbarController /> */}
      </NextIntlProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
