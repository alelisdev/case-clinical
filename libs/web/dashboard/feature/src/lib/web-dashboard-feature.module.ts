import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiMusicWidgetModule } from '@case-clinical/web/ui/music-widget'
import { WebUiWeatherWidgetModule } from '@case-clinical/web/ui/weather-widget'
import { WebUiCarouselProModule } from '../../../../ui/carousel-pro/src'
import { WebDashboardFeatureComponent } from './web-dashboard-feature.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [WebDashboardFeatureComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: WebDashboardFeatureComponent }]),
    WebUiMusicWidgetModule,
    WebUiWeatherWidgetModule,
    WebUiCarouselProModule,
    WebUiButtonModule,
    WebUiPageModule,
    FormsModule,
  ],
})
export class WebDashboardFeatureModule {}
