
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebMedLevelFeatureComponent } from './web-med-level-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-med-level-list/web-med-level-list.module').then((m) => m.WebMedLevelListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-med-level-create/web-med-level-create.module').then((m) => m.WebMedLevelCreateModule),
      },
      {
        path: ':medLevelId',
        component: WebMedLevelFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-med-level-detail/web-med-level-detail.module').then((m) => m.WebMedLevelDetailModule),
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
  declarations: [WebMedLevelFeatureComponent],
})
export class WebMedLevelFeatureModule {}

