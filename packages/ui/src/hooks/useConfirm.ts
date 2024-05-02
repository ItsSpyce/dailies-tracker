import { useState } from 'react';

export type UseConfirmHook = [
  showConfirm: () => void,
  confirmProps: { isOpen: boolean; onConfirm: () => void; onCancel: () => void }
];

export function useConfirm({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel?: () => void;
}): UseConfirmHook {
  const [isOpen, setIsOpen] = useState(false);
  const confirmProps = {
    isOpen,
    onConfirm: () => {
      setIsOpen(false);
      onConfirm();
    },
    onCancel: () => {
      setIsOpen(false);
      onCancel?.();
    },
  };
  return [() => setIsOpen(true), confirmProps];
}
