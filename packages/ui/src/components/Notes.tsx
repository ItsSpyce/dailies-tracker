import { ContainerWithTail } from './ContainerWithTail';
import {
  ActualContent,
  NotesBackground,
  NotesContainer,
  NotesLeft,
  NotesRight,
  StyledNotes,
} from './Notes.styles';
import { useRef } from 'react';
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useLocalStorage } from '@/hooks';

export const Notes = () => {
  const leftRef = useRef<MDXEditorMethods>(null);
  const rightRef = useRef<MDXEditorMethods>(null);

  const [leftContent, setLeftContent] = useLocalStorage(
    'notes-left',
    '#Take your notes!'
  );
  const [rightContent, setRightContent] = useLocalStorage('notes-right', '');

  return (
    <ContainerWithTail>
      <StyledNotes>
        <NotesBackground src="/images/notes-bg.png" />
        <ActualContent>
          <h4>Notes</h4>
          <NotesContainer>
            <NotesLeft onClick={(e) => leftRef.current?.focus()}>
              <MDXEditor
                plugins={[
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                ]}
                ref={leftRef}
                markdown={leftContent}
                onChange={setLeftContent}
              />
            </NotesLeft>
            <NotesRight onClick={(e) => rightRef.current?.focus()}>
              <MDXEditor
                plugins={[
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                ]}
                ref={rightRef}
                markdown={rightContent}
                onChange={setRightContent}
              />
            </NotesRight>
          </NotesContainer>
        </ActualContent>
      </StyledNotes>
    </ContainerWithTail>
  );
};
