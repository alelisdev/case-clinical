import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { WebUiCarouselProComponent } from './web-ui-carousel-pro.component'
import { SwiperModule } from 'swiper/angular'

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, 
   SwiperModule
  ],
  declarations: [WebUiCarouselProComponent],
  exports: [WebUiCarouselProComponent],
})
export class WebUiCarouselProModule {}
