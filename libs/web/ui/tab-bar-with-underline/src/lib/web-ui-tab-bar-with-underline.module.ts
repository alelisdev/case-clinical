import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiTabBarWithUnderlineComponent } from './web-ui-tab-bar-with-underline.component'
@NgModule({
  declarations: [WebUiTabBarWithUnderlineComponent],
  exports: [WebUiTabBarWithUnderlineComponent],
  imports: [CommonModule, RouterModule],
})
export class WebUiTabBarWithUnderlineModule {}
