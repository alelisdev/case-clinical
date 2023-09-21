
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAwardFeatureComponent } from './web-award-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-award-list/web-award-list.module').then((m) => m.WebAwardListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-award-create/web-award-create.module').then((m) => m.WebAwardCreateModule),
      },
      {
        path: ':awardId',
        component: WebAwardFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-award-detail/web-award-detail.module').then((m) => m.WebAwardDetailModule),
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
  declarations: [WebAwardFeatureComponent],
})
export class WebAwardFeatureModule {}

