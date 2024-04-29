import { StyledHeader, StyledSubHeader, StyledTitle } from './Title.styles';

export type TitleProps = React.HTMLAttributes<HTMLDivElement> & {
  header: JSX.Element | string;
  subHeader: JSX.Element | string;
};

export const Title: React.FC<TitleProps> = ({
  header,
  subHeader,
  ...props
}) => {
  return (
    <StyledTitle {...props}>
      <StyledHeader>{header}</StyledHeader>
      <StyledSubHeader>{subHeader}</StyledSubHeader>
    </StyledTitle>
  );
};
