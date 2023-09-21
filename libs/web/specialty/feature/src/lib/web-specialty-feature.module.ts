
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebSpecialtyFeatureComponent } from './web-specialty-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-specialty-list/web-specialty-list.module').then((m) => m.WebSpecialtyListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-specialty-create/web-specialty-create.module').then((m) => m.WebSpecialtyCreateModule),
      },
      {
        path: ':specialtyId',
        component: WebSpecialtyFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-specialty-detail/web-specialty-detail.module').then((m) => m.WebSpecialtyDetailModule),
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
  declarations: [WebSpecialtyFeatureComponent],
})
export class WebSpecialtyFeatureModule {}

