import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFitHeightComponent } from './ui-fit-height.component'

@NgModule({
  declarations: [UiFitHeightComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'full-height',
          component: UiFitHeightComponent,
        },
      ],
    }),
  ],
})
export class UiFitHeightModule {}
