import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiLayoutComponent } from './web-ui-layout.component'

@NgModule({
  declarations: [WebUiLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [WebUiLayoutComponent],
})
export class WebUiLayoutModule {}
