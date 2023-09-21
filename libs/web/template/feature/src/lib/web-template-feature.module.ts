
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebTemplateFeatureComponent } from './web-template-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-template-list/web-template-list.module').then((m) => m.WebTemplateListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-template-create/web-template-create.module').then((m) => m.WebTemplateCreateModule),
      },
      {
        path: ':templateId',
        component: WebTemplateFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-template-detail/web-template-detail.module').then((m) => m.WebTemplateDetailModule),
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
  declarations: [WebTemplateFeatureComponent],
})
export class WebTemplateFeatureModule {}

