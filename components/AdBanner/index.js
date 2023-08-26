import { useEffect, useRef, useState } from "react";

import { Native, NativeMediaContent, NativeLink } from "hypelab-react";
import { HYPELAB_NATIVE_PLACEMENT_SLUG } from "../../constants/hypelab";

export const AdBanner = () => {
  return (
    <Native placement={HYPELAB_NATIVE_PLACEMENT_SLUG} className="h-full">
      {function (ad) {
        if (ad.icon !== "") {
          return (
            <div className="flex flex-col h-full w-full items-center">
              <div className="flex flex-col w-fit bg-white dark:bg-[#0D0D0D] rounded-[10px] shadow overflow-hidden">
                <div className="flex">
                  <NativeLink>
                    <div data-cy="mediaContent" className="mediaContent">
                      <NativeMediaContent />
                    </div>
                  </NativeLink>
                </div>
                <NativeTextContent ad={ad} />
              </div>
            </div>
          );
        }
      }}
    </Native>
  );
};

const NativeTextContent = ({ ad }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    });

    const container = containerRef.current;

    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mx-3 my-3 h-full" id="ctaContainer" ref={containerRef}>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        {width < 370 ? (
          <>
            <AdvertiserInfo ad={ad} />
            <CtaButton ad={ad} />
          </>
        ) : (
          <div className="flex justify-between w-full">
            <AdvertiserInfo ad={ad} />
            <CtaButton ad={ad} />
          </div>
        )}
      </div>
    </div>
  );
};

const AdvertiserInfo = ({ ad }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full flex-shrink-0 flex relative">
        <NativeLink>
          <img src={ad.icon} className="w-10 rounded-full" alt={ad.icon} />
        </NativeLink>
      </div>
      <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis relative top-[1px] dark:text-[#B3B3B3]">
        <NativeLink>{ad.advertiser}</NativeLink>
      </span>
    </div>
  );
};

const CtaButton = ({ ad }) => {
  return (
    <NativeLink>
      <div
        data-cy="ctaText"
        className="border dark:border-[#171717] border-[#EAEAEA] text-center px-4 py-2 rounded-[50px] dark:text-[#2F80ED] text-[#2F80ED] dark:hover:text-black hover:text-white dark:hover:bg-[#2F80ED] hover:bg-[#2F80ED] truncate"
      >
        {ad.ctaText}
      </div>
    </NativeLink>
  );
};
