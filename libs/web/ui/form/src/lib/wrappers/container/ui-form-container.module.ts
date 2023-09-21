import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormContainerComponent } from './ui-form-container.component'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'

@NgModule({
  declarations: [UiFormContainerComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'container',
          component: UiFormContainerComponent,
        },
      ],
    }),
  ],
})
export class UiFormContainerModule {}
