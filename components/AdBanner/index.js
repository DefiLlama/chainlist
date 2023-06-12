import * as Fathom from "fathom-client";
import { useEffect, useState } from "react";

import { FATHOM_ADS_ID } from "../../hooks/useAnalytics";
import { notTranslation as useTranslations, shuffleArray } from "../../utils";

const BANNERS = [
  {
    image: "brave.png",
    name: "Brave",
    url: "https://brave.com/wallet/?mtm_campaign=q2&mtm_kwd=chainlist",
    isActive: true,
  },
  {
    image: "llamanodes.png",
    name: "LlamaNodes",
    url: "https://llamanodes.com",
    isActive: true,
  },
  {
    image: "gmx.png",
    name: "GMX",
    url: "https://app.gmx.io/#/trade/?ref=chainlist",
    isActive: false,
  },
];

const randomBanners = shuffleArray(BANNERS.filter((banner) => banner.isActive));
const currentIndex = 0

export const AdBanner = () => {
  const t = useTranslations("Common");
  const [isMounted, setIsMounted] = useState(false);

  // only render the image client-side to prevent hydration errors due to the random banners
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const srcLarge = `./banners/large/${randomBanners[currentIndex].image}`;
  const srcSmall = `./banners/small/${randomBanners[currentIndex].image}`;
  const srcName = randomBanners[currentIndex].name;

  return (
    <div className="flex flex-col w-full h-full justify-center gap-2">
      <div className="w-full h-full rounded-[10px]">
        <a
          href={randomBanners[currentIndex].url}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => Fathom.trackGoal(FATHOM_ADS_ID[randomBanners[currentIndex].name.toLowerCase()], 0)}
        >
          <picture className="rounded-[10px] duration-500 w-full h-full">
            <source
              srcSet={srcSmall}
              media="(max-width: 420px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />
            <source
              srcSet={srcLarge}
              media="(max-width: 639px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />
            <source
              srcSet={srcSmall}
              media="(max-width: 1399px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />
            <source
              srcSet={srcLarge}
              media="(max-width: 1679px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />
            <source
              srcSet={srcSmall}
              media="(max-width: 2000px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />

            {isMounted && <img src={srcLarge} alt={srcName} className="rounded-[10px] duration-500 w-full h-full" />}
          </picture>
        </a>
      </div>

      <div className="w-full text-center text-xs text-gray-500 dark:text-[#B3B3B3] italic">
        <a href="mailto:contact@llama-corp.com" rel="noopener noreferrer" target="_blank">
          {`${t("your-ad-here")}, ${t("contact-us").toLowerCase()}`}
        </a>
      </div>
    </div>
  );
};
