
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebVisitKindFeatureComponent } from './web-visit-kind-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-visit-kind-list/web-visit-kind-list.module').then((m) => m.WebVisitKindListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-visit-kind-create/web-visit-kind-create.module').then((m) => m.WebVisitKindCreateModule),
      },
      {
        path: ':visitKindId',
        component: WebVisitKindFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-visit-kind-detail/web-visit-kind-detail.module').then((m) => m.WebVisitKindDetailModule),
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
  declarations: [WebVisitKindFeatureComponent],
})
export class WebVisitKindFeatureModule {}

