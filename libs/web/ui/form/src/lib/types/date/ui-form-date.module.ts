import { CommonModule, DatePipe } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormDateComponent } from './ui-form-date.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

@NgModule({
  declarations: [UiFormDateComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'date',
          component: UiFormDateComponent,
          wrappers: ['form-field'],
          defaultOptions: {
            templateOptions: {
              date: true
            },
            validators: {
              validation: ['invalidDate'],
            },
          }
        },
      ],
    }),
  ],
  providers: [
    DatePipe
  ]
})
export class UiFormDateModule {}
