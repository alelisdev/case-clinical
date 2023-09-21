import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiNarrowAvatarListComponent } from './web-ui-narrow-avatar-list.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUiNarrowAvatarListComponent],
  exports: [WebUiNarrowAvatarListComponent],
})
export class WebUiNarrowAvatarListModule {}
