import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'

import { WebUiSearchComponent } from './web-ui-search.component'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule],
  declarations: [WebUiSearchComponent],
  exports: [WebUiSearchComponent],
})
export class WebUiSearchModule {}
