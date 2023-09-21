import { AbstractControl, ValidationErrors } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";

export function IpValidator(control: AbstractControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ip: true };
}

export function IpValidatorMessage(error: any, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid ip address`;
}

export function UrlValidator(control: AbstractControl): ValidationErrors {
  return !control.value || /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(control.value) ? null : { ip: true };
}

export function UrlValidatorMessage(error: any, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid website url`;
}
