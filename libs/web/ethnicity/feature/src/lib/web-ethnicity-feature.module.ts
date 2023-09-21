
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebEthnicityFeatureComponent } from './web-ethnicity-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-ethnicity-list/web-ethnicity-list.module').then((m) => m.WebEthnicityListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-ethnicity-create/web-ethnicity-create.module').then((m) => m.WebEthnicityCreateModule),
      },
      {
        path: ':ethnicityId',
        component: WebEthnicityFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-ethnicity-detail/web-ethnicity-detail.module').then((m) => m.WebEthnicityDetailModule),
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
  declarations: [WebEthnicityFeatureComponent],
})
export class WebEthnicityFeatureModule {}

