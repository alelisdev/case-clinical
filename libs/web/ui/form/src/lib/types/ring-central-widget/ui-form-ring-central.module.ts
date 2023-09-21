import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormRingCentralComponent } from './ui-form-ring-central.component'

@NgModule({
  declarations: [UiFormRingCentralComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'ring-central',
          component: UiFormRingCentralComponent,
        }
      ],
    }),
  ],
})
export class UiFormRingCentralModule {}
