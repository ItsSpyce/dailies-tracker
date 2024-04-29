import {
  SectionLine,
  SectionTitle,
  SectionTitleContainer,
  StyledSection,
} from './Section.styles';

export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'center' | 'left' | 'right';
  header: JSX.Element | string;
};

export const Section: React.FC<SectionProps> = ({
  align = 'left',
  header,
  ...props
}) => (
  <StyledSection {...props}>
    <SectionTitleContainer align={align}>
      {['center', 'right'].includes(align) && <SectionLine />}
      <SectionTitle>{header}</SectionTitle>
      {['center', 'left'].includes(align) && <SectionLine />}
    </SectionTitleContainer>
    {props.children}
  </StyledSection>
);
