import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageComponent } from './web-ui-page.component'

import { WebUiCarouselProModule } from '../../../carousel-pro/src'
@NgModule({
  declarations: [WebUiPageComponent],
  exports: [WebUiPageComponent],
  imports: [CommonModule, RouterModule, WebUiCarouselProModule],
})
export class WebUiPageModule { }
