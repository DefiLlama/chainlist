import * as Fathom from "fathom-client";
import { useEffect, useState } from "react";

import { FATHOM_ADS_ID } from "../../hooks/useAnalytics";
import { notTranslation as useTranslations, shuffleArray } from "../../utils";

const BANNERS = [
  {
    image: "brave.png",
    name: "Brave",
    url: "https://brave.com/wallet/?mtm_source=chainlist&mtm_medium=paid&mtm_campaign=q3wallet",
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
].filter((banner) => banner.isActive);

export const AdBanner = () => {
  const t = useTranslations("Common");
  const [banner, setBanner] = useState();

  // only render banner client-side to prevent hydration errors due to the random banners
  useEffect(() => {
    setBanner(BANNERS[Math.floor(Math.random() * BANNERS.length)]);
  }, []);

  if (!banner) {
    return null;
  }

  const srcLarge = `./banners/large/${banner.image}`;
  const srcSmall = `./banners/small/${banner.image}`;
  const srcName = banner.name;

  return (
    <div className="flex flex-col w-full h-full justify-center gap-2">
      <div className="w-full h-full rounded-[10px]">
        <a
          href={banner.url}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => Fathom.trackGoal(FATHOM_ADS_ID[banner.name.toLowerCase()], 0)}
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

            <img src={srcLarge} alt={srcName} className="rounded-[10px] duration-500 w-full h-full" />
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
