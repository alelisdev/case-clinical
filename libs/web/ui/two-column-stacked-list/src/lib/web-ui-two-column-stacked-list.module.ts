import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUiTwoColumnStackedListComponent } from './web-ui-two-column-stacked-list.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiTwoColumnStackedListComponent],
  exports: [WebUiTwoColumnStackedListComponent],
})
export class WebUiTwoColumnStackedListModule {}
