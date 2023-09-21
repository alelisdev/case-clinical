
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAttorneyTypeFeatureComponent } from './web-attorney-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-attorney-type-list/web-attorney-type-list.module').then((m) => m.WebAttorneyTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-attorney-type-create/web-attorney-type-create.module').then((m) => m.WebAttorneyTypeCreateModule),
      },
      {
        path: ':attorneyTypeId',
        component: WebAttorneyTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-attorney-type-detail/web-attorney-type-detail.module').then((m) => m.WebAttorneyTypeDetailModule),
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
  declarations: [WebAttorneyTypeFeatureComponent],
})
export class WebAttorneyTypeFeatureModule {}

