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

export const LeftPanel = styled.div`
  max-width: 400px;
  padding: 24px;
  overflow-y: auto;
`;

export const RightPanel = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundColored};
  padding: 1.5rem;
  overflow-y: auto;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  display: grid;
  grid-template-rows: auto 1fr auto 2fr;
  row-gap: 1.5rem;
`;

export const DailiesList = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const DailiesView = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ChooseDateForm = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  height: fit-content;
  box-sizing: border-box;
`;

export const ExtraRewards = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  gap: 0.5rem;
`;

export const NotesPanel = styled.div``;
