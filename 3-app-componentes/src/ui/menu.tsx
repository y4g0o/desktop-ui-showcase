import { useContext } from "solid-js";
import type { BasicProps_withChildren } from "./base";
import { SidebarContext } from "./layout";
import {
  MENU_CLASS,
  MENU_DROPDOWN_CLASS,
  ExtractBasicProps_toClass,
  BTN_CLASS,
} from "./base";

//
//
//
//////////////////////////////////////

type MenuProps = BasicProps_withChildren & {
  horizontal?: boolean;
};

export function Menu(props: MenuProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);

    let extras = "";
    if (props.horizontal) extras += " menu-horizontal";
    else if (useContext(SidebarContext)) extras += " w-full h-full";
    else extras += " w-56";

    return `${MENU_CLASS} ${extras} ${cl}`;
  }

  return <ul class={build_class()}>{props.children}</ul>;
}

//
//
//
//////////////////////////////////////

type MenuItemProps = BasicProps_withChildren & {
  header?: boolean;
  active?: boolean;
  tooltip?: string;
  href?: string;
  onClick?: () => void;
};

export function MenuItem(props: MenuItemProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);

    let extras = "";
    if (props.active) extras += " menu-active";
    if (props.tooltip) extras += " tooltip tooltip-right";

    return `${cl} ${extras}`;
  }

  return (
    <Switch>
      {/* se for do tipo header, não coloca <a> ou <button>.*/}
      <Match when={props.header}>
        <li class={"menu-title " + build_class()}>{props.children}</li>
      </Match>

      {/* <a> sem href não recebe foco por tab, então
          nesse caso jogaria pra <button>. */}
      <Match when={props.href}>
        <li>
          <a class={build_class()} onClick={props.onClick}>
            {props.children}
          </a>
        </li>
      </Match>

      <Match when={!props.href}>
        <li>
          <button class={build_class()} onClick={props.onClick}>
            {props.children}
          </button>
        </li>
      </Match>
    </Switch>
  );
}

//
//
//
//////////////////////////////////////

type SubmenuProps = BasicProps_withChildren & {
  title: any;
};

export function Submenu(props: SubmenuProps) {
  return (
    <li>
      <details open class={ExtractBasicProps_toClass(props)}>
        <summary>{props.title}</summary>
        <ul>{props.children}</ul>
      </details>
    </li>
  );
}

//
//
//
//////////////////////////////////////

type DropdownButtonProps = BasicProps_withChildren & {
  title: string;
  open?: boolean;
  open_on_hover?: boolean;
  align_right?: boolean;
  open_up?: boolean;
  tooltip?: string;
};

export function DropdownButton(props: DropdownButtonProps) {
  function build_class() {
    const open = props.open ? "dropdown-open" : "";
    const cl = ExtractBasicProps_toClass(props);

    let extras = "";
    if (props.open_on_hover) extras += " dropdown-hover";
    if (props.align_right) extras += " dropdown-end";
    if (props.open_up) extras += " dropdown-top";
    return `dropdown ${open} ${extras} ${cl}`;
  }

  return (
    <div class={build_class()}>
      <div
        tabindex="0"
        role="button"
        class={`${BTN_CLASS} m-1`}
        title={props.tooltip}
      >
        {props.title}
      </div>
      <ul
        tabindex="-1"
        class={`dropdown-content ${MENU_DROPDOWN_CLASS}`}
      >
        {props.children}
      </ul>
    </div>
  );
}

export function DropdownItem(props: MenuItemProps) {
  function handle_click() {
    // fecha dropdown (focus-based)
    (document.activeElement as HTMLElement | null)?.blur();

    if (props.onClick) props.onClick();
  }

  return (
    <MenuItem onClick={handle_click} {...props}>
      {props.children}
    </MenuItem>
  );
}
