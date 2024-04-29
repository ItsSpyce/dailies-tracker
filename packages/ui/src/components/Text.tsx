import { StyledText } from './Text.styles';

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {};

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return <StyledText {...props}>{children}</StyledText>;
};
