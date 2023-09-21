
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
import { WebUserFeatureDetailComponent } from './web-user-feature-detail.component'
import { WebUserFeatureOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'



@NgModule({
  declarations: [
    WebUserFeatureDetailComponent,
    WebUserFeatureOverviewComponent
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

    RouterModule.forChild([
        { path: '', 
           component: WebUserFeatureDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebUserFeatureOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-user-feature-edit/web-user-feature-edit.module').then((m) => m.WebUserFeatureEditModule),
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
export class WebUserFeatureDetailModule {}
