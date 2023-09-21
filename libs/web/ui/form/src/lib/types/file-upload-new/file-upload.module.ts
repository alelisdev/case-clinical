import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms'

import { FormlyModule } from '@ngx-formly/core'

import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { FormlyFieldFileNew } from './file-upload.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { WebUiFilePreviewModule } from '../../../../../file-preview/web-ui-file-preview.module'
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [FormlyFieldFileNew],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    WebUiButtonModule,
    MatTooltipModule,
    MatIconModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'file-new',
          component: FormlyFieldFileNew,
          wrappers: ['form-field'],
        },
      ],
    }),
    WebUiFilePreviewModule,
    NgxFileDropModule
  ],
})
export class UiFormlyFieldFileNewModule { }
