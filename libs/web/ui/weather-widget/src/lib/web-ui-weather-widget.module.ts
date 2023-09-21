import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { WebUiWeatherWidgetComponent } from './web-ui-weather-widget.component'
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from './weather.intercepter'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiWeatherWidgetComponent],
  exports: [WebUiWeatherWidgetComponent],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }]
  ],
})
export class WebUiWeatherWidgetModule {}
