"use client";

import { useState, useTransition } from "react";
import { createTodo } from "../actions";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(fd) =>
        startTransition(async () => {
          await createTodo(fd);
          setTitle("");
        })
      }
      className="flex gap-3"
    >
      <input
        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        name="title"
        placeholder="할 일을 입력하세요…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={140}
        required
      />
      <button
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-4 text-2xl font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 "
        type="submit"
        disabled={pending}
      >
        +
      </button>
    </form>
  );
}
