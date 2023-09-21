
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebRequiredFieldFeatureComponent } from './web-required-field-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-required-field-list/web-required-field-list.module').then((m) => m.WebRequiredFieldListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-required-field-create/web-required-field-create.module').then((m) => m.WebRequiredFieldCreateModule),
      },
      {
        path: ':requiredFieldId',
        component: WebRequiredFieldFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-required-field-detail/web-required-field-detail.module').then((m) => m.WebRequiredFieldDetailModule),
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
  declarations: [WebRequiredFieldFeatureComponent],
})
export class WebRequiredFieldFeatureModule {}

