import * as React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Script from "next/script";
// import { NextIntlProvider } from "next-intl";
import { useAnalytics } from "../hooks/useAnalytics";
import "../styles/globals.css";

const UMAMI_WEBSITE_ID = "069c9d60-6d99-4741-8f9a-5bcc90a654e3";

function App({ Component, pageProps }) {
  useAnalytics();

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* <NextIntlProvider messages={pageProps.messages}> */}
      <Script
        src="/tasty.js"
        strategy="lazyOnload"
        data-website-id={UMAMI_WEBSITE_ID}
        data-host-url="https://tasty.defillama.com"
      />
      <Component {...pageProps} />
      {/* <SnackbarController /> */}
      {/* </NextIntlProvider> */}
    </QueryClientProvider>
  );
}

export default App;
