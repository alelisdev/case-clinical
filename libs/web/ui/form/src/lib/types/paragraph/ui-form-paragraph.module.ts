import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormParagraphComponent } from './ui-form-paragraph.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

@NgModule({
  declarations: [UiFormParagraphComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'paragraph',
          component: UiFormParagraphComponent,
        },
      ],
    }),
  ],
})
export class UiFormParagraphModule {}
