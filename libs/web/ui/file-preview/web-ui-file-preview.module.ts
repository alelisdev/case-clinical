import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WebUiFilePreviewComponent } from './web-ui-file-preview.component'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    WebUiButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  declarations : [
    WebUiFilePreviewComponent
  ],
  exports: [WebUiFilePreviewComponent]
})
export class WebUiFilePreviewModule {}
