export const dynamic = "force-dynamic";

import { getTodos, clearCompleted } from "./actions";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default async function Page() {
  const todos = await getTodos();

  return (
    <div className="space-y-4">
      <div className="card">
        <TodoForm />
      </div>

      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <form action={clearCompleted}>
            <button className="btn btn-ghost text-sm" type="submit">
              완료 항목 지우기
            </button>
          </form>
        </div>

        <TodoList todos={todos} />
      </div>
    </div>
  );
}
