
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebLeadInjuryFeatureComponent } from './web-lead-injury-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-lead-injury-list/web-lead-injury-list.module').then((m) => m.WebLeadInjuryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-lead-injury-create/web-lead-injury-create.module').then((m) => m.WebLeadInjuryCreateModule),
      },
      {
        path: ':leadInjuryId',
        component: WebLeadInjuryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-lead-injury-detail/web-lead-injury-detail.module').then((m) => m.WebLeadInjuryDetailModule),
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
  declarations: [WebLeadInjuryFeatureComponent],
})
export class WebLeadInjuryFeatureModule {}

