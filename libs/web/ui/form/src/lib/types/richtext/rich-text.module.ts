import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { RichTextComponent } from './rich-text.component'
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [RichTextComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormsModule,
    QuillModule.forRoot(),
    FormlyModule.forChild({
      types: [
        {
          name: 'rich-text',
          component: RichTextComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormlyFieldRichTextModule {}
