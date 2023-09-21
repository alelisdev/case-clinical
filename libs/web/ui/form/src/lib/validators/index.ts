import { isString } from '@ngneat/transloco';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
import * as moment from 'moment';
export function minlengthValidationMessage(err, field: FormlyFieldConfig): string {
  return `Should have at least ${field.templateOptions?.minLength} characters`
}

export function maxlengthValidationMessage(err, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions?.maxLength} characters`
}

export function minValidationMessage(err, field: FormlyFieldConfig): string {
  return `This value should be more than ${field.templateOptions?.min}`
}

export function maxValidationMessage(err, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions?.max}`
}

export function emailValidatorMessage(err, field: FormlyFieldConfig): string {
  return `Please enter a valid email address`
}

export function UrlValidatorMessage(error: any, field: FormlyFieldConfig) {
  return `Please enter a valid website url`;
}

export function InvalidDateMessage(error: any, field: FormlyFieldConfig) {
  return `Please enter valid date`;
}

export function inputLengthValidMessage(error: any, field: FormlyFieldConfig) {
  return `This field should be between 2 and 255 characters`;
}

export function inputMaxLengthValidMessage(error: any, field: FormlyFieldConfig) {
  return `This field should be less than 255 characters`;
}

export function inputLengthOneValidMessage(error: any, field: FormlyFieldConfig) {
  return `This field shouldn't be 1 character`;
}

export function textAreaLengthValidMessage(error: any, field: FormlyFieldConfig) {
  return `This field should be between 2 and 1000 characters`;
}

export function inputSpecialCharacterContainValidatorMessage(error: any, field: FormlyFieldConfig) {
  return `This field should not contain any special characters.`;
} 

export function InvalidDateValidator(control: AbstractControl): ValidationErrors {
  let tempDate=moment(control.value);
  if(control.value == null || control.value == "")
    return null;
  if(tempDate.isValid()){
    if(tempDate <= moment("1900-12-31") || tempDate >= moment("2099-12-31"))
       return { invalidDate: true }
    return null;
  }else{
    return { invalidDate: true }
  }
}
export function UrlValidator(control: AbstractControl): ValidationErrors {
  if(!control.value)
    return {url:true};
  if(control.value == "")
     return {url:true};
  var validRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if(control.value.match(validRegex)){
    return {url:true}
  }
  return null
}

export function addressLengthValidator(control: AbstractControl): ValidationErrors {
  if(!control.value || !control.value?.formatedAddress || control.value?.formatedAddress?.length === 0) return null;
  if(control.value && control.value.formatedAddress && control.value.formatedAddress.length < 250)
  {
    return null;
  }else return {
    addressLength: true
  }
}

export function emailValidator(control: AbstractControl): ValidationErrors {
  if(!control.value || control.value == "")
     return {email:true};
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(control.value.match(validRegex)){
    return {email:true}
  }
 return null
}

export function inputLengthValidator(control: AbstractControl): ValidationErrors {
  if(!control.value) return null;
  try {
    if(control.value.trim().length > 1 && control.value.trim().length < 256) {
      return null;
    } else {
      return { inputLengthNotValid: true }
    }
  } catch (e) {
    return null;
  }
}

export function inputSpecialCharacterContainValidator(control: AbstractControl): ValidationErrors {
  if(!control.value) return null;
  const pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  try {
    if(pattern.test(control.value)) {
      return { specialCharacterContain : true }
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

export function inputLengthOneValidator(control: AbstractControl): ValidationErrors {
  if(!control.value) return null;
  try {
    if(control.value.trim().length != 1) {
      return null;
    } else {
      return { inputLengthOneNotValid: true }
    }
  } catch (e) {
    return null;
  }
}

export function inputMaxLengthValidator(control: AbstractControl): ValidationErrors {
  if(!control.value) return null;
  try {
    if(control.value.trim().length < 256) {
      return null;
    } else {
      return { inputMaxLengthNotValid: true }
    }
  } catch (e) {
    return null;
  }
}

export function textAreaLengthValidator(control: AbstractControl): ValidationErrors {
  if(!control.value) return null;
  try {
    if(control.value.trim().length > 1 && control.value.trim().length < 1000) {
      return null;
    } else {
      return { textAreaLengthNotValid: true }
    }
  } catch (e) {
    return null;
  }
}



export interface DateValidatorOptions {
  operator: 'Before'|'After'|'Between',
  startDate: Date,
  endDate?: Date
}

export function onlyspaceValidator(control: AbstractControl): ValidationErrors{
  if( !control.value )
    return { onlyspace: true }
  if(isString(control.value) && control.value.trim() =="")
    return { onlyspace: true }
  return null;
}

export function atLeastOneUpperValidator(control: AbstractControl): ValidationErrors{
  if(!control.value || control?.value == "")
    return { oneUpper: true };
  const validRegex = /(?=.*[A-Z])/;
  if(!validRegex.test(control.value)){
    return { oneUpper: true }
  }
  return null
}

export function atLeastOneLowerValidator(control: AbstractControl): ValidationErrors{
  if(!control.value || control?.value == "")
    return { oneLower: true };
  const validRegex = /(?=.*[a-z])/;
  if(!validRegex.test(control.value)){
    return { oneLower: true }
  }
  return null
}

export function atLeastOneSpecialValidator(control: AbstractControl): ValidationErrors{
  if(!control.value || control?.value == "")
    return { oneSpecial: true };
  const validRegex = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  if(!validRegex.test(control.value)){
    return { oneSpecial: true }
  }
  return null
}

export function atLeastOneNumberValidator(control: AbstractControl): ValidationErrors{
  if(!control.value || control?.value == "")
    return { oneNumber: true };
  const validRegex = /[0123456789]/;
  if(!validRegex.test(control.value)){
    return { oneNumber: true }
  }
  return null
}

export function dateValidator(
  control: AbstractControl,
  field: FormlyFieldConfig,
  options: DateValidatorOptions
): ValidationErrors {
  const date = new Date(control.value);
  const startDate = new Date(options.startDate)
  const endDate = new Date(options.endDate)
  console.log(date)
  switch(options.operator) {
    case 'After':
      return date < startDate ? null : { date: true, options }
    case 'Before':
      console.log(date, startDate, date < startDate)
      return date > startDate ? null : { date: true, options }
    case 'Between':
      if(!options.endDate) return { date: true, options };
      if(endDate <= startDate) return { date: true, options }
      return (date >= startDate) && date <= endDate ? { date: true, options } : null
  }
}


function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return month + '/' + day + '/' + year;
}

export function dateValidatorMessage(
  error: any,
  field: FormlyFieldConfig,
): string {
  const options = error;
  console.log(error)
  switch(options.operator) {
    case 'After':
      return `Selected date should be greater than ${getFormattedDate(new Date(options.startDate))}`;
    case 'Before':
      return `Selected date should be less than ${getFormattedDate(new Date(options.startDate))}`;
    case 'Between':
      if(!options.endDate) return `You have to provide endDate`;
      if(options.endDate <= options.startDate) return 'endDate should be greater than startDate';
      return `Selected date should be between ${getFormattedDate(new Date(options.startDate))} and ${getFormattedDate(new Date(options.endDate))}`
  }
}


