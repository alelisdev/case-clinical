

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { UserDetailComponent } from './user-detail.component'

import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'


@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    WebUiPanelModule,
    WebUiDescriptionListModule,
    WebUiCardHeaderModule,
    RouterModule.forChild([{ path: '', component: UserDetailComponent }]),
    WebUiPageHeaderModule,
    WebUiButtonModule,
  ],
})
export class UserDetailModule {}

