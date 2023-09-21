import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUiDescriptionListComponent } from './web-ui-description-list.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiDescriptionListComponent],
  exports: [WebUiDescriptionListComponent],
})
export class WebUiDescriptionListModule {}
