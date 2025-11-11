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
          className="h-4 w-4 accent-blue-600"
          defaultChecked={todo.done}
          onChange={onToggle}
          disabled={pending}
        />
      </label>

      <div className="flex-1">
        {editing ? (
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onRename()}
            autoFocus
          />
        ) : (
          <p
            className={`text-sm ${
              todo.done ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </p>
        )}
      </div>

      {editing ? (
        <div className="flex items-center gap-2">
          <button
            className="btn btn-primary"
            disabled={pending}
            onClick={onRename}
          >
            저장
          </button>
          <button className="btn btn-ghost" onClick={() => setEditing(false)}>
            취소
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost" onClick={() => setEditing(true)}>
            수정
          </button>
          <button
            className="btn btn-ghost text-red-600"
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
