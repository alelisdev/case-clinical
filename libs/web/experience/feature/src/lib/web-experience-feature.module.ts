
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebExperienceFeatureComponent } from './web-experience-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-experience-list/web-experience-list.module').then((m) => m.WebExperienceListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-experience-create/web-experience-create.module').then((m) => m.WebExperienceCreateModule),
      },
      {
        path: ':experienceId',
        component: WebExperienceFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-experience-detail/web-experience-detail.module').then((m) => m.WebExperienceDetailModule),
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
  declarations: [WebExperienceFeatureComponent],
})
export class WebExperienceFeatureModule {}

