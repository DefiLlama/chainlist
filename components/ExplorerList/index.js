import { notTranslation as useTranslations } from "../../utils";
import CopyUrl from "../CopyUrl";

export default function ExplorerList({ chain, lang }) {
  const t = useTranslations("Common", lang);
  const explorerLinks = chain.explorers;

  return explorerLinks && explorerLinks.length > 0 ? (
    <div className="shadow dark:bg-[#0D0D0D] bg-white p-8 rounded-[10px] flex flex-col gap-3 col-span-full relative overflow-x-auto">
      <table className="m-0 border-collapse whitespace-nowrap dark:text-[#B3B3B3] text-black">
        <caption className="relative w-full px-3 py-1 text-base font-medium border border-b-0">
          <span className="mr-4">{`${chain.name} ${t("explorer-url-list")}`}</span>
        </caption>
        <thead>
          <tr>
            <th className="px-3 py-1 font-medium border">{t("explorer-name")}</th>
            <th className="px-3 py-1 font-medium border">{t("explorer-url")}</th>
          </tr>
        </thead>

        <tbody>
          {explorerLinks?.map((explorer, index) => {
            let className = "bg-inherit";
            return (
              <ExplorerRow
                isLoading={chain.isLoading}
                explorer={explorer}
                key={"explorer" + index}
                className={className}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  ) : null;
}

const Shimmer = () => {
  return <div className="rounded h-5 w-full min-w-[40px] animate-pulse dark:bg-[#171717] bg-[#EAEAEA]"></div>;
};

const ExplorerRow = ({ isLoading, explorer, className }) => {
  return (
    <tr className={className}>
      <td className="px-3 py-1 text-sm border text-center">{isLoading ? <Shimmer /> : explorer?.name}</td>
      <td className="border px-3 py-1 max-w-[40ch] text-center">
        {isLoading ? <Shimmer /> : explorer?.url ? <CopyUrl url={explorer.url} /> : null}
      </td>
    </tr>
  );
};
