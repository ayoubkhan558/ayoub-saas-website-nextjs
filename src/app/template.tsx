import { RouteTransition } from "@/components/layout/RouteTransition/RouteTransition";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RouteTransition>{children}</RouteTransition>;
}
