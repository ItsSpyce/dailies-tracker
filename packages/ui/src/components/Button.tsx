import { sif } from '../utils/scomp';
import { darken } from 'polished';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import * as Icons from 'react-feather';

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background-color: ${(props) => props.theme.colors.backgroundColored};
  color: ${(props) => props.theme.colors.text};
  column-gap: 8px;
  align-items: center;
  text-align: center;
  padding: 16px 12px;
  font-family: inherit;
  font-size: 20px;
  border: 3px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  box-shadow: none;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;

  &:hover {
    background-color: ${(props) =>
      darken(0.05, props.theme.colors.backgroundColored)};
    outline: none;
    box-shadow: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${sif('variant', 'primary')} {
    background-color: ${(props) => props.theme.colors.accent};
    color: white;
    border-color: ${(props) => props.theme.colors.accent};

    &:hover {
      color: ${(props) => props.theme.colors.text};
    }
  }

  ${sif('variant', 'secondary')} {
    background-color: ${(props) => props.theme.colors.background};
  }

  ${sif((props) => React.Children.count(props.children) === 1)} {
    display: grid;
    grid-template-columns: 1fr;
  }

  ${sif((props) => React.Children.count(props.children) === 2)} {
    display: grid;
    grid-template-columns: auto 1fr;
  }
`;

export const TextButton = styled.button<{ noLine?: boolean }>`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.accent};
  text-decoration: underline solid ${(props) => props.theme.colors.accent};
  padding: 0;
  margin: 0;
  display: inline;
  font-weight: 400;
  font-family: inherit;
  position: relative;

  &:hover {
    text-decoration: none;
  }

  ${sif('noLine', true)} {
    text-decoration: none;
  }

  svg {
    transform: translateY(0.5rem);
  }
`;

export type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  Icons.IconProps & {
    icon: keyof typeof Icons;
  };

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  id,
  style,
  ...props
}) => {
  const Icon = Icons[icon];
  const theme = useTheme();
  return (
    <StyledIconButton
      onClick={onClick}
      className={className}
      id={id}
      style={style}
    >
      <Icon color={theme.colors.textColored} {...props} />
    </StyledIconButton>
  );
};

const StyledIconButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: fit-content;
  padding: 1rem;
`;
