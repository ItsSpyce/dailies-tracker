import styled from 'styled-components';

export type TextProps = {
  align?: 'left' | 'center' | 'right';
};

export const Text = styled.p<TextProps>`
  text-align: ${(props) => props.align ?? 'left'};
  margin: 0;
  padding: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text};
`;
