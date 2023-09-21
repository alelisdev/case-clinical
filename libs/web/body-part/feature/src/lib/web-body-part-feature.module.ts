
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebBodyPartFeatureComponent } from './web-body-part-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-body-part-list/web-body-part-list.module').then((m) => m.WebBodyPartListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-body-part-create/web-body-part-create.module').then((m) => m.WebBodyPartCreateModule),
      },
      {
        path: ':bodyPartId',
        component: WebBodyPartFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-body-part-detail/web-body-part-detail.module').then((m) => m.WebBodyPartDetailModule),
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
  declarations: [WebBodyPartFeatureComponent],
})
export class WebBodyPartFeatureModule {}

