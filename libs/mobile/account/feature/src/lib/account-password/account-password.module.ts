import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AccountUiPasswordFormModule } from '@case-clinical/mobile/account/ui'
import { MobileUiLoaderModule } from '@case-clinical/mobile/ui/loader'
import { AccountPasswordComponent } from './account-password.component'

@NgModule({
  declarations: [AccountPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AccountPasswordComponent }]),
    AccountUiPasswordFormModule,
    MobileUiLoaderModule,
  ],
})
export class AccountPasswordModule {}
