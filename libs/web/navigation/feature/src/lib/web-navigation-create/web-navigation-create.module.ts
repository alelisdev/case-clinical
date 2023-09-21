
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'

import { WebNavigationCreateComponent } from './web-navigation-create.component'

@NgModule({
  declarations: [WebNavigationCreateComponent],
  imports: [
    CommonModule,
    WebUiButtonModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    WebUiFormModule,
    WebUiPageHeaderModule,
    RouterModule.forChild([{ path: '', component: WebNavigationCreateComponent }]),
  ],
})
export class WebNavigationCreateModule {}
