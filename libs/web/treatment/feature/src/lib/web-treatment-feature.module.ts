
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebTreatmentFeatureComponent } from './web-treatment-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-treatment-list/web-treatment-list.module').then((m) => m.WebTreatmentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-treatment-create/web-treatment-create.module').then((m) => m.WebTreatmentCreateModule),
      },
      {
        path: ':treatmentId',
        component: WebTreatmentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-treatment-detail/web-treatment-detail.module').then((m) => m.WebTreatmentDetailModule),
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
  declarations: [WebTreatmentFeatureComponent],
})
export class WebTreatmentFeatureModule {}

