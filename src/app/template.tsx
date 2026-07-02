import { RouteTransition } from "@/components/layout/RouteTransition";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteTransition>{children}</RouteTransition>;
}
