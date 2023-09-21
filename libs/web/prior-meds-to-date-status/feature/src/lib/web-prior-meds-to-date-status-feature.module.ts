
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorMedsToDateStatusFeatureComponent } from './web-prior-meds-to-date-status-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-meds-to-date-status-list/web-prior-meds-to-date-status-list.module').then((m) => m.WebPriorMedsToDateStatusListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-meds-to-date-status-create/web-prior-meds-to-date-status-create.module').then((m) => m.WebPriorMedsToDateStatusCreateModule),
      },
      {
        path: ':priorMedsToDateStatusId',
        component: WebPriorMedsToDateStatusFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-meds-to-date-status-detail/web-prior-meds-to-date-status-detail.module').then((m) => m.WebPriorMedsToDateStatusDetailModule),
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
  declarations: [WebPriorMedsToDateStatusFeatureComponent],
})
export class WebPriorMedsToDateStatusFeatureModule {}

