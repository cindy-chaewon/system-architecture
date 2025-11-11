"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  const todos = await prisma.todo.findMany({
    orderBy: [{ done: "asc" }, { createdAt: "desc" }],
  });
  return todos;
}

export async function createTodo(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  if (!title) return;
  await prisma.todo.create({ data: { title } });
  revalidatePath("/");
}

export async function toggleTodo(id: number) {
  const t = await prisma.todo.findUnique({ where: { id } });
  if (!t) return;
  await prisma.todo.update({
    where: { id },
    data: { done: !t.done },
  });
  revalidatePath("/");
}

export async function renameTodo(id: number, title: string) {
  const v = title.trim();
  if (!v) return;
  await prisma.todo.update({
    where: { id },
    data: { title: v },
  });
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({ where: { id } });
  revalidatePath("/");
}

export async function clearCompleted() {
  await prisma.todo.deleteMany({ where: { done: true } });
  revalidatePath("/");
}
