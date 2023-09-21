import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormColComponent } from './ui-form-column.component'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module'

@NgModule({
  declarations: [UiFormColComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    UiFormConextProviderModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'vertical',
          component: UiFormColComponent,
        },
      ],
    }),
  ],
})
export class UiFormColModule {}
