import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  CheckboxBox,
  CheckboxCheck,
  CheckboxLabel,
  StyledCheckbox,
} from './Checkbox.styles';

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  children?: React.ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, readOnly, ...props }, forwardedRef) => {
    // @ts-ignore
    const ref = useRef<HTMLInputElement>(forwardedRef?.current ?? null);
    const [isChecked, setIsChecked] = useState(props.checked ?? false);
    const [isFocused, setIsFocused] = useState(props.autoFocus ?? false);
    useEffect(() => {
      isChecked !== props.checked && setIsChecked(props.checked ?? false);
    }, [props.checked]);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <StyledCheckbox
        onClick={(e) => {
          if (readOnly) {
            return;
          }
          ref.current?.focus();
          if (props.checked != null) {
            if (props.onChange == null) {
              return;
            } else {
              const event = {
                ...new Event('change', { bubbles: true }),
                nativeEvent: e,
                isPropagationStopped: false,
                isDefaultPrevented: false,
                persist: true,
                target: ref?.current,
              };
              // @ts-ignore
              props.onChange(event);
            }
          } else {
            setIsChecked((prev) => !prev);
          }
        }}
      >
        <input
          {...props}
          ref={ref}
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          hidden
        />
        <CheckboxBox
          focused={isFocused ? 'focused' : undefined}
          readOnly={readOnly ?? false}
        >
          {isChecked && <CheckboxCheck>&#10003;</CheckboxCheck>}
        </CheckboxBox>
        {children && <CheckboxLabel>{children}</CheckboxLabel>}
      </StyledCheckbox>
    );
  }
);
