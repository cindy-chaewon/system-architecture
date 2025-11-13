export const dynamic = "force-dynamic";

import { getTodos, clearCompleted } from "./actions";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default async function Page() {
  const todos = await getTodos();

  return (
    <div className="space-y-5">
      {/* 입력 카드 */}
      <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
        <TodoForm />
      </section>

      {/* 리스트 카드 */}
      <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <form action={clearCompleted}>
            <button
              className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
              type="submit"
            >
              완료 항목 지우기
            </button>
          </form>
        </header>

        <TodoList todos={todos} />
      </section>
    </div>
  );
}
