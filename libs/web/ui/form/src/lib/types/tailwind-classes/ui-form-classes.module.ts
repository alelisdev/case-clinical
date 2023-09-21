import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormClassesComponent } from './ui-form-classes.component'

@NgModule({
  declarations: [UiFormClassesComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    WebUiCodeModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'classes',
          component: UiFormClassesComponent,
        },
      ],
    }),
  ],
})
export class UiFormClassesModule {}
