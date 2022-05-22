import { ChangeEvent, useState } from "react";
import { useValidation, ValidationResult as ValidationResult, ValidationRules } from "./useValidation";

type OnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

interface Field {
  value: string;
  onChange: OnChangeHandler;
  startValidation: (isActive?: boolean) => void;
  validation: ValidationResult;
}

export function useField(defaultValue: string, rules: ValidationRules): Field {
  const [value, setValue] = useState(defaultValue);
  const [isActiveInternal, setIsActiveInternal] = useState(false);

  const validation = useValidation(value, rules, isActiveInternal);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return ({
    value: value,
    onChange: onChange,
    startValidation: () => {
      validation.forceValidate();
      setIsActiveInternal(true);
    },
    validation: validation
  });
}