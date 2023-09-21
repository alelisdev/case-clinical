
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebPrescriptionFeatureComponent } from './web-prescription-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-prescription-list/web-prescription-list.module').then((m) => m.WebPrescriptionListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-prescription-create/web-prescription-create.module').then((m) => m.WebPrescriptionCreateModule),
      },
      {
        path: ':prescriptionId',
        component: WebPrescriptionFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-prescription-detail/web-prescription-detail.module').then((m) => m.WebPrescriptionDetailModule),
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
  declarations: [WebPrescriptionFeatureComponent],
})
export class WebPrescriptionFeatureModule {}

