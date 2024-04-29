import { lighten } from 'polished';
import styled from 'styled-components';

export const StyledNotes = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 0.5rem;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex: 1;
`;

export const NotesBackground = styled.img`
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 200px;
  height: 200px;
  z-index: 0;
`;

export const ActualContent = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 1rem 1.5rem;
  width: 100%;

  h4 {
    margin-bottom: 0.5rem;
  }

  .mdxeditor,
  .mdxeditor * {
    font-family: 'ZH', sans-serif;
    padding: 0;
  }
`;

export const NotesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  z-index: 1;
`;

export const NotesContent = styled.div`
  font-family: 'ZH', sans-serif;
  outline: none;
  border: 2px solid ${(props) => lighten(0.1, props.theme.colors.border)};
  background: transparent;
  resize: none;
  padding: 1rem;
  cursor: text;
`;

export const NotesLeft = styled(NotesContent)`
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
`;

export const NotesRight = styled(NotesContent)`
  border-radius: 0 0.5rem 0.5rem 0;
`;
