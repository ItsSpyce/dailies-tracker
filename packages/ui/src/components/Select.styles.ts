import styled from 'styled-components';

export const StyledSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SelectLabel = styled.label``;

export const ActualSelect = styled.select`
  border: 3px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.background};
  font-family: 'ZH', sans-serif;
  padding: 16px;
`;
