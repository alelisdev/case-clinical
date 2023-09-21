
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
import { WebUserFeaturePermissionDetailComponent } from './web-user-feature-permission-detail.component'
import { WebUserFeaturePermissionOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule } from 'libs/web/ui-forms-shared.module'



@NgModule({
  declarations: [
    WebUserFeaturePermissionDetailComponent,
    WebUserFeaturePermissionOverviewComponent
],
  imports: [
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
    WebUiCardHeaderModule,
    WebUiPageModule,
    UiFormsSharedModule,
    RouterModule.forChild([
        { path: '', 
           component: WebUserFeaturePermissionDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebUserFeaturePermissionOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-user-feature-permission-edit/web-user-feature-permission-edit.module').then((m) => m.WebUserFeaturePermissionEditModule),
            },

            {
            path:'',
            redirectTo: 'overview'
          }
        ]
        }]),
    WebUiPageHeaderModule,
    WebUiButtonModule,
  ],
})
export class WebUserFeaturePermissionDetailModule {}
