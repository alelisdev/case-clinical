import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormButtonComponent } from './ui-form-button.component'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'

@NgModule({
  declarations: [UiFormButtonComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'button',
          component: UiFormButtonComponent,
        },
      ],
    }),
  ],
})
export class UiFormButtonModule {}
