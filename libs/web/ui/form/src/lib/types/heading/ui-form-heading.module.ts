import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormHeadingComponent } from './ui-form-heading.component'

@NgModule({
  declarations: [UiFormHeadingComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'heading',
          component: UiFormHeadingComponent,
        }
      ],
    }),
  ],
})
export class UiFormHeadingModule {}
