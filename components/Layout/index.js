import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Header from "../header";
import { notTranslation as useTranslations } from "../../utils";
import Logo from "./Logo";

// ─── Icons ─────────────────────────────────────────────────────────

const PlusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
    />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
    />
  </svg>
);

const ApiIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// ─── Components ────────────────────────────────────────────────────

const SidebarLink = ({ href, children, external = false, onClick, ariaLabel }) => {
  const baseClasses =
    "group flex items-center gap-2 mx-auto lg:ml-0 transition-all duration-200 ease-out " +
    "hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 " +
    "rounded-lg px-2 py-1.5 -ml-2";

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

const PrimaryButton = ({ href, children, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-center lg:justify-start gap-2.5 rounded-full font-medium 
      py-[18px] px-6 w-full max-w-[16.25rem] lg:max-w-none shadow-lg shadow-blue-500/10 
      bg-[#2F80ED] text-white hover:bg-[#256fd1] hover:shadow-xl hover:shadow-blue-500/20 
      hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
  >
    <span className="text-base font-medium">{children}</span>
    <Icon className="w-[22px] h-[22px] transition-transform duration-200 group-hover:rotate-90" />
  </a>
);

const SecondaryButton = ({ href, children, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-center lg:justify-start gap-2.5 rounded-full font-medium 
      py-[17px] px-6 w-full max-w-[16.25rem] lg:max-w-none border 
      dark:border-[#2a2a2a] border-[#EAEAEA] dark:bg-[#141414] bg-white 
      dark:text-[#2F80ED] text-[#2F80ED] hover:border-[#2F80ED]/30 dark:hover:border-[#2F80ED]/40 
      hover:bg-[#2F80ED]/5 dark:hover:bg-[#2F80ED]/10 hover:-translate-y-0.5 active:translate-y-0 
      transition-all duration-200 ease-out"
  >
    <span className="text-base font-medium">{children}</span>
    <Icon className="w-[22px] h-[22px] transition-transform duration-200 group-hover:rotate-90" />
  </a>
);

// ─── Main Layout ───────────────────────────────────────────────────

export default function Layout({ children, lang, chainName, setChainName }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Common", lang);

  // Initialize theme from localStorage / system preference
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved ? saved === "dark" : prefersDark;

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Sync body class when state changes
  useEffect(() => {
    if (!mounted) return;
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[40vw_auto] min-h-screen bg-[#f3f3f3] dark:bg-[#181818]">
        <div className="hidden lg:block bg-white dark:bg-[#0D0D0D]" />
        <div className="p-5" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[40vw_auto] min-h-screen">
      {/* ── Sidebar ── */}
      <aside className="relative h-full dark:text-[#B3B3B3] text-black dark:bg-[#0D0D0D] bg-white border-r dark:border-[#1a1a1a] border-[#eaeaea]">
        <div className="p-6 sticky top-0 bottom-0 m-auto flex flex-col items-center lg:items-start gap-6 justify-center h-screen max-w-[520px] mx-auto lg:mx-0 lg:px-10">

          {/* Logo */}
          <figure className="flex flex-col items-center lg:items-start gap-3 animate-fade-in">
            <Link
              href="/"
              prefetch={false}
              className="transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] rounded-lg"
            >
              <Logo />
            </Link>
            <figcaption className="font-bold text-2xl tracking-tight text-center lg:text-left">
              {t("help-info")}
            </figcaption>
          </figure>

          {/* Description */}
          <h1 className="font-medium text-base leading-relaxed text-center lg:text-left opacity-80 max-w-[90%] lg:max-w-none">
            {t("description")}
          </h1>

          {/* CTA Buttons */}
          <nav className="flex flex-col gap-3.5 w-full mt-2" aria-label="Contribute links">
            <PrimaryButton
              href="https://github.com/DefiLlama/chainlist?tab=readme-ov-file#add-a-chain"
              icon={PlusIcon}
            >
              {t("add-your-network")}
            </PrimaryButton>

            <SecondaryButton
              href="https://github.com/DefiLlama/chainlist/blob/main/constants/extraRpcs.js"
              icon={PlusIcon}
            >
              {t("add-your-rpc")}
            </SecondaryButton>
          </nav>

          {/* Utility Links */}
          <nav className="flex flex-col gap-1 w-full mt-2" aria-label="Utility links">
            <SidebarLink
              href="https://github.com/DefiLlama/chainlist"
              external
              ariaLabel="View source code on GitHub"
            >
              <GitHubIcon className="w-6 h-6 text-[#2F80ED]" />
              <span className="text-base font-medium">{t("view-source-code")}</span>
            </SidebarLink>

            <SidebarLink onClick={toggleTheme} ariaLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              <span className="relative w-5 h-5 flex items-center justify-center">
                <MoonIcon
                  className={`w-5 h-5 text-[#2F80ED] absolute transition-all duration-300 ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                    }`}
                />
                <SunIcon
                  className={`w-5 h-5 text-[#2F80ED] absolute transition-all duration-300 ${!isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
                    }`}
                />
              </span>
              <span className="text-base font-medium">{t("toggle-theme")}</span>
            </SidebarLink>

            <SidebarLink href="/rpcs.json" external ariaLabel="Open API JSON endpoint">
              <ApiIcon className="w-6 h-6 text-[#2F80ED]" />
              <span className="text-base font-medium">API</span>
            </SidebarLink>
          </nav>

          {/* Footer hint */}
          <p className="text-xs text-center lg:text-left opacity-40 mt-auto pt-6 font-mono">
            ChainList.org
          </p>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="dark:bg-[#181818] bg-[#f3f3f3] p-5 lg:p-8 relative flex flex-col gap-5 min-h-screen">
        <Header lang={lang} chainName={chainName} setChainName={setChainName} />
        <div className="animate-fade-in-up">{children}</div>
      </main>
    </div>
  );
}