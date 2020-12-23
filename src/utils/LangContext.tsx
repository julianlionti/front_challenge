import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type LangType = "es" | "en" | "de";
interface StateProps {
  lang: LangType;
}

interface ProviderProps {
  children: ReactNode;
}

const defValue: StateProps = {
  lang: "es",
};

type ContextProps = [StateProps, Dispatch<SetStateAction<StateProps>>];

export const LangContext = createContext<ContextProps>([defValue, () => {}]);

export const LangProvider = (props: ProviderProps) => {
  const { children } = props;
  const state = useState<StateProps>(() => ({
    lang: (localStorage.getItem("lang") || "es") as LangType,
  }));

  return <LangContext.Provider value={state}>{children}</LangContext.Provider>;
};
