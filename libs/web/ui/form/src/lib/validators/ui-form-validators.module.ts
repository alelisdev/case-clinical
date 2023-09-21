import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormlyModule } from '@ngx-formly/core'
import { ReactiveFormsModule, Validators } from '@angular/forms'
import {
  dateValidator,
  dateValidatorMessage,
  emailValidator,
  onlyspaceValidator,
  UrlValidator,
  emailValidatorMessage,
  maxlengthValidationMessage,
  maxValidationMessage,
  minlengthValidationMessage,
  inputSpecialCharacterContainValidatorMessage,
  minValidationMessage,
  UrlValidatorMessage,
  InvalidDateMessage,
  InvalidDateValidator,
  inputLengthValidator,
  inputMaxLengthValidator,
  textAreaLengthValidator,
  inputLengthValidMessage,
  textAreaLengthValidMessage,
  inputMaxLengthValidMessage,
  inputLengthOneValidMessage,
  inputLengthOneValidator,
  atLeastOneUpperValidator,
  atLeastOneLowerValidator,
  atLeastOneSpecialValidator,
  atLeastOneNumberValidator,
  inputSpecialCharacterContainValidator,
  addressLengthValidator
} from './index'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'onlyspace', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
        { name: 'email', message: emailValidatorMessage },
        { name: 'date', message: dateValidatorMessage },
        { name: 'url', message: UrlValidatorMessage },
        { name: 'notSame', message: "Password & Confirm Password do not match"},
        { name: 'invalidDate', message: InvalidDateMessage},
        { name: 'inputLengthNotValid', message: inputLengthValidMessage},
        { name: 'inputMaxLengthNotValid', message: inputMaxLengthValidMessage},
        { name: 'oneUpper', message: 'Password should contain at leat 1 upper letter'},
        { name: 'oneLower', message: 'Password should contain at leat 1 lower letter'},
        { name: 'oneSpecial', message: 'Password should contain at leat 1 special character'},
        { name: 'oneNumber', message: 'Password should contain at leat 1 number'},
        { name: 'textAreaLengthNotValid', message: textAreaLengthValidMessage},
        { name: 'inputLengthOneNotValid', message: inputLengthOneValidMessage},
        { name: 'specialCharacterContain', message: inputSpecialCharacterContainValidatorMessage},
        { name: 'addressLength', message: 'This field should be less than 250 characters'}
      ],
      validators: [
        { name: 'oneUpper', validation: atLeastOneUpperValidator },
        { name: 'oneLower', validation: atLeastOneLowerValidator },
        { name: 'oneSpecial', validation: atLeastOneSpecialValidator },
        { name: 'oneNumber', validation: atLeastOneNumberValidator },
        { name: 'email', validation: emailValidator },
        { name: 'onlyspace', validation: onlyspaceValidator},
        { name: 'date', validation: dateValidator, options: { operator: 'After' } },
        { name: 'url', validation: UrlValidator},
        { name: 'invalidDate', validation: InvalidDateValidator},
        { name: 'inputLengthNotValid', validation: inputLengthValidator},
        { name: 'inputMaxLengthNotValid', validation: inputMaxLengthValidator},
        { name: 'textAreaLengthNotValid', validation: textAreaLengthValidator},
        { name: 'inputLengthOneNotValid', validation: inputLengthOneValidator},
        { name: 'specialCharacterContain', validation: inputSpecialCharacterContainValidator},
        { name: 'addressLength', validation: addressLengthValidator}
      ],
    }),
  ],
})
export class UiFormValidatorsModule {}
