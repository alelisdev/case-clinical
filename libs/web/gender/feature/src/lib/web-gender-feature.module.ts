
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebGenderFeatureComponent } from './web-gender-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-gender-list/web-gender-list.module').then((m) => m.WebGenderListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-gender-create/web-gender-create.module').then((m) => m.WebGenderCreateModule),
      },
      {
        path: ':genderId',
        component: WebGenderFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-gender-detail/web-gender-detail.module').then((m) => m.WebGenderDetailModule),
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
  declarations: [WebGenderFeatureComponent],
})
export class WebGenderFeatureModule {}

