import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiCodeModule } from '@case-clinical/web/ui/code'
import { WebUiPreviewComponent } from './web-ui-preview.component'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiCodeModule],
  declarations: [WebUiPreviewComponent],
  exports: [WebUiPreviewComponent],
})
export class WebUiPreviewModule {}
