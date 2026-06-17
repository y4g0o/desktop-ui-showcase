import type { BasicProps_withChildren, BasicVariant } from "./base";
import { ExtractBasicProps_toClass } from "./base";
import {
  CARD_CLASS,
  PANEL_CLASS,
  PANEL_INDENT_CHILDREN,
  PANEL_BODY1_CLASS,
  PANEL_BODY2_CLASS,
} from "./base";

//
//
//
//////////////////////////////////////

export function Card(props: BasicProps_withChildren) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `card ${CARD_CLASS} ${cl}`;
  }

  return (
    <div class={build_class()}>
      <div class="card-body">{props.children}</div>
    </div>
  );
}

//
//
//
//////////////////////////////////////

export function CardEx(props: BasicProps_withChildren) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `card ${CARD_CLASS} ${cl}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

export function CardEx_Figure(props: BasicProps_withChildren) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `${cl}`;
  }

  return <figure class={build_class()}>{props.children}</figure>;
}

export function CardEx_Body(props: BasicProps_withChildren) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `card-body ${cl}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

//
//
//
//////////////////////////////////////

type PanelProps = BasicProps_withChildren & {
  title?: string;
  indent_children?: boolean;
  // variant?: BasicVariant;
};

export function Panel(props: PanelProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    return `${PANEL_CLASS} ${cl}`;
  }

  function build_children_class() {
    var indent = props.indent_children ? PANEL_INDENT_CHILDREN : "";
    return `${PANEL_BODY2_CLASS} ${indent}`;
  }

  return (
    <div class={build_class()}>
      <div class={PANEL_BODY1_CLASS}>
        {props.title && (
          <h2 class={PANEL_TITLE_CLASS}>{props.title}</h2>
        )}
        <div class={build_children_class()}>{props.children}</div>
      </div>
    </div>
  );
}
