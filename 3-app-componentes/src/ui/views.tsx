import {
  createContext,
  useContext,
  Switch,
  Match,
  type Component,
} from "solid-js";
import type { BasicProps_withChildren } from "./base";

const ViewsContext = createContext();

export type ViewsProps = BasicProps_withChildren & {
  which: any;
};

export function Views(props: ViewsProps) {
  function Fallback(props: any) {
    return <div class="w-full h-full bg-gray-500"></div>;
  }

  const is_live_value = () =>
    typeof props.which === "object" && props.which?.get;

  return (
    <ViewsContext.Provider
      value={is_live_value() ? props.which.get : props.which}
    >
      <Switch fallback={<Fallback />}>{props.children}</Switch>
    </ViewsContext.Provider>
  );
}

export type ViewProps = BasicProps & {
  when: any;
  use: Component;
};

export function View(props: ViewProps) {
  const which = useContext<any>(ViewsContext);

  return <Match when={which() == props.when}>{props.use}</Match>;
}
