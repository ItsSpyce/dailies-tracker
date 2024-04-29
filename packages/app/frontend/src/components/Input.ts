import styled from 'styled-components';

export const Input = styled.input`
  border: 3px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.background};
  font-family: 'ZH', sans-serif;
  padding: 16px;
`;
