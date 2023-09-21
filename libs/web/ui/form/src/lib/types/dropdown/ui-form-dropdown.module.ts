import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormDropdownComponent } from './ui-form-dropdown.component'
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
  declarations: [UiFormDropdownComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    UiFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'dropdown1',
          component: UiFormDropdownComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'dropdown',
          extends: 'dropdown1'
        },
      ],
    }),
  ],
})
export class UiFormDropdownModule {}
