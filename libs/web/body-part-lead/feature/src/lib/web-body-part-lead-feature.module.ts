
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebBodyPartLeadFeatureComponent } from './web-body-part-lead-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-body-part-lead-list/web-body-part-lead-list.module').then((m) => m.WebBodyPartLeadListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-body-part-lead-create/web-body-part-lead-create.module').then((m) => m.WebBodyPartLeadCreateModule),
      },
      {
        path: ':bodyPartLeadId',
        component: WebBodyPartLeadFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-body-part-lead-detail/web-body-part-lead-detail.module').then((m) => m.WebBodyPartLeadDetailModule),
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
  declarations: [WebBodyPartLeadFeatureComponent],
})
export class WebBodyPartLeadFeatureModule {}

