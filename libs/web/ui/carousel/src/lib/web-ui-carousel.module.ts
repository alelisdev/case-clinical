import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@schema-driven/web/ui/icon'

import { WebUiCarouselComponent } from './web-ui-carousel.component'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule],
  declarations: [WebUiCarouselComponent],
  exports: [WebUiCarouselComponent],
})
export class WebUiCarouselModule {}
