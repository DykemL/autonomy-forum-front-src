import { useEffect, useState } from "react";

export interface ValidationRules {
  isEmpty?: boolean;
  sameValue?: string;
}

export interface ValidationResult {
  hasErrors: boolean;
  isEmpty?: boolean;
  isSameValue?: boolean;
  forceValidate: () => void; 
}

export function useValidation(value: string, rules: ValidationRules, isActive: boolean = true): ValidationResult {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSameValue, setIsSameValue] = useState(true);

  const validate = () => {
    if (rules.isEmpty) {
      value == undefined || value === '' ? setIsEmpty(true) : setIsEmpty(false);
    }
    if (rules.sameValue != undefined) {
      const otherValue = rules.sameValue;
      value === otherValue && value !== '' && otherValue !== '' ? setIsSameValue(true) : setIsSameValue(false);
    }
  }

  useEffect(() => {
    if (!isActive) {
      return;
    }
    validate(); 
  });

  const hasErrors = () => isEmpty || !isSameValue

  return ({
    hasErrors: hasErrors(),
    isEmpty: isEmpty,
    isSameValue: isSameValue,
    forceValidate: validate
  });
}