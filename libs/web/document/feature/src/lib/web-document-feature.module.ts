
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'
import { WebDocumentFeatureComponent } from './web-document-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-document-list/web-document-list.module').then((m) => m.WebDocumentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-document-create/web-document-create.module').then((m) => m.WebDocumentCreateModule),
      },
      {
        path: ':documentId',
        component: WebDocumentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-document-detail/web-document-detail.module').then((m) => m.WebDocumentDetailModule),
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
  declarations: [WebDocumentFeatureComponent],
})
export class WebDocumentFeatureModule {}

