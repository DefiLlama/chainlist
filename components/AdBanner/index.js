import * as Fathom from "fathom-client";
import { useEffect, useMemo, useState } from "react";

import { FATHOM_ADS_ID } from "../../hooks/useAnalytics";
import { notTranslation as useTranslations, shuffleArray } from "../../utils";

const BANNERS = [
  {
    image: "llamanodes.png",
    name: "LlamaNodes",
    url: "https://llamanodes.com",
  },
  {
    image: "gmx.png",
    name: "GMX",
    url: "https://app.gmx.io/#/trade/?ref=chainlist",
  },
];

export const AdBanner = ({ timer = 15000, startTransition = true, showControls = false }) => {
  const t = useTranslations("Common");

  const [currentIndex, setCurrentIndex] = useState(0);

  const randomBanners = useMemo(() => shuffleArray(BANNERS), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (startTransition) {
        return handleNextBanner();
      }

      return;
    }, timer);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handlePrevBanner = () => {
    const isFirstBanner = currentIndex === 0;
    const newIndex = isFirstBanner ? randomBanners.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const handleNextBanner = () => {
    const isLastBanner = currentIndex === randomBanners.length - 1;
    const newIndex = isLastBanner ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  };

  const srcLarge = `./banners/large/${randomBanners[currentIndex].image}`;
  const srcSmall = `./banners/small/${randomBanners[currentIndex].image}`;
  const srcName = randomBanners[currentIndex].name;

  return (
    <div className="flex flex-col w-full h-full justify-center gap-2">
      <div className="w-full h-full relative group rounded-[10px]">
        <a
          href={randomBanners[currentIndex].url}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => Fathom.trackGoal(FATHOM_ADS_ID[randomBanners[currentIndex].name.toLowerCase()], 0)}
        >
          <picture className="rounded-[10px] duration-500 w-full h-full">
            <source
              srcset={srcSmall}
              media="(max-width: 420px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />
            <source
              srcset={srcLarge}
              media="(max-width: 639px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />
            <source
              srcset={srcSmall}
              media="(max-width: 1399px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />
            <source
              srcset={srcLarge}
              media="(max-width: 1679px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />
            <source
              srcset={srcSmall}
              media="(max-width: 2000px)"
              className="rounded-[10px] duration-500 w-full h-full"
            />

            <img src={srcLarge} alt={srcName} className="rounded-[10px] duration-500 w-full h-full" />
          </picture>
        </a>

        {/* left arrow */}
        {showControls && (
          <div
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-xl rounded-full px-2 bg-black/20 text-white cursor-pointer"
            onClick={handlePrevBanner}
          >
            &lsaquo;
          </div>
        )}

        {/* right arrow */}
        {showControls && (
          <div
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 text-xl rounded-full px-2 bg-black/20 text-white cursor-pointer"
            onClick={handleNextBanner}
          >
            &rsaquo;
          </div>
        )}
      </div>

      <div className="w-full text-center text-xs text-gray-500 dark:text-[#B3B3B3] italic">
        <a href="mailto:contact@llama-corp.com" rel="noopener noreferrer" target="_blank">
          {`${t("your-ad-here")}, ${t("contact-us").toLowerCase()}`}
        </a>
      </div>
    </div>
  );
};
