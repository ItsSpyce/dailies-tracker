import styled from 'styled-components';

export const Input = styled.input`
  border: 3px solid ${(props) => props.theme.colors.border};
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-family: 'ZH', sans-serif;
  padding: 1rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

export const InputGroup = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr minmax(60px, auto);

  button {
    border-radius: 1rem;
  }
`;
