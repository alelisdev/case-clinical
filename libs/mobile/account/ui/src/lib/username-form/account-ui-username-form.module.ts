import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MobileUiButtonModule } from '@case-clinical/mobile/ui/button'
import { MobileUiFormModule } from '@case-clinical/mobile/ui/form'
import { AccountUiUsernameFormComponent } from './account-ui-username-form.component'

@NgModule({
  exports: [AccountUiUsernameFormComponent],
  declarations: [AccountUiUsernameFormComponent],
  imports: [CommonModule, RouterModule, MobileUiFormModule, MobileUiButtonModule],
})
export class AccountUiUsernameFormModule {}
