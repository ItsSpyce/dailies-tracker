import {
  useClaimsService,
  useCommissionService,
  useRewardService,
} from '../states';
import { Button } from './Button';
import { Modal, NewModalProps } from './Modal';

export const DebugModal: React.FC<NewModalProps> = (props) => {
  const commissionService = useCommissionService();
  const rewardService = useRewardService();
  const claimsService = useClaimsService();

  return (
    <Modal {...props}>
      <Modal.Header showCloseButton>Debug</Modal.Header>
      <Modal.Body>
        <Button onClick={claimsService.clearTodaysClaims}>
          Clear todays claims
        </Button>
        <Button
          onClick={() =>
            commissionService.getCommissions(new Date().toISOString())
          }
        >
          Get available commissions
        </Button>
        <Button onClick={() => rewardService.getAvailableRewards()}>
          Get available rewards
        </Button>
      </Modal.Body>
    </Modal>
  );
};
