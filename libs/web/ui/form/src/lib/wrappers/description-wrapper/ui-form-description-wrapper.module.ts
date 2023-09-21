import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { WebUiDescriptionWrapperComponent } from './web-ui-description-wrapper.component'

@NgModule({
  declarations: [
    WebUiDescriptionWrapperComponent,
  ],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'description',
          component: WebUiDescriptionWrapperComponent,
        },
      ],
    }),
  ]
})
export class UiFormDescriptionWrapperModule {}
