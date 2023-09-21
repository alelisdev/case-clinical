import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiAlertComponent } from './web-ui-alert.component'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule],
  declarations: [WebUiAlertComponent],
  exports: [WebUiAlertComponent],
})
export class WebUiAlertModule {}
