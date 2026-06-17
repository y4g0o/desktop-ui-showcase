import { createSignal } from "solid-js";
import type { JSX } from "solid-js";

/*
 -----------------------------------------
*/

export const BTN_CLASS = "btn shadow-xs"; // shadow-md
export const BTN_CLASS2 = "btn"; // variante mais sutil/suave, sem a sombra

export const NAVBAR_DEFAULT_COLOR: BasicColor = "neutral";
export const FOOTER_DEFAULT_COLOR: BasicColor = NAVBAR_DEFAULT_COLOR;

export const SIDEBAR_CLASS_BASE            = "shrink-0";
export const SIDEBAR_CLASS_FIXED_WIDTH     = "w-64";
export const SIDEBAR_CLASS_VARIANT_DEFAULT = "bg-base-300 border-r border-r-black/10";
export const SIDEBAR_CLASS_VARIANT_GHOST   = "";

export const FOOTER_CLASS =
  "sm:footer-horizontal " + "p-10 gap-16 auto-cols-max";

/*
 -----------------------------------------
*/

export const CARD_CLASS =
  "bg-base-100 shadow-lg border border-base-200";

export const PANEL_CLASS =
  "border border-base-300/50 " +
  "pb-3 pr-2 " 
  ;

export const PANEL_TITLE_CLASS = "card-title";
export const PANEL_BODY1_CLASS = "card-body p-2 gap-1";
export const PANEL_BODY2_CLASS = "card-body p-0 gap-2";
export const PANEL_INDENT_CHILDREN = 'ml-5';

/*
 -----------------------------------------
*/

export const MENU_CLASS =
  "menu text-base-content rounded-box " + "bg-base-300";

export const MENU_DROPDOWN_CLASS =
  "menu text-base-content rounded-box " +
  "bg-base-100 " +
  "z-1 w-52 p-2 " +
  "shadow-lg/45 " +
  "border border-base-300";

/*
 -----------------------------------------
*/

export const DEFAULT_QUAD_COLOR = "bg-info";
export const DEFAULT_CIRCLE_COLOR = "bg-info";
export const DEFAULT_QUAD_SIZE = "size-10";
export const DEFAULT_CIRCLE_SIZE = "size-10";

/*
------------------------------------------
*/

export type BasicColor =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "error"
  | undefined;

/*
------------------------------------------
*/

export function BasicColor_toBackground(
  bc: BasicColor,
  as_color_content: boolean,
) {
  if (as_color_content) {
    return {
      default: "",
      primary: "bg-primary-content",
      secondary: "bg-secondary-content",
      accent: "bg-accent-content",
      neutral: "bg-neutral-content",
      info: "bg-info-content",
      success: "bg-success-content",
      warning: "bg-warning-content",
      error: "bg-error-content",
    }[bc ?? "default"];
  } else {
    return {
      default: "",
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      neutral: "bg-neutral",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    }[bc ?? "default"];
  }
}

export function BasicColor_toText(
  bc: BasicColor,
  as_color_content: boolean,
) {
  if (as_color_content) {
    return {
      default: "",
      primary: "text-primary-content",
      secondary: "text-secondary-content",
      accent: "text-accent-content",
      neutral: "text-neutral-content",
      info: "text-info-content",
      success: "text-success-content",
      warning: "text-warning-content",
      error: "text-error-content",
    }[bc ?? "default"];
  } else {
    return {
      default: "",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      neutral: "text-neutral",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    }[bc ?? "default"];
  }
}

export function BasicColor_toButton(bc: BasicColor) {
  return {
    default: "",
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    neutral: "btn-neutral",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
  }[bc ?? "default"];
}

export function BasicColor_toProgress(bc: BasicColor) {
  return {
    default: "",
    primary: "progress-primary",
    secondary: "progress-secondary",
    accent: "progress-accent",
    neutral: "progress-neutral",
    info: "progress-info",
    success: "progress-success",
    warning: "progress-warning",
    error: "progress-error",
  }[bc ?? "default"];
}

export function BasicColor_toBadge(bc: BasicColor) {
  return {
    default: "",
    primary: "badge-primary",
    secondary: "badge-secondary",
    accent: "badge-accent",
    neutral: "badge-neutral",
    info: "badge-info",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
  }[bc ?? "default"];
}

