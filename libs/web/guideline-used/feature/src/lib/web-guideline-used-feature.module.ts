
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebGuidelineUsedFeatureComponent } from './web-guideline-used-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-guideline-used-list/web-guideline-used-list.module').then((m) => m.WebGuidelineUsedListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-guideline-used-create/web-guideline-used-create.module').then((m) => m.WebGuidelineUsedCreateModule),
      },
      {
        path: ':guidelineUsedId',
        component: WebGuidelineUsedFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-guideline-used-detail/web-guideline-used-detail.module').then((m) => m.WebGuidelineUsedDetailModule),
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
  declarations: [WebGuidelineUsedFeatureComponent],
})
export class WebGuidelineUsedFeatureModule {}

