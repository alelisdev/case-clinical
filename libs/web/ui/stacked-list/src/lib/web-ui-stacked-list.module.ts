import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiStackedListComponent } from './web-ui-stacked-list.component'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule],
  declarations: [WebUiStackedListComponent],
  exports: [WebUiStackedListComponent],
})
export class WebUiStackedListModule {}
