import { I18nProvider } from '@dailies-tracker/i18n';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Modal } from './Modal';
import { I18n } from './I18n';

export type ConfirmProps = {
  title: keyof I18nProvider;
  message: keyof I18nProvider;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
};

export const Confirm: React.FC<ConfirmProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => (
  <Modal isOpen={isOpen} closeRequested={() => onCancel()}>
    <Modal.Header>
      <I18n iden={title} />
    </Modal.Header>
    <Modal.Body>
      <I18n iden={message} />
    </Modal.Body>
    <Modal.Footer>
      <ButtonGroup>
        <Button onClick={onConfirm} variant="primary">
          <I18n iden="app.confirm" />
        </Button>
        <Button onClick={onCancel}>
          <I18n iden="app.cancel" />
        </Button>
      </ButtonGroup>
    </Modal.Footer>
  </Modal>
);
