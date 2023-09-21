import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WebUiFilePreviewComponent } from './web-ui-file-preview.component';

@NgModule({
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    WebUiButtonModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatIconModule,
  ],
  declarations : [
    WebUiFilePreviewComponent
  ],
  exports: [WebUiFilePreviewComponent]
})
export class WebUiFilePreviewModule {}
