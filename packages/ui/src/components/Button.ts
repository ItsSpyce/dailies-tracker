import { sif } from '../utils/scomp';
import { darken } from 'polished';
import React from 'react';
import styled from 'styled-components';

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

  &:hover {
    background-color: ${(props) =>
      darken(0.05, props.theme.colors.backgroundColored)};
    outline: none;
    box-shadow: none;
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

export const TextButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  padding: 0;
  margin: 0;
  display: inline;
  font-weight: 400;
  font-family: inherit;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${(props) => props.theme.colors.text};
  }

  &:hover {
    &::after {
      background-color: transparent;
    }
  }
`;
