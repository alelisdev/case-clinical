import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { FormlyFieldImage } from './image-upload.component'
import { FileValueAccessor } from '../../accessors/file-value-accessor'

@NgModule({
  declarations: [FormlyFieldImage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'image',
          component: FormlyFieldImage,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormlyFieldImageModule {}
