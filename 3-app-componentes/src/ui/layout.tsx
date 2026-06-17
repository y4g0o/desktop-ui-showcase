import { createContext, useContext, createUniqueId } from "solid-js";

import type {
  BasicProps,
  BasicProps_withChildren,
  BasicColor,
  BasicSize,
} from "./base";

import {
  ExtractBasicProps_toClass,
  BasicSize_toText,
  BasicColor_toBackground,
  BasicColor_toText,
  NAVBAR_DEFAULT_COLOR,
  FOOTER_DEFAULT_COLOR,
  SIDEBAR_CLASS_BASE,
  SIDEBAR_CLASS_FIXED_WIDTH,
  SIDEBAR_CLASS_VARIANT_DEFAULT,
  SIDEBAR_CLASS_VARIANT_GHOST,
  FOOTER_CLASS,
} from "./base";

export const SidebarContext = createContext<boolean>(false);
export const TabsContext = createContext({
  tab_class: "",
  tab_name: "",
});

export type BasicGap =
  | "gap-0"
  | "gap-1"
  | "gap-2"
  | "gap-3"
  | "gap-4"
  | "gap-5"
  | "gap-6"
  | "gap-7";

type RowProps = BasicProps_withChildren & {
  left?: boolean;
  center?: boolean;
  right?: boolean;
  space_between?: boolean;

  top?: boolean;
  vcenter?: boolean;
  bottom?: boolean;
  stretch?: boolean;

  spacing?: BasicGap;
};

export function Row(props: RowProps) {
  function build_class() {
    let align = "";
    if (props.left) align = "justify-start";
    else if (props.center) align = "justify-center";
    else if (props.right) align = "justify-end";
    else if (props.space_between) align = "justify-between";

    if (props.top) align += " items-start";
    else if (props.vcenter) align += " items-center";
    else if (props.bottom) align += " items-end";
    else if (props.stretch) align += " items-stretch";

    const spacing = props.spacing ?? "gap-4";
    const cl = ExtractBasicProps_toClass(props);

    return `flex flex-row ${cl} ${spacing} ${align}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

type ColProps = BasicProps_withChildren & {
  left?: boolean;
  center?: boolean;
  right?: boolean;
  stretch?: boolean;

  top?: boolean;
  vcenter?: boolean;
  bottom?: boolean;
  space_between?: boolean;

  spacing?: BasicGap;
};

export function Col(props: ColProps) {
  function build_class() {
    let align = "";
    if (props.left) align = "items-start";
    else if (props.center) align = "items-center";
    else if (props.right) align = "items-end";
    else if (props.stretch) align = "items-stretch";

    if (props.top) align += " justify-start";
    else if (props.vcenter) align += " justify-center";
    else if (props.bottom) align += " justify-end";
    else if (props.space_between) align += " justify-between";

    const spacing = props.spacing ?? "gap-4";
    const cl = ExtractBasicProps_toClass(props);

    return `flex flex-col ${spacing} ${cl} ${align}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

//
//
//
//////////////////////////////////////

type SpaceProps = BasicProps & {
  size?: "h-4" | "h-8" | "h-12" | "h-16" | "h-20" | undefined;
};

export function Space(props: SpaceProps) {
  function build_class() {
    const h = props.size ?? "h-4";
    return h + " " + ExtractBasicProps_toClass(props);
  }

  return <div class={build_class()} />;
}

type DividerProps = BasicProps & {
  vertical?: boolean;
};

export function Divider(props: DividerProps) {
  function build_class() {
    let cl = ExtractBasicProps_toClass(props);
    if (props.vertical) cl += " divider-horizontal";

    return `divider ${cl}`;
  }

  return <div class={build_class()}></div>;
}

//
//
//
//////////////////////////////////////

type HeaderProps = BasicProps_withChildren & {
  size?: BasicSize;
  color?: BasicColor;
};

export function Header(props: HeaderProps) {
  function build_class() {
    const size = BasicSize_toText(props.size, "text-lg");
    const cl = ExtractBasicProps_toClass(props);

    return `font-bold ${size} ${cl} ${props.class}`;
  }

  return <h2 class={build_class()}>{props.children}</h2>;
}

//
//
//
//////////////////////////////////////

type NavbarProps = BasicProps_withChildren & {
  color?: BasicColor;
};

export function Navbar(props: NavbarProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);

    const cor_bg = BasicColor_toBackground(
      props.color ?? NAVBAR_DEFAULT_COLOR,
      false,
    );
    const cor_fg = BasicColor_toText(
      props.color ?? NAVBAR_DEFAULT_COLOR,
      true,
    );

    return `navbar ${cor_bg} ${cor_fg} ${cl}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

export function NavbarLeft(props: BasicProps_withChildren) {
  return (
    <div class={"navbar-start " + ExtractBasicProps_toClass(props)}>
      {props.children}
    </div>
  );
}

export function NavbarCenter(props: BasicProps_withChildren) {
  return (
    <div class={"navbar-center " + ExtractBasicProps_toClass(props)}>
      {props.children}
    </div>
  );
}

export function NavbarRight(props: BasicProps_withChildren) {
  return (
    <div class={"navbar-end " + ExtractBasicProps_toClass(props)}>
      {props.children}
    </div>
  );
}

//
//
//
//////////////////////////////////////

export function FullPage(props: BasicProps_withChildren) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `w-screen h-screen flex flex-col ${cl}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

// parte que estica na página, de cima a baixo.
// filhos são colunas.
export function FullPageMain(props: BasicProps_withChildren) {
  return (
    <Row
      spacing="gap-0"
      stretch
      class={"grow " + ExtractBasicProps_toClass(props)}
    >
      {props.children}
    </Row>
  );
}

type SidebarProps = BasicProps_withChildren & {
  variant?: BasicVariant;
  fixed_width?: boolean;
};

export function Sidebar(props: SidebarProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);

    let extras =
      SIDEBAR_CLASS_BASE + " " +
      (props.fixed_width ? SIDEBAR_CLASS_FIXED_WIDTH : "") + " ";

    if (props.variant == "ghost")
      extras += SIDEBAR_CLASS_VARIANT_GHOST;
    else
      extras += SIDEBAR_CLASS_VARIANT_DEFAULT;

    return `${extras} ${cl}`;
  }

  return (
    <SidebarContext.Provider value={true}>
      <div class={build_class()}>{props.children}</div>
    </SidebarContext.Provider>
  );
}

