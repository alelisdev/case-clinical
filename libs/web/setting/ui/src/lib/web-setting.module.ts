import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebSettingComponent } from './web-setting.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebSettingComponent],
  exports: [WebSettingComponent],
})
export class WebSettingModule {}
