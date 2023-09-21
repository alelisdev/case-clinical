
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebNavigationEditComponent } from './web-navigation-edit.component'

@NgModule({
  declarations: [WebNavigationEditComponent],
  imports: [
    CommonModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    WebUiSidebarPageModule,
    RouterModule.forChild([{ path: '', component: WebNavigationEditComponent }]),

  ],
})
export class WebNavigationEditModule {}

