import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormGridContainerComponent } from './ui-form-grid-container.component'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module'

@NgModule({
  declarations: [UiFormGridContainerComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    UiFormConextProviderModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'grid-container',
          component: UiFormGridContainerComponent,
        },
      ],
    }),
  ],
})
export class UiFormGridContainerModule {}
