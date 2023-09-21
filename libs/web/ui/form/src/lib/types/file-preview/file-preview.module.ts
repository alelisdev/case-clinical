import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { WebUiFilePreviewModule} from '../../../../../file-preview/web-ui-file-preview.module'
import { UiFormFilePreview } from './file-preview.component'

@NgModule({
  declarations: [UiFormFilePreview],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    WebUiFilePreviewModule,
    FormlySelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'file-preview',
          component: UiFormFilePreview,
        },
      ],
    }),
  ],
})
export class UiFormFilePreviewModule {}
