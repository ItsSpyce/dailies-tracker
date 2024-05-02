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
  top: -0.2rem;
`;

export const RewardCount = styled.span`
  width: 100%;
  text-align: center;
  color: #fff;
  border-radius: 0 0 0.5rem 0.5rem;
  font-size: 0.75rem;
  z-index: 1;
  padding: 5% 0;
`;

export const StyledReward = styled.div<{
  rarity: Rarity;
  size: 'sm' | 'md' | 'lg';
}>`
  background-image: linear-gradient(
    to top left,
    ${(props) => props.rarity},
    ${(props) => darken(0.1, props.rarity)}
  );
  background-color: ${(props) => props.rarity};
  border-radius: 0.5rem;
  display: grid;
  place-items: end;
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;

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
