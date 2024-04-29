import { useI18n } from '../hooks';
import { StyledClaimRewardsButton } from './ClaimRewardsButton.styles';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

export const ClaimRewardsButton = () => {
  const i18n = useI18n();
  const [isClaimed, setIsClaimed] = useState(false);

  return (
    <StyledClaimRewardsButton
      onClick={() => {
        setIsClaimed((prev) => !prev);
      }}
    >
      <Checkbox checked={isClaimed} />
      {i18n['app.dailies.claimed']}
    </StyledClaimRewardsButton>
  );
};
