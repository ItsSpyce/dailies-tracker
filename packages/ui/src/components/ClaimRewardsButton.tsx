import { StyledClaimRewardsButton } from './ClaimRewardsButton.styles';
import { Checkbox } from './Checkbox';
import { useState } from 'react';
import { I18n } from './I18n';

export const ClaimRewardsButton = () => {
  const [isClaimed, setIsClaimed] = useState(false);

  return (
    <StyledClaimRewardsButton
      onClick={() => {
        setIsClaimed((prev) => !prev);
      }}
    >
      <Checkbox checked={isClaimed} />
      <I18n iden="app.dailies.claimed" />
    </StyledClaimRewardsButton>
  );
};
