import { ActualSelect, SelectLabel, StyledSelect } from './Select.styles';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string | React.ReactNode;
};

export const Select: React.FC<SelectProps> = ({
  className,
  id,
  style,
  label,
  ...props
}) => (
  <StyledSelect className={className} id={id} style={style}>
    {label && <SelectLabel htmlFor={id}>{label}</SelectLabel>}
    <ActualSelect {...props} />
  </StyledSelect>
);
