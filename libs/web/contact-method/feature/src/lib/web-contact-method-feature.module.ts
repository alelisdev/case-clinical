
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebContactMethodFeatureComponent } from './web-contact-method-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-contact-method-list/web-contact-method-list.module').then((m) => m.WebContactMethodListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-contact-method-create/web-contact-method-create.module').then((m) => m.WebContactMethodCreateModule),
      },
      {
        path: ':contactMethodId',
        component: WebContactMethodFeatureComponent,
        children: [
          {
            path: 'edit',
            loadChildren: () => import('./web-contact-method-edit/web-contact-method-edit.module').then((m) => m.WebContactMethodEditModule),
          },
          {
            path: 'details',
            loadChildren: () =>
              import('./web-contact-method-detail/web-contact-method-detail.module').then((m) => m.WebContactMethodDetailModule),
          },
          {
            path: 'firms',
            loadChildren: () => import('@case-clinical/web/firm/feature').then((m) => m.WebFirmFeatureModule),
          },

          {
            path: '',
            redirectTo: 'details',
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebContactMethodFeatureComponent],
})
export class WebContactMethodFeatureModule {}

