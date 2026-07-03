"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function getTransitionName(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/case-studies/")) return "case-detail";
  if (pathname.startsWith("/case-studies")) return "case-list";
  if (pathname.startsWith("/contact") || pathname.startsWith("/hire-me")) return "contact";
  if (pathname.startsWith("/privacy-policy") || pathname.startsWith("/terms-and-conditions")) return "legal";
  return "default";
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const transitionName = getTransitionName(pathname);

  return (
    <div className="route-transition" data-route-transition={transitionName} key={pathname}>
      {children}
    </div>
  );
}
