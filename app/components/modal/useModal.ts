"use client";

import { useCallback, useEffect, useState } from "react";

export function useModal(defaultOpen = false) {
  const [isOpen, setOpen] = useState(defaultOpen);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return { isOpen, open, close };
}
