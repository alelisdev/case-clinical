import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RuleConstants } from '@schema-driven/rules-engine';

export function passwordValidator(): ValidatorFn {
  const passwordRegularExpressions = [
    RuleConstants.lowercaseAlphaCharacterRegEx,
    RuleConstants.uppercaseAlphaCharacterRegEx,
    RuleConstants.numericCharactersRegEx,
    RuleConstants.specialCharacterRegEx,
  ];
  return (control: AbstractControl): ValidationErrors | null => {
    return passwordRegularExpressions.some((regExp) => !regExp.test(control.value)) ? { passwordCharacterConstraints: true } : null;
  };
}

export function passwordSpecialCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !RuleConstants.specialCharacterRegEx.test(control.value) ? { missingSpecialChar: true } : null;
  };
}

export function passwordNumericCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !RuleConstants.numericCharactersRegEx.test(control.value) ? { missingNumericChar: true } : null;
  };
}

export function passwordUpperCaseCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !RuleConstants.uppercaseAlphaCharacterRegEx.test(control.value) ? { missingUpperCaseChar: true } : null;
  };
}

export function passwordLowerCaseCharValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !RuleConstants.lowercaseAlphaCharacterRegEx.test(control.value) ? { missingLowerCaseChar: true } : null;
  };
}

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !RuleConstants.unicodeName.test(control.value) ? { invalidName: true } : null;
  };
}
