import { useDbAction } from "@/rxdb/useDbAction";
import { useDbQuery } from "@/rxdb/useDbQuery";
import { useState } from "react";

export function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: todos } = useDbQuery((db) => db.todos.find().$, {
    initialValue: [],
  });

  const { run: addTodo } = useDbAction(
    (db) => async (id: string, title: string, description: string) => {
      await db.todos.insert({
        id,
        title,
        description,
        done: false,
        timestamp: new Date().toISOString(),
      });
    },
  );

  const { run: removeTodo } = useDbAction((db) => async (id: string) => {
    await db.todos.findOne({ selector: { id } })?.remove();
  });

  const { run: toggleDone } = useDbAction((db) => async (id: string) => {
    const todo = await db.todos.findOne({ selector: { id } }).exec();
    if (todo) {
      await todo.patch({ done: !todo.done });
    }
  });

  const onSubmit = () => {
    if (!title) {
      return;
    }

    void addTodo(crypto.randomUUID(), title, description);
  };

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-xl">RXJS Hook Todos</h1>
      <form
        className="grid grid-cols-1 gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="title" className="flex flex-col">
          Title
          <input
            id="title"
            className="rounded border pl-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="description" className="flex flex-col">
          Description
          <input
            id="description"
            className="rounded border pl-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit" className="rounded bg-neutral-700 text-white">
          Add
        </button>
      </form>
      <div className="grid grid-cols-1 gap-2 mt-10">
        {todos.map((todo) => (
          <div key={todo.id} className="rounded border p-1">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <h2 className="font-bold">{todo.title}</h2>
                <span>
                  <label>
                    Done{" "}
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => toggleDone(todo.id)}
                    />
                  </label>
                </span>
              </div>
              <button
                className="rounded p-1 bg-red-500 text-white"
                onClick={() => removeTodo(todo.id)}
                type="button"
              >
                Delete
              </button>
            </div>
            <p className="italic">{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
