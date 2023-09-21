

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { UserEditComponent } from './user-edit.component'

@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    RouterModule.forChild([{ path: '', component: UserEditComponent }]),

  ],
})
export class UserEditModule {}

