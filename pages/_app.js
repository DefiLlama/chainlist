import * as React from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { NextIntlProvider } from "next-intl";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

  React.useEffect(() => {
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
      {/* <NextIntlProvider messages={pageProps.messages}> */}
      <Component {...pageProps} />
      {/* <SnackbarController /> */}
      {/* </NextIntlProvider> */}
    </QueryClientProvider>
  );
}

export default App;
