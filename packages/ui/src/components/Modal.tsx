import {
  ModalWindow,
  StyledModal,
  ModalHeader,
  ModalFooter,
  ModalHeaderText,
  ModalBody,
  ModalCloseButton,
} from './Modal.styles';
import * as Icons from 'react-feather';
import { createContext, useContext } from 'react';
import { useTheme } from 'styled-components';

export type ModalProps = {
  isOpen: boolean;
  closeRequested?: () => void;
  children: React.ReactNode;
};

const noop = () => {};
const RequestCloseContext = createContext<() => void>(noop);

export function Modal({ isOpen, children, closeRequested }: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <RequestCloseContext.Provider value={closeRequested ?? noop}>
      {isOpen && (
        <StyledModal
          onClick={() => {
            closeRequested?.();
          }}
        >
          <ModalWindow
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </ModalWindow>
        </StyledModal>
      )}
    </RequestCloseContext.Provider>
  );
}

Modal.Header = function ({
  children,
  showCloseButton = false,
}: {
  children: React.ReactNode;
  showCloseButton?: boolean;
}) {
  const requestClose = useContext(RequestCloseContext);
  const theme = useTheme();
  return (
    <ModalHeader>
      <ModalHeaderText>{children}</ModalHeaderText>
      {showCloseButton && (
        <ModalCloseButton onClick={requestClose}>
          <Icons.X color={theme.colors.textColored} />
        </ModalCloseButton>
      )}
    </ModalHeader>
  );
};

Modal.Footer = function ({ children }: { children: React.ReactNode }) {
  return <ModalFooter>{children}</ModalFooter>;
};

Modal.Body = function ({ children }: { children: React.ReactNode }) {
  return <ModalBody>{children}</ModalBody>;
};
