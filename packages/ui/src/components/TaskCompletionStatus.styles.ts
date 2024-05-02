import { sif } from '../utils/scomp';
import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import { Rarity } from './Reward.styles';
import { TasksBg } from '../images';

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

export const ForegroundCircle = styled.circle`
  ${circle}
  transform: rotate(-90deg);
  transform-origin: ${halfSize}px ${halfSize}px;
  stroke-dasharray: var(--dash) calc(${circumference}px - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s, box-shadow 0.3s linear 0s,
    stroke 0.3s linear 0s;
  stroke: ${(props) => props.theme.colors.border};
  animation: pulse 4s infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const StyledTaskCompletionStatus = styled.div<{ progress: number }>`
  --dash: calc((var(--progress) * ${circumference}px) / 100);
  --progress: ${(props) => props.progress};
  background-clip: padding-box;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 400px;
  background: url(${TasksBg}) no-repeat center center;
  background-size: 100%;

  ${ForegroundCircle} {
    ${sif((props) => props.progress < 20)} {
      stroke: ${(props) => props.theme.colors.textColoredLight};
      animation: none;
    }
    ${sif((props) => props.progress >= 20)} {
      stroke: ${() => lighten(0.2, Rarity.Uncommon)};
      animation: pulse 4s infinite;
    }
    ${sif((props) => props.progress >= 40)} {
      stroke: ${() => lighten(0.2, Rarity.Rare)};
      animation: pulse 3s infinite;
    }
    ${sif((props) => props.progress >= 60)} {
      stroke: ${() => lighten(0.2, Rarity.Epic)};
      animation: pulse 2s infinite;
    }
    ${sif((props) => props.progress >= 80)} {
      stroke: ${() => lighten(0.2, Rarity.Legendary)};
      animation: pulse 1s infinite;
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
    color: ${(props) => props.theme.colors.text};
  }

  h3 {
    margin: 0;
    color: ${(props) => lighten(0.2, props.theme.colors.text)};
    font-weight: 500;
  }
`;
