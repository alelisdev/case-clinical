
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPriorAuthGuidelineFeatureComponent } from './web-prior-auth-guideline-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prior-auth-guideline-list/web-prior-auth-guideline-list.module').then((m) => m.WebPriorAuthGuidelineListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prior-auth-guideline-create/web-prior-auth-guideline-create.module').then((m) => m.WebPriorAuthGuidelineCreateModule),
      },
      {
        path: ':priorAuthGuidelineId',
        component: WebPriorAuthGuidelineFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prior-auth-guideline-detail/web-prior-auth-guideline-detail.module').then((m) => m.WebPriorAuthGuidelineDetailModule),
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
  declarations: [WebPriorAuthGuidelineFeatureComponent],
})
export class WebPriorAuthGuidelineFeatureModule {}

