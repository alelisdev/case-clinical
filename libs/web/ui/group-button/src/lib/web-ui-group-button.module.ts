import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUiGroupButtonComponent } from './web-ui-group-button.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiGroupButtonComponent],
  exports: [WebUiGroupButtonComponent],
})
export class WebUiGroupButtonModule {}
