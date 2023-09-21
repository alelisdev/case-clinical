import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormDropdownButtonComponent } from './ui-form-dropdown-button.component'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module'

@NgModule({
  declarations: [UiFormDropdownButtonComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    UiFormConextProviderModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'dropdown-button',
          component: UiFormDropdownButtonComponent,
        },
      ],
    }),
  ],
})
export class UiFormDropdownButtonModule {}
