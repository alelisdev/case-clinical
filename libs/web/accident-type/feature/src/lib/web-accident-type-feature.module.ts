
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebAccidentTypeFeatureComponent } from './web-accident-type-feature.component'
import { Ng7DynamicBreadcrumbModule } from '@case-clinical/web/ui/breadcrumbs'

@NgModule({
  imports: [
    Ng7DynamicBreadcrumbModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          title: 'Accident Types',
          breadcrumb: [
            {
              name: 'Accident Types',
              path: 'queues/accident-types/:id/details/overview'
            }
          ]
        },
        loadChildren: () => import('./web-accident-type-list/web-accident-type-list.module').then((m) => m.WebAccidentTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-accident-type-create/web-accident-type-create.module').then((m) => m.WebAccidentTypeCreateModule),
      },
      {
        path: ':accidentTypeId',
        component: WebAccidentTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-accident-type-detail/web-accident-type-detail.module').then((m) => m.WebAccidentTypeDetailModule),
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
  declarations: [WebAccidentTypeFeatureComponent],
})
export class WebAccidentTypeFeatureModule {}

