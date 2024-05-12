import { usePrepareDailiesTimer } from '../hooks/usePrepareDailiesTimer';
import { useCommissionService, useRewardService } from '../states';
import { Button } from './Button';
import { Modal, NewModalProps } from './Modal';

export const DebugModal: React.FC<NewModalProps> = (props) => {
  const commissionService = useCommissionService();
  const rewardService = useRewardService();
  const notify = usePrepareDailiesTimer();

  return (
    <Modal {...props}>
      <Modal.Header showCloseButton>Debug</Modal.Header>
      <Modal.Body>
        <Button onClick={notify}>Notify</Button>
        <Button onClick={() => commissionService.getCommissions(Date.now())}>
          Get available commissions
        </Button>
        <Button onClick={() => rewardService.getAvailableRewards()}>
          Get available rewards
        </Button>
      </Modal.Body>
    </Modal>
  );
};
