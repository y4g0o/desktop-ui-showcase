import { createContext, useContext } from "solid-js";

import {
  type BasicProps_withChildren,
  type BasicColor,
  type BasicSize,
  type BasicVariant,
  ExtractBasicProps_toClass,
  BasicColor_toButton,
  BasicSize_toButton,
  BasicVariant_toButton,
  BTN_CLASS,
  BTN_CLASS2,
} from "./base";

//
//
//
//////////////////////////////////////

const JoinContext = createContext<boolean>(false);

type ButtonProps = BasicProps_withChildren & {
  color?: BasicColor;
  variant?: BasicVariant;
  size?: BasicSize;
  circle?: boolean;
  tooltip?: string;
  align_left?: boolean;
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  function build_class() {
    const colorClass = BasicColor_toButton(props.color);
    const sizeClass = BasicSize_toButton(props.size, "");
    const variantClass = BasicVariant_toButton(props.variant);

    const cl = ExtractBasicProps_toClass(props);

    const cl_base =
      props.variant == "default" || props.variant == "outline"
        ? BTN_CLASS
        : BTN_CLASS2;

    let extras = "";
    if (useContext(JoinContext)) extras += " join-item";
    if (props.circle) extras += " btn-circle";
    if (props.align_left) extras += " justify-start";

    return `${cl_base} ${variantClass} ${colorClass} ${sizeClass} ${extras} ${cl}`;
  }

  return (
    <button
      class={build_class()}
      onClick={props.onClick}
      title={props.tooltip}
    >
      {props.children}
    </button>
  );
}

//
//
//
//////////////////////////////////////

type ButtonIconProps = BasicProps_withChildren & {
  color?: BasicColor;
  tooltip?: string;
  onClick?: () => void;
};

export function ButtonIcon(props: ButtonIconProps) {
  return (
    <Button
      circle
      color={props.color}
      variant="ghost"
      class={"w-fit h-fit " + ExtractBasicProps_toClass(props)}
      onClick={props.onClick}
      tooltip={props.tooltip}
    >
      {props.children}
    </Button>
  );
}

//
//
//
//////////////////////////////////////

export function Join(props: BasicProps_withChildren) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `join ${cl}`;
  }

  return (
    <JoinContext.Provider value={true}>
      <div class={build_class()}>{props.children}</div>
    </JoinContext.Provider>
  );
}
