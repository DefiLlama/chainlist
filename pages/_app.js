import * as React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { NextIntlProvider } from "next-intl";
import { useAnalytics } from "../hooks/useAnalytics";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  useAnalytics();

  const [queryClient] = React.useState(() => new QueryClient());

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