/*
------------------------------------------
*/

export type BasicSize =
  | "s1_xs"
  | "s2_sm"
  | "s3_md"
  | "s4_lg"
  | "s5_xl"
  | "s6_2xl"
  | "s7_3xl"
  | "s8_4xl"
  | undefined;

/*
------------------------------------------
*/

export function BasicSize_toText(b: BasicSize, default_size: string) {
  return {
    default: default_size,
    s1_xs: "text-xs",
    s2_sm: "text-sm",
    s3_md: "text-md",
    s4_lg: "text-lg",
    s5_xl: "text-xl",
    s6_2xl: "text-2xl",
    s7_3xl: "text-3xl",
    s8_4xl: "text-4xl",
  }[b ?? "default"];
}

export function BasicSize_toButton(b: BasicSize, default_size: string) {
  return {
    default: default_size,
    s1_xs: "btn-xs",
    s2_sm: "btn-sm",
    s3_md: "btn-md",
    s4_lg: "btn-lg",
    s5_xl: "btn-xl",
    s6_2xl: "btn-2xl",
    s7_3xl: "btn-3xl",
    s8_4xl: "btn-4xl",
  }[b ?? "default"];
}

export function BasicSize_toBadge(b: BasicSize, default_size: string) {
  return {
    default: default_size,
    s1_xs: "badge-xs",
    s2_sm: "badge-sm",
    s3_md: "badge-md",
    s4_lg: "badge-lg",
    s5_xl: "badge-xl",
    s6_2xl: "badge-2xl",
    s7_3xl: "badge-3xl",
    s8_4xl: "badge-4xl",
  }[b ?? "default"];
}

/*
------------------------------------------
*/

export type BasicVariant =
  | "default"
  | "soft"
  | "outline"
  | "ghost"
  | undefined;

export function BasicVariant_toButton(v: BasicVariant): string {
  return {
    default: "",
    soft: "btn-soft",
    outline: "btn-outline",
    ghost: "btn-ghost",
  }[v ?? "default"];
}

export function BasicVariant_toBadge(v: BasicVariant): string {
  return {
    default: "",
    soft: "badge-soft",
    outline: "badge-outline",
    ghost: "badge-ghost",
  }[v ?? "default"];
}

/*
------------------------------------------
*/

export type BasicQuadSize =
  | "s1"
  | "s2"
  | "s3"
  | "s4"
  | "s5"
  | "s6"
  | "s7"
  | "s8"
  | "s16"
  | "s20"
  | "s24"
  | "s32"
  | undefined;

export function BasicQuadSize_toClass(v: BasicQuadSize) {
  return {
    default: "",
    s1: "size-1",
    s2: "size-2",
    s3: "size-3",
    s4: "size-4",
    s5: "size-5",
    s6: "size-6",
    s7: "size-7",
    s8: "size-8",
    s16: "size-16",
    s20: "size-20",
    s24: "size-24",
    s32: "size-32",
  }[v ?? "default"];
}

/*
------------------------------------------
*/

export type BasicProps = {
  class?: string;

  margin?: boolean;
  margin_left?: boolean;
  margin_right?: boolean;
  margin_top?: boolean;
  margin_bottom?: boolean;
};

export type BasicProps_withChildren = BasicProps & {
  children?: JSX.Element;
};

export function ExtractBasicProps_toClass(props: BasicProps) {
  let c = "";
  if (props.margin) c += " m-2";

  if (props.margin_left) c += " ml-1";
  if (props.margin_right) c += " mr-1";

  if (props.margin_top) c += " mt-3";
  if (props.margin_bottom) c += " mb-3";

  if (props.class) c += " " + props.class;

  return c;
}

/*
------------------------------------------
*/

export type LiveValueType = {
  get: () => any;
  set: (x: any) => void;
};

export function LiveValue(initial: any, name?: string): LiveValueType {
  const [val, setVal] = createSignal(initial);

  if (name) {
    if (!(globalThis as any).live_values)
      (globalThis as any).live_values = {};

    Object.defineProperty((globalThis as any).live_values, name, {
      get: val,
      set: setVal,
      configurable: true,
    });
  }

  return { get: val, set: setVal };
}
