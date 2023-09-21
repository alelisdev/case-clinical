import { ClipboardModule } from '@angular/cdk/clipboard'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiJsonComponent } from './web-ui-json.component'

@NgModule({
  declarations: [WebUiJsonComponent],
  exports: [WebUiJsonComponent],
  imports: [CommonModule, RouterModule, WebUiIconModule, ClipboardModule],
})
export class WebUiJsonModule {}
