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
      className="flex gap-2"
    >
      <input
        className="input"
        name="title"
        placeholder="할 일을 입력하세요…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={140}
        required
      />
      <button className="btn btn-primary" type="submit" disabled={pending}>
        추가
      </button>
    </form>
  );
}
