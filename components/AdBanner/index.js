import { useEffect, useRef, useState } from "react";

import { Native, NativeMediaContent, NativeLink } from "hypelab-react";
import { HYPELAB_NATIVE_PLACEMENT_SLUG } from "../../constants/hypelab";

export const AdBanner = () => {
  return (
    <Native placement={HYPELAB_NATIVE_PLACEMENT_SLUG}>
      {function (ad) {
        if (ad.icon !== "") {
          return <NativeWrapper ad={ad} />;
        }
      }}
    </Native>
  );
};

const NativeWrapper = ({ ad }) => {
  const imageRef = useRef(null);
  const [isSquare, setIsSquare] = useState(false);
  const [hideNativeTextContent, setHideNativeTextContent] = useState(true);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setIsSquare(entry.contentRect.width == entry.contentRect.height);
          setHideNativeTextContent(entry.contentRect.height > 220);
        }
      }
    });

    const container = imageRef.current;

    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, [imageRef]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div
        className={`flex flex-col w-fit max-w-full bg-white dark:bg-[#0D0D0D] rounded-[10px] shadow overflow-hidden ${
          isSquare ? "max-w-[260px] lg:max-w-[290px]" : ""
        }`}
      >
        <div className="flex">
          <NativeLink>
            <div className="relative" ref={imageRef}>
              <NativeMediaContent />

              <HypeLabOverlay />
            </div>
          </NativeLink>
        </div>
        {isSquare || hideNativeTextContent ? "" : <NativeTextContent ad={ad} />}
      </div>
    </div>
  );
};

const NativeTextContent = ({ ad }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
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
  }, [containerRef]);

  return (
    <div className="flex items-center justify-center px-3 py-3 w-full h-full" id="ctaContainer" ref={containerRef}>
      <AdvertiserIcon ad={ad} small={width < 300} />
      <div className="grow flex items-center justify-between overflow-hidden">
        <div className="grow truncate">
          <AdvertiserName ad={ad} small={width < 300} />
        </div>
        <div className="flex-none ml-4">
          <AdvertiserCta ad={ad} small={width < 300} />
        </div>
      </div>
    </div>
  );
};

const AdvertiserIcon = ({ ad, small = false }) => {
  return (
    <div className="flex-none mr-2">
      <NativeLink>
        <img className={`${small ? "w-8" : "w-10"} rounded-full`} alt={ad.icon} src={ad.icon} />
      </NativeLink>
    </div>
  );
};

const AdvertiserName = ({ ad, small = false }) => {
  return (
    <div
      className={`${
        small ? "text-sm" : ""
      } font-semibold overflow-hidden text-ellipsis relative top-[1px] dark:text-[#B3B3B3]`}
    >
      <NativeLink>{ad.advertiser}</NativeLink>
    </div>
  );
};

const AdvertiserCta = ({ ad, small = false }) => {
  return (
    <div className="flex-none">
      <NativeLink>
        <div
          data-cy="ctaText"
          className={`${
            small ? "text-sm px-2 py-1" : "px-4 py-2"
          } border dark:border-[#171717] border-[#EAEAEA] text-center rounded-[50px] dark:text-[#2F80ED] text-[#2F80ED] dark:hover:text-black hover:text-white dark:hover:bg-[#2F80ED] hover:bg-[#2F80ED] truncate`}
        >
          {ad.ctaText}
        </div>
      </NativeLink>
    </div>
  );
};

const HypeLabOverlay = () => {
  const iconStyle = {
    width: "18px",
    height: "18px",
    backgroundSize: "15px 15px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='436' height='660' viewBox='0 0 436 660' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M406.851 295.413C422.472 311.034 422.472 336.36 406.851 351.981L160.171 598.661C152.694 606.138 142.561 610.35 131.988 610.376L89.6175 610.483C67.4476 610.539 49.4613 592.552 49.5171 570.382L49.6237 528.012C49.6503 517.439 53.8625 507.306 61.3393 499.829L308.019 253.149C323.64 237.528 348.966 237.528 364.587 253.149L406.851 295.413Z' fill='url(%23paint0_linear_302_3)'/%3E%3Cpath d='M40.7391 354.979C25.1181 339.358 25.1181 314.031 40.7391 298.41L279.222 59.927C286.703 52.4462 296.843 48.2336 307.422 48.2113L347.024 48.1279C369.181 48.0812 387.155 66.0549 387.108 88.2121L387.024 127.814C387.002 138.393 382.79 148.533 375.309 156.014L136.826 394.497C121.205 410.118 95.8782 410.118 80.2572 394.497L40.7391 354.979Z' fill='url(%23paint1_linear_302_3)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_302_3' x1='-1.91062' y1='918.002' x2='34.7376' y2='209.271' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='%2300FF85'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_302_3' x1='622.605' y1='-507.064' x2='360.234' y2='489.074' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.0001' stop-color='%233BE160'/%3E%3Cstop offset='1' stop-color='%23D7FF35'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A")`,
  };

  return (
    <div className="flex flex-row absolute top-0 right-0 bg-black/30 items-center pr-2 hover:translate-x-0 translate-x-[calc(100%-18px)] duration-500 transition-transform">
      <div style={iconStyle}></div>
      <div className="text-white text-xs h-[15px]">Ads by HypeLab</div>
    </div>
  );
};
