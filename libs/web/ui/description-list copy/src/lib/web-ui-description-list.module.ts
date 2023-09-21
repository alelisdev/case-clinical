import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@schema-driven/web/ui/icon'
import { WebUiToastModule } from '@schema-driven/web/ui/toast'

import { WebUiDescriptionListComponent } from './web-ui-description-list.component'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule, WebUiToastModule],
  declarations: [WebUiDescriptionListComponent],
  exports: [WebUiDescriptionListComponent],
})
export class WebUiDescriptionListModule {}
