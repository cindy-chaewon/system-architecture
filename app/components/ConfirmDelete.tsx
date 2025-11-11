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
  const { isOpen, close } = useModal(true); // 처음 열림

  const handleClose = () => {
    close();
    onCancel();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="space-y-3">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        <div className="pt-1 flex justify-end gap-2">
          <button className="btn btn-ghost" onClick={handleClose}>
            취소
          </button>
          <button className="btn btn-primary" onClick={onConfirm} disabled={loading}>
            삭제
          </button>
        </div>
      </div>
    </Modal>
  );
}
