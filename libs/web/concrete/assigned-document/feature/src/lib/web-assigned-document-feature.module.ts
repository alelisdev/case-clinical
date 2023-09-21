
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { WebUiSidebarPageModule } from '@case-clinical/web/ui/sidebar-page'


import { WebAssignedDocumentFeatureComponent } from './web-assigned-document-feature.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./web-assigned-document-list/web-assigned-document-list.module').then((m) => m.WebAssignedDocumentListModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./web-assigned-document-create/web-assigned-document-create.module').then((m) => m.WebAssignedDocumentCreateModule),
      },
      {
        path: ':assignedDocumentId',
        component: WebAssignedDocumentFeatureComponent,
        children: [
          {
            path: 'details',
            loadChildren: () =>
              import('./web-assigned-document-detail/web-assigned-document-detail.module').then((m) => m.WebAssignedDocumentDetailModule),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'details',
          },
        ],
      },
    ]
),
    WebUiPageModule,
    WebUiSidebarPageModule,
  ],
  declarations: [WebAssignedDocumentFeatureComponent],
})
export class WebAssignedDocumentFeatureModule {}

