import { createSignal, createEffect } from "solid-js";

import {
  type BasicProps_withChildren,
  ExtractBasicProps_toClass,
  BTN_CLASS,
} from "./base";

import {
  IconInfo,
  IconTriangleAlert,
  IconCircleQuestionMark,
  IconCircleX,
  IconCheck,
  IconX,
} from "./icons";

const DIALOG_ICON_DIV_CLASS = "mb-1 rounded-full inline-block p-2";
const DIALOG_INFO = "text-[var(--color-info-soft-content)]";
const DIALOG_INFO_BG = "bg-[var(--color-info-soft)]";
const DIALOG_WARNING = "text-[var(--color-warning-soft-content)]";
const DIALOG_WARNING_BG = "bg-[var(--color-warning-soft)]";
const DIALOG_ERROR = "text-[var(--color-error-soft-content)]";
const DIALOG_ERROR_BG = "bg-[var(--color-error-soft)]";
const DIALOG_QUESTION = "text-[var(--color-accent-soft-content)]";
const DIALOG_QUESTION_BG = "bg-[var(--color-accent-soft)]";
const DIALOG_SUCCESS = "text-[var(--color-success-soft-content)]";
const DIALOG_SUCCESS_BG = "bg-[var(--color-success-soft)]";

const DIALOG_BTN_CANCEL = "";
const DIALOG_BTN_OK = "btn-primary";
const DIALOG_BTN_NO = "btn-error";
const DIALOG_BTN_YES = "btn-success";

export type DialogObj = {
  isOpen: () => boolean;
  open: () => void;
  close: () => void;
  enter: () => void; // click default no botão com index=1
  enterButton: (buttonIndex: number) => void;
  onClick?: (buttonIndex: number) => void;
  onOpen?: () => void;
};

export function DialogNew(): DialogObj {
  const [isOpen, setIsOpen] = createSignal(false);

  const obj: DialogObj = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    enter: () => {
      obj.enterButton(1);
    },
    enterButton: (buttonIndex: number) => {
      obj.onClick?.(buttonIndex);
      obj.close();
    },
  };

  return obj;
}

export type DialogIcon =
  | "info"
  | "warning"
  | "question"
  | "error"
  | "success"
  | undefined;

export type DialogButtons = "ok" | "ok_cancel" | "yes_no" | undefined;

export type DialogProps = BasicProps_withChildren & {
  id: DialogObj;
  title?: string;
  open?: boolean;
  icon?: DialogIcon;
  icon_pos?: "top" | "left" | undefined;
  buttons?: DialogButtons;
  size?: "size1_sm" | "size2_md" | undefined;
};

export function DialogIcon_toIcon(type: DialogIcon) {
  const icon_map = {
    info: [IconInfo, DIALOG_INFO, DIALOG_INFO_BG],
    warning: [IconTriangleAlert, DIALOG_WARNING, DIALOG_WARNING_BG],
    question: [
      IconCircleQuestionMark,
      DIALOG_QUESTION,
      DIALOG_QUESTION_BG,
    ],
    error: [IconCircleX, DIALOG_ERROR, DIALOG_ERROR_BG],
    success: [IconCheck, DIALOG_SUCCESS, DIALOG_SUCCESS_BG],
    default: [undefined, undefined, undefined],
  };

  const [Icon, icon_cl, icon_bg_cl] = icon_map[type ?? "default"];

  if (Icon) {
    return (
      <div class={`${DIALOG_ICON_DIV_CLASS} ${icon_bg_cl}`}>
        <Icon class={`${icon_cl}`} />
      </div>
    );
  } else {
    return <> </>;
  }
}

export function Dialog(props: DialogProps) {
  const DLG_BTN_CLASS = "w-40";

  let ref!: HTMLDialogElement;
  const obj = props.id;

  if (props.open) obj.open();

  createEffect(() => {
    if (obj.isOpen()) {
      obj.onOpen?.();
      ref.showModal();
    } else {
      ref.close();
    }
  });

  function on_btn_click(index: number) {
    obj.enterButton(index);
  }

  const icon_pos = () => props.icon_pos ?? "top";
  const buttons = () => props.buttons ?? "ok";

  ////
  //
  const btn_cancelar = (
    <button
      class={`${BTN_CLASS} ${DIALOG_BTN_CANCEL} ${DLG_BTN_CLASS}`}
      onClick={() => on_btn_click(0)}
    >
      Cancelar
    </button>
  );
  const btn_ok = (
    <button
      class={`${BTN_CLASS} ${DIALOG_BTN_OK} ${DLG_BTN_CLASS}`}
      onClick={() => on_btn_click(1)}
    >
      OK
    </button>
  );
  const btn_no = (
    <button
      class={`${BTN_CLASS} ${DIALOG_BTN_NO} ${DLG_BTN_CLASS}`}
      onClick={() => on_btn_click(0)}
    >
      Não
    </button>
  );
  const btn_yes = (
    <button
      class={`${BTN_CLASS} ${DIALOG_BTN_YES} ${DLG_BTN_CLASS}`}
      onClick={() => on_btn_click(1)}
    >
      Sim
    </button>
  );
  const btns_map = {
    ok: () => [btn_ok],
    ok_cancel: () => [btn_cancelar, btn_ok],
    yes_no: () => [btn_no, btn_yes],
  };
  //
  /////

  function build_class() {
    const cl = ExtractBasicProps_toClass(props);

    const size_cl = {
      size1_sm: "w-92",
      size2_md: "",
      default: "",
    }[props.size ?? "default"];

    return `modal-box relative bg-base-100 p-5 ${size_cl} ${cl}`;
  }

  return (
    <dialog
      ref={ref}
      class="modal"
      onClose={obj.close}
      onClick={(e) => e.target === ref && obj.close()}
    >
      <div class={build_class()}>
        <button
          class={`${BTN_CLASS} btn-sm btn-circle btn-ghost absolute right-4 top-4`}
          onClick={obj.close}
          aria-label="Fechar"
          tabIndex={-1}
        >
          <IconX />
        </button>

        {icon_pos() == "top" && (
          <>
            {props.icon && DialogIcon_toIcon(props.icon)}
            {props.title && (
              <h3 class="text-lg font-bold">{props.title}</h3>
            )}
            <div class="mt-1 mb-1 text-base-content/70">
              {props.children}
            </div>
          </>
        )}

        {icon_pos() == "left" && (
          <>
            <div class="flex items-start gap-4 mt-5">
              {props.icon && DialogIcon_toIcon(props.icon)}
              <div class="grow">
                {props.title && (
                  <h3 class="text-lg font-bold">{props.title}</h3>
                )}
                <div class="mt-1 mb-1 text-base-content/70">
                  {props.children}
                </div>
              </div>
            </div>
          </>
        )}

        {buttons() && (
          <div class="modal-action border-t border-base-300 bg-base-100 p-5 mt-4 -ml-5 -mr-5 -mb-5">
            {btns_map[buttons()]()}
          </div>
        )}
      </div>
    </dialog>
  );
}
