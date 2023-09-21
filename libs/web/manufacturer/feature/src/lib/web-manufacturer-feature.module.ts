
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebManufacturerFeatureComponent } from './web-manufacturer-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-manufacturer-list/web-manufacturer-list.module').then((m) => m.WebManufacturerListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-manufacturer-create/web-manufacturer-create.module').then((m) => m.WebManufacturerCreateModule),
      },
      {
        path: ':manufacturerId',
        component: WebManufacturerFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-manufacturer-detail/web-manufacturer-detail.module').then((m) => m.WebManufacturerDetailModule),
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
  declarations: [WebManufacturerFeatureComponent],
})
export class WebManufacturerFeatureModule {}

