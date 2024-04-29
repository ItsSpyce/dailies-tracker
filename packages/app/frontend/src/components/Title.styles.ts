import styled from 'styled-components';

export const StyledTitle = styled.div``;

export const StyledHeader = styled.h1`
  position: relative;
  text-align: center;
  padding: 8px 12px 20px;
  font-size: 24px;
  color: ${(props) => props.theme.colors.textColored};

  &::after {
    position: absolute;
    content: '';
    background-color: ${(props) => props.theme.colors.border};
    border-radius: 8px;
    height: 4px;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export const StyledSubHeader = styled.p`
  text-align: center;
  padding: 8px 32px;
  color: ${(props) => props.theme.colors.textColored};
`;
