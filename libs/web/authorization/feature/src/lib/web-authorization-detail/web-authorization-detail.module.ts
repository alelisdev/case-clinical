
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
import { WebAuthorizationDetailComponent } from './web-authorization-detail.component'
import { WebAuthorizationOverviewComponent } from './overview/overview.component'
import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'
import { UiFormsSharedModule, UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'

@NgModule({
  declarations: [
    WebAuthorizationDetailComponent,

    WebAuthorizationOverviewComponent
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
    UtilitySharedModule,
    UiFormsSharedModule,
    WebCoreFeatureModule,
    WebUiFormlyDesignerModule,
    RouterModule.forChild([
        { path: '', 
           component: WebAuthorizationDetailComponent,
           children: [
             {
               path: 'overview',
               pathMatch: 'full',
               component: WebAuthorizationOverviewComponent
             },
            {
              path: 'edit',
              loadChildren: () => import('../web-authorization-edit/web-authorization-edit.module').then((m) => m.WebAuthorizationEditModule),
            },
          {
                  path: 'authorization-diagnosis-codes',
                  loadChildren: () => import('@case-clinical/web/authorization-diagnosis-code/feature').then((m) => m.WebAuthorizationDiagnosisCodeFeatureModule),
                },
          {
                  path: 'procedure-or-treatment-request-authorizations',
                  loadChildren: () => import('@case-clinical/web/procedure-or-treatment-request-authorization/feature').then((m) => m.WebProcedureOrTreatmentRequestAuthorizationFeatureModule),
                },
          {
                  path: 'recommended-order-authorizations',
                  loadChildren: () => import('@case-clinical/web/recommended-order-authorization/feature').then((m) => m.WebRecommendedOrderAuthorizationFeatureModule),
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
export class WebAuthorizationDetailModule {}
