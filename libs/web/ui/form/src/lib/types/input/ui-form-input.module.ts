import { CommonModule, DatePipe } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormInputComponent } from './ui-form-input.component'
import { UrlValidator, UrlValidatorMessage } from './validators';
import { WebUiLaIconModule } from '@case-clinical/web/ui/la-icon';
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { NgxMaterialPopoverModule } from 'ngx-material-popover';

const currencyMask: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [UiFormInputComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialPopoverModule,
    WebUiLaIconModule,
    WebUiIconModule,
    FormlyModule.forChild({
      validators: [
        { name: 'url', validation: UrlValidator },
      ],
      validationMessages: [
        { name: 'url', message: UrlValidatorMessage },
        { name: 'ip', message: UrlValidatorMessage },
      ],
      types: [
        {
          name: 'input',
          component: UiFormInputComponent,
          wrappers: ['form-field'],
          // defaultOptions: {
          //   validators: {
          //     validation: ['inputLengthNotValid'],
          //   },
          // }
        },
        { name: 'string', extends: 'input' },
        {
          name: 'password',
          extends: 'input',
          defaultOptions: {
            templateOptions: { type: 'password' },
          },
        },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'datetime',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'datetime-local',
            },
          },
        },
        {
          name: 'time',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'time',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'integer'
            },
            defaultValue: 0,
          },
        },
        {
          name: 'currency',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'currency',
            },
          },
        },
        {
          name: 'email',
          extends: 'input',
        },
        {
          name: 'url',
          extends: 'input',
          defaultOptions: {
            validation: ['url']
          }
        }
      ],
    }),
    NgxMaskModule.forRoot(currencyMask),
  ],
  providers: [
    DatePipe
  ]
})
export class UiFormInputModule {}
