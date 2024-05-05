import { useCallback, useState } from 'react';
import { ModalProps } from '../components';

export type UseModalInit = {
  isOpen?: boolean;
  beforeClose?: () => CouldBePromise<void | boolean>;
  afterClose?: () => CouldBePromise<void>;
};

export type UseModalHook = [
  modalProps: Pick<ModalProps, 'isOpen' | 'closeRequested'>,
  toggleModal: () => void
];

export function useModal(init?: UseModalInit): UseModalHook {
  const [isOpen, setIsOpen] = useState(false);
  const beforeClose = useCallback(init?.beforeClose ?? (() => true), [
    init?.beforeClose,
  ]);
  const afterClose = useCallback(init?.afterClose ?? (() => true), [
    init?.afterClose,
  ]);

  const toggleModal = useCallback(async () => {
    if (isOpen) {
      const beforeCloseResult = await beforeClose();
      if (beforeCloseResult != null && beforeCloseResult) {
        setIsOpen(false);
        await afterClose();
      }
    } else {
      setIsOpen(true);
    }
  }, [beforeClose, afterClose, isOpen]);

  return [{ isOpen, closeRequested: toggleModal }, toggleModal];
}
