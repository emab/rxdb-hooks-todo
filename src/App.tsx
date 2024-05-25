import { RxProvider } from "@/rxdb/provider";
import { Todo } from "./Todo";
import { initDb } from "./rxdb";

const database = await initDb();

export function App() {
  return (
    <RxProvider value={database}>
      <Todo />
    </RxProvider>
  );
}
