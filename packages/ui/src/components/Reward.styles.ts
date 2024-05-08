import { sif } from '../utils/scomp';
import { darken, invert, rgba } from 'polished';
import styled from 'styled-components';

export enum Rarity {
  Common = '#7a7a78',
  Uncommon = '#658d72',
  Rare = '#6485a1',
  Epic = '#a678b6',
  Legendary = '#cc812e',
}

export const RewardIcon = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const RewardCount = styled.span`
  width: 100%;
  text-align: center;
  color: #fff;
  border-radius: 0 0 0.5rem 0.5rem;
  font-size: 0.75rem;
  z-index: 1;
  padding-bottom: 2%;
`;

export const StyledReward = styled.div<{
  size?: 'sm' | 'md' | 'lg';
}>`
  border-radius: 0.5rem;
  display: grid;
  place-items: end;
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;

  ${sif('size', undefined)} {
    aspect-ratio: 9/10;
    ${RewardCount} {
      display: none;
    }
  }

  ${sif('size', 'sm')} {
    ${RewardCount} {
      font-size: 0.5rem;
    }
    height: 3.25rem;
    width: 3rem;
  }

  ${sif('size', 'md')} {
    height: 4.4rem;
    width: 4rem;
    ${RewardCount} {
      font-size: 0.75rem;
    }
  }

  ${sif('size', 'lg')} {
    height: 5.3rem;
    width: 5rem;
    ${RewardCount} {
      font-size: 0.875rem;
    }
  }
`;
