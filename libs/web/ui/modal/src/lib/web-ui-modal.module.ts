import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUiModalComponent } from './web-ui-modal.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiModalComponent],
  exports: [WebUiModalComponent],
})
export class WebUiModalModule {}
