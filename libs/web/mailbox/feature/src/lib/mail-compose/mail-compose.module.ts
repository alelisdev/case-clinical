import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WebUiMailComposeComponent } from './mail-compose.component'
import { MatIconModule } from '@angular/material/icon'
import { SharedModule } from 'libs/shared/shared.module'
import { MatFormFieldModule } from '@angular/material/form-field'
import { QuillModule } from 'ngx-quill'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgSelectModule } from '@ng-select/ng-select'
// import { WebUiFormModule } from '../form/src'
// import { WebUiFormModule } from ''
// import { UiFormFieldModule } from '../form/src/lib/wrappers/form-field/ui-form-field.module'
import { UiFormMailSelectComponent } from './mailbox-email-input/ui-form-mail-select.component'
import { HttpClientModule } from '@angular/common/http'
import { WebUiFilePreviewModule } from '../file-preview/web-ui-file-preview.module'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MailComposeService } from './mail-compose.service'
import { FileUploadMailInputModule } from '../file-upload-mail-input/file-upload-mail-input.module'
@NgModule({
  imports: [
    MatIconModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadMailInputModule,
    QuillModule.forRoot(),
    MatButtonModule,
    MatTooltipModule,
    NgSelectModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // WebUiFormModule,
    // UiFormFieldModule,
    HttpClientModule,
    WebUiFilePreviewModule,
    MatProgressBarModule
  ],
  declarations: [WebUiMailComposeComponent, UiFormMailSelectComponent],
  exports: [WebUiMailComposeComponent, UiFormMailSelectComponent],
  providers: [MailComposeService],
})
export class WebUiMailComposeModule {}
