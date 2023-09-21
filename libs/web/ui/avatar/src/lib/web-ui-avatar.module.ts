import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiAvatarComponent } from './web-ui-avatar.component'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiIconModule],
  declarations: [WebUiAvatarComponent],
  exports: [WebUiAvatarComponent],
})
export class WebUiAvatarModule {}
