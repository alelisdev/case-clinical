import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

import { FormlyFieldFileViewer } from './file-viewer.component'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer'

@NgModule({
  declarations: [FormlyFieldFileViewer],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'file-viewer',
          component: FormlyFieldFileViewer,
          wrappers: ['form-field'],
        },
      ],
    }),
    DocumentViewerModule,
  ],
})
export class UiFormlyFieldFileViewerModule {}
