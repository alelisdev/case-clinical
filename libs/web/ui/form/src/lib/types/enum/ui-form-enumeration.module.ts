import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiEnumerationComponent } from './ui-form-enumeration.component'
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
  declarations: [UiEnumerationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    UiFormFieldModule,
    MatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'enumeration',
          component: UiEnumerationComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormEnumerationModule {}
