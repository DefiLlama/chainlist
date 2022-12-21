import Document, { Head, Main, NextScript } from "next/document";
import React from "react";

const LANGUAGES = ["en", "zh"];

class MyDocument extends Document {
  render() {
    const pathPrefix = this.props.__NEXT_DATA__.page.split("/")[1];
    const lang = LANGUAGES.indexOf(pathPrefix) !== -1 ? pathPrefix : LANGUAGES[0];

    return (
      <html lang={lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
