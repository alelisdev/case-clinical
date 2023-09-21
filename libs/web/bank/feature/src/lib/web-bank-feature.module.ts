
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebBankFeatureComponent } from './web-bank-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-bank-list/web-bank-list.module').then((m) => m.WebBankListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-bank-create/web-bank-create.module').then((m) => m.WebBankCreateModule),
      },
      {
        path: ':bankId',
        component: WebBankFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-bank-detail/web-bank-detail.module').then((m) => m.WebBankDetailModule),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'details'
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebBankFeatureComponent],
})
export class WebBankFeatureModule {}

