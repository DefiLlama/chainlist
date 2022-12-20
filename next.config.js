module.exports = {
  // i18n: {
  //   locales: ["en", "zh"],
  //   defaultLocale: "en",
  // },
  reactStrictMode: true,
  images: {
    // domains: ["defillama.com", "icons.llamao.fi"],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/top-rpcs/:path*",
        destination: "/chain/:path*",
        permanent: true,
      },
      {
        source: "/best-rpcs/:path*",
        destination: "/chain/:path*",
        permanent: true,
      },
    ];
  },
};
