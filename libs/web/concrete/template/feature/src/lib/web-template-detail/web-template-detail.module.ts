
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiPageModule } from '@case-clinical/web/ui/page'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'libs/shared/shared.module';
import { WebTemplateDetailComponent } from './web-template-detail.component'
import { WebTemplateOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer';

@NgModule({
  declarations: [
    WebTemplateDetailComponent,
    WebTemplateOverviewComponent
],
  imports: [
    WebUiFormlyDesignerModule,
    WebUiFormModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    FuseHighlightModule,
    FuseAlertModule,
    FuseNavigationModule,
    FuseScrollResetModule,
    SharedModule,
    CommonModule,
    WebUiPanelModule,
    WebUiDescriptionListModule,
    DocumentViewerModule,
    WebUiCardHeaderModule,
    WebUiPageModule,
    RouterModule.forChild([
        { path: '',
           component: WebTemplateDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebTemplateOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-template-edit/web-template-edit.module').then((m) => m.WebTemplateEditModule),
            },
          {
                path: 'assigned-documents',
                loadChildren: () => import('@case-clinical/web/assigned-document/feature').then((m) => m.WebAssignedDocumentFeatureModule),
              },
            {
            path:'',
            pathMatch: 'full',
            redirectTo: 'overview'
          }
        ]
        }]),
    WebUiPageHeaderModule,
    WebUiButtonModule,
  ],
})
export class WebTemplateDetailModule {}
