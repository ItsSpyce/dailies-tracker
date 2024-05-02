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
import { useLocalStorage } from '../hooks';
import { I18n } from './I18n';

export type NotesProps = {
  leftContent: string;
  onChangeLeft: (content: string) => void;
  rightContent: string;
  onChangeRight: (content: string) => void;
};

export const Notes: React.FC<NotesProps> = ({
  leftContent,
  rightContent,
  onChangeLeft,
  onChangeRight,
}) => {
  const leftRef = useRef<MDXEditorMethods>(null);
  const rightRef = useRef<MDXEditorMethods>(null);

  return (
    <ContainerWithTail>
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
                markdown={leftContent}
                onChange={onChangeLeft}
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
                onChange={onChangeRight}
              />
            </NotesRight>
          </NotesContainer>
        </ActualContent>
      </StyledNotes>
    </ContainerWithTail>
  );
};
