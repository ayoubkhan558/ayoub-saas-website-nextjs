"use client";

import { createContext, useContext, type ReactNode } from "react";
import defaultPortfolio from "@/content/portfolio/portfolio.json";

export type PortfolioData = typeof defaultPortfolio;

export type SiteMarkdown = {
  product: string;
  design: string;
};

type PortfolioContentValue = {
  portfolio: PortfolioData;
  markdown: SiteMarkdown;
};

const PortfolioContentContext = createContext<PortfolioContentValue | null>(null);

export function PortfolioContentProvider({
  children,
  portfolio,
  markdown,
}: {
  children: ReactNode;
  portfolio: PortfolioData;
  markdown: SiteMarkdown;
}) {
  return (
    <PortfolioContentContext.Provider value={{ portfolio, markdown }}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  const context = useContext(PortfolioContentContext);

  if (!context) {
    throw new Error("usePortfolioContent must be used inside PortfolioContentProvider");
  }

  return context;
}
