import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MobileUiButtonModule } from '@case-clinical/mobile/ui/button'
import { MobileUiFormModule } from '@case-clinical/mobile/ui/form'
import { AccountUiProfileFormComponent } from './account-ui-profile-form.component'

@NgModule({
  exports: [AccountUiProfileFormComponent],
  declarations: [AccountUiProfileFormComponent],
  imports: [CommonModule, RouterModule, MobileUiFormModule, MobileUiButtonModule],
})
export class AccountUiProfileFormModule {}
