import { StyledLink } from './Link.styles';

export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => <StyledLink {...props} target="_blank" />;
