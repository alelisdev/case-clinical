
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebBatchControlFeatureComponent } from './web-batch-control-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-batch-control-list/web-batch-control-list.module').then((m) => m.WebBatchControlListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-batch-control-create/web-batch-control-create.module').then((m) => m.WebBatchControlCreateModule),
      },
      {
        path: ':batchControlId',
        component: WebBatchControlFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-batch-control-detail/web-batch-control-detail.module').then((m) => m.WebBatchControlDetailModule),
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
  declarations: [WebBatchControlFeatureComponent],
})
export class WebBatchControlFeatureModule {}

