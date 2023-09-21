import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUiIconButtonComponent } from './web-ui-icon-button.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiIconButtonComponent],
  exports: [WebUiIconButtonComponent],
})
export class WebUiIconButtonModule {}
