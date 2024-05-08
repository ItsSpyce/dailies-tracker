import { StyledClaimRewardsButton } from './ClaimRewardsButton.styles';
import { Checkbox } from './Checkbox';
import { useState } from 'react';
import { useI18n } from '../states';

export const ClaimRewardsButton = () => {
  const [i18n] = useI18n();
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
