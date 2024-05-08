import styled from 'styled-components';

export const StyledLink = styled.a`
  text-decoration-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.accent};

  svg {
    transform: translateY(0.5rem);
    stroke: ${(props) => props.theme.colors.accent};
  }
`;
