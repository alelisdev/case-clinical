
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorAuthDmeFeatureComponent } from './web-prior-auth-dme-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-auth-dme-list/web-prior-auth-dme-list.module').then((m) => m.WebPriorAuthDmeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-auth-dme-create/web-prior-auth-dme-create.module').then((m) => m.WebPriorAuthDmeCreateModule),
      },
      {
        path: ':priorAuthDmeId',
        component: WebPriorAuthDmeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-auth-dme-detail/web-prior-auth-dme-detail.module').then((m) => m.WebPriorAuthDmeDetailModule),
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
  declarations: [WebPriorAuthDmeFeatureComponent],
})
export class WebPriorAuthDmeFeatureModule {}

