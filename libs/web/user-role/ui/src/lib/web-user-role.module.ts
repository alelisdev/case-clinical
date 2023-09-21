import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUserRoleComponent } from './web-user-role.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUserRoleComponent],
  exports: [WebUserRoleComponent],
})
export class WebUserRoleModule {}
