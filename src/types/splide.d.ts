declare module "@splidejs/react-splide" {
  import type { Splide as SplideCore, Options } from "@splidejs/splide";
  import type { Component, FC, HTMLAttributes, ReactNode } from "react";

  export interface SplideProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    options?: Options;
    hasTrack?: boolean;
    tag?: "div" | "section" | "header" | "footer" | "nav";
    onMounted?: (splide: SplideCore) => void;
    onMoved?: (splide: SplideCore, newIndex: number, previousIndex: number) => void;
  }

  export class Splide extends Component<SplideProps> {
    go(control: number | string): void;
  }

  export const SplideSlide: FC<HTMLAttributes<HTMLLIElement>>;
}

declare module "@splidejs/react-splide/css/core";