//
//
//
//////////////////////////////////////

export type FooterProps = BasicProps_withChildren & {
  color?: BasicColor;
};

export function Footer(props: FooterProps) {
  function build_class() {
    const cor_bg = BasicColor_toBackground(
      props.color ?? FOOTER_DEFAULT_COLOR,
      false,
    );
    const cor_fg = BasicColor_toText(
      props.color ?? FOOTER_DEFAULT_COLOR,
      true,
    );
    return `footer ${FOOTER_CLASS} ${cor_fg} ${cor_bg}`;
  }

  return <footer class={build_class()}>{props.children}</footer>;
}

type FooterColProps = BasicProps_withChildren & {
  title: string;
};

export function FooterCol(props: FooterColProps) {
  return (
    <nav class="max-w-100">
      <h5 class="footer-title">{props.title}</h5>
      {props.children}
    </nav>
  );
}

//
//
//
//////////////////////////////////////

type TabsProps = BasicProps_withChildren & {};

export function Tabs(props: TabsProps) {
  const cl = ExtractBasicProps_toClass(props);

  const tab_name = "tabs-" + createUniqueId();
  const tab_class = props.class ?? "";

  return (
    <TabsContext.Provider value={{ tab_name, tab_class }}>
      <div class={`tabs tabs-lift ${cl}`}>{props.children}</div>
    </TabsContext.Provider>
  );
}

type TabProps = BasicProps_withChildren & {
  title: string;
  active?: boolean;
};

export function Tab(props: TabProps) {
  const ctx = useContext(TabsContext);

  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `tab-content bg-base-100 text-base-content border-base-300 p-6 ${ctx.tab_class} ${cl}`;
  }

  return (
    <>
      <input
        type="radio"
        name={ctx.tab_name}
        class="tab"
        aria-label={props.title}
        checked={props.active}
      />
      <div class={build_class()}>{props.children}</div>
    </>
  );
}

//
//
//
//////////////////////////////////////

type ListProps = BasicProps_withChildren & {
  bullets?: boolean;
  decimal?: boolean;
};

export function List(props: ListProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);

    let extras = "";
    if (props.bullets) extras += " list-disc list-inside";
    else if (props.decimal) extras += " list-decimal list-inside";
    else
      extras +=
        " list bg-base-100 text-base-content rounded-box shadow-md";

    return `${cl} ${extras}`;
  }

  return <ul class={build_class()}>{props.children}</ul>;
}

type ListItemProps = BasicProps_withChildren & {};

export function ListItem(props: ListItemProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `list-row ${cl}`;
  }

  return <li class={build_class()}>{props.children}</li>;
}

type TitleDescProps = BasicProps_withChildren & {
  title: string;
};

export function TitleDesc(props: TitleDescProps) {
  return (
    <div>
      <div>{props.title}</div>
      <div class="opacity-60">{props.children}</div>
    </div>
  );
}
