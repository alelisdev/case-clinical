import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

import { FormlyFieldFile } from './file-upload.component'
import { FileValueAccessor } from '../../accessors/file-value-accessor'

@NgModule({
  declarations: [FormlyFieldFile, FileValueAccessor],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'file',
          component: FormlyFieldFile,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormlyFieldFileModule {}
