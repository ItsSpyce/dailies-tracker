import { ContainerWithTail } from './ContainerWithTail';
import {
  ActualContent,
  NotesBackground,
  NotesContainer,
  NotesLeft,
  NotesRight,
  StyledNotes,
} from './Notes.styles';
import { useEffect, useRef } from 'react';
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useConfirm, useLocalStorage } from '../hooks';
import { I18n } from './I18n';
import { Confirm } from './Confirm';

export type NotesProps = {};

export const Notes: React.FC<NotesProps> = ({}) => {
  const leftRef = useRef<MDXEditorMethods>(null);
  const rightRef = useRef<MDXEditorMethods>(null);
  const [leftNotes, setLeftNotes] = useLocalStorage('notes-left', '');
  const [rightNotes, setRightNotes] = useLocalStorage('notes-right', '');
  const [confirmClear, confirmClearProps] = useConfirm({
    onConfirm() {
      setLeftNotes('');
      setRightNotes('');
    },
  });

  return (
    <ContainerWithTail onClick={confirmClear}>
      <Confirm
        title="app.dailies.notes.clear"
        message="app.dailies.notes.clearConfirm"
        {...confirmClearProps}
      />
      <StyledNotes>
        <NotesBackground src="/images/notes-bg.png" />
        <ActualContent>
          <h4>
            <I18n iden="app.dailies.notes" />
          </h4>
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
                markdown={leftNotes}
                onChange={setLeftNotes}
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
                markdown={rightNotes}
                onChange={setRightNotes}
              />
            </NotesRight>
          </NotesContainer>
        </ActualContent>
      </StyledNotes>
    </ContainerWithTail>
  );
};
