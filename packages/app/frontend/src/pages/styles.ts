import styled from 'styled-components';

export const StyledApp = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 24px;
  height: calc(100% - 48px);
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
`;

export const StatusPanel = styled.div`
  max-width: 400px;
  padding: 24px;
`;

export const DailiesPanel = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColored};
  padding: 24px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  display: grid;
  grid-template-rows: auto auto 1fr;
`;

export const DailiesList = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ChooseDateForm = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

export const ExtraRewards = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  gap: 0.5rem;
`;
