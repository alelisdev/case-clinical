
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebLeadTreatmentFeatureComponent } from './web-lead-treatment-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-lead-treatment-list/web-lead-treatment-list.module').then((m) => m.WebLeadTreatmentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-lead-treatment-create/web-lead-treatment-create.module').then((m) => m.WebLeadTreatmentCreateModule),
      },
      {
        path: ':leadTreatmentId',
        component: WebLeadTreatmentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-lead-treatment-detail/web-lead-treatment-detail.module').then((m) => m.WebLeadTreatmentDetailModule),
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
  declarations: [WebLeadTreatmentFeatureComponent],
})
export class WebLeadTreatmentFeatureModule {}

