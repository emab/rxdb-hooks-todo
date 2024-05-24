import { useRxDb } from "@/rxdb/provider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RxDatabase } from "rxdb";
import type { Observable, Subscription } from "rxjs";
import type { Collections } from "./index";

export type DbQueryOptions<V> = {
	initialValue: V;
	dependencies?: unknown[];
};

export const useDbQuery = <V>(
	query: (database: RxDatabase<Collections>) => Observable<V>,
	{ initialValue, dependencies = [] }: DbQueryOptions<V>,
) => {
	const [data, setData] = useState<V>(initialValue);
	const database = useRxDb();
	const subscription = useRef<Subscription>(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const memoizedQuery = useCallback(query, dependencies);

	useEffect(() => {
		subscription.current = memoizedQuery(database).subscribe(setData);

		return () => {
			subscription.current?.unsubscribe();
		};
	}, [database, memoizedQuery]);

	return useMemo(() => ({ data }), [data]);
};
