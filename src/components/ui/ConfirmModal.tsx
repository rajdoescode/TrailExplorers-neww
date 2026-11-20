"use client";

import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDestructive = true,
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={
        <div className="flex items-center gap-2.5 text-[#14140f]">
          {isDestructive && (
            <div className="w-8 h-8 rounded-full bg-[#fdeeed] text-[#e0455a] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          )}
          <span>{title}</span>
        </div>
      }
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={isDestructive ? "dark" : "primary"}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            className={isDestructive ? "bg-[#e0455a] hover:bg-red-700 border-none text-white" : ""}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-sm text-[#6b6b63] leading-relaxed">{message}</p>
    </Modal>
  );
};
