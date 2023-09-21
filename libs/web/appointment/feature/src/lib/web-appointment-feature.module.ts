
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAppointmentFeatureComponent } from './web-appointment-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-appointment-list/web-appointment-list.module').then((m) => m.WebAppointmentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-appointment-create/web-appointment-create.module').then((m) => m.WebAppointmentCreateModule),
      },
      {
        path: ':appointmentId',
        component: WebAppointmentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-appointment-detail/web-appointment-detail.module').then((m) => m.WebAppointmentDetailModule),
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
  declarations: [WebAppointmentFeatureComponent],
})
export class WebAppointmentFeatureModule {}

