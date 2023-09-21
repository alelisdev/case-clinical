
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorMedsToDateFeatureComponent } from './web-prior-meds-to-date-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-meds-to-date-list/web-prior-meds-to-date-list.module').then((m) => m.WebPriorMedsToDateListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-meds-to-date-create/web-prior-meds-to-date-create.module').then((m) => m.WebPriorMedsToDateCreateModule),
      },
      {
        path: ':priorMedsToDateId',
        component: WebPriorMedsToDateFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-meds-to-date-detail/web-prior-meds-to-date-detail.module').then((m) => m.WebPriorMedsToDateDetailModule),
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
  declarations: [WebPriorMedsToDateFeatureComponent],
})
export class WebPriorMedsToDateFeatureModule {}

