import Document, { Head, Main, NextScript, Html } from "next/document";
import React from "react";

const LANGUAGES = ["en", "zh"];

function presetTheme() {
  const globalStylesDark = `
  @media (prefers-color-scheme: dark) {
    html body.dark {
      color-scheme: dark;
    }
  }
  @media (prefers-color-scheme: light) {
    html {
      color-scheme: dark;
    }
  }
`
  const dark = localStorage.getItem("theme") === "dark";
  const layoutStorage = localStorage.getItem("layout");

  const addDarkStylesForBrowserUI = () =>{
    // it runs once and no needed to remove it
    // it cannot duplicate, I suppose...
    style = document.createElement('style');
    style.id = "darkStyle";
    style.innerHTML = globalStylesDark
    document.head.append(style)
  }
  if(dark)
  {
    document.body.classList.add("dark");
    addDarkStylesForBrowserUI()
  }

  if(layoutStorage) {
    document.querySelector("#__next > div").classList.add("md:grid-cols-[10vw,_auto]")
    document.body.classList.add("compact")
  }

  // chrome dark mode
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark");
  }
  // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  //   const newColorScheme = event.matches ? "dark" : "light";
  //   document.body.classList.add(newColorScheme);
  // });
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
