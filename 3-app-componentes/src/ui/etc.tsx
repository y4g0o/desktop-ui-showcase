import { createSignal, createUniqueId, For, Switch } from "solid-js";

import type {
  BasicProps,
  BasicProps_withChildren,
  BasicColor,
  BasicSize,
  BasicVariant,
  BasicQuadSize,
} from "./base";

import {
  ExtractBasicProps_toClass,
  BasicColor_toProgress,
  BasicColor_toBadge,
  BasicColor_toBackground,
  BasicSize_toBadge,
  BasicVariant_toBadge,
  BasicQuadSize_toClass,
  DEFAULT_QUAD_COLOR,
  DEFAULT_CIRCLE_COLOR,
  DEFAULT_QUAD_SIZE,
  DEFAULT_CIRCLE_SIZE,
} from "./base";
import { IconMoon, IconSun } from "./icons";

//
//
//
//////////////////////////////////////

export function Loading() {
  return <span class="loading loading-spinner"></span>;
}

//
//
//
//////////////////////////////////////

type QuadProps = BasicProps_withChildren & {
  color?: BasicColor;
  size?: BasicQuadSize;
};

export function Quad(props: QuadProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    const cor_bg = props.color
      ? BasicColor_toBackground(props.color, false)
      : DEFAULT_QUAD_COLOR;
    const size = props.size
      ? BasicQuadSize_toClass(props.size)
      : DEFAULT_QUAD_SIZE;
    return `${size} ${cor_bg} ${cl}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

//
//
//
//////////////////////////////////////

type CircleProps = BasicProps_withChildren & {
  tooltip?: string;
  color?: BasicColor;
  size?: BasicQuadSize;
};

export function Circle(props: CircleProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    const cor_bg = props.color
      ? BasicColor_toBackground(props.color, false)
      : DEFAULT_CIRCLE_COLOR;
    const size = props.size
      ? BasicQuadSize_toClass(props.size)
      : DEFAULT_CIRCLE_SIZE;

    return `${size} ${cor_bg} rounded-full ${cl}`;
  }

  return (
    <div class={build_class()} title={props.tooltip}>
      {props.children}
    </div>
  );
}

//
//
//
//////////////////////////////////////

type CollapseProps = BasicProps_withChildren & {
  title: string;
};

export function Collapse(props: CollapseProps) {
  const cl = () => ExtractBasicProps_toClass(props);

  return (
    <div
      class={`collapse collapse-arrow bg-base-100 text-base-content border border-base-300 ${cl()}`}
    >
      <input type="checkbox" class="peer" />
      <div class="collapse-title font-semibold after:inset-s-5 after:end-auto pe-4 ps-12">
        {props.title}
      </div>
      <div class="collapse-content text-sm z-1">{props.children}</div>
    </div>
  );
}

//
//
//
//////////////////////////////////////

type ChatBubbleProps = BasicProps_withChildren & {
  right?: boolean;
  space_class?: string;
};

export function ChatBubble(props: ChatBubbleProps) {
  const side = () => (props.right ? "chat-end" : "chat-start");

  return (
    <div class={`chat ${side()} ${props.space_class}`}>
      <div class={`chat-bubble ${props.class}`}>{props.children}</div>
    </div>
  );
}

//
//
//
//////////////////////////////////////

type RatingProps = BasicProps & {
  value?: number; // Valor inicial (de 1 até max)
  max?: number; // padrão: 5
  readonly?: boolean;
  name?: string; // Nome do grupo de radios (manual ou gerado automaticamente)
  star_class?: string;
  onChange?: (value: number) => void;
};

export function Rating(props: RatingProps) {
  const cl = () => ExtractBasicProps_toClass(props);

  const max = () => props.max ?? 5;
  const star_class = () => props.star_class ?? "bg-orange-400";
  const [value, setValue] = createSignal(props.value ?? 0);

  const handle_change = (newValue: number) => {
    if (props.readonly) return;

    setValue(newValue);
    props.onChange?.(newValue);
  };

  const name = "rating-" + createUniqueId();

  return (
    <div class={`rating ${props.class} ${cl()}`}>
      <For each={Array.from({ length: max() }, (_, i) => i + 1)}>
        {(star) => (
          <input
            type="radio"
            name={props.name || name}
            class={`mask mask-star ${star_class()}`}
            checked={value() === star}
            onChange={() => handle_change(star)}
            disabled={props.readonly}
          />
        )}
      </For>
    </div>
  );
}

//
//
//
//////////////////////////////////////

type ProgressBarProps = BasicProps & {
  color?: BasicColor;
  value?: number;
  max?: number;
  label?: string;
  width?: string;
};

export function ProgressBar(props: ProgressBarProps) {
  let cl = () => ExtractBasicProps_toClass(props);

  function build_class() {
    const cor = BasicColor_toProgress(props.color);
    const width = props.width ?? "w-56";

    return `progress ${cor} ${width}`;
  }

  const max = () => props.max ?? "100";
  const val = () => (props.value ? { value: props.value } : {});

  let p = (
    <progress class={build_class()} {...val()} max={max()}></progress>
  );

  let simple_p = <div class={cl()}>{p}</div>;

  return (
    <Switch fallback={simple_p}>
      <Match when={props.label && props.value}>
        <div class={`flex flex-col gap-0.5 ${cl()}`}>
          <div class="flex items-center flex-row justify-between">
            <span>{props.label}</span>
            <span class="font-bold">{props.value + "%"}</span>
          </div>
          {p}
        </div>
      </Match>
    </Switch>
  );
}

//
//
//
//////////////////////////////////////

export type SwitchThemeProps = BasicProps & {
  checked?: boolean;
};

export function SwitchTheme(props: SwitchThemeProps) {
  const cl = () => ExtractBasicProps_toClass(props);
  return (
    <label class={`flex cursor-pointer gap-2 items-center ${cl()}`}>
      <IconSun size={20} />
      <input
        type="checkbox"
        value="rc1-dark"
        class="toggle theme-controller bg-inherit text-inherit"
        checked={props.checked}
      />
      <IconMoon size={20} />
    </label>
  );
}

//
//
//
//////////////////////////////////////

type BadgeProps = BasicProps_withChildren & {
  color?: BasicColor;
  size?: BasicSize;
  variant?: BasicVariant;
};

export function Badge(props: BadgeProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    const cor = BasicColor_toBadge(props.color);
    const tamanho = BasicSize_toBadge(props.size, "badge-sm");
    const variant = BasicVariant_toBadge(props.variant);

    return `badge ${tamanho} ${cor} ${variant} ${cl}`;
  }
  return <div class={build_class()}>{props.children}</div>;
}

//
//
//
//////////////////////////////////////

export type CarouselProps = BasicProps_withChildren & {
  border?: boolean;
};

export function Carousel(props: CarouselProps) {
  function build_class() {
    const cl = ExtractBasicProps_toClass(props);
    const borda = props.border ? "space-x-px p-px" : "";

    return `carousel ${borda} ${cl}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

export function CarouselItem(props: BasicProps_withChildren) {
  const cl = () => ExtractBasicProps_toClass(props);
  return <div class={`carousel-item ${cl()}`}>{props.children}</div>;
}
