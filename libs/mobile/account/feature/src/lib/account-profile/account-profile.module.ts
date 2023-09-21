import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AccountUiProfileFormModule, AccountUiUsernameFormModule } from '@case-clinical/mobile/account/ui'
import { MobileUiLoaderModule } from '@case-clinical/mobile/ui/loader'
import { AccountProfileComponent } from './account-profile.component'

@NgModule({
  declarations: [AccountProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AccountProfileComponent,
      },
    ]),
    MobileUiLoaderModule,
    AccountUiProfileFormModule,
    AccountUiUsernameFormModule,
  ],
})
export class AccountProfileModule {}
