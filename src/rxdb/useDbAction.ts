import { useRxDb } from "@/rxdb/provider";
import { useCallback, useMemo } from "react";
import type { RxDatabase } from "rxdb";
import type { Collections } from "./index";

export type DbQueryOptions = {
  dependencies?: unknown[];
};

export const useDbAction = <V, Args extends unknown[]>(
  action: (database: RxDatabase<Collections>) => (...args: Args) => Promise<V>,
  { dependencies = [] }: DbQueryOptions = {},
) => {
  const database = useRxDb();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedAction = useCallback(action, dependencies);

  const run = useCallback(
    (...args: Args) => memoizedAction(database)(...args),
    [database, memoizedAction],
  );

  return useMemo(() => ({ run }), [run]);
};
