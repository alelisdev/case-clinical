import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebRoleComponent } from './web-role.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebRoleComponent],
  exports: [WebRoleComponent],
})
export class WebRoleModule {}
