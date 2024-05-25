import { useRxDb } from "@/rxdb/provider";
import { useEffect, useState } from "react";
import type { RxDatabase } from "rxdb";
import type { Observable } from "rxjs";

export const useRxDbQuery = <D extends RxDatabase, T>(
  query: (database: D) => Observable<T>,
  initialValue?: T,
) => {
  const database = useRxDb();

  const [data, setData] = useState<T | undefined>(initialValue);

  useEffect(() => {
    const query$ = query(database as unknown as D);

    const subscription = query$.subscribe({
      next: (data) => {
        setData(data);
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [database, query]);

  return data;
};
