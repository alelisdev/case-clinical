import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AccountUiProfileFormModule, AccountUiUsernameFormModule } from '@case-clinical/web/account/ui'
import { WebUiLoaderModule } from '@case-clinical/web/ui/loader'
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
    WebUiLoaderModule,
    AccountUiProfileFormModule,
    AccountUiUsernameFormModule,
  ],
})
export class AccountProfileModule {}
