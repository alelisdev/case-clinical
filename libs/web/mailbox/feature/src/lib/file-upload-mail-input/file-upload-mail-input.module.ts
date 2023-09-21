import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
// import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

// import {WebUiFilePreviewModule} from '../../../../../file-preview/web-ui-file-preview.module'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { MatTooltipModule } from '@angular/material/tooltip'
// import { FileUploadMailInput } from './file-upload-mail-input.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { FileUploadMailInput } from './file-upload-mail-input.component'
import { UiFormFieldModule } from '@case-clinical/web/ui/form'
import { WebUiFilePreviewModule } from '../file-preview/web-ui-file-preview.module'
@NgModule({
  declarations: [FileUploadMailInput],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    WebUiButtonModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    // FormlyModule.forChild({
    //   types: [
    //     {
    //       name: 'file-upload-mail-component',
    //       component: FileUploadMailInput,
    //       wrappers: ['form-field'],
    //     },
    //   ],
    // }),
    WebUiFilePreviewModule
  ],
  exports: [FileUploadMailInput],
  // bootstrap: [FileUploadMailInput]
})
export class FileUploadMailInputModule {}
