import { splitProps } from "solid-js";
import type { BasicProps_withChildren } from "./base";
import { ExtractBasicProps_toClass } from "./base";

//
//
//
//////////////////////////////////////

type FormProps = BasicProps_withChildren & {
  label_pos?: "top" | "left";
};

export function Form(props: FormProps) {
  function build_class() {
    const cols =
      props.label_pos == "top"
        ? "grid-cols-1 form-grid-ajuste"
        : "grid-cols-2 grid-cols-[auto_1fr]";

    const gap_y = props.label_pos == "top" ? "gap-y-1" : "gap-y-4";

    const cl = ExtractBasicProps_toClass(props);

    return `grid ${cols} gap-x-5 ${gap_y} ${cl}`;
  }

  return <div class={build_class()}>{props.children}</div>;
}

//
//
//
//////////////////////////////////////

type CheckProps = BasicProps_withChildren & {
  label?: string;
  checked?: any;
  onInput?: (e: Event) => void;
  tooltip?: string;
};

export function Checkbox(props: CheckProps) {
  const [local, rest] = splitProps(props, [
    "children",
    "label",
    "checked",
    "tooltip",
    "onInput",
  ]);

  const is_live_value =
    typeof local.checked === "object" && local.checked?.get;

  const on_input = (e: Event) => {
    if (is_live_value) {
      local.checked.set((e.currentTarget as HTMLInputElement).checked);
    } else {
      local.onInput?.(e);
    }
  };

  return (
    <>
      <span class="label">{local.label}</span>
      <label class="flex items-center gap-2" title={local.tooltip}>
        <input
          type="checkbox"
          class="checkbox"
          checked={is_live_value ? local.checked.get() : local.checked}
          onInput={on_input}
          {...rest}
        />
        {local.children}
      </label>
    </>
  );
}

//
//
//
//////////////////////////////////////

// obs.: o solidjs tem um Switch, então tem que importar explicitamente ESSE
// e não o do solidjs.
//
export function Switch(props: CheckProps) {
  const [local, rest] = splitProps(props, [
    "children",
    "label",
    "checked",
    "tooltip",
    "onInput",
  ]);

  const is_live_value =
    typeof local.checked === "object" && local.checked?.get;

  const on_input = (e: Event) => {
    if (is_live_value) {
      local.checked.set((e.currentTarget as HTMLInputElement).checked);
    } else {
      local.onInput?.(e);
    }
  };

  return (
    <>
      <span class="label">{local.label}</span>

      <label
        class="flex items-center gap-2 cursor-pointer"
        title={local.tooltip}
      >
        <input
          type="checkbox"
          class="toggle"
          checked={is_live_value ? local.checked.get() : local.checked}
          onInput={on_input}
          {...rest}
        />
        {local.children}
      </label>
    </>
  );
}

//
//
//
//////////////////////////////////////

type InputTextProps = BasicProps_withChildren & {
  label?: string;
  class?: string;
  value?: any;
  password?: any;
  onInput?: (e: Event) => void;
  onEnter?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  tooltip?: string;
  placeholder?: string;
};

export function InputText(props: InputTextProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "label",
    "value",
    "password",
    "onInput",
    "onEnter",
    "onKeyDown",
    "tooltip",
    "placeholder",
  ]);

  const type = props.password ? "password" : "text";

  const is_live_value =
    typeof local.value === "object" && local.value?.get;

  const handle_input = (e: Event) => {
    if (is_live_value) {
      local.value.set((e.currentTarget as HTMLInputElement).value);
    } else {
      local.onInput?.(e);
    }
  };

  const handle_keydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && local.onEnter) {
      local.onEnter();
    }

    // mantém comportamento normal de quem passou onKeyDown
    local.onKeyDown?.(e);
  };

  return (
    <>
      {local.label && <label class="label">{local.label}</label>}

      <input
        type={type}
        class={`input input-bordered ${local.class || ""}`}
        value={is_live_value ? local.value.get() : local.value}
        onInput={handle_input}
        onKeyDown={handle_keydown}
        title={local.tooltip}
        placeholder={local.placeholder}
        {...rest}
      />
    </>
  );
}

//
//
//
//////////////////////////////////////

type InputNumberProps = BasicProps_withChildren & {
  value?: any;
  label?: string;
  class?: string;
  min?: number;
  max?: number;
  step?: number;
  password?: any;
  tooltip?: string;
  onInput?: (e: Event) => void;
};

export function InputNumber(props: InputNumberProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "label",
    "value",
    "password",
    "onInput",
    "min",
    "max",
    "step",
    "tooltip",
  ]);

  const is_live_value =
    typeof local.value === "object" && local.value?.get;

  const handle_input = (e: any) => {
    if (is_live_value) {
      local.value.set(e.target.value);
    } else {
      local.onInput?.(e);
    }
  };

  return (
    <>
      {local.label && <label class="label">{local.label}</label>}

      <input
        type="number"
        class={`input input-bordered ${local.class || ""}`}
        value={is_live_value ? local.value.get() : local.value}
        onInput={handle_input}
        min={local.min}
        max={local.max}
        step={local.step}
        title={local.tooltip}
        {...rest}
      />
    </>
  );
}
