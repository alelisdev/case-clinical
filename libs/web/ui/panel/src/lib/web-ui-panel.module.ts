import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUiPanelComponent } from './web-ui-panel.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiPanelComponent],
  exports: [WebUiPanelComponent],
})
export class WebUiPanelModule {}
