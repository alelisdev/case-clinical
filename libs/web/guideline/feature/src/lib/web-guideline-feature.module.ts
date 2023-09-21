
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebGuidelineFeatureComponent } from './web-guideline-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-guideline-list/web-guideline-list.module').then((m) => m.WebGuidelineListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-guideline-create/web-guideline-create.module').then((m) => m.WebGuidelineCreateModule),
      },
      {
        path: ':guidelineId',
        component: WebGuidelineFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-guideline-detail/web-guideline-detail.module').then((m) => m.WebGuidelineDetailModule),
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
  declarations: [WebGuidelineFeatureComponent],
})
export class WebGuidelineFeatureModule {}

