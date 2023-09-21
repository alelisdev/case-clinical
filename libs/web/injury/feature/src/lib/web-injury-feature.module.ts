
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebInjuryFeatureComponent } from './web-injury-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-injury-list/web-injury-list.module').then((m) => m.WebInjuryListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-injury-create/web-injury-create.module').then((m) => m.WebInjuryCreateModule),
      },
      {
        path: ':injuryId',
        component: WebInjuryFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-injury-detail/web-injury-detail.module').then((m) => m.WebInjuryDetailModule),
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
  declarations: [WebInjuryFeatureComponent],
})
export class WebInjuryFeatureModule {}

