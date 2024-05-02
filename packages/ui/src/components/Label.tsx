import { Line, StyledLabel } from './Label.styles';

export type LabelProps = React.HTMLAttributes<HTMLLabelElement> & {
  align?: 'center' | 'left' | 'right';
};

export const Label: React.FC<LabelProps> = ({
  align = 'left',
  children,
  ...props
}) => (
  <StyledLabel align={align} {...props}>
    {['center', 'right'].includes(align) && <Line />}
    {children}
    {['center', 'left'].includes(align) && <Line />}
  </StyledLabel>
);
