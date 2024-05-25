import { createContext, useContext, useMemo } from "react";
import type { RxDatabase } from "rxdb";
import type { Collections } from "./index";

export type RxProvider<C, T extends RxDatabase<C> = RxDatabase<C>> =
  | T
  | null
  | undefined;

const context = createContext<RxProvider<Collections>>(null);

export const RxProvider = context.Provider;

export const useRxDb = () => {
  const value = useContext(context);
  if (!value) {
    throw new Error("No RxDatabase provided");
  }
  return useMemo(() => value, [value]);
};
