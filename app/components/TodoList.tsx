import { Todo } from "@prisma/client";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return <p className="text-sm text-gray-500">아직 할 일이 없습니다.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  );
}
