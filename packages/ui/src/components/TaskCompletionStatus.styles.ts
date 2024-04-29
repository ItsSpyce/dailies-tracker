import { sif } from '../utils/scomp';
import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import { Rarity } from './Reward.styles';

const size = 250;
const halfSize = size / 2;
const strokeWidth = 20;
const radius = (size - strokeWidth) / 2;
const circumference = radius * Math.PI * 2;

const circle = css`
  cx: ${halfSize}px;
  cy: ${halfSize}px;
  r: ${radius}px;
  stroke-width: ${strokeWidth}px;
  fill: none;
  stroke-linecap: round;
`;

export const BackgroundCircle = styled.circle`
  ${circle}
  stroke: ${(props) => lighten(0.5, props.theme.colors.border)};
`;

export const ForegroundGlow = styled.circle`
  ${circle}

  @keyframes pulse {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

export const ForegroundCircle = styled.circle`
  ${circle}
  transform: rotate(-90deg);
  transform-origin: ${halfSize}px ${halfSize}px;
  stroke-dasharray: var(--dash) calc(${circumference}px - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s, box-shadow 0.3s linear 0s;
  stroke: ${(props) => props.theme.colors.border};
`;

export const StyledTaskCompletionStatus = styled.div<{ progress: number }>`
  --dash: calc((var(--progress) * ${circumference}px) / 100);
  --progress: ${(props) => props.progress};
  background-clip: padding-box;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 300px;

  ${ForegroundGlow} {
    ${sif((props) => props.progress < 20)} {
      display: none;
    }
    ${sif((props) => props.progress >= 20)} {
      stroke: ${() => lighten(0.2, Rarity.Uncommon)};
      filter: blur(2px);
      animation: pulse 4s infinite;
    }
    ${sif((props) => props.progress >= 40)} {
      stroke: ${() => lighten(0.2, Rarity.Rare)};
      filter: blur(4px);
      animation: pulse 3s infinite;
    }
    ${sif((props) => props.progress >= 60)} {
      stroke: ${() => lighten(0.2, Rarity.Epic)};
      filter: blur(6px);
      animation: pulse 2s infinite;
    }
    ${sif((props) => props.progress >= 80)} {
      stroke: ${() => lighten(0.2, Rarity.Legendary)};
      filter: blur(8px);
      animation: pulse 1s infinite;
    }
  }

  ${ForegroundCircle} {
    ${sif((props) => props.progress < 20)} {
      stroke: ${() => Rarity.Common};
      box-shadow: none;
    }
    ${sif((props) => props.progress >= 20 && props.progress < 40)} {
      stroke: ${() => Rarity.Uncommon};
    }
    ${sif((props) => props.progress >= 40 && props.progress < 60)} {
      stroke: ${() => Rarity.Rare};
    }
    ${sif((props) => props.progress >= 60 && props.progress < 80)} {
      stroke: ${() => Rarity.Epic};
    }
    ${sif((props) => props.progress >= 80)} {
      stroke: ${() => Rarity.Legendary};
    }
  }
`;

export const CircleProgress = styled.svg`
  position: absolute;
`;

export const TaskStatus = styled.div`
  text-align: center;

  h1 {
    font-size: 5rem;
    margin: 0;
    font-weight: 500;
  }

  h3 {
    margin: 0;
    color: ${(props) => lighten(0.2, props.theme.colors.text)};
    font-weight: 500;
  }
`;
