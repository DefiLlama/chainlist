import { Popover, PopoverDisclosure, usePopoverStore } from "@ariakit/react/popover";
import { useEffect, useState } from "react";
import * as Fathom from "fathom-client";
import { FATHOM_DROPDOWN_EVENTS_ID } from "../../hooks/useAnalytics";

export default function CopyUrl({ url }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 500);
    }
  }, [open]);

  const popover = usePopoverStore({ placement: "bottom", open });

  return (
    <>
      <PopoverDisclosure
        store={popover}
        render={
          <button
            className="max-w-[40ch] px-2 py-[2px] -my-[2px] text-center text-sm overflow-hidden whitespace-nowrap text-ellipsis dark:hover:bg-[#222222] dark:hover:text-white hover:bg-[#EAEAEA] rounded-[50px]"
            onClick={() => {
              navigator.clipboard.writeText(url).then(
                () => {
                  setOpen(true);
                  if (url.includes("eth.llamarpc")) {
                    Fathom.trackGoal(FATHOM_DROPDOWN_EVENTS_ID[1], 0);
                  }
                },
                () => {
                  console.error(`Failed to copy ${url}`);
                },
              );
            }}
          >
            {url}
          </button>
        }
      />
      {popover.show ? (
        <Popover
          store={popover}
          className="max-w-md p-1 text-sm border border-gray-500 rounded bg-neutral-50 text-black drop-shadow"
        >
          <p>Copied!</p>
        </Popover>
      ) : null}
    </>
  );
}
