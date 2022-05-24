import { ChangeEvent, useState } from "react";
import { Nullable } from "../Common/Types";
import { useValidation, ValidationResult as ValidationResult, ValidationRules } from "./useValidation";

type OnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

interface Field {
  value?: string;
  onChange: OnChangeHandler;
  startValidation: (isActive?: boolean) => void;
  validation: ValidationResult;
  clear: () => void;
}

export function useField(defaultValue: Nullable<string> = undefined, rules: ValidationRules = {}): Field {
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
    validation: validation,
    clear: () => setValue(defaultValue)
  });
}