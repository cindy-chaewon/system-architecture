"use client";

import { useState, useTransition } from "react";
import { deleteTodo, renameTodo, toggleTodo } from "../actions";
import type { Todo } from "@prisma/client";
import ConfirmDelete from "./ConfirmDelete";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onToggle = () =>
    startTransition(async () => {
      await toggleTodo(todo.id);
    });

  const onRename = () =>
    startTransition(async () => {
      if (title !== todo.title) await renameTodo(todo.id, title);
      setEditing(false);
    });

  const onDelete = () =>
    startTransition(async () => {
      await deleteTodo(todo.id);
      setConfirmOpen(false);
    });

  return (
    <li className="flex items-center gap-3 py-3">
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          defaultChecked={todo.done}
          onChange={onToggle}
          disabled={pending}
        />
      </label>

      <div className="flex-1">
        {editing ? (
          <input
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onRename()}
            autoFocus
          />
        ) : (
          <p
            className={`text-sm ${
              todo.done ? "text-slate-400 line-through" : "text-slate-800"
            }`}
          >
            {todo.title}
          </p>
        )}
      </div>

      {editing ? (
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
            disabled={pending}
            onClick={onRename}
          >
            저장
          </button>
          <button
            className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            onClick={() => setEditing(false)}
          >
            취소
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            onClick={() => setEditing(true)}
          >
            수정
          </button>
          <button
            className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
            onClick={() => setConfirmOpen(true)}
          >
            삭제
          </button>
        </div>
      )}

      {confirmOpen && (
        <ConfirmDelete
          title="이 항목을 삭제할까요?"
          description={`"${todo.title}" 항목이 영구 삭제됩니다.`}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={onDelete}
          loading={pending}
        />
      )}
    </li>
  );
}
