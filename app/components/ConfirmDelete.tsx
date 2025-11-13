"use client";

import Modal from "./modal/Modal";
import { useModal } from "./modal/useModal";

type Props = {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function ConfirmDelete({
  title,
  description,
  onConfirm,
  onCancel,
  loading,
}: Props) {
  const { isOpen, close } = useModal(true);

  const handleClose = () => {
    close();
    onCancel();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description && <p className="text-sm text-slate-500">{description}</p>}
        <div className="pt-2 flex justify-end gap-2">
          <button
            className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            onClick={handleClose}
          >
            취소
          </button>
          <button
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60"
            onClick={onConfirm}
            disabled={loading}
          >
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
}
