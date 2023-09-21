import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormContactComponent } from './ui-form-contact.component'
import { NgSelectModule } from '@ng-select/ng-select'

@NgModule({
  declarations: [UiFormContactComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    NgSelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'contact',
          component: UiFormContactComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormContactModule {}
