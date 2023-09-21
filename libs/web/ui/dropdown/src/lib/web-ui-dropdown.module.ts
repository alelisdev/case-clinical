import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiDropdownComponent } from './web-ui-dropdown.component'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule],
  declarations: [WebUiDropdownComponent],
  exports: [WebUiDropdownComponent],
})
export class WebUiDropdownModule {}
