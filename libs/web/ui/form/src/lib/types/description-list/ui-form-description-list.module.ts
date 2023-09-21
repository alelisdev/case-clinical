import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { WebUiDescriptionListComponent } from './web-ui-description-list.component'

@NgModule({
  declarations: [
    WebUiDescriptionListComponent,
  ],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'description-list',
          component: WebUiDescriptionListComponent,
        },
      ],
    }),
  ]
})
export class UiFormDescriptionListModule {}
