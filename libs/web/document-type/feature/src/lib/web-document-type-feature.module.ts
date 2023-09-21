
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebDocumentTypeFeatureComponent } from './web-document-type-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-document-type-list/web-document-type-list.module').then((m) => m.WebDocumentTypeListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-document-type-create/web-document-type-create.module').then((m) => m.WebDocumentTypeCreateModule),
      },
      {
        path: ':documentTypeId',
        component: WebDocumentTypeFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-document-type-detail/web-document-type-detail.module').then((m) => m.WebDocumentTypeDetailModule),
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
  declarations: [WebDocumentTypeFeatureComponent],
})
export class WebDocumentTypeFeatureModule {}

