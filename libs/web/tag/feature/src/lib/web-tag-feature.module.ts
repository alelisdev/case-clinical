
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebTagFeatureComponent } from './web-tag-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-tag-list/web-tag-list.module').then((m) => m.WebTagListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-tag-create/web-tag-create.module').then((m) => m.WebTagCreateModule),
      },
      {
        path: ':tagId',
        component: WebTagFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-tag-detail/web-tag-detail.module').then((m) => m.WebTagDetailModule),
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
  declarations: [WebTagFeatureComponent],
})
export class WebTagFeatureModule {}

