import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WebUiStatsSimpleComponent } from './web-ui-stats-simple.component'

@NgModule({
  declarations: [WebUiStatsSimpleComponent],
  exports: [WebUiStatsSimpleComponent],
  imports: [CommonModule],
})
export class WebUiStatsSimpleModule {}
