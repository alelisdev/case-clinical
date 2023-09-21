
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebImplantFeatureComponent } from './web-implant-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-implant-list/web-implant-list.module').then((m) => m.WebImplantListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-implant-create/web-implant-create.module').then((m) => m.WebImplantCreateModule),
      },
      {
        path: ':implantId',
        component: WebImplantFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-implant-detail/web-implant-detail.module').then((m) => m.WebImplantDetailModule),
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
  declarations: [WebImplantFeatureComponent],
})
export class WebImplantFeatureModule {}

