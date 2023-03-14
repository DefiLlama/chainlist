import Document, { Head, Main, NextScript, Html } from "next/document";
import React from "react";

const LANGUAGES = ["en", "zh"];

function presetTheme() {
  const dark = localStorage.getItem("theme") === "dark";

  if (dark) {
    document.body.classList.add("dark");
  }
}

const themeScript = `(() => { ${presetTheme.toString()}; presetTheme() })()`;

class MyDocument extends Document {
  render() {
    const pathPrefix = this.props.__NEXT_DATA__.page.split("/")[1];
    const lang = LANGUAGES.indexOf(pathPrefix) !== -1 ? pathPrefix : LANGUAGES[0];

    return (
      <Html lang={lang}>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: themeScript, }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
