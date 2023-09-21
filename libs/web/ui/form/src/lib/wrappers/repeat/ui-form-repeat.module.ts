import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormRepeatComponent } from './ui-form-repeat.component'

@NgModule({
  declarations: [UiFormRepeatComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'repeat',
          component: UiFormRepeatComponent,
        },
      ],
    }),
  ],
})
export class UiFormRepeatModule {}
